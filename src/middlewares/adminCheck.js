const adminCheck = (req, res, next) => {
  if (!(req.session.userStatus === 'admin')) {
    res.locals.admin = { admin: false };
  }
  next();
};

module.exports = adminCheck;
