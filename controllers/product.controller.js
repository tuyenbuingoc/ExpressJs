var Product = require('../models/product.model');

module.exports.index = function(req, res) {
    // var page = parseInt(req.query.page) || 1;
    // var perPage = 8;
    // var start = (page - 1) * perPage;
    // var end = page * perPage;
    // var product = db.get('products').value().slice(start, end);
    // res.render('product/index', {
    //     product: product
    // });
    Product.find().then(function(products){
        res.render('product/index', {
            product: products
        });
    });
};