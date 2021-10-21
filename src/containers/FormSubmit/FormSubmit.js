import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'
import InvalidInput from '../../components/InvalidInput/InvalidInput';
import Slider from '../../components/Slider/Slider'

class FormSubmit extends Component {
  // 這裡的props是定義，new這個class的時候，也就是這個class在instantiation的時候，會輸入一個parameter給這個props
  constructor(props) {
    // super()是這個class在instantiation的時候，會把原來Component的東西copy一份來
    // 這裡執行super()的時候，還會把收到的props代進去Component裡面
    // 這裡的props會是: isRegister,onSubmit,loadUser, backendURL
    super(props);
    // 記得輸入的姓名、密碼、email、和login錯誤的狀態
    this.state = {
      name: '',
      password: '',
      email: '',
      loginError: false,
    }
  }

  componentDidMount() {
    // 先喚醒後端，才不會送出資料後才喚醒，速度很慢
    fetch(`${this.props.backendURL}/`);
  }
  
  // 所有input的欄位都適用
  // 不同的input設有不同的name對應state的key
  // 所有input的event.target.value可以放進對應的value中
  handleInputChange = (event) => {
    const target = event.target;
    const name = target?.name;
    const value = target.value;
    this.setState({ [name]: value })
  }

  // 註冊或登入的時候把資料傳到後端
  // 收到的response如果有錯，就不會是一個object
  // 如果沒錯，後端就會把使用者資料回傳
  // 如果資料格式正確，就把user載入
  // 有誤就報錯
  handleSubmit = (event) => {
    // 避免refrash
    event.preventDefault();
    // 是register頁面的話就丟register的endpoint，是sigin頁面的話，就丟sigin的endpoint
    // 除此之外，有任何空白，就丟錯誤訊息
    if(this.props.isRegister && this.state.name && this.state.password && this.state.email){
      this.fetchForm('register',this.state)
    } else if (!this.props.isRegister && this.state.password && this.state.email){
      this.fetchForm('signin',this.state)
    } else {
      this.setState({ loginError: true })
    }
  }

  // 丟endpoint和state進去，就把資料送去後端
  fetchForm = (endPoint,data) => {
    // 用post的方式丟去後端
    fetch(`${this.props.backendURL}/${endPoint}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (typeof (res) === 'object') {
          // 設定為已登入
          this.props.onSubmit();
          // 載入使用者資料
          this.props.loadUser(res);
          this.setState({ loginError: false })
        } else {
          // 設定為登入錯誤的狀態
          this.setState({ loginError: true })
        }
      })
      .catch(err => {
        this.setState({ loginError: true })
      })
  }


  render() {
    // 要去註冊網頁的話才render註冊頁
    if (this.props.isRegister) {
      return (
        <section className="ba bw1 mt4 br2 br3-ns">
          <form onSubmit={this.handleSubmit} className="ph3 pt2 pb3 pa4-ns black-80">
            <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 mv3"><FormattedMessage id='sign-up' /></legend>
              <div className="mt3">
                <label className="db fw4 lh-copy f6"><FormattedMessage id='name' /></label>
                {/* name 填入的欄位
                            ref用來讓react能操控這個鈕的focus
                            onKeyDown用來偵測enter鍵
                            onChange用來抓name的完整內容*/}
                <input
                  className="h2 ph2 pv1 f5 input-reset ba bg-transparent w-100 measure"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw4 lh-copy f6"><FormattedMessage id='email' /></label>
                {/* email 填入的欄位*/}
                <input
                  className="h2 ph2 pv1 f5 input-reset ba bg-transparent w-100 measure"
                  type="email"
                  name="email"
                  id="email-address"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw4 lh-copy f6"><FormattedMessage id='password' /></label>
                {/* email 填入的欄位
                            onKeyDown會執行按sign up一樣的事情 */}
                <input
                  className="b h2 ph2 pv1 f5 input-reset ba bg-transparent w-100 measure"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.handleInputChange}
                  autoComplete="off"
                />
              </div>
            </fieldset>
            <div className="mt3">
              {/* singin up的按鈕 */}
              <FormattedMessage id='sign-up' defaultMessage="Sign up">
                {value =>
                  <input
                    type="submit"
                    value={value}
                    className="tc  f6 w-40 w-20-ns b ph1 ph3-ns pv2 ba b--black bg-transparent grow pointer"
                  />
                }
              </FormattedMessage>
            </div>
            {/* 報錯用的component */}
            <InvalidInput loginError={this.state.loginError} />
          </form>
        </section >
      )
    }
    // 不是要去註冊頁，所以就render登入頁
    else {
      return (
        <section>
          <p className=" mt4 dark-blue">
            <FormattedMessage id='introduction' />
          </p>
          <div className="ba bw1 mt4 br2 br3-ns">
            <form onSubmit={this.handleSubmit} className="ph3 pt2 pb3 pa4-ns black-80">
              <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 mv3"><FormattedMessage id='sign-in' /></legend>
                <div className="mt3">
                  <label className="db fw4 lh-copy f6"><FormattedMessage id='email' /></label>
                  <input
                    className="h2 ph2 pv1 f5 input-reset ba bg-transparent w-100 measure"
                    type="email"
                    name="email"
                    id="email-address"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="mt3">
                  <label className="db fw4 lh-copy f6"><FormattedMessage id='password' /></label>
                  <input
                    className="b h2 ph2 pv1 f5 input-reset ba bg-transparent w-100 measure"
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.handleInputChange}
                    autoComplete="off"
                  />
                </div>
              </fieldset>
              <div className="mt3">
                {/* sign in的按鈕 */}
                <FormattedMessage id='sign-in' defaultMessage="Sign in">
                  {value =>
                    <input
                      type="submit"
                      value={value}
                      className="tc f6 w-40 w-30-ns mw4 b ph1 ph3-ns pv2 ba b--black bg-transparent grow pointer"
                    />
                  }
                </FormattedMessage>
              </div>
              <InvalidInput loginError={this.state.loginError} />
            </form>
          </div>
          <Slider />
        </section>
      )
    }
  }
}


export default FormSubmit;