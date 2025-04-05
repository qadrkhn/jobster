
import Wrapper from "../assets/wrappers/BigSidebar";
import { NavLinks, Logo } from '../components';

import { useSelector } from "react-redux";


const BigSidebar = () => {
  const { isSideBarOpen } = useSelector((store) => store.user);

  return(
    <Wrapper>
      <div>
        <div
          className={isSideBarOpen ? 'sidebar-container' : 'sidebar-container show-sidebar'}
        >
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>

    </Wrapper>
  );

};

export default BigSidebar;
