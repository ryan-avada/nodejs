//log
console.log('Hello');

//function
function plus(num1, num2) {
    return num1 + num2;
}
console.log('Plus: ' + plus(1,99));
const addArrow = (num1, num2) => num1 + num2;
console.log('AddArrow: ' + addArrow(2,5));


//map
const firstVariable = ['M1', 'M2', 'JS', 'PHP'];
const firststatus = firstVariable.map(stack => {
    return {
        name: stack,
        status: 'finished'
    }
});
console.log(firststatus)

//filter
const list = [1,2,3,2,5,1,10];
const uniqueNum = (value, index, self) => {
    return self.indexOf(value) === index;
}
const resultUnique = list.filter(uniqueNum);
console.log(resultUnique);

//Destructuring Assignment
const getUser = () => {
    const user = {
        id: 1,
        name: 'Ryan',
        status: 'Active'
    };

    return user;
}
const {name, status} = getUser();
console.log(name, status);
const logInfo = ({name, age = 20}) => {
    console.log(`Hi, I\'m ${name}. I\'m ${age}`);
    return true;
};
console.log(logInfo({age: 24, name: 'Ryan'}));

//merge
const person = {
    id: 1,
    name: 'Ryan'
};

const job = {job: 'IT'};
const mergePerson = {person, job};
console.log(mergePerson);
const post = {
    'id': 1,
    'postName': 'Ryan',
    'title': 'Hi I\'m Ryan',
    'body': 'Mageplaza',
};
const {postName, title} = post;
console.log(title, postName);

//settimeout
console.log("i am first");
setTimeout(function timeout() {
    console.log("i am second");
}, 0);
console.log("i am third");
