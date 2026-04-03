import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {MdMenu} from 'react-icons/md'
import {AiOutlineClose} from 'react-icons/ai'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {
    isToggle: false,
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onClickClose = () => {
    this.setState(prevState => ({
      isToggle: !prevState.isToggle,
    }))
  }

  onClickMenu = () => {
    this.setState(prevState => ({
      isToggle: !prevState.isToggle,
    }))
  }

  render() {
    const {isToggle} = this.state
    return (
      <nav className="navbar">
        <div className="header-responsive-navbar">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/diocftr6t/image/upload/v1651940745/Group_7731Website_Logo_o1zltx.png"
              className="website-logo"
              alt="Website logo"
            />
          </Link>
          <ul className="nav-items-container">
            <Link to="/" className="nav-links">
              <li className="nav-text">Home</li>
            </Link>
            <Link to="/shelf" className="nav-links">
              <li className="activeShelves">BookShelves</li>
            </Link>
            <Link to="/login" className="nav-links">
              <li className="nav-text">
                <button
                  className="logout-button"
                  type="button"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
              </li>
            </Link>
          </ul>
          <button
            className="menu-icon"
            type="button"
            onClick={this.onClickMenu}
          >
            <MdMenu className="nav-text" size={20} />
          </button>
        </div>
        {isToggle && (
          <ul className="mobile-nav-items-container">
            <Link to="/" className="nav-links">
              <li className="nav-text">Home</li>
            </Link>
            <Link to="/shelf" className="nav-links">
              <li className="activeShelves">BookShelves</li>
            </Link>
            <Link to="/login" className="nav-links">
              <li className="nav-text">
                <button
                  className="logout-button"
                  type="button"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
              </li>
            </Link>
            <button
              type="button"
              className="close-icon"
              onClick={this.onClickClose}
            >
              <AiOutlineClose className="nav-text" size={20} />
            </button>
          </ul>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
