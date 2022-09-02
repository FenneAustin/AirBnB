import {useEffect, useState} from 'react'
import './Review.css'
import {updateReview, deleteReview} from '../../store/reviews';
import {useDispatch,useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'

const Review = ({review, userId}) => {

    const dispatch = useDispatch()
    const { spotId } = useParams();
    const [editing, setEditing] = useState(false);
    const [singleReview, setSingleReview] = useState(review.review);
    const [stars, setStars] = useState(1);


      const handleEdit = (e) => {
        e.preventDefault();
        setEditing(true);
      };

      const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteReview(review.id));
        setEditing(false)
      };

      const handleSave = (e) => {
        e.preventDefault();
        const newReview = {
          'review': singleReview,
          'stars': stars
        }

        dispatch(updateReview(review.id, newReview));
        setEditing(false);
      };

    const updateReviews = (e) => setSingleReview(e.target.value);

    return (
      <div key={review.id} className="review-container">
        <h6 className="name">
          {review.User.firstName ? review.User.firstName : null}{" "}
          {review.User.lastName ? review.User.lastName : null}
        </h6>
        <h6 className="stars">{review.stars ? review.stars : null} stars</h6>
        <h6 className="review-date">
          {review.updatedAt ? review.updatedAt : null}
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
          <form>
            <div className="review-container">
              <label htmlFor="Review">Review</label>
              <input
                id="Review"
                name="Review"
                value={singleReview}
                onChange={(e) => updateReviews(e)}
              />
            </div>
          </form>
        ) : (
          <h2 className="review">{review.review ? review.review : null}</h2>
        )}
      </div>
    );
}


export default Review;
