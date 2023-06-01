const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    edit: false // to differentiate this contoller and the 
    // getEditProduct since they are both rendering the same view.
    // in getEditProduct, the edit property is sent to true
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if(!editMode){
    return res.redirect('/')
  }
  const productId = req.params.productId
  Product.findById(productId,product =>{
    if(!product){
     return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      product: product,
      edit: editMode  // to differentiate this contoller and the 
      // getAddProduct since they are both rendering the same view.
      // in getAddProduct, the edit property is sent to false
    });
  })
 
};


exports.postEditProduct = (req,res,next) =>{
  const productId = req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice = req.body.price
  const updatedDescription = req.body.description
  const updatedImageUrl = req.body.imageUrl
  const updatedProduct = new Product(productId,updatedTitle,updatedImageUrl,updatedDescription,updatedPrice)
  updatedProduct.save()
  res.redirect('/admin/products')

}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
