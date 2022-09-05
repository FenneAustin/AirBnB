import { useEffect, useState } from "react";
import { deleteSpot, loadListings } from "../../store/listings";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadReviews } from "../../store/reviews";
import Reviews from "./Reviews";
import "./SpotPage.css";
import AddReviewModal from "./AddReviewModal";

//TODO: how do I persist react store after a refresh? I get odd behavior if I refresh after going to a page

const SpotPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) =>
    state.listings.find((spot) => String(spot.id) === spotId)
  );
  //const userId = useSelector((state) => state.session.user.id);
  const [editPage, setEditPage] = useState(false);
  const [hasReview, setHasReview] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  let reviews = useSelector((state) => state.reviews);




  const handleReviewUpdate = () => {
    setHasReview(true);
  };


  useEffect(() => {
    dispatch(loadReviews(spotId));
    dispatch(loadListings());
  }, [dispatch, spotId]);

  useEffect(() => {
    setHasReview(false);
    if (reviews[0] !== undefined) {
      reviews.forEach((review) => {
        if (review.userId === sessionUser.id) {
          handleReviewUpdate();
        }
      });
    }
  }, [sessionUser, reviews]);

  if (!sessionUser) return <Redirect to="/signup" />;



  const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(deleteSpot(spot.id));
    //TODO: how can I error handle this ^
    history.push("/");
  };

  const handleEditButton = (e) => {
    e.preventDefault();
    setEditPage(true);
  };

  return (
    <>
      {spot && (
        <div>
          {sessionUser.id === spot.ownerId && (
            <div>
              <button onClick={(e) => handleEditButton(e)}>edit</button>
            </div>
          )}
          <img src={`${spot.previewImage}`} alt="" className="preview-image" />
          <h3>${spot.price} night</h3>
          <h3>
            {" "}
            {spot.lat} {spot.lng}{" "}
          </h3>
          <h3>
            {spot.address}, {spot.city}, {spot.state}{" "}
          </h3>
          <h3>{spot.description}</h3>

          {reviews[0] !== undefined ? (
            <div>
              <Reviews reviews={reviews} userId={sessionUser.id} />
            </div>
          ) : null}
          {!hasReview && sessionUser ? (
            <AddReviewModal reviews={reviews} userId={sessionUser.id} />
          ) : null}

          {sessionUser.id === spot.ownerId && (
            <div>
              <button onClick={(e) => handleOnClick(e)}>Delete</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SpotPage;
