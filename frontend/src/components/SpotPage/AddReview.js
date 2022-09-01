import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createReview } from "../../store/reviews";


const AddReview = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [stars, setStars] = useState("");
  const [review, setReview] = useState("");
  const [starOne, setStarOne] = useState(false)
  const [starTwo, setStarTwo] = useState(false);
  const [starThree, setStarThree] = useState(false);
  const [starFour, setStarFour] = useState(false);
  const [starFive, setStarFive] = useState(false);
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
      stars,
      review
    };

    let review = dispatch(createReview(payload));

    setStars("");
    setReview("");

  };

  const handleStarClick = (e) => {



  }

  const handleCancelClick = (e) => {

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
              onClick={(e) => {
                handleStarClick(e);
              }}
            />
            {starOne ? (
              <i class="fa-solid fa-star"></i>
            ) : (
              <i class="fa-solid fa-star"></i>
            )}
          </label>
        </div>
        <div className="star-two">
          <label>
            <input
              type="radio"
              name="star2"
              onClick={(e) => {
                handleStarClick(e);
              }}
            />
            {starTwo ? (
              <i class="fa-solid fa-star"></i>
            ) : (
              <i class="fa-solid fa-star"></i>
            )}
          </label>
        </div>
        <div className="star-three">
          <label>
            <input type="radio" name="star3" onClick={(e) => { handleStarClick(e); }} />
            {starThree ? (
              <i class="fa-solid fa-star"></i>
            ) : (
              <i class="fa-solid fa-star"></i>
            )}
          </label>
        </div>
        <div className="star-four">
          <label>
            <input type="radio" name="star4" onClick={(e) => { handleStarClick(e)}} />
            {starFour ? (
              <i class="fa-solid fa-star"></i>
            ) : (
              <i class="fa-solid fa-star"></i>
            )}
          </label>
        </div>
        <div className="star-five">
          <label>
            <input type="radio" name="star5" onClick={(e) => {handleStarClick(e)}} />
            {starFive ? (
              <i class="fa-solid fa-star"></i>
            ) : (
              <i class="fa-solid fa-star"></i>
            )}
          </label>
        </div>
        <div className="review-container">
          <label htmlFor="Review">Review</label>
          <textarea
            id="Review"
            name="Review"
            onChange={(e) => setReview(e.target.value)}
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
