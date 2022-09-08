
import "./FilterBar.css"


const FilterBar = () => {
    return (
      <div className="FilterBar">
        <ul>
          <li className="lake">
            <button className="lake-btn">
              <i className="fa-solid fa-water"></i>
              <span>Lake</span>
            </button>
          </li>
          <li className="Skiing">
            <button className="skiing-btn">
              <i className="fa-solid fa-person-skiing"></i>
              <span>Skiing</span>
            </button>
          </li>
          <li className="Boats">
            <button className="boat-btn">
              <i className="fa-solid fa-sailboat"></i>
              <span>Boat</span>
            </button>
          </li>
          <li className="Castle">
            <button className="castle-btn">
              <i className="fa-brands fa-fort-awesome"></i>
              <span>Castle</span>
            </button>
          </li>
          <li className="Pool">
            <button className="pool-btn">
              <i className="fa-solid fa-person-swimming"></i>
              <span>Pool</span>
            </button>
          </li>
          <li className="National Parks">
            <button className="nationalpark-btn">
              <i className="fa-solid fa-mountain-sun"></i>
              <span>National Park</span>
            </button>
          </li>
          <li className="filter">
            <button className="filter-btn">
              <i class="fa-solid fa-filter"></i>
              <span>Filters</span>
            </button>
          </li>
        </ul>
      </div>
    );
}


export default FilterBar
