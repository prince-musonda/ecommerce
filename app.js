const http = require('http')
const path = require('node:path')
const express = require('express')

const adminRouter = require('./routes/admin')
const shopRouter = require('./routes/shop')

const app = express()
//serve static files
app.use(express.static(path.join(__dirname,'public')))
//body parser
app.use(express.urlencoded({extended:true}))
app.use('/admin',adminRouter)
app.use(shopRouter)
// returning 404 error
app.use((req,res,next)=>{
    res.status(404)
    res.sendFile(path.join(__dirname,'views','404.html'))
})


const server = http.createServer(app)

server.listen(3005)
