const path = require('node:path')
const express = require('express')
const rootDir = require('../utils/path')

const products = []
const router = express.Router()

router.get('/add-product',(req,res,next)=>{
   res.render('add-product',{
    pageTitle:'Add product',
    path:'/admin/add-product'
    })
})

router.post('/add-product',(req,res,next)=>{
    products.push({title:req.body.title})
    res.redirect('/')
})

module.exports.router = router
module.exports.products = products

