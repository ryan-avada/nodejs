const fs = require("fs");

const { data: products } = require('./products.json');

function getAll(fields = '') {
    return products;
}

function getOne(id, fields = '') {
    const product =  products.find(product => product.id === parseInt(id));
    const {price, name} = product;
    const fieldArr = fields.split(",");
    fieldArr.map(field => {

    })
    return {id, name, price};

}

function addAndReplace(data, productId =  null) {
    //check update or create
    let updateProducts;
    if (productId) {
        const product = getOne(productId);
        Object.assign(product, data);
        const productsExcl = products.filter(item => item.id !== parseInt(productId) );

        updateProducts = [...productsExcl, product];
    } else {
        let id = 1 + products.reduce(
            (prev, current) => {
                return prev.id > current.id ? prev : current
            }).id;
        const newAdded = {id, ...data}

        updateProducts = [...products, newAdded];
    }

    return fs.writeFileSync('./src/database/products.json', JSON.stringify({
        data: updateProducts
    }))
}

function remove(id) {
    const currentProduct = getOne(id);
    if (currentProduct) {
        const productExcl = products.filter(item => item.id !== parseInt(id));

        fs.writeFileSync('./src/database/products.json', JSON.stringify({
            data: productExcl
        }))

        return true;
    }
     return false;
}

function fakerData(data) {
    const updateProducts = [...data, ...products];
    return fs.writeFileSync('./src/database/products.json', JSON.stringify({
        data: updateProducts
    }))
}

module.exports = {
    getAll,
    getOne,
    addAndReplace,
    remove,
    fakerData
}