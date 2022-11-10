const fs = require("fs");

const {data: todos} = require('./todo.json');
const {faker} = require("@faker-js/faker");

function getAll() {
    return todos;
}

function getOne(id) {
    return todos.find(todo => todo.id === id);
}

function addAndReplace(data, todoId = null) {
    //check update or create
    let updateTodos = [];
    if (todoId) {
        const todo = getOne(todoId);
        Object.assign(todo, data);
        const productsExcl = todos.filter(item => item.id !== todoId);

        updateTodos = [...productsExcl, todo];
    } else {
        const id = faker.datatype.uuid();
        const newAdded = {id, ...data}
        updateTodos = [...todos, newAdded];
    }

    return fs.writeFileSync('./src/database/todo.json', JSON.stringify({
        data: updateTodos
    }))
}

function remove(id) {
    const ids = id.split(",");
    const todosExcl = todos.filter(item => !ids.includes(item.id));
    fs.writeFileSync('./src/database/todo.json', JSON.stringify({
        data: todosExcl
    }))

    return true;

}

module.exports = {
    getAll,
    getOne,
    addAndReplace,
    remove
}