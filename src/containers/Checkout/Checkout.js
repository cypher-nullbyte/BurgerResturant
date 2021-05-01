import React,{ Component } from "react";
import { Redirect, Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import {connect} from 'react-redux';
class Checkout extends Component
{
    // constructor(props)
    // {
    //     super(props);
    //     // this.state={
    //     //     ingredients:{
    //     //         salad:0,
    //     //         cheese:0,
    //     //         meat:0,
    //     //         bacon:0
    //     //     },
    //     //     totalPrice:0,
    //     //     }
    // }

 
    checkoutCancelledHandler=()=>
    {
        this.props.history.goBack();
    }
    checkoutContinuedHandler=()=>
    {
        this.props.history.replace('checkout/contact-data');
    }

    render()
    {
        let summary=<Redirect to="/"/>
        if(this.props.ings)
        {
            const purchasedRedirect=this.props.purchased ? <Redirect to = "/"/> : null;
            summary=(<div>
                        {purchasedRedirect}
                        <CheckoutSummary ingredients={this.props.ings}
                            checkoutCancelled={this.checkoutCancelledHandler}
                            checkoutContinued={this.checkoutContinuedHandler}/>
                        <Route path={this.props.match.path+'/contact-data'}  
                            component={ContactData} />
                    </div>
            );
        }

        return (
                summary
                /* <Route path={this.props.match.path+'/contact-data'}  
                    render={(props)=>(<ContactData  ingredients={this.props.ings} price={this.props.price} {...props}/>)} /> */
        );
    }
}

const mapStateToProps=state=>{
    return {
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    };
}

export default connect(mapStateToProps)(Checkout);