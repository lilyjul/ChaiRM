const adminCheck = (req, res, next) =>{
    if (!(req.session.userStatus === 'admin')){
        {admin:false}
    }
}
