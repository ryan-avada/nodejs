import fetch from 'node-fetch';
import * as fs from "fs";
// get data from all user

const getUsers = async () => {
    const userData = await fetch('https://jsonplaceholder.typicode.com/users');
    const userJson = await userData.json();

    return userJson.map(user => {
        const {id, name, username, email} = user;
        return {id, name, username, email};
    });
}

const getPosts = async () => {
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts');
    return await posts.json()
}

const getComments = async () => {
    const comments = await fetch('https://jsonplaceholder.typicode.com/comments');
    return await comments.json();
}

const getPostsById = async (postId) => {
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts/'+ postId);
    return await posts.json();
}

const getCommentsByPostId = async (postId) => {
    const comments = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId + '/comments');
    const commentsData = await comments.json();

    return commentsData.map(comment => {
        const {id, postId, name, body} = comment;
        return {id, postId, name, body};
    })
}

(async () => {
    try {
        //2,3. get all users data
        const [usersData, postsData, commentsData] = await Promise.all([
            getUsers(),
            getPosts(),
            getComments()
        ]);

        const users = usersData.map(user => {
            const filterPosts =  postsData.filter(function (post) {
                return post.userId === user.id;
            })
            const posts = filterPosts.map(function (post) {
                const {userId, ...postRes} = post;
                return postRes;
            })

            let comments = [];
            posts.map(function (post) {
                const commentsByPost = commentsData.filter(function (comment) {
                    return comment.postId === post.id;
                });
                commentsByPost.map(function (comment) {
                    const {id, postId, name, body} = comment;
                    comments.push({id, postId, name, body});
                })
            })

            return {...user, posts, comments}
        })

        fs.writeFileSync('./allUserData.json', JSON.stringify(users))

        //4. filter user comment > 3
        const filterUser = users.filter(user => {
            return user.comments.length > 3;
        });

        fs.writeFileSync('./filterUser.json', JSON.stringify(filterUser))

        //5. reformat data
        const formatUsers = users.map(user => {
            const commentsCount = user.comments.length;
            const postsCount = user.posts.length;
            const {posts, comments, ...userThen} = user;
            return {...userThen, commentsCount, postsCount};
        })
        fs.writeFileSync('./reformatUsers.json', JSON.stringify(formatUsers))

        //6. Get user with most comments/posts
        const userWithMostComments = formatUsers.reduce(
            (prev, current) => {
                return prev.commentsCount > current.commentsCount ? prev : current
            }
        )
        fs.writeFileSync('./userWithMostComments.json', JSON.stringify(userWithMostComments))

        const userWithMostPosts = formatUsers.reduce(
            (prev, current) => {
                return prev.postsCount > current.postsCount ? prev : current
            }
        )
        fs.writeFileSync('./userWithMostPosts.json', JSON.stringify(userWithMostPosts))

        //7. sort by postsCount desc
        const sortUsers = formatUsers.sort(function (prev, current) {
            return current.postsCount - prev.postsCount;
        })
        fs.writeFileSync('./sortUsersByPostsCount.json', JSON.stringify(sortUsers))

        //8. get post + comment
        const [posts, comments] = await Promise.all([
            getPostsById(1),
            getCommentsByPostId(1)
        ])
        const postData = {...posts, comments};

        fs.writeFileSync('./post1AndComments.json', JSON.stringify(postData))
    } catch (e) {
        console.log('Error! ', e);
    }
})();