const fs = require("fs");

const {data: books} = require('./books.json');

function getAll() {
    return books;
}

/**
 *
 * @param id
 * @returns {{author: string, name: string, id: number} | {author: string, name: string, id: number} | {author: string, name: string, id: number} | {author: string, name: string, id: number}}
 */
function getOne(id) {
    return books.find(book => book.id === parseInt(id));
}

function add(data) {
    const updateBooks = [data, ...books];
    return fs.writeFileSync('./src/database/books.json', JSON.stringify({
        data: updateBooks
    }));
}

module.exports = {
    getOne,
    getAll,
    add
};