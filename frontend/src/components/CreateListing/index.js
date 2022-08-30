import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import { useDispatch} from 'react-redux'
import {createSpot} from '../../store/listings'


const CreateListing = () => {

    const dispatch = useDispatch();
    const history = useHistory();

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
    const [validationErrors, setValidationErrors] = useState([])
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


    useEffect(()=> {
      const errors = [];
      if(address.length > 20){
        errors.push('address must be less than 20 characters long')
      }
      if(city.length > 20){
        errors.push("city must be less than 20 characters long");
      }
      if(state.length > 20){
        errors.push("state must be less than 20 characters long")
      }
      if(country.length > 40){
        errors.push('state must be less than 40 characters long')
      }
      if(isNaN(lat)){
        errors.push('lat must be a number')
      }
      if(isNaN(lng)){
        errors.push('lng must be a number')
      }
      if(name.length > 20){
        errors.push('name must be less than 20 characters')
      }
      if(name.description > 100){
        errors.push('description must be less than 100 characters')
      }
      if(isNaN(price)){
        errors.push('price must be a number')
      }
      setValidationErrors(errors);
    }, [address, city, state, country, lat, lng, name, description, price])

    const handleSubmit = async (e) => {
      e.preventDefault();

      setHasSubmitted(true);
      if(validationErrors.length) return alert('cannot submit')

      const payload = {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        previewimage
      };

      let createdSpot = dispatch(createSpot(payload));

      setAddress('');
      setCity('');
      setState('');
      setCountry('');
      setLat('');
      setLng('');
      setName('');
      setDescription('');
      setPrice('');
      setPreviewImage('');

      if (createdSpot) {
        history.push(`/spots/${createdSpot.id}`);
      }
    };

     const handleCancelClick = (e) => {
       e.preventDefault();
      setAddress('');
      setCity('');
      setState('');
      setCountry('');
      setLat('');
      setLng('');
      setName('');
      setDescription('');
      setPrice('');
      setPreviewImage('');
       history.push('/')
     };


    return (
      <div className="container">
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
        <form className="create-spot-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Address"
            required
            value={address}
            onChange={updateAddress}
          />
          <input
            type="text"
            placeholder="City"
            required
            value={city}
            onChange={updateCity}
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={updateState}
          />
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={updateCountry}
          />
          <input
            type="text"
            placeholder="lat"
            value={lat}
            onChange={updateLat}
          />
          <input
            type="text"
            placeholder="lng"
            value={lng}
            onChange={updateLng}
          />
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={updateName}
          />
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={updateDescription}
          />
          <input
            type="text"
            placeholder="price"
            value={price}
            onChange={updatePrice}
          />
          <input
            type="text"
            placeholder="preview image"
            value={previewimage}
            onChange={updatePreviewImage}
          />
          <button type="submit">Create</button>
          <button type="button" onClick={handleCancelClick}>
            Cancel
          </button>
        </form>
      </div>
    );
}


export default CreateListing;
