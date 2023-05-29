const path = require('path')
const express = require('express')
const rootDir = require('../utils/path')
const adminData = require('./admin.js')

const router = express.Router()

router.get('/',(req,res,next)=>{
    const products = adminData.products
    res.render('shop',{
        prods:products,
        pageTitle:'shop',
        path:'/'
    })
 })

 module.exports = router