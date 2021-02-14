import Aux from "../Aux/Aux"
import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal"

const WithErrorHandler=(WrappedComponent,axios)=>
{
    return class extends Component{
        constructor(props)
        {
            super(props);
            this.state={
                error:null
            };
        }
        componentDidUpdate()
        {
            this.reqInterceptor=axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            },error=>{this.setState({error:error})});
            this.resInterceptor=axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error});
            });
        }
        
        componentWillUnmount()
        {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorConfirmedHandler=()=>
        {
            this.setState({error:null});
        }
        render()
        {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error?this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
        
    };
}
export default WithErrorHandler;