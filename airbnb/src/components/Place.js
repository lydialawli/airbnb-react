import React from 'react'
import Nav from '../components/Nav.js'
import Gallery from '../components/Gallery.js'
import ReviewCard from '../components/ReviewCard.js'
import { Link } from 'react-router-dom'
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/users.css'
import '../styles/reviews.css'
import '../styles/cards.css'

import '../styles/sidebar.css'

class Place extends React.Component {
    state = {
        user: { avatar: 'https://seakoala.io/docs/images/universeLy.png', name: 'Ly', location: 'Girona', rating: 0 },
        place: {
            host: { avatar: 'https://randomuser.me/api/portraits/women/2.jpg', name: 'Kitty' },
            title: 'Luxury Villa Indu Siam',
            location: 'Koh Samui, Thailand',
            description: 'Stylish, tropical, luxurious, airy and absolute beach front, this villa combines form and function, enjoying magnificent views of Samui’s small islands and the sea beyond. With 520sqm of indoor/outdoor living space with 5 ensuite bedrooms, large living area, beachfront infinity pool, garden, air conditioned gym, professional pool table, bbq and Sala, this villa is perfect for up to 10 adults With 260sqm (2798sqfeet) of living space and 250sqm (2,700sqfeet) of outdoor space.',
            reviews: [
                {
                    name: 'Ella', date: '27 May 2019', comment: 'It was beyond my imagination that my AirBnB experience could be better than a 5 star resort hotel. It is one of the most beautiful villa that I have had stayed so far in the many countries travelled so far. The pictures have not sufficiently described the details of the place.', rating: 5,
                    avatar: 'https://randomuser.me/api/portraits/women/7.jpg'
                },
                {
                    name: 'Sam', date: '4 July 2019', comment: 'It was beyond my imagination that my AirBnB experience could be better than a 5 star resort hotel. It is one of the most beautiful villa that I have had stayed so far in the many countries travelled so far. The pictures have not sufficiently described the details of the place.', rating: 4,
                    avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
                },
                {
                    name: 'John', date: '22 July 2019', comment: 'It was beyond my imagination that my AirBnB experience could be better than a 5 star resort hotel. It is one of the most beautiful villa that I have had stayed so far in the many countries travelled so far. The pictures have not sufficiently described the details of the place.', rating: 3,
                    avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
                },
                {
                    name: 'Amanda', date: '27 July 2019', comment: 'It was beyond my imagination that my AirBnB experience could be better than a 5 star resort hotel. It is one of the most beautiful villa that I have had stayed so far in the many countries travelled so far. The pictures have not sufficiently described the details of the place.', rating: 5,
                    avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
                }

            ],
            houseInfo: [{ icon: 'fas fa-fw fa-home', about: 'Entire Villa' }, { icon: 'fas fa-fw fa-user-friends', about: '10 guests' }, { icon: 'fas fa-fw fa-bed', about: '7 bedrooms' }, { icon: 'fas fa-fw fa-bath', about: '6 baths' }],
            amenities: [{ icon: 'fas fa-utensils', asset: 'Swimming Pool' }, { icon: 'fas fa-dumbbell', asset: 'Kitchen' }, { icon: 'fas fa-dumbbell', asset: 'Wi-Fi' }, { icon: 'fas fa-tshirt', asset: 'TV' }, { icon: 'fas fa-swimmer', asset: 'Gym' }, { icon: 'fas fa-wind', asset: 'Iron' }, { icon: 'fas fa-tv', asset: 'Air Conditioning' }],
            rating: 4,
            priceOneNight: 350, fav: false,
        },
        thumbnails: [
            'https://q-ak.bstatic.com/images/hotel/max1024x768/186/186223203.jpg',
            'https://q-ak.bstatic.com/images/hotel/max1280x900/186/186223171.jpg',
            'https://r-ak.bstatic.com/images/hotel/max1280x900/186/186223174.jpg',
            'https://r-ak.bstatic.com/images/hotel/max1280x900/186/186223178.jpg',
            'https://q-ak.bstatic.com/images/hotel/max1280x900/186/186223180.jpg',
            'https://q-ak.bstatic.com/images/hotel/max1280x900/186/186223186.jpg',
            'https://r-ak.bstatic.com/images/hotel/max1280x900/186/186223190.jpg',
            'https://q-ak.bstatic.com/images/hotel/max1280x900/186/186223195.jpg',
            'https://q-ak.bstatic.com/images/hotel/max1280x900/186/186223199.jpg'
        ],
        userReviewed: false
    }


    UNSAFE_componentWillMount() {
        this.setState({
            originalPlace: this.state.place
        })
    }


    changeFav = (e) => {
        let place = this.state.place
        place.fav = !place.fav
        this.setState({ place })
    }

    setUserRating = (i) => {
        let user = this.state.user
        user.rating = i

        let today = new Date().toDateString()

        user.date = today

        this.setState({ user })
        console.log(this.state.user)
    }

    saveUserReview = (event) => {
        let text = event.target.value
        let user = this.state.user
        user.comment = text

        this.setState({ user })
        console.log(this.state.user)
    }

    handleSubmit = (e) => {
        e.preventDefault()

        let place = this.state.place
        place.reviews.push(this.state.user)

        this.setState({
            place: place,
            userReviewed: true
        })
    }



    render() {

        return (
            <div>
                <Nav />
                <Gallery images={this.state.thumbnails} like={this.changeFav} fav={this.state.place.fav} />
                <div className="grid medium">
                    <div className="grid sidebar-right">
                        <div className="content">
                            <h1>{this.state.place.title}</h1>
                            <small>
                                <i className="fas fa-map-marker-alt"></i>
                                <span>{this.state.place.location}</span>
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
                                        {this.state.place.houseInfo.map((e, i) => {
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
                                            return <li key={i}> <i key={i} className={e.icon}> </i>{e.asset} </li>
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

                                                        {  [...Array(5)].map((n, i) => {
                                                           return  i >= this.state.user.rating ? <i key={i} onClick={() => this.setUserRating(i + 1)} className="far fa-star"></i> : <i onClick={() => this.setUserRating(i + 1)} key={i} className="fas fa-star"></i>
                                                        })}
                                                            < button className="primary small" onClick={(e) => this.handleSubmit(e)}>Submit</button>
                                                    </>
                                                )
                                        }



                                    </div>
                                </form>
                                <div>{}
                                    {this.state.place.reviews.map((user, i) => {
                                        return <ReviewCard key={i} user={user} />
                                    }).reverse()}
                                </div>
                            </div>


                        </div>
                        <div className="sidebar booking">
                            <div className="card shadow">
                                <div className="content large">
                                    <h3>${this.state.place.priceOneNight}<small>per night</small></h3>
                                    <small>
                                        {[...Array(5)].map((n, i) => i >= this.state.place.rating ? <i key={i} className="far fa-star"></i> : <i key={i} className="fas fa-star"></i>)}
                                        <span>{this.state.place.rating} Reviews</span>
                                    </small>
                                    <form className="small">
                                        <div className="group">
                                            <label>Dates</label>
                                            <input type="text" placeholder="Check-in"></input>
                                            <input type="text" placeholder="Check-out"></input>
                                        </div>
                                        <div className="group">
                                            <label>Guests</label>
                                            <select>
                                                {[...Array(10)].map((n, i) => {
                                                    if (i + 1 === 1)
                                                        return <option key={i}>{i + 1} guest</option>
                                                    else
                                                        return <option key={i}>{i + 1} guests</option>
                                                })}
                                            </select>
                                        </div>
                                        <Link to='/confirm' className="group">
                                            <button className="secondary full">Book this place</button>
                                        </Link>
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

