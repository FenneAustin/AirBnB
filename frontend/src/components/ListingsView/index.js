import {loadListings} from "../../store/listings";
import { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import "./ListingsView.css"


const ListingsView = () => {

    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(loadListings())
    },[dispatch])


    const listings = useSelector(state => state.listings)


  return (
    <div className="listings-container">
      <ol>
        {listings.map((listing, i) => {
          return (
            <li key={i}>
              <div className="spot">
                <img
                  src={`${listing.previewImage}`}
                  style={{  }}
                  className="spot-img"
                />
                <div className="information">
                    <h4>{listing.state} {listing.country}</h4>
                    <h5></h5>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default ListingsView;
