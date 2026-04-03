import {Link} from 'react-router-dom'
import './index.css'

const NotFoundRoute = () => (
  <div className="notFound-container">
    <img
      src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1668772192/Group_7484_azgjvb.jpg"
      alt="Not Found"
    />
    <h1 className="notFound-heading">Page Not Found</h1>
    <p className="notFound-description">
      we are sorry,the page you requested could not be found
    </p>
    <Link to="/">
      <button className="tryAgain-button" type="button">
        Go Back to Home
      </button>
    </Link>
  </div>
)
export default NotFoundRoute
