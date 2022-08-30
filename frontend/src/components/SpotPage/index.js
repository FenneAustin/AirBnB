import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';


const SpotPage = () => {

    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spot = useSelector(state => state.listings[spotId])

    return(
        <div>
            <img src={spot.previewImage} />
        </div>
    )
}


export default SpotPage;
