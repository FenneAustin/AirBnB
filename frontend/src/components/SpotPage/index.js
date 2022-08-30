import {useState, useEffect} from 'react'
import {deleteSpot} from '../../store/listings'
import {useParams, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';


const SpotPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spot = useSelector(state => state.listings[spotId])
    const userId = useSelector(state => state.session.user.id);

    useEffect(()=> {

    }, [])

    const handleOnClick = (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spot.id))
        //TODO: how can I error handle this ^
        history.push('/');
    }

    return(
        <div>
            {console.log(spot.previewImage)}
            <img src={`${spot.previewImage}`} />
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
