import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl'
import InvalidInput from '../../components/InvalidInput/InvalidInput';
import Introduction from '../../components/Introduction/Introduction'
// import Credit from '../../components/Credit/Credit.js';

class FormSubmit extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            password:'',
            email:'',
            loginError:false,
            displayVideo:false
        }
        this.inputName = React.createRef();
        this.inputEmail = React.createRef();
        this.inputPassword = React.createRef();
        //三個dom元件建立ref
        //以利之後可以操控要focus在那個dom元件上
    }
    //props: onRegister,onSubmit,loadUser, backendURL

    componentDidMount(){
        fetch(`${this.props.backendURL}/`);
        //先喚醒後端，才不會送出資料後才喚醒，速度很慢
    }

    nameEnterListener = (event) => {
        if(event.key==='Enter'){               
            this.inputEmail.current.focus();
        }
    }
    //監聽名字欄位，聽到按enter後，跳到email的欄位

    onNameChange = (event) => {
        this.setState({name:event.target.value})
    }//抓取輸入的名字


    emailEnterLinstener = (event) => {
        if(event.key==='Enter'){            
            this.inputPassword.current.focus();
        }
    }//聽到按enter後，跳到password

    onEmailChange = (event) =>{
        this.setState({email:event.target.value})
    }//抓取輸入的email

    passwordEnterListener = (event) => {
        if(event.key==='Enter'){
            if(this.props.onRegister){
                this.onSubmitRegister()
            }
            else{
                this.onSubmitSignIn();
            }
        }
    }//聽到按enter之後，和點sign in或sign up一樣的效果

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
    //如果資料格式正確，就把user載入
    //有誤就報錯

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

    onMoreInfo = () => {
        this.setState({displayVideo:true})
    }
    //點more info，就播放video

    onClickVideo = () => {
        this.setState({displayVideo:false})
    }
    //點x，就關掉video

    render(){
        if (this.props.onRegister){
            return(
                <div className="ba bw1 mt2 mt3-ns mh2 mh5-ns br3-ns">
                    <div className="pa4 black-80">
                                <p className="db fw4 lh-copy f4 fw6"><FormattedMessage id='sign-up' /></p>
                                <div className="mt3">
                                    <label className="db fw4 lh-copy f6"><FormattedMessage id='name' /></label>
                                    <input 
                                        className="pa2 input-reset ba bg-transparent w-100 measure" 
                                        type="text" 
                                        name="name"  
                                        id="name" 
                                        ref={this.inputName} 
                                        onKeyDown={this.nameEnterListener} 
                                        onChange={this.onNameChange}
                                    />
                                    {/* name 填入的欄位
                                    ref用來讓react能操控這個鈕的focus
                                    onKeyDown用來偵測enter鍵
                                    onChange用來抓name的完整內容
                                     */}
                                </div>
                                <div className="mt3">
                                    <label className="db fw4 lh-copy f6"><FormattedMessage id='email' /></label>
                                    <input 
                                        className="pa2 input-reset ba bg-transparent w-100 measure" 
                                        type="email" 
                                        name="email-address"  
                                        id="email-address" 
                                        ref={this.inputEmail} 
                                        onKeyDown={this.emailEnterLinstener} 
                                        onChange={this.onEmailChange}                                         
                                    />
                                    {/* email 填入的欄位*/}
                                </div>
                                <div className="mt3">
                                    <label className="db fw4 lh-copy f6"><FormattedMessage id='password' /></label>
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
                                    {/* email 填入的欄位
                                    onKeyDown會執行按sign up一樣的事情
                                    */}
                                </div>
                            <div className="mt3">
                                <button 
                                    className="tc  f6 w-40 w-20-ns b ph1 ph3-ns pv2 ba b--black bg-transparent grow pointer" 
                                    onClick={this.onSubmitRegister}>
                                        <FormattedMessage id='sign-up' />
                                </button>
                                {/* singin up的按鈕 */}
                            </div>
                            <InvalidInput loginError={this.state.loginError}/>
                            {/* 報錯用的component */}
                    </div>
                    {/* <Credit />
                    作者資訊 */}
                </div>   
            )
        }
        else {
            return(
                <div>                    
                    <Introduction onMoreInfo={this.onMoreInfo} onClickVideo={this.onClickVideo} displayVideo={this.state.displayVideo} />
                    <div className="ba bw1 mt2 mt3-ns mh2 mh5-ns br3-ns">
                        <div className="pa4 black-80">
                            <p className="db fw4 lh-copy f4 fw6"><FormattedMessage id='sign-in' /></p>
                            <div className="mt3">
                                <label className="db fw4 lh-copy f6"><FormattedMessage id='email' /></label>
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
                                <label className="db fw4 lh-copy f6"><FormattedMessage id='password' /></label>
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
                                    className="tc f6 w-40 w-20-ns b ph1 ph3-ns pv2 ba b--black bg-transparent grow pointer" 
                                    onClick={this.onSubmitSignIn}>
                                        <FormattedMessage id='sign-in' />
                                </button>
                                {/* sign in的按鈕 */}
                            </div>
                            <InvalidInput loginError={this.state.loginError}/>
                        </div>              
                    </div>  
                    {/* <Credit />
                    作者資訊                                       */}
                </div> 
            )
        }
    }
}


export default FormSubmit; 