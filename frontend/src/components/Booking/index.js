import React from 'react'
import Calendar from './Calendar'

const Booking = ({listing}) => {

    return (
        <div className="booking-container">
            <div className="spot-info-container">
                <div className="spot-price"> </div>
                <div className="spot-rating"> </div>
                <div className="spot-reviews"> </div>
                <div className="booking-date-picker-container">
                <Calendar />
                </div>
                <button>Reserve</button>
                <div>You won't be charged yet</div>
                <div className="booking-cost-nightly"></div>
                <div classNAme="bookinig-service-cost"></div>
                <div className="booking-total-cost"></div>
            </div>

        </div>
    )
}


export default Booking
