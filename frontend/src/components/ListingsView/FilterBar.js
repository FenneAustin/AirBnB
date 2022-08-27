
import "./FilterBar.css"


const FilterBar = () => {
    return (
      <div className="FilterBar">
        <ul>
          <li className="lake">
            <button>
              <i class="fa-solid fa-water"></i>
              <text>Lake</text>
            </button>
          </li>
          <li className="Skiing">
            <button>
              <i class="fa-solid fa-person-skiing"></i>
              <text>Skiing</text>
            </button>
          </li>
          <li className="Boats">
            <button>
              <i class="fa-solid fa-sailboat"></i>
              <text>Boat</text>
            </button>
          </li>
          <li className="Castle">
            <button>
              <i class="fa-brands fa-fort-awesome"></i>
              <text>Castle</text>
            </button>
          </li>
          <li className="Pool">
            <button>
              <i class="fa-solid fa-person-swimming"></i>
              <text>Pool</text>
            </button>
          </li>
          <li className="National Parks">
            <button>
              <i class="fa-solid fa-mountain-sun"></i>
              <text>National Park</text>
            </button>
          </li>
        </ul>
        <button>Filters</button>
      </div>
    );
}


export default FilterBar
