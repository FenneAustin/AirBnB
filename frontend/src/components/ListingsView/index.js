import {loadListings} from "../../store/listings";
import { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import "./ListingsView.css"
import {NavLink} from 'react-router-dom'
import Favorite from '../Favorite/index'
import {useHistory} from 'react-router-dom'


const ListingsView = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=> {
        dispatch(loadListings())
    },[dispatch])


    const listingClick = (listingId) => {
        history.push(`/spots/${listingId}`)
    }

    const listings = useSelector(state => state.listings)


  return (
    <div className="listings-container">

        {listings.map((listing, i) => {
          return (
            <div key={i} className="listing-link">
              <div className="spot">
                <div className="spot-image-container">
                  <Favorite listing={listing} />
                  <img
                    src={`${listing.previewImage}`}
                    alt=""
                    style={{}}
                    className="spot-img"
                    onClick={() => listingClick(listing.id)}
                  />
                </div>

                <div
                  className="information"
                  onClick={() => listingClick(listing.id)}
                >
                  <h4 className="location-info">
                    {listing.state}, {listing.country}
                  </h4>
                  <h5 className="listing-price">${listing.price} night</h5>
                </div>
              </div>
            </div>
          );
        })}

    </div>
  );
};

export default ListingsView;
