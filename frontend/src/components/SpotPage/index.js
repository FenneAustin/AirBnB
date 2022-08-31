import {useEffect} from 'react'
import {deleteSpot} from '../../store/listings'
import {useParams, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {loadReviews} from '../../store/reviews'

//TODO: how do I persist react store after a refresh? I get odd behavior if I refresh after going to a page

const SpotPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spot = useSelector(state => state.listings.find((spot) => String(spot.id) === spotId))
    const userId = useSelector(state => state.session.user.id);

    useEffect(()=> {
        dispatch(loadReviews(spotId))
    }, [dispatch, spot.id])

    let reviews = useSelector(state => state.reviews);
    reviews = reviews[0]


    const handleOnClick = (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spot.id))
        //TODO: how can I error handle this ^
        history.push('/');
    }

    return(
        <div>
            <img src={`${spot.previewImage}`} alt="" />
            <h3>{spot.description}</h3>

                { (reviews[0] !== null) &&
                (<div>

                    {reviews.map((review)=> {
                       return(

                       <div key={review.id}>
                            <h1>
                                {review.stars ? review.stars : null }
                            </h1>
                            {console.log(review)}
                             <h2>
                                {review.review ? review.review: null }
                            </h2>
                     </div>)
                    }
                    )}
                </div>)}




            { (userId === spot.ownerId) && (
                <div>
                    <button onClick={(e) => handleOnClick(e)}>Delete</button>
                    <button>edit</button>
                </div>
            )}
        </div>
    )
}


export default SpotPage;
