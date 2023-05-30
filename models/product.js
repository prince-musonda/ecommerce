const fs = require('fs')
const path = require('path')
const rootDir = require('../utils/path')

const p = path.join(rootDir,'data','product.js')
class Product{
    constructor(title){
        this.title = title
    }
    save(){
       fs.readFile(p,(error,fileContent)=>{
            let products = []
            if(!error){
                products = JSON.parse(fileContent)
            }
            products.push(this)
            fs.writeFile(p,JSON.stringify(products),error=>{
                console.log(error)
            })
       })
    }
    static fetchAll(callback){
        fs.readFile(p,(error,fileContent)=>{
            let products = []
            if(error){
                callback(products)
            }else{
                products = JSON.parse(fileContent);
                callback(products)
            }
            
       })
    }
}

module.exports = Product