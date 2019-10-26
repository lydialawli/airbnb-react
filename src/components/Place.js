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
            reviews: []
        },
        originalPlace: {},
        userReviewed: false,
        info: [],
        reviews: [],
        images: [],
        bigImage: '',
        selectedGuests: 1,
        bookingDates: {
            startDate: null,
            endDate: null
        },
        guests: 1,
        user: {
            name: '',
            avatar: ''
        },
        userRating: 0,

    }


    UNSAFE_componentWillMount() {
        let token = localStorage.getItem('token')

        // console.log('idPlace => ', this.props.match.params.id)

        axios.get(`${process.env.REACT_APP_API}/auth?token=${token}`)
            .then(res => {
                // console.log('user info ==> ', res.data)
                this.setState({
                    user: res.data,
                })


            })
            .catch(err => { console.log('err==>', err) })


        let place = this.props.match.params.id

        axios.get(`${process.env.REACT_APP_API}/places/${place}`)
            .then(res => {
                console.log("this ==>", res.data.reviews)
                this.setState({
                    place: res.data,
                    images: res.data.images,
                    originalPlace: res.data,
                    amenities: res.data.amenities,
                    info: [
                        { icon: 'fas fa-fw fa-home', about: `${res.data.type.name}` },
                        { icon: 'fas fa-fw fa-user-friends', about: `${res.data.guests} guests` },
                        { icon: 'fas fa-fw fa-bed', about: `${res.data.rooms} bedrooms` },
                        { icon: 'fas fa-fw fa-bath', about: `${res.data.bathrooms} baths` }
                    ],
                    bigImage: res.data.images[0],
                    guests: res.data.guests
                })

            })
            .catch(err => { console.log(err) })

    }


    changeFav = () => {
        let place = this.state.place
        place.fav = !place.fav
        this.setState({ place })
    }

    setUserRating = (i) => {
        this.setState({ userRating: i })
    }

    todayDate = () => {
        let user = this.state.user
        let today = moment(new Date()).format('D MMMM YYYY')

        user.date = today
        this.setState({ user })
    }

    saveUserReview = (event) => {
        let text = event.target.value
     
        let review = {
            author: this.state.user._id,
            rating:this.state.userRating,
            content: text
        }

        this.setState({
            userReviewed: true
        })
    }

    handleSubmitReview = (e) => {
        e.preventDefault()
        this.todayDate()
        let place = this.state.place
        place.reviews.push(this.state.user)

        this.setState({
            place: place,
            userReviewed: true
        })
    }

    goToConfirmPage = () => {
        this.props.history.push({
            pathname: '/confirm',
            bookingDates: this.state.bookingDates,
            selectedGuests: this.state.selectedGuests,
            place: this.state.place
        })
    }

    changeBigImage = (i) => {
        this.setState({
            bigImage: this.state.images[i]
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
                <Gallery images={this.state.images} changeImage={this.changeBigImage} like={this.changeFav} fav={this.state.place.fav} bigImage={this.state.bigImage} />
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
                                            this.state.userReviewed ? <h3>Done!</h3> :
                                                (
                                                    <>
                                                        <label>Leave a review</label>
                                                        <textarea onChange={this.saveUserReview}></textarea>
                                                        <div className="rating" />

                                                        {[...Array(5)].map((n, i) => {
                                                            return i >= this.state.place.rating ? <i key={i} onClick={() => this.setUserRating(i + 1)} className="far fa-star"></i> : <i onClick={() => this.setUserRating(i + 1)} key={i} className="fas fa-star"></i>
                                                        })}
                                                        < button className="primary small" onClick={(e) => this.handleSubmitReview(e)}>Submit</button>
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