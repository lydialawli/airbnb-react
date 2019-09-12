import React from 'react'
import Nav from '../components/Nav.js'
import Gallery from '../components/Gallery.js'
import ReviewCard from '../components/ReviewCard.js'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/users.css'
import '../styles/reviews.css'
import '../styles/cards.css'

import '../styles/sidebar.css'

class Place extends React.Component {
    state = {
        place: {},
        originalPlace: {},
        host: {},
        amenities: [],
        userReviewed: false,
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        info: [],
        reviews: [],
        images: [],
        bigImage: '',
        guests: 1,
        bookingDates: {
            startDate: null,
            endDate: null
        }
       
    }


    componentWillMount() {
        axios.get(`http://localhost:5000/reviews/${this.props.match.params.id}`)
            .then(res => {
                // console.log('reviews: ', res.data)
                this.setState({
                    reviews: res.data,
                })
                // console.log(res.data)
            })
            .catch(err => { console.log(err) })

        axios.get(`http://localhost:5000/places/${this.props.match.params.id}`)
            .then(res => {
                // console.log("==>", res.data.amenities)
                this.setState({
                    place: res.data,
                    images: res.data.images,
                    originalPlace: res.data,
                    host: res.data.host,
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
        let user = this.state.user
        user.rating = i

        this.setState({ user })
        console.log(this.state.user)
    }

    todayDate = () => {
        let user = this.state.user

        let today = new Date()
        let dd = today.getDate()
        let mm = today.getMonth()
        let yyyy = today.getFullYear()
        today = dd + ' ' + this.state.months[mm] + ' ' + yyyy

        user.date = today
        this.setState({ user })
    }

    saveUserReview = (event) => {
        let text = event.target.value
        let user = this.state.user
        user.comment = text

        this.setState({ user })
        console.log(this.state.user)
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

    goToConfirmPage = () =>{
        this.props.history.push({
            pathname: `/confirm`,
            bookingDates: this.state.bookingDates
        })
    }

    changeBigImage = (i) => {
        this.setState({
            bigImage: this.state.images[i]
        })
    }

    handleChange = (date, startOrEnd) => {
        let bookingDates = this.state.bookingDates
        bookingDates[startOrEnd] = date
        this.setState({bookingDates})
      }

    render() {

        return (
            <div>
                <Nav />
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
                                <div className="avatar" style={{ backgroundImage: `url(${this.state.host.avatar})` }}></div>
                                <div className="name">
                                    <small>Hosted by</small>
                                    <span>{this.state.host.name}</span>
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
                                        {this.state.amenities.map((e, i) => {
                                            return <li key={i}> <i key={i} className={e.icon}> </i>{e.name} </li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="reviews">
                                <h2>{this.state.place.reviews} Reviews</h2>
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
                                <div>{}
                                    {this.state.reviews.map((review, i) => {
                                        return <ReviewCard key={i} review={review} />
                                    }).reverse()}
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
                                            <DatePicker placeholderText="Check-in" selected={this.state.bookingDates.startDate} onChange={(e)=>this.handleChange(e,'startDate')}/>
                                            <DatePicker placeholderText="Check-out" selected={this.state.bookingDates.endDate} onChange={(e)=>this.handleChange(e,'endDate')}/>
                                            
                                        </div>
                                        <div className="group">
                                            <label>Guests</label>
                                            <select>
                                                {
                                                    [...Array(this.state.guests)].map((n, i) => {
                                                        if (i + 1 === 1)
                                                            return <option key={i}>{i + 1} guest</option>
                                                        else
                                                            return <option key={i}>{i + 1} guests</option>
                                                    })}
                                            </select>
                                        </div>
                                        {/* <Link to='/confirm' className="group"> */}
                                            <button onClick={this.goToConfirmPage} className="secondary full">Book this place</button>
                                        {/* </Link> */}
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