const fs = require('fs');
const Cart = require('./cart')
const db = require('../util/database')

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
      return db.execute('INSERT INTO products (title,imageUrl,price,description) VALUES (?,?,?,?)'
      ,[this.title,this.imageUrl,this.price,this.description])
  }

  static fetchAll() {
    // return promise with all products included
   return db.execute('SELECT * FROM products')
  }

  static findById(id){
   return db.execute('SELECT * FROM products WHERE products.id = ?',[id])
  }

  static deleteById(id){

  }
};
