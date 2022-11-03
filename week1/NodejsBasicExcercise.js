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

const getPostsByUser = async (userId) => {
    const posts = await fetch('https://jsonplaceholder.typicode.com/users/' + userId + '/posts');
    const postsData = await posts.json();

    return postsData.map(post => {
        const {id, title, body} = post;
        return {id, title, body};
    })
}

const getCommentsByPost = async (postId) => {
    const comments = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId + '/comments');
    const commentsData = await comments.json();

    return commentsData.map(comment => {
        const {id, postId, name, body} = comment;
        return {id, postId, name, body};
    })
}

const getPostsById = async (postId) => {
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts/'+ postId);
    return await posts.json();
}

(async () => {
    try {
        //2,3. get all users data
        const userData = await getUsers();
        const allUsersData = await Promise.all(userData.map(async user => {
            const posts = await getPostsByUser(user.id);
            let comments = [];
            await Promise.all(posts.map(async post => {
                const commentsByPost = await getCommentsByPost(post.id);
                await Promise.all(commentsByPost.map(async comment => {
                    comments.push(comment);
                }));
            }));

            return {...user, posts, comments};
        }));
        fs.writeFileSync('./allUserData.json', JSON.stringify(allUsersData))

        //4. filter user comment > 3
        const filterUser = allUsersData.filter(user => {
            return user.comments.length > 3;
        });

        fs.writeFileSync('./filterUser.json', JSON.stringify(filterUser))

        //5. reformat data
        const usersData = allUsersData.map(user => {
            const commentsCount = user.comments.length;
            const postsCount = user.posts.length;
            return {...user, commentsCount, postsCount};
        })
        const usersFormatted = usersData.map(user => {
            const {id, name, username, email, commentsCount, postsCount} = user;
            return {id, name, username, email, commentsCount, postsCount};
        });
        fs.writeFileSync('./reformatUsers.json', JSON.stringify(usersFormatted))

        //6. Get user with most comments/posts
        const userWithMostComments = usersFormatted.reduce(
            (prev, current) => {
                return prev.commentsCount > current.commentsCount ? prev : current
            }
        )
        fs.writeFileSync('./userWithMostComments.json', JSON.stringify(userWithMostComments))

        const userWithMostPosts = usersFormatted.reduce(
            (prev, current) => {
                return prev.postsCount > current.postsCount ? prev : current
            }
        )
        fs.writeFileSync('./userWithMostPosts.json', JSON.stringify(userWithMostComments))

        //7. sort by postsCount desc
        const usersEx = await exUsers();
        const sortUsers = usersFormatted.sort(function (prev, current) {
            return current.postsCount - prev.postsCount;
        })
        fs.writeFileSync('./sortUsersByPostsCount.json', JSON.stringify(sortUsers))

        //8. get post + comment
        const post1 = await getPostsById(1);
        const comments = await getCommentsByPost(post1.id);
        const post1Data = {...post1, comments};

        fs.writeFileSync('./post1AndComments.json', JSON.stringify(post1Data))
    } catch (e) {
        console.log('Error! ', e);
    }
})();