import {loadListings} from "../../store/listings";
import { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import "./ListingsView.css"
import {NavLink} from 'react-router-dom'
import Favorite from '../Favorite/index'


const ListingsView = () => {

    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(loadListings())
    },[dispatch])

    const listings = useSelector(state => state.listings)


  return (
    <div className="listings-container">

        {listings.map((listing, i) => {
          return (
            <NavLink
              key={i}
              to={`/spots/${listing.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="spot">
                <Favorite />
                <img
                  src={`${listing.previewImage}`}
                  alt=""
                  style={{}}
                  className="spot-img"
                />

                <div className="information">
                  <h4 className="location-info">
                    {listing.state}, {listing.country}
                  </h4>
                  <h5 className="listing-price">${listing.price} night</h5>
                </div>
              </div>
            </NavLink>
          );
        })}

    </div>
  );
};

export default ListingsView;
