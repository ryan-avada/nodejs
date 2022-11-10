const { getAll: getAllProducts, getOne: getOneProduct, addAndReplace: addAndReplace, fakerData: fakerData, remove: removeProduct } = require('../../database/productRepository.js');
const {faker} = require("@faker-js/faker");
const fs = require("fs");

async function getProducts(ctx) {
    try {
        const { limit, sort } = ctx.query;
        let products = getAllProducts(sort, limit);

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
        const { id } = ctx.params;
        const { fields } = ctx.query;

        let productSelected = getOneProduct(id, fields);

        if (productSelected) {
            return ctx.body = {
                data: productSelected
            }
        }

        throw new Error('Product is not found!')
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
        addAndReplace(postData);

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

async function update(ctx) {
    try {
        const {id} = ctx.params;
        const data = ctx.request.body;
        if (id) {
            addAndReplace(data, id)
            ctx.status = 201;
            return ctx.body = {
                success: true,
                data: data
            }
        }
        throw new Error('Product is not found!')
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        }
    }
}

async function remove(ctx) {
    try {
        const { id } = ctx.params;
        if (id) {
            if (removeProduct(id)) {
                ctx.status = 201;
                return ctx.body = {
                    success: true
                }
            }
        }
        throw new Error('Product is not found!')
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            error: e.message
        }
    }
}

async function fakerProducts(ctx) {
    try {
        const products = [];
        Array.from({length: 50}).forEach((value, index, array) => {
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
        "status": faker.datatype.number({min: 1, max: 2}),
        "color": faker.commerce.color(),
        "createdAt": faker.date.past(),
        "image": faker.image.cats()
    };
}

module.exports = {
    getProducts,
    getProduct,
    save,
    update,
    remove,
    fakerProducts
}