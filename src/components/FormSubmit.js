import React, { Component } from 'react';

class FormSubmit extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            password:'',
            email:''
        }
    }
    //props:onRegister,onSubmit,loadUser, backendURL

    onNameChange = (event) => {
        this.setState({name:event.target.value})
    }

    onEmailChang = (event) => {
        this.setState({email:event.target.value})
    }

    onPasswordChang = (event) => {
        this.setState({password:event.target.value})
    }

    onSubmitRegister = ()=>{
        fetch(`${this.props.backendURL}/register`,{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(this.state)
        })
        .then(res=>res.json())
        .then(res => {
            if(typeof(res)==='object'){
                this.props.onSubmit();
                this.props.loadUser(res);
            } else {
                console.log('submit error');
            }
        })
    }

    onSubmitSignIn = () => {
        // console.log(process.env.backendURL);
        fetch(`${this.props.backendURL}/signin`,{
            method:'POST',
            body:JSON.stringify(this.state),
            headers:{'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(data=> {
            if(typeof(data[0])==='object'){
                this.props.onSubmit();
                this.props.loadUser(data[0]);
            } else {
                console.log('submit error');
            }
        })
    }

    render(){
        if (this.props.onRegister){
            return(
                <div className="ba bw1 mt2 mt3-ns mh2 mh5-ns br3-ns">
                    <article className="pa4 black-80">
                        <form action="sign-up_submit" method="get" acceptCharset="utf-8">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
                                <div className="mt3">
                                    <label className="db fw4 lh-copy f6">Name</label>
                                    <input className="pa2 input-reset ba bg-transparent w-100 measure" type="text" name="name"  id="name" onChange={this.onNameChange}/>
                                </div>
                                <div className="mt3">
                                    <label className="db fw4 lh-copy f6">Email address</label>
                                    <input className="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address"  id="email-address" onChange={this.onEmailChang}/>
                                </div>
                                <div className="mt3">
                                    <label className="db fw4 lh-copy f6">Password</label>
                                    <input className="b pa2 input-reset ba bg-transparent" type="password" name="password"  id="password" onChange={this.onPasswordChang} autoComplete="off"/>
                                </div>
                            </fieldset>
                            <div className="mt3">
                                <input type="button" className="tc b ph3 pv2 ba b--black bg-transparent grow pointer f6 w-30" onClick={this.onSubmitRegister} value="Sign Up"/>
                            </div>
                        </form>
                    </article>
                </div>   
            )
        }
        else {
            return(
                <div className="ba bw1 mt2 mt3-ns mh2 mh5-ns br3-ns">
                    <article className="pa4 black-80">
                        <form action="sign-up_submit" method="get" acceptCharset="utf-8">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
                                <div className="mt3">
                                    <label className="db fw4 lh-copy f6">Email address</label>
                                    <input className="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address"  id="email-address" onChange={this.onEmailChang}/>
                                </div>
                                <div className="mt3">
                                    <label className="db fw4 lh-copy f6">Password</label>
                                    <input className="b pa2 input-reset ba bg-transparent" type="password" name="password"  id="password" onChange={this.onPasswordChang} autoComplete="off"/>
                                </div>
                            </fieldset>
                            <div className="mt3">
                                <input type="button" className="tc b ph3 pv2 ba b--black bg-transparent grow pointer f6 w-30" onClick={this.onSubmitSignIn} value="Sign In" />
                            </div>
                        </form>
                    </article>
                </div>   
            )
        }
    }
}


export default FormSubmit; 