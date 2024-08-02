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
