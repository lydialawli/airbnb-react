import React from 'react'
import Nav from '../components/Nav.js'
import Gallery from '../components/Gallery.js'
import ReviewCard from '../components/ReviewCard.js'
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/users.css'
import '../styles/reviews.css'
import '../styles/cards.css'

import '../styles/sidebar.css'

class Place extends React.Component {
    state = {
        place: {
            host: { avatar: 'https://randomuser.me/api/portraits/women/2.jpg', name: 'Kitty' },
            title: 'Luxury Villa Indu Siam',
            location: 'Koh Samui, Thailand',
            description: 'Stylish, tropical, luxurious, airy and absolute beach front, this villa combines form and function, enjoying magnificent views of Samui’s small islands and the sea beyond. With 520sqm of indoor/outdoor living space with 5 ensuite bedrooms, large living area, beachfront infinity pool, garden, air conditioned gym, professional pool table, bbq and Sala, this villa is perfect for up to 10 adults With 260sqm (2798sqfeet) of living space and 250sqm (2,700sqfeet) of outdoor space.',
            reviews: [
                {
                    name: 'Amanda', date: '27 July 2019', comment: 'It was beyond my imagination that my AirBnB experience could be better than a 5 star resort hotel. It is one of the most beautiful villa that I have had stayed so far in the many countries travelled so far. The pictures have not sufficiently described the details of the place.', rating: 5,
                    avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
                },
                {
                    name: 'John', date: '22 July 2019', comment: 'It was beyond my imagination that my AirBnB experience could be better than a 5 star resort hotel. It is one of the most beautiful villa that I have had stayed so far in the many countries travelled so far. The pictures have not sufficiently described the details of the place.', rating: 3,
                    avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
                },
                {
                    name: 'Sam', date: '4 July 2019', comment: 'It was beyond my imagination that my AirBnB experience could be better than a 5 star resort hotel. It is one of the most beautiful villa that I have had stayed so far in the many countries travelled so far. The pictures have not sufficiently described the details of the place.', rating: 4,
                    avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
                },
                {
                    name: 'Ella', date: '27 May 2019', comment: 'It was beyond my imagination that my AirBnB experience could be better than a 5 star resort hotel. It is one of the most beautiful villa that I have had stayed so far in the many countries travelled so far. The pictures have not sufficiently described the details of the place.', rating: 5,
                    avatar: 'https://randomuser.me/api/portraits/women/7.jpg'
                },
            ],
            houseInfo: [{ icon: 'fas fa-fw fa-home', about: 'Entire Villa' }, { icon: 'fas fa-fw fa-user-friends', about: '10 guests' }, { icon: 'fas fa-fw fa-bed', about: '7 bedrooms' }, { icon: 'fas fa-fw fa-bath', about: '6 baths' }],
            amenities: [{ icon: 'fas fa-utensils', asset: 'Swimming Pool' }, { icon: 'fas fa-dumbbell', asset: 'Kitchen' }, { icon: 'fas fa-dumbbell', asset: 'Wi-Fi' }, { icon: 'fas fa-tshirt', asset: 'TV' }, { icon: 'fas fa-swimmer', asset: 'Gym' }, { icon: 'fas fa-wind', asset: 'Iron' }, { icon: 'fas fa-tv', asset: 'Air Conditioning' }],
            rating: 4,
            priceOneNight: 350
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

    }

    render() {
        return (
            <div>
                <Nav />
                <Gallery images={this.state.thumbnails}/>
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
                                        {this.state.place.houseInfo.map(e => {
                                            return <li><i className={e.icon}></i>{e.about}</li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <p>{this.state.place.description}</p>
                            <h3>Amenities</h3>
                            <div className="card specs">
                                <div className="content">
                                    <ul className="grid two">
                                        {this.state.place.amenities.map(e => {
                                            return <li><i className={e.icon}></i>{e.asset}</li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="reviews">
                                <h2>{this.state.place.reviews.length} Reviews</h2>
                                <form>
                                    <div className="group">
                                        <label>Leave a review</label>
                                        <textarea></textarea>
                                        <div className="rating">
                                            {[...Array(5)].map(n => { return <i className="far fa-star"></i> })}
                                        </div>
                                        <button className="primary small">Submit</button>
                                    </div>
                                </form>
                                <div>
                                    {this.state.place.reviews.map((user, i) => {
                                        return <ReviewCard key={i} user={user} />
                                    })}
                                </div>
                            </div>


                        </div>
                        <div className="sidebar booking">
                            <div className="card shadow">
                                <div className="content large">
                                    <h3>${this.state.place.priceOneNight}<small>per night</small></h3>
                                    <small>
                                        {[...Array(5)].map((n, i) => i >= this.state.place.rating ? <i className="far fa-star"></i> : <i className="fas fa-star"></i>)}
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
                                                        return <option>{i + 1} guest</option>
                                                    else
                                                        return <option>{i + 1} guests</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="group">
                                            <button className="secondary full">Book this place</button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Place