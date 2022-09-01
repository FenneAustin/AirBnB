import {useEffect, useState} from 'react'
import {deleteSpot, loadListings} from '../../store/listings'
import {useParams, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {loadReviews} from '../../store/reviews'
import Reviews from './Reviews';
import './SpotPage.css'


//TODO: how do I persist react store after a refresh? I get odd behavior if I refresh after going to a page

const SpotPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spot = useSelector(state => state.listings.find((spot) => String(spot.id) === spotId))
    const userId = useSelector(state => state.session.user.id);
    const [editPage, setEditPage] = useState(false)

    useEffect(()=> {
        dispatch(loadReviews(spotId))
        dispatch(loadListings())
    }, [dispatch, spotId])



    let reviews = useSelector(state => state.reviews);

    if(reviews && (reviews[0] !== undefined)) {
        reviews = reviews[0]
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

            {reviews[0] !== null && (
              <div>
                <Reviews reviews={reviews} userId={userId} />
              </div>
            )}
          </div>
        )}
      </>
    );}


export default SpotPage;
