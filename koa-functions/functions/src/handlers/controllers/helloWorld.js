function hello(ctx) {
    return ctx.body = {
        message: 'Hello ctx'
    }
}

module.exports = {
    hello
};