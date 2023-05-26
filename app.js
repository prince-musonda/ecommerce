const http = require('http')

const express = require('express')

const adminRouter = require('./routes/admin')
const shopRouter = require('./routes/shop')

const app = express()

//body parser
app.use(express.urlencoded({extended:true}))
app.use('/admin',adminRouter)
app.use(shopRouter)
// returning 404 error
app.use((req,res,next)=>{
    res.status(404)
    res.send('<h1>page not found</h1>')
})


const server = http.createServer(app)

server.listen(3005)
