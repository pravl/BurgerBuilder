import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/CheckoutSummary/Order';
import * as actions from '../../store/actions/index';

class Orders extends Component {
    
    componentDidMount() {
        this.props.getOrders();
    }
    render() {
        return(
                <div>
                {this.props.orders.map(order => (
                    <Order key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
                ))}
                </div>
        );
    }
}

const mapStateToProps =(state) => {
    return {
    orders:state.fetchOrder.orders,
    loading:state.fetchOrder.loading

    }
};

const mapDispatchToProps = dispatch => {
    return {
        getOrders : () => dispatch(actions.fetchingOrders())
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders);