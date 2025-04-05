import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { FormRow } from '../../components';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser } from '../../features/user/userSlice';


const Profile = () => {
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || ''
  });

  const { name, email, lastName, location } = userData;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      toast.error('please fill out all fields');
      return;
    }
    dispatch(updateUser(userData));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({...userData, [name] : value});
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={ handleSubmit }>
        <h3>profile</h3>
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            labelText='first name'
            value={name}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            labelText='last name'
            name='lastName'
            value={lastName}
            handleChange={handleChange}
          />
          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='location'
            value={location}
            handleChange={handleChange}
          />
          <button type='submit' className='btn btn-block' disabled={isLoading}>
            {isLoading? 'Please wait ....' : 'save changes'}
          </button>
        </div>
      </form>

    </Wrapper>
  );

};


export default Profile;
