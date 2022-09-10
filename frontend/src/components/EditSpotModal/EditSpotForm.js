import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import {updateSpot } from "../../store/listings"

const EditSpotForm = ({ closeModal }) => {

  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) =>
    state.listings.find((spot) => String(spot.id) === spotId)
  );

  const sessionUser = useSelector((state) => state.session.user);

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

  const [addressErr, setAddressErr] = useState(false);
  const [cityErr, setCityErr] = useState(false);
  const [stateErr, setStateErr] = useState(false);
  const [countryErr, setCountryErr] = useState(false);
  const [latErr, setLatErr] = useState(false);
  const [lngErr, setLngErr] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [priceErr, setPriceErr] = useState(false);
  const [previewImageErr, setPreviewImageErr] = useState(false);

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


  // sets the useState to current values
  useEffect(() => {
    if (spot) {
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
    }
  }, []);

  //error checking useEffect
  useEffect(() => {
    const errors = [];
    setAddressErr(false);
    setCityErr(false);
    setStateErr(false);
    setCountryErr(false);
    setLatErr(false);
    setLngErr(false);
    setNameErr(false);
    setDescriptionErr(false);
    setPriceErr(false);
    setPreviewImageErr(false);

    if (address.length > 20) {
      setAddressErr(true);
      errors.push("address must be less than 20 characters long");
    }
    if (city.length > 20) {
      setCityErr(true);
      errors.push("city must be less than 20 characters long");
    }
    if (state.length > 20) {
      setStateErr(true);
      errors.push("state must be less than 20 characters long");
    }
    if (country.length > 40) {
      setCountryErr(true);
      errors.push("state must be less than 40 characters long");
    }
    if (isNaN(lat)) {
      setLatErr(true);
      errors.push("lat must be a number");
    }
    if (isNaN(lng)) {
      setLngErr(true);
      errors.push("lng must be a number");
    }
    if (name.length > 50) {
      setNameErr(true);
      errors.push("name must be less than 50 characters");
    }
    if (name.description > 250) {
      setDescriptionErr(true);
      errors.push("description must be less than 250 characters");
    }
    if (isNaN(price)) {
      setPriceErr(true);
      errors.push("price must be a number");
    }
    setValidationErrors(errors);
  }, [address, city, state, country, lat, lng, name, description, price]);

  if (!sessionUser) return <Redirect to="/signup" />;

  const handleSaveButton = (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (validationErrors.length) return alert("cannot submit");

    const updatedSpot = {
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
    };
    const updatedSpotDispatch = dispatch(updateSpot(updatedSpot, spot.id));\

    if(updatedSpotDispatch){
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
    }

    closeModal();
  };

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
    closeModal();
  };

  return(
  <form className="edit-spot-form">
    <input
      type="text"
      placeholder="Address"
      required
      value={address}
      onChange={updateAddress}
    />
    {hasSubmitted && addressErr && (
      <span className="error-text">Maximum address length is 20</span>
    )}
    <input
      type="text"
      placeholder="City"
      required
      value={city}
      onChange={updateCity}
    />
    {hasSubmitted && cityErr && (
      <span className="error-text">Maximum city length is 20</span>
    )}
    <input
      type="text"
      placeholder="State"
      value={state}
      onChange={updateState}
    />
    {hasSubmitted && stateErr && (
      <span className="error-text">Maximum State length is 20</span>
    )}
    <input
      type="text"
      placeholder="Country"
      value={country}
      onChange={updateCountry}
    />
    {hasSubmitted && countryErr && (
      <span className="error-text">Maximum Country length is 40</span>
    )}
    <input type="text" placeholder="lat" value={lat} onChange={updateLat} />
    {hasSubmitted && latErr && (
      <span className="error-text">Latitutde must be a number</span>
    )}
    <input type="text" placeholder="lng" value={lng} onChange={updateLng} />
    {hasSubmitted && lngErr && (
      <span className="error-text">Longitude must be a number</span>
    )}
    <input type="text" placeholder="name" value={name} onChange={updateName} />
    {hasSubmitted && nameErr && (
      <span className="error-text">Name must be less than 50 characters</span>
    )}
    <input
      type="text"
      placeholder="description"
      value={description}
      onChange={updateDescription}
    />
    {hasSubmitted && descriptionErr && (
      <span className="error-text">
        Description must less than 200 characters
      </span>
    )}
    <input
      type="text"
      placeholder="price"
      value={price}
      onChange={updatePrice}
    />
    {hasSubmitted && priceErr && (
      <span className="error-text">Price must be a number</span>
    )}
    <input
      type="text"
      placeholder="preview image"
      value={previewImage}
      onChange={updatePreviewImage}
    />
    {hasSubmitted && previewImageErr && (
      <span className="error-text">
        image link must not be more than 100 chars
      </span>
    )}

    <button className="Create-listing-btn" type="submit" onClick={(e)=>handleSaveButton(e)}>
      Update
    </button>
    <button
      className="Cancel-listing-btn"
      type="button"
      onClick={(e)=>handleCancelButton(e)}
    >
      Cancel
    </button>
  </form>
  )
};

export default EditSpotForm;
