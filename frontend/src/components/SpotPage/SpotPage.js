import { useEffect, useState } from "react";
import { deleteSpot, loadListings } from "../../store/listings";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadReviews } from "../../store/reviews";
import Reviews from "./Reviews";
import "./SpotPage.css";
import AddReviewModal from "./AddReviewModal";
import {updateSpot} from '../../store/listings'

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


   const [address, setAddress] = useState("");
   const [city, setCity] = useState("");
   const [state, setState] = useState("");
   const [country, setCountry] = useState("");
   const [lat, setLat] = useState("");
   const [lng, setLng] = useState("");
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [previewimage, setPreviewImage] = useState("");
   const [validationErrors, setValidationErrors] = useState([]);
   const [hasSubmitted, setHasSubmitted] = useState(false);

       const updateAddress = (e) => setAddress(e.target.value);
       const updateCity = (e) => setCity(e.target.value);
       const updateState = (e) => setState(e.target.value);
       const updateCountry = (e) => setCountry(e.target.value);
       const updateLat = (e) => setLat(e.target.value);
       const updateLng = (e) => setLng(e.target.value);
       const updateName = (e) => setName(e.target.value);
       const updateDescription = (e) => setDescription(e.target.value);
       const updatePrice = (e) => setPrice(e.target.value);
       const updatePreviewImage = (e) => setPreviewImage(e.target.value);

      useEffect(() => {
        const errors = [];
        if (address.length > 20) {
          errors.push("address must be less than 20 characters long");
        }
        if (city.length > 20) {
          errors.push("city must be less than 20 characters long");
        }
        if (state.length > 20) {
          errors.push("state must be less than 20 characters long");
        }
        if (country.length > 40) {
          errors.push("state must be less than 40 characters long");
        }
        if (isNaN(lat)) {
          errors.push("lat must be a number");
        }
        if (isNaN(lng)) {
          errors.push("lng must be a number");
        }
        if (name.length > 20) {
          errors.push("name must be less than 20 characters");
        }
        if (name.description > 100) {
          errors.push("description must be less than 100 characters");
        }
        if (isNaN(price)) {
          errors.push("price must be a number");
        }
        setValidationErrors(errors);
      }, [address, city, state, country, lat, lng, name, description, price]);


  useEffect(() => {
    if(spot) {
      setAddress(spot.address)
      setCity(spot.city)
      setState(spot.state)
      setCountry(spot.country)
      setLat(spot.lat)
      setLng(spot.lng)
      setName(spot.name)
      setDescription(spot.description)
      setPrice(spot.price)
      setPreviewImage(spot.previewImage);
    }
  }, [editPage])

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


      useEffect(() => {
        const errors = [];
        if (address.length > 20) {
          errors.push("address must be less than 20 characters long");
        }
        if (city.length > 20) {
          errors.push("city must be less than 20 characters long");
        }
        if (state.length > 20) {
          errors.push("state must be less than 20 characters long");
        }
        if (country.length > 40) {
          errors.push("state must be less than 40 characters long");
        }
        if (isNaN(lat)) {
          errors.push("lat must be a number");
        }
        if (isNaN(lng)) {
          errors.push("lng must be a number");
        }
        if (name.length > 20) {
          errors.push("name must be less than 20 characters");
        }
        if (name.description > 100) {
          errors.push("description must be less than 100 characters");
        }
        if (isNaN(price)) {
          errors.push("price must be a number");
        }
        setValidationErrors(errors);
      }, [address, city, state, country, lat, lng, name, description, price]);

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

  const handleSaveButton = (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if(validationErrors.length) return alert('cannot submit')


    const updatedSpot ={
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewimage,
    }
    dispatch(updateSpot(updatedSpot, spot.id))
    setEditPage(false);
  }

  const handleCancelButton = (e) => {
    e.preventDefault();
      setAddress(spot.address);
      setCity(spot.city);
      setState(spot.state);
      setCountry(spot.country);
      setLat(spot.lat);
      setLng(spot.lng);
      setName(spot.name);
      setDescription(spot.description);
      setPrice(spot.price);
      setPreviewImage(spot.previewImage);
      setEditPage(false);
  }



  return (
    <>
      {spot && (
        <div>
          {sessionUser.id === spot.ownerId && editPage === false && (
            <div>
              <button onClick={(e) => handleEditButton(e)}>edit</button>
            </div>
          )}
          <img src={`${spot.previewImage}`} alt="" className="preview-image" />

          {hasSubmitted && validationErrors.length > 0 && (
            <div>
              The following errors were found:
              <ul>
                {validationErrors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {editPage ? (
            <input
              className="price"
              type="text"
              placeholder="price"
              value={price}
              onChange={updatePrice}
            />
          ) : (
            <h3 className="price">${spot.price} night</h3>
          )}

          {editPage ? (
            <>
              <input
                className="lat"
                type="text"
                placeholder="lat"
                value={lat}
                onChange={updateLat}
              />
              <input
                className="lng"
                type="text"
                placeholder="lng"
                value={lng}
                onChange={updateLng}
              />
            </>
          ) : (
            <h3 className="lat-lng">
              {" "}
              {spot.lat} {spot.lng}{" "}
            </h3>
          )}

          {editPage ? (
            <>
              <input
                className="address"
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={updateAddress}
              />
              <input
                className="city"
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={updateCity}
              />
              <input
                className="state"
                type="text"
                placeholder="State"
                value={state}
                onChange={updateState}
              />
              <input
                className="country"
                type="text"
                placeholder="Country"
                value={country}
                onChange={updateCountry}
              />
            </>
          ) : (
            <h3 className="address-line">
              {spot.address}, {spot.city}, {spot.state} , {spot.country}
            </h3>
          )}
          {editPage ? (
            <input
              className="description"
              type="text"
              placeholder="description"
              value={description}
              onChange={updateDescription}
            />
          ) : (
            <h3>{spot.description}</h3>
          )}

          {editPage ? (
            <>
              <button onClick={(e) => handleCancelButton(e)}> cancel </button>
              <button onClick={(e) => handleSaveButton(e)}> save </button>
            </>
          ) : null}

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
              <button className="delete-btn" onClick={(e) => handleOnClick(e)}>
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SpotPage;
