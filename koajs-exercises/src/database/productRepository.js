const fs = require("fs");

const { data: products } = require('./products.json');

function getAll() {
    return products;
}

function getOne(id) {
    return products.find(product => product.id === parseInt(id));
}

function add(data) {
    const updateProducts = [data, ...products];
    return fs.writeFileSync('./src/database/products.json', JSON.stringify({
        data: updateProducts
    }))
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
    add,
    fakerData
}