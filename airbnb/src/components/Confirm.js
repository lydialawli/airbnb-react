import React from 'react'
import Nav from '../components/Nav.js'
import Thumbnail from '../components/Thumbnail'
import { Link } from 'react-router-dom'
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/gallery.css'
import '../styles/forms.css'
import '../styles/buttons.css'
import '../styles/sidebar.css'


class Confirm extends React.Component {
    state = {
        page: 'cofirm',
        place: {
            title: 'Duplex with Garden',
            description: 'Entire Duplex • 2 Rooms',
            id: 0,
            stars: 4,
            reviews: 37,
            bg: 'https://a0.muscache.com/4ea/air/v2/pictures/58f86a91-a526-4e1b-934e-8f6bc3f60e10.jpg',
            nights: 3,
            price: 150,
            totalPrice: '$1.050',
        }
    }



    render() {
        return (
            <div>
                <div>
                    <Nav></Nav>
                </div>
                <div className="grid medium">
                    <div className="grid sidebar-left">
                        <div className="sidebar">
                            <Thumbnail key={1} place={this.state.place} page={this.state.page} />
                        </div>
                        <div className="content">
                            <h2>Confirm Booking</h2>
                            <form>
                                <div className="group">
                                    <label>From</label>
                                    <input type="text" defaultValue="12/11/2019" />
                                </div>
                                <div className="group">
                                    <label>To</label>
                                    <input type="text" defaultValue="15/11/2019" />
                                </div>
                                <div className="group">
                                    <label>Guests</label>
                                    <select defaultValue={'4 guests'}>
                                        {[...Array(10)].map((n, i) => {
                                            if (i + 1 === 1)
                                                return <option key={i}>{i + 1} guest</option>
                                            else
                                                return <option key={i}>{i + 1} guests</option>
                                        })}
                                    </select>
                                </div>
                                <div className="group">
                                    <label>Total: {this.state.place.nights} nights</label>
                                    <h2>{this.state.place.totalPrice}</h2>
                                </div>
                                <Link to='/bookings' >
                                    <button className="primary">Confirm</button>
                                </Link>
                            </form>
                            <hr />
                            <Link to='/place' >
                                <button>Cancel</button>
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}


export default Confirm