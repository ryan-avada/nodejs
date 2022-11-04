const { getAll: getAllProducts, getOne: getOneProduct, add: addProduct, fakerData: fakerData } = require('../../database/productRepository.js');
const {faker} = require("@faker-js/faker");
const fs = require("fs");

async function getProducts(ctx) {
    try {
        const products = getAllProducts();
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
        addProduct(postData);

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