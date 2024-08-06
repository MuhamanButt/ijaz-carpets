import * as Yup from "yup";

export const CHECKOUT_FORM_VALIDATION_SCHEMA = Yup.object({
  email: Yup.string().email("*Invalid email format").required("*Email is required"),
  firstName: Yup.string().required("*First name is required"),
  lastName: Yup.string(),
  address: Yup.string().required("*Address is required"),
  city: Yup.string().required("*City is required"),
  postalCode: Yup.string(),
  phone: Yup.string().required('*Phone Number is required')
        .matches(/^[0-9]+$/, 'Phone number must be only digits')
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number must be at most 15 digits'),
});


export const SIGNIN_VALIDATION_SCHEMA = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

export const ADD_PRODUCT_FORM_VALIDATION_SCHEMA = Yup.object({
  product_name: Yup.string().required('Product Name is required'),
  product_type: Yup.mixed().required('Product Type is required'),
  images_url: Yup.mixed().required('Product Image is required'),
  product_price_old: Yup.number().min(0,'Old Price must be a positive number').nullable(),
  product_price_new: Yup.number().positive('New Price must be a positive number').required('New Price is required'),
  quantity_available: Yup.number().integer('Quantity must be an integer').min(0, 'Quantity cannot be negative').required('Quantity Available is required'),
  sizes_available:  Yup.array().of(Yup.string().required('Size is required')) .required('Sizes Available is required').min(1, 'At least one size is required'), 
  estimated_delivery_days: Yup.number().integer('Estimated Delivery Days must be an integer').min(0, 'Estimated Delivery Days cannot be negative').required('Estimated Delivery Days is required'),
});


export const UPDATE_PRODUCT_FORM_VALIDATION_SCHEMA = Yup.object({
  product_name: Yup.string().required('Product Name is required'),
  product_type: Yup.mixed().required('Product Type is required'),
  product_price_old: Yup.number().min(0,'Old Price must be a positive number').nullable(),
  product_price_new: Yup.number().positive('New Price must be a positive number').required('New Price is required'),
  quantity_available: Yup.number().integer('Quantity must be an integer').min(0, 'Quantity cannot be negative').required('Quantity Available is required'),
  sizes_available: Yup.array().of(Yup.string().required('Size is required'))
    .required('Sizes Available is required').min(1, 'At least one size is required'),
  estimated_delivery_days: Yup.number().integer('Estimated Delivery Days must be an integer').min(0, 'Estimated Delivery Days cannot be negative').required('Estimated Delivery Days is required'),
});



export const SETTINGS_FORM_VALIDATION_SCHEMA = Yup.object().shape({
});
