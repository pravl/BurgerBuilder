import React , { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummaery';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';
import axios from '../../axios-order';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false
    
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }
    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum,el)=> {
                return sum+el;
            }, 0);
            return sum > 0;
    }

    purchaseCancelHandler = () => {
            this.setState({purchasing : false});
    }
    
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can not be loaded</p>:<Spinner />;

        if(this.props.ings) {
            burger =   (
                <div>
                <Burger  ingredients={this.props.ings} />
                <BuildControls
                ingredientAdded={this.props.onIngredientAdded} 
                ingredientRemove={this.props.onIngredientRemoved}
                disabled={disabledInfo}
                price={this.props.totalPrice}
                purchasable={this.updatePurchaseState(this.props.ings)}
                ordered={this.purchaseHandler} />
                </div>
                );
                orderSummary = <OrderSummary
                ingredients ={this.props.ings} 
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.totalPrice} /> ;
        }  
        return (
    <div>
        <Modal show={this.state.purchasing}>
    {orderSummary}
        </Modal>
    {burger}
    </div>
        );
    }
}
const mapStateToProps =  state => {
        return {
            ings: state.burgerBuilder.ingredients,
            totalPrice:state.burgerBuilder.totalPrice,
            error: state.burgerBuilder.error
        };
} 
const mapDispatchToProps = dispatch => {
    return {
            onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
            onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
            onInitIngredients : () => dispatch(burgerBuilderActions.initIngredients())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));