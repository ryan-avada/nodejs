const yup = require('yup');

async function productInputValidate(ctx, next) {
    try {
        const postData = ctx.request.body;
        let schema = yup.object().shape({
            id: yup
                .number()
                .positive()
                .integer(),
            name: yup
                .string(),
            price: yup
                .number(),
            image: yup
                .string(),
            product: yup
                .string(),
            description: yup
                .string(),
            color: yup
                .string()
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