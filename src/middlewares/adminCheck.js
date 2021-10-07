const adminCheck = (req, res, next) => {
    if (!(req.session.userStatus === 'admin')) {
        res.locals.admin = { admin: false }
    }
}
 module.exports = adminCheck
