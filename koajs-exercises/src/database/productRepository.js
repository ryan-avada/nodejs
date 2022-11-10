const fs = require("fs");

const {data: products} = require('./products.json');
const pick = require("../helpers/utils");

function getAll(sort, limit) {
    let result = products.sort(function (prev, current) {
        if (sort === 'asc') {
            return Date.parse(prev.createdAt) - Date.parse(current.createdAt);
        } else if (sort === 'desc') {
            return Date.parse(current.createdAt) - Date.parse(prev.createdAt);
        }

        return prev.id - current.id;
    })

    if (limit) {
        result = result.slice(0, limit);
    }

    return result;
}

function getOne(id, fields) {
    const product = products.find(product => product.id === parseInt(id));

    if (fields) {
        return pick(product, [fields]);
    }

    return product;
}

function addAndReplace(data, productId = null) {
    //check update or create
    let updateProducts;
    if (productId) {
        const product = getOne(productId);
        Object.assign(product, data);
        const productsExcl = products.filter(item => item.id !== parseInt(productId));

        updateProducts = [...productsExcl, product];
    } else {
        let id = 1 + products.reduce(
            (prev, current) => {
                return prev.id > current.id ? prev : current
            }).id;
        const newAdded = {id, ...data, createdAt: new Date()}
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
    const updateProducts = [...data];
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