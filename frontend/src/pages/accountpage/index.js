import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link, useParams } from 'react-router-dom';
import './index.css';

const AccountPage = () => {

    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser)  {
        history.push('/signup')
    }

    const {page} = useParams();
    console.log(page)

    return (
      <div>
        <nav className="accountpage-nav">
          <Link className="accountpage-link" to={"/account/profile"}>
            My profile
          </Link>
          <Link
            className="accountpage-link"
            to={"/account/bookings"}
          >
            My bookings
          </Link>
          <Link
            className="accountpage-link"
            to={"/account/accommodations"}
          >
            My accommodations
          </Link>
        </nav>
      </div>
    );
}



export default AccountPage;
