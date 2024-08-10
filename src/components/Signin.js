import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Input, Button, message, Modal } from 'antd';
import * as Yup from 'yup';
import styles from './styles/Signin.module.css'; // Create a separate CSS file or use module.css
import { SIGNIN_VALIDATION_SCHEMA } from '../formik/validationSchema';
import { SIGIN_INITIAL_VALUES } from '../formik/initialValues';
import FormikControl from '../formik/FormikControl';
import { SIGN_IN_IMAGE } from '../values/homePageData';
import { API_SIGNIN } from '../api/api_signin';
import {Spin} from 'antd'
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../redux/AdminToken/Action';
import Navbar from './Navbar';
import Footer from './Footer';


const Signin = () => {
    const [formValues, setFormValues] = useState({});
    const [ShowSpinner, setShowSpinner] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
    setFormValues(values);
    setShowSpinner(true);
    const response = await API_SIGNIN(values.email, values.password);
    if (response) {
        dispatch(setLoggedIn(true));
    }
    setShowSpinner(false);
    };

    return (
        <>
            {ShowSpinner && <Spin fullscreen />}
            <Navbar/>
            <div className="row justify-content-evenly mt-5 px-1 px-sm-5">
                <div className={`col-md-6 col-xl-4 d-none d-md-block`}>
                    <img src={SIGN_IN_IMAGE} alt="" className={styles.signinImage}/>
                </div>
                <div className={`col-10 col-sm-8 col-md-6 ${styles.signinComponent} align-self-center align-content-center`}>
                    <h2 className={styles.signinHeading} >Sign in</h2>
                    <Formik initialValues={SIGIN_INITIAL_VALUES} validationSchema={SIGNIN_VALIDATION_SCHEMA} onSubmit={handleSubmit} >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <FormikControl control="input" type="email" name="email" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                    <FormikControl control="input" name="password" placeholder="Enter your password" type="password" />
                                </div>
                                <Button type="primary" htmlType="submit" className={styles.submitBtn}> Sign In </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Signin;
