import { useState } from "react";
import "./Review.css";
import { updateReview, deleteReview } from "../../store/reviews";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Review = ({ review, userId }) => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const [editing, setEditing] = useState(false);
  const [singleReview, setSingleReview] = useState(review.review);
  const [stars, setStars] = useState(review.stars);

  const handleEdit = (e) => {
    e.preventDefault();
    setEditing(true);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReview(review.id));
    setEditing(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newReview = {
      review: singleReview,
      stars: stars,
    };
    dispatch(updateReview(review.id, newReview, spotId));
    setEditing(false);
  };

  const handleStarClick = (e) => {
    e.preventDefault();
    setStars(e.target.value);
  };

  const updateReviews = (e) => setSingleReview(e.target.value);

  return (
    <div className="review">
      <h2 className="review-title">Review</h2>
      {}
      <div key={review.id} className="review-container">
        <div className="review-image-container">
          <img
            className="default-profile-review"
            src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
            alt=""
          />
        </div>
        <div className="review-content">
          <div className="review-author">
            {review.User.firstName ? review.User.firstName : null}{" "}
            {review.User.lastName ? review.User.lastName : null}
            <div>{review.updatedAt ? review.updatedAt.slice(0, 10) : null}</div>
          </div>
          <div className="review-text">
            {review.review ? review.review : null}
          </div>
          { review.userId === userId ? (
          <div className="review-owner">
            <div className="edit-review">
              <button>Edit</button>
            </div>
            <div className="delete-review">
              <button>Delete</button>
            </div>
          </div>) : null
        }
        </div>
      </div>
      {/* <h6 className="name header">
        {review.User.firstName ? review.User.firstName : null}{" "}
        {review.User.lastName ? review.User.lastName : null}
      </h6> */}
      {/*
      {editing === true ? (
        <>
          <div className="star-one header">
            <label>
              <input
                type="radio"
                name="star1"
                value={1}
                onClick={(e) => {
                  handleStarClick(e);
                }}
              />
              {stars >= 1 ? (
                <i className="fa-solid fa-star"></i>
              ) : (
                <i className="fa-regular fa-star"></i>
              )}
            </label>
          </div>
          <div className="star-two header">
            <label>
              <input
                type="radio"
                name="star2"
                value={2}
                onClick={(e) => {
                  handleStarClick(e);
                }}
              />
              {stars >= 2 ? (
                <i className="fa-solid fa-star"></i>
              ) : (
                <i className="fa-regular fa-star"></i>
              )}
            </label>
          </div>
          <div className="star-three header">
            <label>
              <input
                type="radio"
                name="star3"
                value={3}
                onClick={(e) => {
                  handleStarClick(e);
                }}
              />
              {stars >= 3 ? (
                <i className="fa-solid fa-star"></i>
              ) : (
                <i className="fa-regular fa-star"></i>
              )}
            </label>
          </div>
          <div className="star-four header">
            <label>
              <input
                type="radio"
                name="star4"
                value={4}
                onClick={(e) => {
                  handleStarClick(e);
                }}
              />
              {stars >= 4 ? (
                <i className="fa-solid fa-star"></i>
              ) : (
                <i className="fa-regular fa-star"></i>
              )}
            </label>
          </div>
          <div className="star-five header">
            <label>
              <input
                type="radio"
                name="star5"
                value={5}
                onClick={(e) => {
                  handleStarClick(e);
                }}
              />
              {stars >= 5 ? (
                <i className="fa-solid fa-star"></i>
              ) : (
                <i className="fa-regular fa-star"></i>
              )}
            </label>
          </div>
        </>
      ) : (
        <h6 className="stars header">
          {review.stars ? review.stars : null} stars
        </h6>
      )}

      <h6 className="review-date header">
        {review.updatedAt ? review.updatedAt.slice(0, 10) : null}
      </h6>
      {review.userId === userId && editing === false ? (
        <button
          className="edit-button"
          onClick={(e) => {
            handleEdit(e);
          }}
        >
          edit
        </button>
      ) : null}
      {review.userId === userId && editing === true ? (
        <button
          className="save-button"
          onClick={(e) => {
            handleSave(e);
          }}
        >
          save
        </button>
      ) : null}
      {review.userId === userId && editing === true ? (
        <button
          className="delete-button"
          onClick={(e) => {
            handleDelete(e);
          }}
        >
          delete
        </button>
      ) : null}
      {editing ? (
        <form className="review">
          <input
            type="textarea"
            id="Review"
            name="Review"
            value={singleReview}
            onChange={(e) => updateReviews(e)}
          />
        </form>
      ) : (
        <span className="review">{review.review ? review.review : null}</span>
      )} */}
    </div>
  );
};

export default Review;
