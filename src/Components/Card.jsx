import React, { useContext } from "react";
import { PostContext } from "../Context/PostContext";
// import { PostContext } from "../Context/PostContext"; 

const Card = ({ object }) => {
  const postContext = useContext(PostContext);

  return (
    <div
      className="card shadow mb-3"
      style={{ maxWidth: "25rem" }}
      key={object.id}
    >
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-outline"
          onClick={() => postContext.removePost(object.id)}
        >
          <i className="fa-solid fa-xmark text-danger m-1 fs-4"></i>
        </button>
      </div>
      <div className="card-body">
        <h5 className="card-title">
          {object.id}. {object.title}
        </h5>
        <p className="card-text">{object.body}</p>
      </div>
      <div className="p-2">
        <img
          className="img-fluid w-100"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSccMa6zJqKZR_Lo61ICnwt3DXwgPBhzq_sAA&s"
          alt=""
        />
      </div>
    </div>
  );
};

export default Card;
