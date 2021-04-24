import React,{ Component } from "react";
import { Route } from "react-router-dom";
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

    // componentDidMount()
    // {
    //     const query=new URLSearchParams(this.props.location.search);
    //     const ingredients={};
    //     let price=0;
    //     for(let param of query.entries())
    //     {
    //         if(param[0]==='price')
    //             price=param[1];
    //         else
    //         ingredients[param[0]]=param[1]
    //     }
    //     this.setState({ingredients:ingredients,totalPrice:price});
    // }

    checkoutCancelledHandler=()=>
    {
        this.props.history.goBack();
    }
    checkoutContinuedHandler=()=>
    {
        this.props.history.push('checkout/contact-data');
    }

    render()
    {
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                {/* <Route path={this.props.match.path+'/contact-data'}  
                    render={(props)=>(<ContactData  ingredients={this.props.ings} price={this.props.price} {...props}/>)} /> */}
                    <Route path={this.props.match.path+'/contact-data'}  
                    component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps=state=>{
    return {
        ings:state.ingredients,
    };
}


export default connect(mapStateToProps)(Checkout);