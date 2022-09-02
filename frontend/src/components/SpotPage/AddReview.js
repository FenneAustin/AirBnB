import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch} from "react-redux";
import { createReview } from "../../store/reviews";


const AddReview = ({onClose}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();

  const [stars, setStars] = useState("");
  const [review, setReview] = useState("");
  const [starValue, setStarValue] = useState(1);
  const [validationErrors, setValidationErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const updateStars = (e) => setStars(e.target.value);
  const updateReview = (e) => setReview(e.target.value);



  useEffect(() => {
    const errors = [];
    if (stars > 5 || stars < 0) {
      errors.push("stars must be between 0 and 5");
    }
    if (review.length > 500) {
      errors.push("Review can be at most 500 characters long");
    }
    setValidationErrors(errors);
  }, [stars, review]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return alert("cannot submit");

    const payload = {
      review,
      stars: starValue

    };

    let newReview = dispatch(createReview(payload, spotId));

    setStarValue(1);
    setReview("");
    onClose();
  };

  const handleStarClick = (e) => {
    e.preventDefault()
    setStarValue(e.target.value)

  }

  const handleCancelClick = (e) => {
     setStarValue(1);
     setReview("");
  };

  return (
    <div className="container">
      {hasSubmitted && validationErrors.length > 0 && (
        <div>
          The following errors were found:
          <ul>
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form className="create-review-form" onSubmit={handleSubmit}>
        <div className="star-one">
          <label>
            <input
              type="radio"
              name="star1"
              value={1}
              onClick={(e) => {
                handleStarClick(e);
              }}
            />
            {starValue >= 1 ? (
              <i className="fa-solid fa-star"></i>
            ) : (
              <i className="fa-regular fa-star"></i>
            )}
          </label>
        </div>
        <div className="star-two">
          <label>
            <input
              type="radio"
              name="star2"
              value={2}
              onClick={(e) => {
                handleStarClick(e);
              }}
            />
            {starValue >= 2 ? (
              <i className="fa-solid fa-star"></i>
            ) : (
              <i className="fa-regular fa-star"></i>
            )}
          </label>
        </div>
        <div className="star-three">
          <label>
            <input
              type="radio"
              name="star3"
              value={3}
              onClick={(e) => {
                handleStarClick(e);
              }}
            />
            {starValue >= 3 ? (
              <i className="fa-solid fa-star"></i>
            ) : (
              <i className="fa-regular fa-star"></i>
            )}
          </label>
        </div>
        <div className="star-four">
          <label>
            <input
              type="radio"
              name="star4"
              value={4}
              onClick={(e) => {
                handleStarClick(e);
              }}
            />
            {starValue >= 4 ? (
              <i className="fa-solid fa-star"></i>
            ) : (
              <i className="fa-regular fa-star"></i>
            )}
          </label>
        </div>
        <div className="star-five">
          <label>
            <input
              type="radio"
              name="star5"
              value={5}
              onClick={(e) => {
                handleStarClick(e);
              }}
            />
            {starValue >= 5 ? (
              <i className="fa-solid fa-star"></i>
            ) : (
              <i className="fa-regular fa-star"></i>
            )}
          </label>
        </div>
        <div className="review-container">
          <label htmlFor="Review">Review</label>
          <textarea
            id="Review"
            name="Review"
            onChange={(e) => updateReview(e)}
            value={review}
          />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddReview;