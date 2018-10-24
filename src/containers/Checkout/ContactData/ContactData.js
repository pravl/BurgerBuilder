import React , {Component} from 'react';
import {connect } from 'react-redux';
import { Formik , Form , Field , ErrorMessage } from 'formik';
import * as Yup from 'yup';

import axios from '../../../axios-order';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from '../../../components/UI/Input/Input.css';
import  * as actions from '../../../store/actions/index';

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

class ContactData extends Component {
        state = {
            loading:false
        }

        Submitdata = (values)=> {             
            const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData : values
        }
        debugger;
        this.props.onOrderBurger(order);
        }
            render() {

                let form = (
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
    
                            <center><button className={classes.Button} type="submit">ORDER</button></center>
                        </Form>
                    )}
                    </Formik>
                    </div>
                </div>
                )
                if(this.props.loading) {
                    form = <Spinner />
                }
                return(
                    <div className={classes.ContactData}>
                        {form}
                    </div>
                );
            }
        
}

const mapStateToProps = (state) => {
    return  {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return{
    onOrderBurger: (order) => dispatch(actions.purchaseBurger(order))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(ContactData);