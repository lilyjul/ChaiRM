const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

const redisClient = redis.createClient();
require('dotenv').config();

const app = express();
const PORT = process.env.DB_PORT || 3000;

// реквайры роутеров
const indexRouter = require('./src/routes/indexRouter')
const signRouter = require('./src/routes/signRouter')
const clientRouter = require('./src/routes/clientsRouter')
const ordersRouter = require('./src/routes/ordersRouter')

app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'src', 'views'));

hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'));

app.use(logger('dev'));
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionConfig = {
    store: new RedisStore({ host: process.env.DB_HOST, port: 6379, client: redisClient }),
    key: 'sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    cookie: { expires: 24 * 60 * 60e3 },
};

app.use(session(sessionConfig));

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next()
});

// мидлвары на ручки
app.use('/', indexRouter)
app.use('/log', signRouter)
app.use('/clients', clientRouter)
app.use('/orders', ordersRouter)









app.use(session(sessionConfig));

// Если HTTP-запрос дошёл до этой строчки, значит ни один из ранее встречаемых рутов не ответил на запрос. 
// Это значит, что искомого раздела просто нет на сайте. 
// Для таких ситуаций используется код ошибки 404. Создаём небольшое middleware, которое генерирует соответствующую ошибку.

app.use((req, res, next) => {
    const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
    next(error);
});

// Отлавливаем HTTP-запрос с ошибкой и отправляем на него ответ.
app.use(function (err, req, res, next) {
    // Получаем текущий ражим работы приложения.
    const appMode = req.app.get('env');
    // Создаём объект, в котором будет храниться ошибка.
    let error;

    // Если мы находимся в режиме разработки, то отправим в ответе настоящую ошибку. В противно случае отправим пустой объект.
    if (appMode === 'development') {
        error = err;
    } else {
        error = {};
    }

    // Записываем информацию об ошибке и сам объект ошибки в специальные переменные, доступные на сервере глобально, но только в рамках одного HTTP-запроса.
    res.locals.message = err.message;
    res.locals.error = error;

    // Задаём в будущем ответе статус ошибки. Берём его из объекта ошибки, если он там есть. В противно случае записываем универсальный стату ошибки на сервере - 500.
    res.status(err.status || 500);
    // Формируем HTML-текст из шаблона "error.hbs" и отправляем его на клиент в качестве ответа.
    res.render('error');
});

app.listen(PORT, () => {
    console.log(`server started PORT: ${PORT}`);
});
