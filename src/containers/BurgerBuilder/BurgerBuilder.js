import axios from "./../../axios-orders";
import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/BuildControls/OrderSummary/OrderSummary";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Aux/Aux";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";


const INGREDIENT_PRICES={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7

};

class BurgerBuilder extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            ingredients:null,
            totalPrice:4,
            purchasable:false,
            purchasing:false,
            loading:false,
            error:false
        };
    }

    componentDidMount()
    {
        console.log(this.props);
        axios.get("/ingredients.json")
        .then((res)=>
        {
            this.setState({ingredients:res.data});
        })
        .catch(err=>{this.setState({error:true})});
    }

    updatePurchaseState(ingredients)
    {
        const sum=Object.keys(ingredients).map(igKey=>
            {
                return ingredients[igKey]
            }).reduce((s,el)=>{
                return s+el
            },0);
        this.setState({purchasable:sum>0});
    }
    addIngredientHandler=(type)=>
    {
        const oldCount=this.state.ingredients[type];
        const  updatedCount=oldCount+1;
        const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedCount;
        const priceAddition=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({
            totalPrice:newPrice,
            ingredients:updatedIngredients
        }); 
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler=(type)=>
    {
        const oldCount=this.state.ingredients[type];
        if(oldCount<=0)
        {
            return ;
        }
        const  updatedCount=oldCount-1;
        const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedCount;
        const priceDeduction=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceDeduction;
        this.setState({
            totalPrice:newPrice,
            ingredients:updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);

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
        // this.setState({loading:true});
        // const order={
        //     ingredients:this.state.ingredients,
        //     price:this.state.totalPrice.toFixed(2),
        //     customer:{
        //         name:"cYpHeR",
        //         address:{
        //             street:"Test street1",
        //             zipCode:"59596",
        //             country:"India"
        //         },
        //         email:"test@email.com"
        //     },
        //     deliveryMethod:"fastest"
        // };
        // axios.post("/orders.json",order)
        // .then(res=>{
        //     setTimeout(()=>
        //     {
        //         this.setState({loading:false, purchasing:false})
        //     },1000);
        // })
        // .catch(err=>{
        //     setTimeout(()=>
        //     {
        //         this.setState({loading:false, purchasing:false})
        //     },1000);
        // });

        const queryParams=[];
        for(let i in this.state.ingredients)
            queryParams.push(encodeURIComponent(i)+'='+ encodeURIComponent(this.state.ingredients[i]));
        queryParams.push('price='+this.state.totalPrice);
        const queryString=queryParams.join('&');
        
        this.props.history.push({
        pathname:'/checkout',
        search:'?'+queryString
        });

    }
    render()
    {
        const disabledInfo={
            ...this.state.ingredients
        };
        for(let key in disabledInfo)
        {
            disabledInfo[key]=disabledInfo[key]<=0;
        }
        let orderSummary=null;
        let burger=this.state.error?<p>Ingredients can't be loaded!</p>:<Spinner />;
        if(this.state.ingredients)
        {
            burger=(
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler} 
                    disable={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler.bind(this)}/>
                </Aux>);

            orderSummary=<OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
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

export default  WithErrorHandler(BurgerBuilder,axios);