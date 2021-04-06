import React,{ Component } from "react";
import Order from "../../components/Order/Order";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import axios from './../../axios-orders';

class Orders extends Component
{

    constructor(props)
    {
        super(props);
        this.state={
            orders:[],
            loading:true
        }
    }
    componentDidMount()
    {
        axios.get("/orders.json")
        .then((res)=>
        {
            const fetchedOrders=[];
            for(let key in res.data)
            {
                fetchedOrders.push({
                    ...res.data[key],
                    id:key
                });
            }
            console.log(this.props);
            this.setState({loading:false, orders:fetchedOrders});
        })
        .catch(err=>
        {
            this.setState({loading:false});
        })
    }
    render()
    {
        // console.log(this.state.orders);
        return(
            <div>
                {this.state.orders.map(order=>(
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>
                ))}
            </div>
        );
    }
}

export default WithErrorHandler(Orders,axios);