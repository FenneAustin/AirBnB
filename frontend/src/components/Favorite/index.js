import "./index.css";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";


const Favorite = () => {
    return (
      <div className="favorite-container">
        <IoIosHeart className="favorite-icon" fill="rgba(0,0,0,0.4)" color="white"/>
        <IoIosHeartEmpty className="favorite-icon" color="white"/>
      </div>
    );
    }

export default Favorite;
