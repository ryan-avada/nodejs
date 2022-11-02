import fetch from 'node-fetch';
// get data from all user

const getUsers = async () => {
    const userData = await fetch('https://jsonplaceholder.typicode.com/users');
    const userJson = await userData.json();

    return userJson.map(user => {
        const {id, name, username, email} = user;
        return {id, name, username, email};
    });
}

const getPostsByUser = async (userId) => {
    const posts = await fetch('https://jsonplaceholder.typicode.com/users/'+ userId +'/posts');
    const postsData = await posts.json();

    return postsData.map(post => {
        const {id, title, body} = post;
        return {id, title, body};
    })
}

const getCommentsByUser = async (userId) => {
    const comments = await fetch('https://jsonplaceholder.typicode.com/comments');
    return comments.json();
}


(async () => {
    try {
        const userData = await getUsers();
        const userDataWithPosts = await Promise.all(userData.map(async user => {
            const posts = await getPostsByUser(user.id);
            return {...user, posts};
        }));
        console.log(userDataWithPosts);

    } catch (e) {
        console.log('Error!, %1', e);
    }
})();