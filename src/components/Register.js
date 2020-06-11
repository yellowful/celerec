import React, { Component } from 'react';

class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            password:'',
            email:''
        }
    }

    onNameChange = (event) => {
        this.setState({name:event.target.value})
    }

    onEmailChang = (event) => {
        this.setState({email:event.target.value})
    }

    onPasswordChang = (event) => {
        this.setState({password:event.target.value})
    }

    onSubmitRegister = (event)=>{
        fetch('http://localhost:3000/register',{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(this.state)
        })
        .then(res=>res.json())
        .then(res => {
            if(res==='success'){
                this.props.onSubmit();
            } else {
                console.log('submit error');
            }
        })
    }


    render(){
        return(
            <div className="ba bw1 mt5 mh7">
                <article className="pa4 black-80">
                    <form action="sign-up_submit" method="get" accept-charset="utf-8">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
                            <div className="mt3">
                                <label className="db fw4 lh-copy f6" for="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent w-100 measure" type="text" name="name"  id="name" onChange={this.onNameChange}/>
                            </div>
                            <div className="mt3">
                                <label className="db fw4 lh-copy f6" for="email-address">Email address</label>
                                <input className="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address"  id="email-address" onChange={this.onEmailChang} />
                            </div>
                            <div className="mt3">
                                <label className="db fw4 lh-copy f6" for="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent" type="password" name="password"  id="password" onChange={this.onPasswordChang} />
                            </div>
                        </fieldset>
                        <div className="mt3">
                            <input type="button" className="tc b ph3 pv2 ba b--black bg-transparent grow pointer f6 w-30" onClick={this.onSubmitRegister} value="Sign Up" />
                        </div>
                    </form>
                </article>
            </div>   
        )
    }
}


export default Register; 