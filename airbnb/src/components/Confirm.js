import React from 'react'
import Nav from '../components/Nav.js'
import Thumbnail from '../components/Thumbnail'
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/gallery.css'
import '../styles/forms.css'
import '../styles/buttons.css'
import '../styles/sidebar.css'


class Confirm extends React.Component {
    state = {
        place: {
            title: 'Duplex with Garden',
            description: 'Entire Duplex • 2 Rooms',
            location: 'Marina',
            id: 0,
            stars: 4,
            reviews: 37,
            bg: 'https://a0.muscache.com/4ea/air/v2/pictures/58f86a91-a526-4e1b-934e-8f6bc3f60e10.jpg',
            nights: 3,
            totalPrice:'$1.050',
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
                            <Thumbnail key={1} place={this.state.place} />
                        </div>
                        <div className="content">
                            <h2>Confirm Booking</h2>
                            <form>
                                <div className="group">
                                    <label>From</label>
                                    <input type="text" value="12/11/2019" />
                                </div>
                                <div className="group">
                                    <label>To</label>
                                    <input type="text" value="15/11/2019" />
                                </div>
                                <div className="group">
                                    <label>Guests</label>
                                    <select>
                                        {[...Array(10)].map((n, i) => {
                                            if(i+1===1)
                                                return <option>{i+1} guest</option>
                                            else if(i+1===4)
                                                return <option selected>{4} guests</option>
                                            else
                                                return <option>{i+1} guests</option>
                                        })}
                                    </select>
                                </div>
                                <div className="group">
                                    <label>Total: {this.state.place.nights} nights</label>
                                    <h2>{this.state.place.totalPrice}</h2>
                                </div>
                                <button className="primary">Confirm</button>
                            </form>
                            <hr />
                            <button>Cancel</button>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}


export default Confirm