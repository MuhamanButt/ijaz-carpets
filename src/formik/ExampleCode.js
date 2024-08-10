// import React from 'react'
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import BreadCrumb from '../components/BreadCrumb'
// import { generateBreadcrumbs } from '../utils/Important_functions'
// import FormikControl from '../formik/FormikControl';
// import { checkboxOptions, dropdownOptions, radioOptions } from '../formik/Options';
// import { initialValues, validationSchema } from '../formik/initialValues';

// const CheckoutPage = () => {

//     const path = window.location.pathname;
//     const breadcrumbItems = generateBreadcrumbs(path);
//     const lastItem = breadcrumbItems[breadcrumbItems.length - 1]; // last item to show in title
  


//     const onSubmit = (values) => console.log("form data", values);

//   return (
//     <div>
//       <Navbar/>
//       <div className="row m-0">
//         <div className="col p-0 px-5">
//           {lastItem && <h2>{lastItem.title}</h2>}
//           <BreadCrumb items={breadcrumbItems} />
//         </div>
//       </div>

// <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
//       {(formik) => (
//         <Form>
//           <FormikControl control="input" type="email" name="email" label="email"/>
//           <FormikControl control="select" options={dropdownOptions} name="selectOption" label="Select a topic"/>
//           <FormikControl control="textarea" type="description" name="description" label="description"/>
//           <FormikControl control='radio' label='Radio Topic' name={'radioOptions'} options={radioOptions}/>
//           <FormikControl control='checkbox' label='Checkbox Topic' name='checkboxOptions' options={checkboxOptions} />
//           <button type="submit">Submit</button>
//         </Form>
//       )}
//     </Formik>
//       <Footer/>
//     </div>
//   )
// }

// export default CheckoutPage
