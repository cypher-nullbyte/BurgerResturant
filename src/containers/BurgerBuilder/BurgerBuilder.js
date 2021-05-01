import axios from "./../../axios-orders";
import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/BuildControls/OrderSummary/OrderSummary";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            purchasing:false,
        };
    }
    
    componentDidMount()
    {
        console.log(this.props);
        this.props.onInitIngredients();
        // axios.get("/ingredients.json")
        // .then((res)=>
        // {
        //     this.setState({ingredients:res.data});
        // })
        // .catch(err=>{this.setState({error:true})});
    }

    updatePurchaseState(ingredients)
    {
        const sum=Object.keys(ingredients).map(igKey=>
            {
                return ingredients[igKey]
            }).reduce((s,el)=>{
                return s+el
            },0);
        return sum>0;
    }

    
    purchaseHandler()
    {
        this.setState({purchasing:true});
    }
    purchaseCancelHandler()
    {
        this.setState({purchasing:false});
    }
    purchaseContinueHandler=()=>
    {
        // const queryParams=[];
        // for(let i in this.state.ingredients)
        //     queryParams.push(encodeURIComponent(i)+'='+ encodeURIComponent(this.state.ingredients[i]));
        // queryParams.push('price='+this.state.totalPrice);
        // const queryString=queryParams.join('&');
        
        // this.props.history.push({
        // pathname:'/checkout',
        // search:'?'+queryString
        // });

        this.props.onInitPurchase();
        this.props.history.push('/checkout');

    }
    render()
    {
        const disabledInfo={
            ...this.props.ings
        };
        for(let key in disabledInfo)
        {
            disabledInfo[key]=disabledInfo[key]<=0;
        }
        let orderSummary=null;
        let burger=this.props.error?<p>Ingredients can't be loaded!</p>:<Spinner />;
        if(this.props.ings)
        {
            burger=(
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls ingredientAdded={this.props.onIngredientAddded} 
                    ingredientRemoved={this.props.onIngredientRemoved} 
                    disable={disabledInfo}
                    price={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler.bind(this)}/>
                </Aux>);

            orderSummary=<OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler.bind(this)}
                purchaseContinued={this.purchaseContinueHandler}/>
        }
        if(this.state.loading)
        {
            orderSummary=<Spinner />
        }            

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler.bind(this)}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps=state=>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,

    }
};

const mapDispatchToProps=dispatch=>{
    return {
        onIngredientAddded:(ingName)=>dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved:(ingName)=>dispatch(actions.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(actions.initIngredients()),
        onInitPurchase:()=>dispatch(actions.purchaseInit()),
    }
};


export default  connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder,axios));