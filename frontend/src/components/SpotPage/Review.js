import {useState} from 'react'
import './Review.css'

const Review = ({review, userId}) => {
      const handleEdit = (e) => {
        e.preventDefault();
        setEditing(true);
      };


      const handleSave = (e) => {
        e.preventDefault();
        
        setEditing(false);
      }
    const [editing, setEditing] = useState(false);
    const [singleReview, setSingleReview] = useState(review.review);


    const updateReview = (e) => setSingleReview(e.target.value);

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
        {editing ? (
          <form>
            <div className="review-container">
              <label htmlFor="Review">Review</label>
              <input
                id="Review"
                name="Review"
                value={singleReview}
                onChange={(e) => updateReview(e)}
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
