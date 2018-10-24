import React , { Component } from 'react';
import  { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {connect } from 'react-redux';

import  * as actions from '../../../store/actions/index';
import classes from '../../../components/UI/Input/Input.css';
import Button from '../../../components/UI/Button/Button';


const orderSchema = Yup.object().shape({
        fname: Yup.string()
                .min(3,'Too Short')
                .max(10,'Too Long')
                .required('Required'),
        email: Yup.string()
                .email('Invalid email')
                .required('Required'),
        street: Yup.string()
                .required('Required'),
        zipcode: Yup.number()
                .typeError('Use numbers only')
                .min(9999, 'Short')
                .required('Required'),
        country: Yup.string()
                .required('Required')
});
class ContactForm extends Component {

    Submitdata = (values)=> {
        this.props.onOrderBurger(values);
    }

        render() {
            return(
                <div>
                <div className={classes.ContactData}>
                <h4><center>Hey This is Formik Contact Form </center></h4>
            
                <Formik 
                initialValues={{
                    country:'India',
                    fname:'',
                    street:'',
                    zipcode:'',
                    ordertype:'fast',
                    email:''
                    
                }}
                validationSchema={orderSchema}
                onSubmit={values => {
                   this.Submitdata({...values});
                }}
                >
                {({errors , touched, handleSubmit,isSubmitting, handleChange, handleBlur}) => (
                    <Form>
                        <label className={classes.Label}>Name</label>
                        <Field className={classes.InputElement} type="text" name="fname" placeholder="First Name" onChange={handleChange} onBlur={handleBlur}/>
                        <ErrorMessage name="fname" render= {msg => <div className={classes.Error}>{msg}</div>} />

                        <label className={classes.Label}>Street</label>
                        <Field className={classes.InputElement} type="text" name="street" placeholder="Street"/>
                        <ErrorMessage name="street" render= {msg => <div className={classes.Error}>{msg}</div>} />

                        <label className={classes.Label}>ZipCode</label>
                        <Field className={classes.InputElement} type="text" name="zipcode" placeholder="Zip Code"/>
                        <ErrorMessage name="zipcode" render= {msg => <div className={classes.Error}>{msg}</div>} />

                        <label className={classes.Label}>Country</label>
                        <Field className={classes.InputElement} type="text" name="country" placeholder="Country"/>
                        <ErrorMessage name="country" render= {msg => <div className={classes.Error}>{msg}</div>} />

                        <label className={classes.Label}>Email</label>
                        <Field className={classes.InputElement} type="email" name="email" placeholder="Email"/>
                        <ErrorMessage name="email" render= {msg => <div className={classes.Error}>{msg}</div>} />

                        <label className={classes.Label}>Order Type</label>
                        <Field className={classes.InputElement} component="select" name="ordertype">
                        <option value="cheap">Cheapest</option>
                        <option value="fast">fastest</option>
                        </Field>

                        <center><button  type="submit" className={classes.Button}>ORDER</button></center>
                    </Form>
                )}
                </Formik>
                </div>
            </div>
            );
        }
}

const mapDispatchToProps = dispatch => {
    return{
    onOrderBurger: (order) => dispatch(actions.purchaseBurger(order))
    };
};

export default  connect(null,mapDispatchToProps)(ContactForm);
