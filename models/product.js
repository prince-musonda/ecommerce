const fs = require('fs');
const path = require('path');
const Cart = require('./cart')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id
    
  }

  save() {
      getProductsFromFile(products => {
        // when updating an existing product
        if(this.id){
          console.log('updating product')
          const existingProductIndex = products.findIndex(pdt => pdt.id === this.id)
          products[existingProductIndex] = this
          fs.writeFile(p,JSON.stringify(products),(error)=>{
            console.log(error)
          })
        }
        //when adding a new product
        else{
        this.id = Math.random().toString() // create id for new product
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
      });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id,callback){
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id)
      callback(product)
    })
  }

  static deleteById(id){
    getProductsFromFile(products =>{
      const product = products.find(prod => prod.id == id)
      const updatedProducts = products.filter(prod => prod.id !== id)
        fs.writeFile(p,JSON.stringify(updatedProducts),(error)=>{
          if(!error){
            // remove cart also
            Cart.deleteProduct(id,product.price)
          }
        })
    })
  }
};
