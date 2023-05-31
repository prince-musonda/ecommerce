const fs = require('fs')
const path = require('path') 

const cartFilePath = path.join(__dirname,'..','data','cart.json')

module.exports = class Cart{
    static addProduct(ProductId,productPrice){
        // open and analyze cart 
        fs.readFile(cartFilePath,(error,fileContent)=>{
            let cart = { products:[], totalPrice:0 }
            if(!error){
                cart = JSON.parse(fileContent)
            }
            //update quantity / add new product to cart
            const existingProductIndex = cart.products.findIndex(p => p.id === ProductId)
            const existingProduct = cart.products[existingProductIndex]
            //update  quantity if product already exists
            if(existingProduct){
                const updatedProduct = {...existingProduct}
                updatedProduct.qty = updatedProduct.qty + 1
                cart.products[existingProductIndex] = updatedProduct
            }
            // add product to cart if it doesn't yet exist
            else{
                const newItem = { id:ProductId, qty:1}
                cart.products.push(newItem)
            }
            //update total price and save changes to file
            cart.totalPrice = cart.totalPrice + Number(productPrice)
            fs.writeFile(cartFilePath,JSON.stringify(cart),(error)=>{
                if(error) console.log(error)
            }) 
        })
    }
}