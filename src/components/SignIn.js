import React,{ Component } from 'react';

class SignIn extends Component{

//= ({onSubmit}) => { 

    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }

    onEmail = (event) => {
        this.setState({email:event.target.value})
    }

    onPassword = (event) => {
        this.setState({password:event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin',{
            method:'POST',
            body:JSON.stringify(this.state),
            headers:{'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(data=> {
            if(data==='success'){
                this.props.onSubmit();
            }
        })
    }

    render(){
        return(
            <div className="ba bw1 mt5 mh7">
                <main className="pa4 black-80">
                    <form className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" onChange={this.onEmail}  id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" onChange={this.onPassword}  id="password" autoComplete="off"/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input type="button" className="tc b ph3 pv2 ba b--black bg-transparent grow pointer f6 w-30" onClick={this.onSubmitSignIn} value="Sign in" />
                        </div>
                    </form>
                </main>
            </div>        
        )
    }
}






export default SignIn; 