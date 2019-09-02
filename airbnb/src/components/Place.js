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
        hostAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        hostName: 'Kitty',
        location: 'Koh Samui, Thailand',
        title: 'Luxury Villa Indu Siam',
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
        ]
    }

    render() {
        return (
            <div>
                <Nav />
                <Gallery />
                <div className="grid medium">
                    <div className="grid sidebar-right">
                        <div className="content">
                            <h1>{this.state.title}</h1>
                            <small>
                                <i className="fas fa-map-marker-alt"></i>
                                <span>{this.state.location}</span>
                            </small>
                            <div className="user">
                                <div className="avatar" style={{ backgroundImage: `url(${this.state.hostAvatar})` }}></div>
                                <div className="name">
                                    <small>Hosted by</small>
                                    <span>{this.state.hostName}</span>
                                </div>
                            </div>
                            <div className="card specs">
                                <div className="content">
                                    <ul className="grid two">
                                        <li><i className="fas fa-fw fa-home"></i>Entire Villa</li>
                                        <li><i className="fas fa-fw fa-user-friends"></i>10 guests</li>
                                        <li><i className="fas fa-fw fa-bed"></i>7 bedrooms</li>
                                        <li><i className="fas fa-fw fa-bath"></i>6 baths</li>
                                    </ul>
                                </div>
                            </div>
                            <p>{this.state.description}</p>
                            <h3>Amenities</h3>
                            <div className="card specs">
                                <div className="content">
                                    <ul className="grid two">
                                        <li><i className="fas fa-utensils"></i>Kitchen</li>
                                        <li><i className="fas fa-dumbbell"></i>Gym</li>
                                        <li><i className="fas fa-dumbbell"></i>Wi-Fi</li>
                                        <li><i className="fas fa-tshirt"></i>Iron</li>
                                        <li><i className="fas fa-swimmer"></i>Swimming Pool</li>
                                        <li><i className="fas fa-wind"></i>Air Conditioning</li>
                                        <li><i className="fas fa-tv"></i>TV</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="reviews">
                                <h2>{this.state.reviews.length} Reviews</h2>
                                <form>
                                    <div className="group">
                                        <label>Leave a review</label>
                                        <textarea></textarea>
                                        <div className="rating">
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                            <i className="far fa-star"></i>
                                        </div>
                                        <button className="primary small">Submit</button>
                                    </div>
                                </form>
                                <div>
                                    {this.state.reviews.map((user,i) => {
                                        return  <ReviewCard key={i} user={user}/>
                                    })}
                                </div>
                            </div>
                           

                        </div>
                        <div className="sidebar booking">
                            <div className="card shadow">
                                <div className="content large">
                                    <h3>$350<small>per night</small></h3>
                                    <small>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="far fa-star"></i>
                                        <span>4 Reviews</span>
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
                                                <option>1 guest</option>
                                                <option>2 guests</option>
                                                <option>3 guests</option>
                                                <option>4 guests</option>
                                                <option>5 guests</option>
                                                <option>6 guests</option>
                                                <option>7 guests</option>
                                                <option>8 guests</option>
                                                <option>9 guests</option>
                                                <option>10 guests</option>
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