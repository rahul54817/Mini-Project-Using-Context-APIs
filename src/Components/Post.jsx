import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { PostContext } from "../Context/PostContext"; // Corrected import statement

const Post = () => {
  const [page, setPage] = useState(1);
  const [pagePosts, setPagePosts] = useState([]);

  const postContext = useContext(PostContext); // Corrected context usage
  console.log("data in Post Context", postContext);

  const goToPage = () => {
    let startingIndex = page * 6 - 6;
    let endingIndex = page * 6;
    let limitPosts = postContext.posts.slice(startingIndex, endingIndex);
    setPagePosts(limitPosts);
  };

  useEffect(() => {
    goToPage();
  }, [page, postContext.posts]);

  const goToPrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const goToNextPage = () => {
    if (page * 6 < postContext.posts.length) setPage(page + 1); // Corrected the length check
  };

  const getPosts = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      postContext.setPosts(response.data);
      console.log(postContext.posts);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div
        className="d-flex flex-column align-items-center p-4"
        style={{
          backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
        }}
      >
        <div className="d-flex flex-wrap justify-content-center">
          {pagePosts.map((post) => (
            <div className="p-2" style={{ width: "33%" }} key={post.id}>
              <Card object={post} />
            </div>
          ))}
        </div>

        <div className="col-12 pb-1">
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center mb-3 pagination-container">
              <li className="page-item">
                <button
                  className="page-link"
                  aria-label="Previous"
                  onClick={goToPrevPage}
                  disabled={page === 1}
                >
                  <span aria-hidden="true">« Previous</span>
                  <span className="sr-only"></span>
                </button>
              </li>
              <li
                className="page-item active page-link d-flex justify-content-center"
                style={{ width: "50px" }}
              >
                {page}
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  aria-label="Next"
                  onClick={goToNextPage}
                  disabled={page * 6 >= postContext.posts.length}
                >
                  <span aria-hidden="true">Next »</span>
                  <span className="sr-only">Next</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Post;
