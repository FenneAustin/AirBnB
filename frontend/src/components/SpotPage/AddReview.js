import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createReview } from "../../store/Reviews";
import "./CreateListing.css";

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
        <label>
            <input type="radio" name="star" checked></input>
            <img src={starOne ? "": ""} alt="" />
        </label>
        <input
          type="text"
          placeholder="City"
          required
          value={city}
          onChange={updateCity}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateReview;
