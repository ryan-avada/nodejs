function getData(callback) {
    setTimeout(() => {
        const data = [
            {id: 1, name: 'Ryan'},
            {id: 2, name: 'Dom'}
        ];
        callback(data);
    }, 1000);
}

getData((data) => {
    const names = data.map(data => data.name);
    console.log(names);
})

//ex1

async function getSmt() {
    return 'a';
}
//ex1 = ex2
// ex2
function getSmt2() {
    return new Promise((resolve, reject) => {
        resolve('a');
    })
}

console.log(getSmt());