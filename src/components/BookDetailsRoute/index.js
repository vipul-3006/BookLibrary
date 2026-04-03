import {Component} from 'react'
import {BsFillStarFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class BookDetailsRoute extends Component {
  state = {
    apiStatus: apiStatusConstraints.initial,
    bookData: {},
  }

  componentDidMount() {
    this.getBookData()
  }

  getConvertedData = book => ({
    id: book.id,
    authorName: book.author_name,
    coverPic: book.cover_pic,
    aboutBook: book.about_book,
    rating: book.rating,
    readStatus: book.read_status,
    title: book.title,
    aboutAuthor: book.about_author,
  })

  getBookData = async () => {
    this.setState({apiStatus: apiStatusConstraints.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const bookId = id
    const url = `https://apis.ccbp.in/book-hub/books/${bookId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.getConvertedData(data.book_details)
      this.setState({
        bookData: updatedData,
        apiStatus: apiStatusConstraints.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstraints.failure})
    }
  }

  renderBookDetails = () => {
    const {bookData} = this.state
    const {
      authorName,
      coverPic,
      aboutAuthor,
      aboutBook,
      rating,
      readStatus,
      title,
    } = bookData
    return (
      <div className="detailsCard-container">
        <div className="details-container">
          <img src={coverPic} className="coverPic-image" alt={title} />
          <div className="bookDescription-container">
            <h1 className="title-heading">{title}</h1>
            <p className="authorName-book">{authorName}</p>
            <div className="ratings-container">
              <p className="heading-rating">Avg Rating </p>
              <BsFillStarFill className="icon-star" />
              <p className="book-rating">{rating}</p>
            </div>
            <div className="readStatus-container">
              <p className="headingStatus">Status:</p>
              <p className="read-status">{readStatus}</p>
            </div>
          </div>
        </div>
        <hr />
        <h1 className="about-author">About Author</h1>
        <p className="author-description">{aboutAuthor}</p>
        <h1 className="about-book">About Book</h1>
        <p className="book-description">{aboutBook}</p>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="Puff" color="#0284c7" height={50} width={50} />
    </div>
  )

  onClickTryAgain = () => {
    this.getBookData()
  }

  renderFailureView = () => (
    <div className="failureView-container">
      <img
        src="https://res.cloudinary.com/dq1ktqbtb/image/upload/v1668774835/Group_7522_mcny6j.png"
        alt="failure view"
      />
      <p>Something went wrong,Please try again</p>
      <button
        className="tryAgain-button"
        type="button"
        onClick={this.onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderSectionsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstraints.success:
        return this.renderBookDetails()
      case apiStatusConstraints.failure:
        return this.renderFailureView()
      case apiStatusConstraints.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="bookData-container">{this.renderSectionsView()}</div>
        <Footer />
      </>
    )
  }
}

export default BookDetailsRoute
