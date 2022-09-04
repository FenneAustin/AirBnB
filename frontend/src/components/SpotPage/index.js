import {useEffect, useState} from 'react'
import {deleteSpot, loadListings} from '../../store/listings'
import {useParams, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {loadReviews} from '../../store/reviews'
import Reviews from './Reviews';
import './SpotPage.css'
import AddReviewModal from "./AddReviewModal";


//TODO: how do I persist react store after a refresh? I get odd behavior if I refresh after going to a page

const SpotPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spot = useSelector(state => state.listings.find((spot) => String(spot.id) === spotId))
    const userId = useSelector(state => state.session.user.id);
    const [editPage, setEditPage] = useState(false)
    const [hasReview, setHasReview] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    let reviews = useSelector((state) => state.reviews);
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const handleReviewUpdate = () => {
        setHasReview(true);
      };

    useEffect(() => {
      if(sessionUser.id === 'undefined'){
        history.push()
      }
    },[sessionUser])



    useEffect(()=> {
        dispatch(loadReviews(spotId))
        dispatch(loadListings())
    }, [dispatch, spotId])

      useEffect(() => {
        setHasReview(false);
        if (reviews[0] !== undefined) {
          reviews.forEach((review) => {
            if (review.userId === userId) {
              handleReviewUpdate();
            }

          });
        }
      }, [userId, reviews]);





    if(reviews && (reviews[0] !== undefined)) {
    //   reviews = reviews[0]
    }

    const handleOnClick = (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spot.id))
        //TODO: how can I error handle this ^
        history.push('/');
    }

    const handleEditButton = (e) =>{
      e.preventDefault();
      setEditPage(true);
    }


    return (
      <>
        {spot && (
          <div>
            {userId === spot.ownerId && (
              <div>
                <button onClick={(e) => handleEditButton(e)}>edit</button>
                <button onClick={(e) => handleOnClick(e)}>Delete</button>
              </div>
            )}
            <img
              src={`${spot.previewImage}`}
              alt=""
              className="preview-image"
            />
            <h3>{spot.description}</h3>
            <h3>{spot.address}</h3>
            <h3>{spot.city}</h3>
            <h3>{spot.state}</h3>
            <h3>{spot.lat}</h3>
            <h3>{spot.lng}</h3>

            {reviews[0] !== undefined ? (
              <div>
                <Reviews reviews={reviews} userId={userId} />
              </div>
            ) : null}

            {!hasReview && sessionUser ? (
              <AddReviewModal reviews={reviews} userId={userId} />
            ) : null}
          </div>
        )}
      </>
    );}


export default SpotPage;
