import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, Spin } from 'antd';
import axios from 'axios';
import FormikControl from '../formik/FormikControl';
import { SETTINGS_FORM_VALIDATION_SCHEMA } from '../formik/validationSchema'; // Add your validation schema here
import { API_GET_SETTINGS, API_SET_SETTINGS } from '../api/api_settings';

const Settings = () => {
  const [ShowSpinner, setShowSpinner] = useState(false);
  const [SettingsData, setSettings] = useState(null);

  useEffect(() => {
    // Fetch Settings from backend
    const fetchSettings = async () => {
      setShowSpinner(true);
      try {
        const response = await API_GET_SETTINGS();
        setSettings(response.data);
        console.log('Fetched Settings:', response.data); // Debug: Check fetched Settings
      } catch (error) {
        console.error('Error fetching Settings:', error);
      }
      setShowSpinner(false);
    };

    if (!SettingsData) {
      fetchSettings();
    }
    console.log(SettingsData)
  }, [SettingsData]);

  const handleSubmit = async (values) => {
    console.log(values)
    try {
      await API_SET_SETTINGS(values);
      
    } catch (error) {
      console.error('Error updating Settings:', error);
    }
  };

  if (ShowSpinner) {
    return <Spin fullscreen />;
  }

  return (
    <div>
      <h1>Settings</h1>
      {Settings && (
        <Formik
          initialValues={SettingsData?SettingsData:''}
          validationSchema={SETTINGS_FORM_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {formik => (
            <Form>
              <FormikControl control="input" type="number" name="free_shipping_above" placeholder="Free Shipping Above"/>
              <FormikControl control="input" type="number" name="delivery_charges" placeholder="Delivery Charges"/>
              <FormikControl control="input" type="text" name="phone_number" placeholder="Phone Number"/>
              <FormikControl control="input" type="text" name="address" placeholder="Address"/>
              <FormikControl control="input" type="email" name="email" placeholder="Email"/>
              <FormikControl control="input" type="text" name="timings" placeholder="Timings"/>
              <FormikControl control="input" type="text" name="headline" placeholder="Headline"/>
              <FormikControl control="input" type="number" name="items_per_page" placeholder="Items Per Page"/>

              <Button type="submit" htmlType="submit" className="btn">Save Changes</Button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Settings;
