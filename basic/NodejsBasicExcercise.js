import fetch from 'node-fetch';
import * as fs from "fs";
// get data from all user

async function fetchApi (path){
    const data = await fetch('https://jsonplaceholder.typicode.com/' + path);
    return data.json();
}

const getUsers = async () => {
    const userJson = await fetchApi('users');

    return userJson.map(user => {
        const {id, name, username, email} = user;
        return {id, name, username, email};
    });
}

const getPosts = async () => {
    return await fetchApi('posts');
}

const getComments = async () => {
    return await fetchApi('comments');
}

const getPostsById = async (postId) => {
    return await fetchApi('posts/'+ postId);
}

const getCommentsByPostId = async (postId) => {
    const comments = await fetchApi('posts/'+ postId + '/comments');

    return comments.map(comment => {
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

            const comments = commentsData.filter(function(comment) {
                return comment.email === user.email;
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