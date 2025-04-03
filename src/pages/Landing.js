import { Link } from 'react-router-dom';

import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';

import { Logo } from '../components';

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className='container page'>
                <div className='info'>
                    <h1>
                        job <span>tracking</span> site
                    </h1>
                    <p>Jobster is your go-to platform for finding your next career opportunity. Whether you're an experienced professional or just starting your career journey, Jobster connects job seekers with top employers across various industries. With an easy-to-use interface, personalized job recommendations, and real-time notifications, Jobster helps you discover job listings that match your skills and interests. You can apply for jobs with just a few clicks, track your application status, and even receive expert career advice—all in one place. Join the Jobster community today and take the next step toward your dream job!</p>
                    <Link to='/register' className='btn btn-hero'>Login/Register</Link>
                </div>
                <img className='img main-img' src={main} alt="main_image" />
            </div>
        </Wrapper>
    );
};


export default Landing;
