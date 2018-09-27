import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

    CheckoutCancelledHandler = ()=> {
        this.props.history.goBack();
    } 

    onCheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
        <div>
            <CheckoutSummary 
                ingredients={this.props.ingredients}
                onCheckoutCancelled={this.CheckoutCancelledHandler}
                onCheckoutContinued={this.onCheckoutContinuedHandler} />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    ingredients:state.ingredients,
    totalPrice:state.totalPrice
    }
};

export default connect(mapStateToProps)(Checkout);