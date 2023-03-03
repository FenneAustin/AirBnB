import "./PlacesPage.css";
import React, { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom"
import { AiOutlinePlus } from "react-icons/ai";


const PlacesPage = () => {

    const {action} = useParams();


    return (
      <div className="places-page-container">
        <div className="places-page">
          <Link className="add-new-place" to={"/account/places/new"}>
            <AiOutlinePlus className="plus-new-places" />
            Add a new place
          </Link>
        </div>
        <div>my places</div>
      </div>
    );
}


export default PlacesPage;
