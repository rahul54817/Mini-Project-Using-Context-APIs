import { createContext, useState } from "react";

export const PostContext = createContext(null);

export const Provider = (props) => {
    const [posts, setPosts] = useState([]);

    const removePost = (id) => {
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
    };

    return (
        <PostContext.Provider value={{ posts, setPosts, removePost }}>
            {props.children}
        </PostContext.Provider>
    );
};
