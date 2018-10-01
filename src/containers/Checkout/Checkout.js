import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
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
        let summary = <Redirect to="/" />
        if(this.props.ingredients) {
            summary = (
                <div>
                <CheckoutSummary 
                ingredients={this.props.ingredients}
                onCheckoutCancelled={this.CheckoutCancelledHandler}
                onCheckoutContinued={this.onCheckoutContinuedHandler} />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
              
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
    ingredients:state.burgerBuilder.ingredients,
    totalPrice:state.burgerBuilder.totalPrice
    }
};

export default connect(mapStateToProps)(Checkout);