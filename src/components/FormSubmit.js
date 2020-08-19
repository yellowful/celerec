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
    }//抓取輸入的名字

    onEmailChang = (event) => {
        this.setState({email:event.target.value})
    }//抓取輸入的email

    onPasswordChang = (event) => {
        this.setState({password:event.target.value})
    }//抓取輸入的password

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
    //註冊的時候把註冊資料傳到後端
    //收到的response如果有錯，就不會是一個object
    //如果沒錯，後端就會把使用者資料回傳
    //這時候就可以把user載入

    onSubmitSignIn = () => {
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
                            <div className="mt3">
                                <button className="tc  f6 w-40 w20-ns w-10-m b ph3 pv2 ba b--black bg-transparent grow pointer" onClick={this.onSubmitRegister}>Sign Up</button>
                            </div>
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
                            <input className="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address"  id="email-address" onChange={this.onEmailChang}/>
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent" type="password" name="password"  id="password" onChange={this.onPasswordChang} autoComplete="off"/>
                        </div>
                        <div className="mt3">
                            <button className="tc  f6 w-40 w-20-ns w-10-m b ph3 pv2 ba b--black bg-transparent grow pointer" onClick={this.onSubmitSignIn}>Sign In</button>
                        </div>
                    </div>
                </div>   
            )
        }
    }
}


export default FormSubmit; 