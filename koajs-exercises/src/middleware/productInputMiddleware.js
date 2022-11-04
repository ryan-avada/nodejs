const yup = require('yup');

async function productInputValidate(ctx, next) {
    try {
        const postData = ctx.request.body;
        let schema = yup.object.shape({
            id: yup.number().integer().required(),
            name: yup.string().required(),
            price: yup.number()
        });
        await schema.validate(postData);
        next();
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            errors: e.errors,
            errorName: e.name
        }
    }
}

module.exports = productInputValidate;