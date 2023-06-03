const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req,res,next) =>{
  const productID = req.params.productID;
  Product.findById(productID,(product)=>{
    res.render('shop/product-detail',{
      pageTitle: product.pageTitle,
      path:'/products',
      product: product
    })
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};


exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products =>{
      const cartProducts = []
      for(let product of products){
        const cartProductData = cart.products.find(p => p.id == product.id)
        if(cartProductData){
            cartProducts.push({productData: product, qty: cartProductData.qty})
          }
        }
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: cartProducts
        });
    })
  })
  
};


exports.postCart = (req,res,next) =>{
  const productID = req.body.productId
  Product.findById(productID,product =>{
    Cart.addProduct(product.id,product.price)
  })
  res.redirect('/cart')
}


exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
