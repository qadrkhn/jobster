import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const initialState = {
    name: '',
    email: '',
    password: '',
    isMemeber: true
};


const Register = () => {
    const [values, setValues] = useState(initialState);

    const {user, isLoading} = useSelector(store => store.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const toggleMember = () => {
        setValues({...values, isMemeber: !values.isMemeber})
    }
    
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setValues({...values, [name] : value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, isMemeber, email, password } = values;
        if (!email || !password || (!isMemeber && !name)) {
            toast.error('please fill out all fields');
            return;
        }
        if (isMemeber) {
            dispatch(loginUser({email, password}));
            return;
        }
        dispatch(registerUser({ name, email, password }));
    };

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/');

            }, 2000)

        }
    }, [user, navigate]);

    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={ onSubmit }>
                <Logo />
                <h3>{ !values.isMemeber ? 'Register' : 'Login' }</h3>
                { !values.isMemeber &&
                    <FormRow 
                        name='name' 
                        type='text' 
                        value={values.name} 
                        handleChange={handleChange}
                    />
                }
                <FormRow 
                    name='email' 
                    type='email' 
                    value={values.email} 
                    handleChange={handleChange}
                />
                <FormRow 
                    name='password' 
                    type='password' 
                    value={values.password} 
                    handleChange={handleChange}
                />
                <button type='submit' className="btn btn-block" disabled={ isLoading }>
                    {isLoading ? 'loading....' : 'submit'}
                </button>
                <p>
                    {values.isMemeber ? 'Not a member yet?' : 'Already a member?'}
                    <button 
                        type='button' 
                        className="member-btn" 
                        onClick={toggleMember}
                    >
                        { values.isMemeber ? 'Register' : 'Login' }
                    </button>
                </p>

            </form>
        </Wrapper>
    );
};

export default Register;