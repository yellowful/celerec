import React, { Component } from 'react';
import InvalidInput from './InvalidInput';

class FormSubmit extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            password:'',
            email:'',
            loginError:false
        }
        this.inputName = React.createRef();
        this.inputEmail = React.createRef();
        this.inputPassword = React.createRef();
    }
    //props:onRegister,onSubmit,loadUser, backendURL

    componentDidMount(){
        fetch(`${this.props.backendURL}/`);
    }

    nameEnterListener = (event) => {
        if(event.key==='Enter'){
            //this.inputName.current.blur();    
            this.inputEmail.current.focus();
        }
    }

    onNameChange = (event) => {
        this.setState({name:event.target.value})
    }//抓取輸入的名字


    emailEnterLinstener = (event) => {
        if(event.key==='Enter'){
            //this.inputEmail.current.blur();
            this.inputPassword.current.focus();
        }
    }//抓取輸入的email

    onEmailChange = (event) =>{
        this.setState({email:event.target.value})
    }

    passwordEnterListener = (event) => {
        if(event.key==='Enter'){
            if(this.props.onRegister){
                this.onSubmitRegister()
            }
            else{
                this.onSubmitSignIn();
            }
        }
    }

    onPasswordChange = (event) => {
        this.setState({password:event.target.value})
    }//抓取輸入的password

    onSubmitRegister = ()=>{
        if(this.state.name && this.state.password && this.state.email){
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
                    this.setState({loginError:true})
                }
            })
            .catch(err=>{
                this.setState({loginError:true})
            })
        } else {
            this.setState({loginError:true})
        }

    }
    //註冊的時候把註冊資料傳到後端
    //收到的response如果有錯，就不會是一個object
    //如果沒錯，後端就會把使用者資料回傳
    //這時候就可以把user載入

    onSubmitSignIn = () => {
        if(this.state.password && this.state.email){
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
                    this.setState({loginError:true})
                }
            })
            .catch(err=>{
                this.setState({loginError:true})
            })
        } else {
            this.setState({loginError:true})
        }   
    }
    //登入的時候把註冊資料傳到後端
    //收到的response如果有錯，就不會是一個object
    //如果沒錯，後端就會把使用者資料回傳
    //這時候就可以把user載入

    render(){
        if (this.props.onRegister){
            return(
                <div className="ba bw1 mt2 mt3-ns mh2 mh5-ns br3-ns">
                    <div className="pa4 black-80">
                                <p className="db fw4 lh-copy f4 fw6">Sign Up</p>
                                <div className="mt3">
                                    <label className="db fw4 lh-copy f6">Name</label>
                                    <input 
                                        className="pa2 input-reset ba bg-transparent w-100 measure" 
                                        type="text" 
                                        name="name"  
                                        id="name" 
                                        ref={this.inputName} 
                                        onKeyDown={this.nameEnterListener} 
                                        onChange={this.onNameChange}
                                    />
                                </div>
                                <div className="mt3">
                                    <label className="db fw4 lh-copy f6">Email address</label>
                                    <input 
                                        className="pa2 input-reset ba bg-transparent w-100 measure" 
                                        type="email" 
                                        name="email-address"  
                                        id="email-address" 
                                        ref={this.inputEmail} 
                                        onKeyDown={this.emailEnterLinstener} 
                                        onChange={this.onEmailChange}                                         
                                    />
                                </div>
                                <div className="mt3">
                                    <label className="db fw4 lh-copy f6">Password</label>
                                    <input 
                                        className="b pa2 input-reset ba bg-transparent" 
                                        type="password" 
                                        name="password"  
                                        id="password" 
                                        ref={this.inputPassword} 
                                        onKeyDown={this.passwordEnterListener} 
                                        onChange={this.onPasswordChange}
                                        autoComplete="off"                                            
                                    />
                                </div>
                            <div className="mt3">
                                <button 
                                    className="tc  f6 w-40 w20-ns w-10-m b ph3 pv2 ba b--black bg-transparent grow pointer" 
                                    onClick={this.onSubmitRegister}>
                                        Sign Up
                                </button>
                            </div>
                            <InvalidInput loginError={this.state.loginError}/>
                    </div>
                </div>   
            )
        }
        else {
            return(
                <div className="ba bw1 mt2 mt3-ns mh2 mh5-ns br3-ns">
                    <div className="pa4 black-80">
                        <p className="db fw4 lh-copy f4 fw6">Sign In</p>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6">Email address</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent w-100 measure" 
                                type="email" 
                                name="email-address"  
                                id="email-address" 
                                onKeyDown={this.emailEnterLinstener}
                                onChange={this.onEmailChange}                                    
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent" 
                                type="password" 
                                name="password"  
                                id="password" 
                                ref={this.inputPassword} 
                                onKeyDown={this.passwordEnterListener}
                                onChange={this.onPasswordChange} 
                                autoComplete="off"                                
                            />
                        </div>
                        <div className="mt3">
                            <button 
                                className="tc  f6 w-40 w-20-ns w-10-m b ph3 pv2 ba b--black bg-transparent grow pointer" 
                                onClick={this.onSubmitSignIn}>
                                    Sign In
                            </button>
                        </div>
                        <InvalidInput loginError={this.state.loginError}/>
                    </div>
                </div>   
            )
        }
    }
}


export default FormSubmit; 