import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
    showPassword: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onClickShowPassword = event => {
    this.setState({showPassword: event.target.checked})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({errorMessage: data.error_msg})
    }
  }
  render() {
    const {username, errorMessage, password, showPassword} = this.state
    const passwordType = showPassword ? 'text' : 'password'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-container">
        <div className="image-container">
          <img
            src="https://res.cloudinary.com/djpp4flae/image/upload/v1775027416/Rectangle_1467_oj5cnt.png"
            className="LoginImageDesktop"
            alt="website login"
          />
        </div>
        <div className="login-container">
          <img
            src="https://res.cloudinary.com/djpp4flae/image/upload/v1775027706/Ellipse_99_vimxz5.png"
            className="LoginImageMobile"
            alt="website login"
          />
          <img
            src="https://res.cloudinary.com/djpp4flae/image/upload/v1775028034/Group_7731_qlef3f.png"
            className="logo-image"
            alt="login website logo"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="input-container">
              <label className="label" htmlFor="username">
                Username*
              </label>
              <input
                type="text"
                className="input"
                id="username"
                placeholder="agastya"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <label className="label" htmlFor="password">
                Password*
              </label>
              <input
                type={passwordType}
                id="password"
                className="input"
                placeholder="myth#789"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                onClick={this.onClickShowPassword}
              />
              <label htmlFor="checkbox" className="label checkboxlabel">
                Show Password
              </label>
            </div>
            <button className="login-button">Login</button>
            <p className="err-msg">{errorMessage}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute
