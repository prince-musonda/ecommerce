const http = require('http')
const path = require('node:path')
const express = require('express')

const errorController = require('./controllers/error')
const adminRouter = require('./routes/admin')
const shopRouter = require('./routes/shop')

const app = express()
//serve static files
app.use(express.static(path.join(__dirname,'public')))
//body parser
app.use(express.urlencoded({extended:true}))
// setting up templating engine
app.set('view engine','ejs') // name of template engine that will be used
app.set('views','views') // location of views folder
//routes
app.use('/admin',adminRouter)
app.use(shopRouter)
// returning 404 page not found error
app.use(errorController.get404)


const server = http.createServer(app)

server.listen(3005)
