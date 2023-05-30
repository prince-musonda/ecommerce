const fs = require('fs')
const path = require('path')
const rootDir = require('../utils/path')

const p = path.join(rootDir,'data','product.js')

function getProductsFromFile(callback){
    fs.readFile(p,(error,fileContent)=>{
        let products = [] // in case error in finding or opening file 
        if(error){
            callback(products)
        }else{
            products = JSON.parse(fileContent);
            callback(products)
        }
        
   })
}

class Product{
    constructor(title){
        this.title = title
    }
    save(){
       getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(p,JSON.stringify(products),(error)=>{
                if(error) console.log(error)
            })
       })
    }

    static fetchAll(callback){
        getProductsFromFile(callback)
    }
}

module.exports = Product