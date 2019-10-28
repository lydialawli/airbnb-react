import React from 'react'
import Nav from '../components/Nav.js'
import Gallery from '../components/Gallery.js'
import ReviewCard from '../components/ReviewCard.js'
import axios from 'axios'
import DatePicker from "react-datepicker"
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css"
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/users.css'
import '../styles/reviews.css'
import '../styles/cards.css'

import '../styles/sidebar.css'

class Place extends React.Component {
    state = {
        place: {
            images: [],
            type: {
                name: ''
            },
            amenities: [
                { name: '', icon: '' }
            ],
            host: {
                avatar: '',
                name: ''
            },
            rating: 0,
            reviews: [],
            guests: 1
        },
        originalPlace: {},
        info: [],
        selectedGuests: 1,
        bookingDates: {
            startDate: null,
            endDate: null
        },
        guests: 1,
        user: {
            name: '',
            avatar: '',
            likes: []
        },
        userReview: {
            rating: 0,
            content: ''
        },
        userReviewed: false,
        errorMsg: '',
        token: ''
    }


    UNSAFE_componentWillMount() {
        let token = localStorage.getItem('token')
        let place = this.props.match.params.id
        let userReviewed = this.state.userReviewed

        // console.log('idPlace => ', this.props.match.params.id)
        Promise.all([
            axios.get(`${process.env.REACT_APP_API}/auth?token=${token}`),
            axios.get(`${process.env.REACT_APP_API}/places/${place}`)
        ])
            .then(([user, place]) => {

                place.data.reviews.forEach(r => {
                    if (r.author._id === this.state.user._id) {
                        userReviewed = true
                    }
                })

                if (user.data._id === place.data.host._id)
                    userReviewed = true

                this.setState({
                    place: place.data,
                    images: place.data.images,
                    originalPlace: place.data,
                    info: [
                        { icon: 'fas fa-fw fa-home', about: `${place.data.type.name}` },
                        { icon: 'fas fa-fw fa-user-friends', about: `${place.data.guests} guests` },
                        { icon: 'fas fa-fw fa-bed', about: `${place.data.rooms} bedrooms` },
                        { icon: 'fas fa-fw fa-bath', about: `${place.data.bathrooms} baths` }
                    ],
                    userReviewed: userReviewed,
                    user: user.data,
                    token: token
                })

            })
            .catch(err => { console.log('err==>', err) })
    }


    updateLike = (placeId) => {
        axios.patch(`${process.env.REACT_APP_API}/users?token=${this.state.token}`, {
            place: placeId
        })
            .then(res => {
                console.log('res => ', res.data)

                let user = res.data.user
                let token = res.data.token
                this.setState({ user, token })
                localStorage.setItem('token', token)
            })
            .catch(err => { console.log(err) })
    }

    setUserRating = (i) => {
        let userReview = this.state.userReview
        userReview.rating = i

        this.setState({ userReview })
    }

    saveUserContent = (event) => {
        let userReview = this.state.userReview

        userReview.content = event.target.value

        this.setState({ userReview })
    }

    showRatingError = () => {
        let errorMsg = "please choose a rating"
        this.setState({ errorMsg })

        setTimeout(() => { this.setState({ errorMsg: '' }) }, 2000)
    }

    handleSubmitReview = (e) => {
        e.preventDefault()

        if (this.state.userReview.rating === 0) {
            this.showRatingError()
        }
        else {
            axios.post(`${process.env.REACT_APP_API}/reviews`, {
                author: this.state.user._id,
                place: this.state.place._id,
                rating: this.state.userReview.rating,
                content: this.state.userReview.content
            })
                .then(review => {
                    let reviews = this.state.place.reviews
                    reviews.push(review.data)

                    this.setState({
                        reviews: reviews,
                        userReviewed: true
                    })
                })
                .catch(err => console.log(err))
        }

    }

    goToConfirmPage = () => {
        this.props.history.push({
            pathname: '/confirm',
            bookingDates: this.state.bookingDates,
            selectedGuests: this.state.selectedGuests,
            place: this.state.place
        })
    }

    handleChange = (date, field) => {
        let bookingDates = this.state.bookingDates
        bookingDates[field] = date
        this.setState({ bookingDates })
    }

    updateGuestState = (e) => {
        this.setState({
            selectedGuests: e.target.value
        })
    }

    render() {

        return (
            <div>
                <Nav user={this.state.user} />
                <Gallery place={this.state.place} user={this.state.user} like={this.updateLike} bigImage={this.state.bigImage} />
                <div className="grid medium">
                    <div className="grid sidebar-right">
                        <div className="content">
                            <h1>{this.state.place.title}</h1>
                            <small>
                                <i className="fas fa-map-marker-alt"></i>
                                <span>{this.state.place.city}, {this.state.place.country}</span>
                            </small>
                            <div className="user">
                                <div className="avatar" style={{ backgroundImage: `url(${this.state.place.host.avatar})` }}></div>
                                <div className="name">
                                    <small>Hosted by</small>
                                    <span>{this.state.place.host.name}</span>
                                </div>
                            </div>
                            <div className="card specs">
                                <div className="content">
                                    <ul className="grid two">
                                        {this.state.info.map((e, i) => {
                                            return <li key={i}><i key={i} className={e.icon}></i>{e.about}</li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <p>{this.state.place.description}</p>
                            <h3>Amenities</h3>
                            <div className="card specs">
                                <div className="content">
                                    <ul className="grid two">
                                        {this.state.place.amenities.map((e, i) => {
                                            return <li key={i}> <i key={i} className={e.icon}> </i>{e.name} </li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="reviews">
                                <h2>{this.state.place.reviews.length} Reviews</h2>
                                <form>
                                    <div className="group">
                                        {
                                            this.state.userReviewed ? '' :
                                                (
                                                    <>
                                                        <label>Leave a review</label>
                                                        <textarea onChange={this.saveUserContent}></textarea>
                                                        <div className="rating" />

                                                        {[...Array(5)].map((n, i) => {
                                                            return i >= this.state.userReview.rating ? <i key={i} onClick={() => this.setUserRating(i + 1)} className="far fa-star"></i> : <i onClick={() => this.setUserRating(i + 1)} key={i} className="fas fa-star"></i>
                                                        })}
                                                        < button className="primary small" onClick={(e) => this.handleSubmitReview(e)}>Submit</button>

                                                        <span style={{ color: "red", margin: "20px" }}>{this.state.errorMsg}</span>
                                                    </>
                                                )
                                        }



                                    </div>
                                </form>
                                <div>
                                    {
                                        this.state.place.reviews.length > 0 ? (this.state.place.reviews.map((review, i) => { return <ReviewCard key={i} review={review} /> }).reverse()) : null
                                    }
                                </div>
                            </div>


                        </div>
                        <div className="sidebar booking">
                            <div className="card shadow">
                                <div className="content large">
                                    <h3>${this.state.place.price}<small>per night</small></h3>
                                    <small>
                                        {[...Array(5)].map((n, i) => i >= this.state.place.rating ? <i key={i} className="far fa-star"></i> : <i key={i} className="fas fa-star"></i>)}
                                        <span>{this.state.place.rating} Reviews</span>
                                    </small>
                                    <form className="small">
                                        <div className="group">
                                            <label>Dates</label>
                                            <DatePicker placeholderText="Check-in" selected={this.state.bookingDates.startDate} onChange={(e) => this.handleChange(e, 'startDate')} />
                                            <DatePicker placeholderText="Check-out" selected={this.state.bookingDates.endDate} onChange={(e) => this.handleChange(e, 'endDate')} />

                                        </div>
                                        <div className="group">
                                            <label>Guests</label>
                                            <select onChange={this.updateGuestState}>
                                                {
                                                    [...Array(this.state.guests)].map((n, i) => {
                                                        if (i + 1 === 1)
                                                            return <option key={i} value={i + 1}>{i + 1} guest</option>
                                                        else
                                                            return <option key={i} value={i + 1}>{i + 1} guests</option>
                                                    })}
                                            </select>
                                        </div>

                                        <button onClick={this.goToConfirmPage} disabled={!this.state.bookingDates.startDate || !this.state.bookingDates.endDate} className="secondary full">Book this place</button>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}


export default Place