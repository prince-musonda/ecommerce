exports.get404 = (req,res,next)=>{
    res.status(404)
    res.render('404',{pageTitle:'page not found', path:''})
}