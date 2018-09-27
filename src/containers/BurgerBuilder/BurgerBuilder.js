import React , { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummaery';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/action';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
    //     axios.get('https://react-my-burger-520c5.firebaseio.com/ingredients.json')
    //     .then(response => {
    //     this.setState({ingredients: response.data})
    //     })
    //     .catch(error => { this.setState({error: true}) });
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
        let burger = this.state.error ? <p>Ingredients can not be loaded</p>:<Spinner />;

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
        if(this.state.loading) {
            orderSummary = <Spinner /> ;
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
            ings: state.ingredients,
            totalPrice:state.totalPrice
        };
} 
const mapDispatchToProps = dispatch => {
    return {
            onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGRIDIENT , ingredientName:ingName }),
            onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGRIDIENT , ingredientName:ingName }) 
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));