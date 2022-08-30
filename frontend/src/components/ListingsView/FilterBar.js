
import "./FilterBar.css"


const FilterBar = () => {
    return (
      <div className="FilterBar">
        <ul>
          <li className="lake">
            <button>
              <i className="fa-solid fa-water"></i>
              <h4>Lake</h4>
            </button>
          </li>
          <li className="Skiing">
            <button>
              <i className="fa-solid fa-person-skiing"></i>
              <h4>Skiing</h4>
            </button>
          </li>
          <li className="Boats">
            <button>
              <i className="fa-solid fa-sailboat"></i>
              <h4>Boat</h4>
            </button>
          </li>
          <li className="Castle">
            <button>
              <i className="fa-brands fa-fort-awesome"></i>
              <h4>Castle</h4>
            </button>
          </li>
          <li className="Pool">
            <button>
              <i className="fa-solid fa-person-swimming"></i>
              <h4>Pool</h4>
            </button>
          </li>
          <li className="National Parks">
            <button>
              <i className="fa-solid fa-mountain-sun"></i>
              <h4>National Park</h4>
            </button>
          </li>
        </ul>
        <button>Filters</button>
      </div>
    );
}


export default FilterBar
