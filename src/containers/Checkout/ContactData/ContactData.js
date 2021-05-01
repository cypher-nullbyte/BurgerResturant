import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect } from 'react-redux';
import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component
{
    constructor(props)
    {
        super(props);   
        this.state={
            orderForm:{
                name:{
                    elementType:"input",
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                street:{
                        elementType:"input",
                        elementConfig:{
                            type:'text',
                            placeholder:'Street'
                        },
                        value:'',
                        validation:{
                            required:true
                        },
                        valid:false,
                        touched:false
                    },
                zipCode:{
                    elementType:"input",
                    elementConfig:{
                        type:'text',
                        placeholder:'Zip Code'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength:5,
                        maxLength:5
                    },
                    valid:false,
                    touched:false
                },
                country:{
                    elementType:"input",
                    elementConfig:{
                        type:'text',    
                        placeholder:'Country'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                email:{
                    elementType:"input",
                    elementConfig:{
                        type:'email',
                        placeholder:'Email'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                deliveryMethod:{
                    elementType:"select",
                    elementConfig:{
                        options:[{value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}]
                    },
                    value:'fastest',
                    validation:{},
                    valid:true,
                    touched:false
                },
            },
            formIsValid:false,
        }
    }

    checkValidity(value,rules)
    {
        let isValid=true;
        if(!rules)
            return isValid;
        if(rules.required)
        {
            isValid=value.trim()!=='' &&isValid;
        }
        if(rules.minLength){
            isValid=value.length>=rules.minLength &&isValid;
        }
        if(rules.maxLength){
            isValid=value.length<=rules.maxLength &&isValid;
        }
        return isValid;
    }

    inputChangedHandler=(event,InputIdentifier)=>
    {
        // console.log(event.target.value);
        const updatedOrderForm={
            ...this.state.orderForm
        }
        const updatedFormElement={...updatedOrderForm[InputIdentifier]};
        updatedFormElement.value=event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched=true;
        updatedOrderForm[InputIdentifier]=updatedFormElement;

        let formIsValid=true;
        for(let inputIdentifiers in updatedOrderForm)
        {
            formIsValid=updatedOrderForm[inputIdentifiers].valid &&formIsValid;
        }

        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid})
    }

    orderHandler=(event)=>
    {
        event.preventDefault();
        
        const formData={};
        for(let formElementIdentifier in this.state.orderForm)
        {
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
        }
        const order={
            ingredients:this.props.ings,
            price: Number(this.props.price).toFixed(2),
            orderData:formData
            
        };
        this.props.onOrderBurger(order);
        
    }
    render()
    {
        // console.log(typeof this.props.price);
        const formElementsArray=[];
        for(let key in this.state.orderForm)
        {
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form=(
            <form>
                    {formElementsArray.map(formElement=>(
                        <Input key={formElement.id} elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            inValid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            value={formElement.config.value} changed={(event)=>this.inputChangedHandler(event,formElement.id)}/>
                    ))}
                    <Button disabled={!this.state.formIsValid} btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
        );
        if(this.props.loading)
            form=<Spinner />
        return(
        <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}


const mapStateToProps=state=>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,

    };
};

const mapDispatchToProps=dispatch=>{
    return{
        onOrderBurger:(orderData)=>dispatch(actions.purchaseBurger(orderData)),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(ContactData,axios));