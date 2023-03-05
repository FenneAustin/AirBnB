import "./PlacesPage.css";
import React from "react";
import {Link, useParams} from "react-router-dom"
import { BsPlusLg, BsUpload } from "react-icons/bs";
import { AiOutlineWifi, AiOutlineCar } from "react-icons/ai";
import { IoTvOutline } from "react-icons/io5";
import { GiHollowCat } from "react-icons/gi";
import { BsDoorClosed } from "react-icons/bs";


const PlacesPage = () => {

    const {action} = useParams();
    console.log(action)

    return (
      <div className="places-page-container">
        <div className="places-page">
          <Link className="add-new-place" to={"/account/accommodations/new"}>
            <BsPlusLg className="plus-new-places" />
            Add a new place
          </Link>
        </div>
        <div>my places</div>
        {action === "new" && (
          <div className="place-creation-container">
            <form className="place-creation-form">
              <h2 className="form-titles">Title</h2>
              <p className="helper-text">
                Title for your place. Should be short and catchy.
              </p>
              <input
                className="input-place-creation"
                type="text"
                placeholder="title, for example: My lovely apt"
              />
              <h2 className="form-titles">Address</h2>
              <p className="helper-text">Address to this place.</p>
              <input
                type="text"
                className="input-place-creation"
                placeholder="address"
              />
              <h2 className="form-titles">Photos</h2>
              <p className="helper-text">more = better</p>
              <div className="url-photo-upload">
                <input
                  className="input-place-creation"
                  type="text"
                  placeholder={"Add using a link .....jpg"}
                />
                <button className="add-url-photo-btn">Add photo</button>
              </div>
              <div className="all-photos-container">
                <button className="add-photos-btn">
                  <BsUpload className="add-photos-btn-plus" />
                  <div>Upload</div>
                </button>
              </div>
              <h2 className="form-titles">Description</h2>
              <p className="helper-text">description of the place.</p>
              <textarea
                type="text"
                className="input-place-creation"
                placeholder="address"
              />
              <h2 className="form-titles">Perks</h2>
              <p className="helper-text">select all the perks of your place.</p>
              <div>
                <label>
                  <input type="checkbox" />
                  <AiOutlineWifi />
                  <span>Wifi</span>
                </label>
                <label>
                  <input type="checkbox" />
                  <AiOutlineCar />
                  <span>Free parking spot</span>
                </label>
                <label>
                  <input type="checkbox" />
                  <IoTvOutline />
                  <span>TV</span>
                </label>
                <label>
                  <input type="checkbox" />
                  <GiHollowCat />
                  <span>Pets</span>
                </label>
                <label>
                  <input type="checkbox" />
                  <BsDoorClosed />
                  <span>Private entrance</span>
                </label>
              </div>
            </form>
          </div>
        )}
      </div>
    );
}


export default PlacesPage;
