const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('order');
});

router.post('/', (req, res) => {
  res.render('registration');
})

router.post('/registration', async (req, res) => {
  const { email, password, name } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const currUser = await User.create({ email, name, password: passwordHash });
  req.session.userId = currUser.id; 
  req.session.userName = currUser.name;
  req.session.userEmail = currUser.email;
  res.redirect('/');
});
module.exports = router
