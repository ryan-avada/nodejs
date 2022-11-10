const {
    getAll: getAllTodos,
    getOne: getOneTodo,
    addAndReplace: addAndReplace,
    fakerData: fakerData,
    remove: removeTodo
} = require('../../database/todoRepository.js');

async function getTodos(ctx) {
    try {
        let products = getAllTodos();

        ctx.body = {
            data: products
        }
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        }
    }
}

async function getTodo(ctx) {
    try {
        const {id} = ctx.params;

        let productSelected = getOneTodo(id);

        if (productSelected) {
            return ctx.body = {
                data: productSelected
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
        ctx.body = {
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
        const {id} = ctx.params;
        if (removeTodo(id)) {
            ctx.status = 201;
            return ctx.body = {
                success: true
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


module.exports = {
    getTodos,
    getTodo,
    save,
    update,
    remove
}