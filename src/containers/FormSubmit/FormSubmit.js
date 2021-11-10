import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux';
import InvalidInput from '../../components/InvalidInput/InvalidInput';
import Slider from '../../components/Slider/Slider'
import { backendURL } from '../App/constants';

import {
  requestFormChange,
  requestFormSubmit,
  requestClear,
} from './actions'

const mapStatesToProps = (state) => (
  {
    // 記錄是否要去登錄的頁面
    isRegister: state.formReducer.isRegister,
    // 記錄是否輸入錯誤
    loginError: state.formReducer.loginError,
  }
)
const mapDispatchToProps = (dispatch) => (
  {
    // 監聽輸入的內容
    handleInputChange: (event) => dispatch(requestFormChange(event)),
    // 監聽送出鍵是不是被按了
    handleSubmit: (event) => dispatch(requestFormSubmit(event)),
    // 把輸入錯誤的狀態清除
    clearMessage: () => dispatch(requestClear()),
  }
)

class FormSubmit extends Component {

  // 沒有local state，也沒有component載入前要執行的東西，就可以不用constructor了。

  componentDidMount() {
    // 先喚醒後端，才不會送出資料後才喚醒，速度很慢
    fetch(`${backendURL}/`);
  }

  // 避免unmount component之後才去因更動state而無法render
  componentWillUnmount() {
    this.props.clearMessage();
  }

  render() {

    const {
      isRegister,
      loginError,
      handleSubmit,
      handleInputChange,
    } = this.props;

    return (
      <section>
        {
          // 註冊頁不顯示簡介
          isRegister ?
            null
            :
            (<p className=" mt4 dark-blue">
              <FormattedMessage id='introduction' />
            </p>)
        }
        <div className="ba bw1 mt4 br2 br3-ns">
          <form onSubmit={handleSubmit} className="ph3 pt2 pb3 pa4-ns black-80">
            <fieldset id="login" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 mv3">
                <FormattedMessage id={isRegister ? 'sign-up' : 'sign-in'} />
              </legend>
              {
                // 註冊頁不顯示name
                isRegister ?
                  (
                    <div className="mt3">
                      <label htmlFor="name" className="db fw4 lh-copy f6"><FormattedMessage id='name' /></label>
                      {/* name 填入的欄位 */}
                      <input
                        className="h2 ph2 pv1 f5 input-reset ba bg-transparent w-100 measure"
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleInputChange}
                      />
                    </div>
                  )
                  :
                  null
              }
              <div className="mt3">
                <label htmlFor="email-address" className="db fw4 lh-copy f6"><FormattedMessage id='email' /></label>
                {/* email 填入的欄位*/}
                <input
                  className="h2 ph2 pv1 f5 input-reset ba bg-transparent w-100 measure"
                  type="email"
                  name="email"
                  id="email-address"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt3">
                <label htmlFor="password" className="db fw4 lh-copy f6"><FormattedMessage id='password' /></label>
                {/* password 填入的欄位*/}
                <input
                  className="b h2 ph2 pv1 f5 input-reset ba bg-transparent w-100 measure"
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleInputChange}
                  autoComplete="off"
                />
              </div>
            </fieldset>
            <div className="mt3">
              {/* login的按鈕 */}
              <FormattedMessage id={isRegister ? 'sign-up' : 'sign-in'} defaultMessage={isRegister ? 'Sign up' : 'Sign in'}>
                {value =>
                  <input
                    type="submit"
                    name="submit"
                    value={value}
                    className="tc f6 w-40 w-20-ns b ph1 ph3-ns pv2 ba b--black bg-transparent grow pointer"
                  />
                }
              </FormattedMessage>
            </div>
            {/* 報錯用的component */}
            <InvalidInput loginError={loginError} />
          </form>
        </div>
        {
          // 註冊頁不顯示輪播
          isRegister ?
            null
            :
            <Slider />
        }
      </section >
    )
  }
}
// 和store連接
export default connect(mapStatesToProps, mapDispatchToProps)(FormSubmit);