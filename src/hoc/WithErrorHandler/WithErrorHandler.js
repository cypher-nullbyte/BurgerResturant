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
            this._mounted=React.createRef(false);
        }
        async doTheJob_of_componentWillMount()
        {
                axios.interceptors.request.use(req=>{
                    this.setState({error:null});
                    // console.log('flag-1');
                    return req;
                });
                axios.interceptors.response.use(res=>res,err=>{
                    this.setState({error:err});
                    // console.log('flag-2');
                });
        }
        componentDidMount()
        {
            this._mounted.current=true;
        }
        componentDidUpdate()
        {
            if(this._mounted.current)
            {
                this.reqInterceptor=axios.interceptors.request.use(req=>{
                    this.setState({error:null});
                    return req;
                },error=>{
                    // console.log('flag-3');
                    this.setState({error:error})
                });

                this.resInterceptor=axios.interceptors.response.use(res=>{
                    this.setState({error:null});
                    return res;
                },error=>{
                    // console.log('flag-4');
                    this.setState({error:error});
                });
            }
            
        }
        async axiosCleanUp()
        {
            console.log(this._mounted.current);
            if(this._mounted.current)
            {
                // console.log('flag-5');
                await axios.interceptors.request.eject(this.reqInterceptor);
                // console.log('flag-6');
                await axios.interceptors.response.eject(this.resInterceptor);
            }
            
        }
        componentWillUnmount()
        {
           this.axiosCleanUp();
           this._mounted.current=false;
        //    console.log('flag-7');
        }
        errorConfirmedHandler=()=>
        {
            this.setState({error:null});
        }
        render()
        {
            this.doTheJob_of_componentWillMount();
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