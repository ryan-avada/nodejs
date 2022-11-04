const { getAll: getAllProducts, getOne: getOneProduct, add: addProduct, fakerData: fakerData } = require('../../database/productRepository.js');
const {faker} = require("@faker-js/faker");
const fs = require("fs");

async function getProducts(ctx) {
    try {
        const { limit, sort } = ctx.query;
        let products = getAllProducts();

        if (limit) {
            products = products.slice(0, limit);
        }

        if (sort === 'asc') {
            products = sortProduct(products, true);
        } else if (sort === 'desc') {
            products = sortProduct(products, false);
        } else {
            products = sortProduct(products, false, true);
        }

        ctx.body = {
            data: products
        }
    } catch (e) {
        ctx.status = 404;
        ctx.body =  {
            success: false,
            data: [],
            error: e.message
        }
    }
}

function sortProduct(products, asc = true, sortDefault = false) {
    if (sortDefault) {
        return products.sort(function (prev, current) {
            return prev.id - current.id;
        })
    }

    if (asc) {
        return products.sort(function (prev, current) {
            return Date.parse(prev.createdAt) - Date.parse(current.createdAt);
        })
    }

    return products.sort(function (prev, current) {
        return Date.parse(current.createdAt) - Date.parse(prev.createdAt);
    })
}

async function getProduct (ctx) {
    try {
        const {id} = ctx.params;
        const currentProduct = getOneProduct(id);
        if (currentProduct) {
            return ctx.body = {
                data: currentProduct
            }
        }

        ctx.status = 404;
        return ctx.body =  {
            success: false,
            data: [],
            error: 'Product is not found!'
        }
    } catch (e) {
        ctx.status = 404;
        ctx.body =  {
            success: false,
            data: [],
            error: e.message
        }
    }
}
async function save(ctx) {
    try {
        const postData = ctx.request.body;
        const createdAt = new Date(Date.now());
        const data = {...postData, createdAt}
        addProduct(data);

        ctx.status = 201;
        ctx.body = {
            success: true
        }
    } catch (e) {
        ctx.status = 404;
        ctx.body =  {
            success: false,
            data: [],
            error: e.message
        }
    }
}

async function fakerProducts(ctx) {
    try {
        const products = [];
        Array.from({length: 1000}).forEach((value, index, array) => {
            const productsData = createRandomProducts(index + 1);
            products.push(productsData);
        })
        fakerData(products);
        ctx.status = 201;
        ctx.body = {
            success: true,
            data: products
        }
    } catch (e) {
        ctx.status = 404;
        ctx.body =  {
            success: false,
            data: [],
            error: e.message
        }
    }
}

function createRandomProducts(id) {
    return {
        "id": id,
        "name": faker.commerce.productName(),
        "price": faker.commerce.price(),
        "description": faker.commerce.productDescription(),
        "product": faker.commerce.product(),
        "color": faker.commerce.color(),
        "createdAt": faker.date.past(),
        "image": faker.image.cats()
    };
}


module.exports = {
    getProducts,
    getProduct,
    save,
    fakerProducts
}