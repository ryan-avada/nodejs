import './App.css';
import React from "react";
import useFetchApi from "../../hooks/useFetchApi";

function App() {
    const {data: posts, loading, fetched} = useFetchApi({url: 'https://jsonplaceholder.typicode.com/posts'});

    return (
        <div>
            <ul>
                {loading ? (
                    <div>
                        Loading users...
                    </div>
                ) : (
                    <React.Fragment>
                        {posts.map(post => {
                            return (
                                <li>
                                    {post.title}
                                </li>
                            )
                        })}
                    </React.Fragment>
                )}
                {fetched && (<div>
                    Done fetching
                </div>)}
            </ul>
        </div>
    )
}

export default App;
