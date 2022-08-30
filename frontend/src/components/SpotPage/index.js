//import {useState, useEffect} from 'react'
import {deleteSpot} from '../../store/listings'
import {useParams, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

//TODO: how do I persist react store after a refresh? I get odd behavior if I refresh after going to a page

const SpotPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spot = useSelector(state => state.listings.find((spot) => String(spot.id) === spotId))
    const userId = useSelector(state => state.session.user.id);


    const handleOnClick = (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spot.id))
        //TODO: how can I error handle this ^
        history.push('/');
    }

    return(
        <div>
            {console.log(spot.previewImage)}
            <img src={`${spot.previewImage}`} alt="" />
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
