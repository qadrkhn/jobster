import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar, logoutUser } from "../features/user/userSlice";




const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [ showLogout, setshowLogout ] = useState(false);

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={ toggle }
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3>Dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type='button'
            className="btn"
            onClick={() => setshowLogout(!showLogout) }
          >
            <FaUserCircle />
            { user?.name }
            <FaCaretDown />
          </button>
          <div className={ showLogout ? 'dropdown show-dropdown' : 'dropdown' }>
            <button
              type='button'
              className="dropdown-btn"
              onClick={ () => dispatch(logoutUser('Logging out')) }
            >
              Logout
            </button>

          </div>

        </div>
      </div>

    </Wrapper>

  );
};

export default Navbar;
