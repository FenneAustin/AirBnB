import {useState} from 'react';


const CreateListing = () => {

    const [apartment, setApartment] = useState(false);
    const [house, setHouse] = useState(false);
    const [secondaryUnit, setSecondaryUnit] = useState(false);
    const [uniqueSpace, setUniqueSpace] = useState(false);
    const [bedAndBreakfast, setBedAndBreakfast] = useState(false);
    const [boutiqueHotel, setBoutiqueHotel] = useState(false);


    return (
      <div className="container">
        <div className="home-types">
            <button>Apartment</button>
            <button>House</button>
            <button>Secondary unit</button>
            <button>Unique space</button>
            <button>Bed and breakfast</button>
            <button>Boutique hotel</button>
        </div>
            <button>Back</button>
            <button>Next</button>
      </div>
    );
}


export default CreateListing;
