const fs = require("fs");

const { data: products } = require('./products.json');

function getAll() {
    return products;
}

function getOne(id) {
    return products.find(product => product.id === parseInt(id));
}

function add(data) {
    let id = 1 + products.reduce(
        (prev, current) => {
            return prev.id > current.id ? prev : current
        }).id;
    const newAdded = {id, ...data}
    const updateProducts = [...products, newAdded];

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