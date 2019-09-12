import React from 'react'
import Nav from '../components/Nav.js'
import Thumbnail from '../components/Thumbnail'
import { Link } from 'react-router-dom'
import DatePicker from "react-datepicker"
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/gallery.css'
import '../styles/forms.css'
import '../styles/buttons.css'
import '../styles/sidebar.css'


class Confirm extends React.Component {
    state = {
        page: 'confirm',
        place: {},
        // place: {
        //     title: 'Duplex with Garden',
        //     description: 'Entire Duplex • 2 Rooms',
        //     id: 0,
        //     stars: 4,
        //     reviews: 37,
        //     bg: 'https://a0.muscache.com/4ea/air/v2/pictures/58f86a91-a526-4e1b-934e-8f6bc3f60e10.jpg',
        //     nights: 3,
        //     price: 150,
        //     totalPrice: '$1.050',

        // },
        bookingDates: {
            startDate: null,
            endDate: null
        },
        selectedGuests: 1
    }

    componentWillMount() {
        this.setState({
            bookingDates: this.props.location.bookingDates,
            selectedGuests: this.props.location.selectedGuests,
            place: this.props.location.place
        })
        console.log(this.props.location.selectedGuests)
    }

    handleChange = (date, startOrEnd) => {
        let bookingDates = this.state.bookingDates
        bookingDates[startOrEnd] = date
        this.setState({ bookingDates })
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
                            <Thumbnail key={1} place={this.state.place} page={this.state.page}  id={this.state._id}/>
                        </div>
                        <div className="content">
                            <h2>Confirm Booking</h2>
                            <form>
                                <div className="group">
                                    <label>From</label>
                                    <DatePicker placeholderText="Check-in" selected={this.state.bookingDates.startDate} onChange={(e) => this.handleChange(e, 'startDate')} />

                                </div>
                                <div className="group">
                                    <label>To</label>
                                    <DatePicker placeholderText="Check-out" selected={this.state.bookingDates.endDate} onChange={(e) => this.handleChange(e, 'endDate')} />
                                </div>
                                <div className="group">
                                    <label>Guests</label>
                                    <select  defaultValue={this.state.selectedGuests}>
                                        {[...Array(this.state.place.guests)].map((n, i) => {

                                            if (i + 1 === 1)
                                                return <option  key={i + 1} value={i+1}>{i+1} guest</option>
                                            else
                                                return <option  key={i + 1} value={i+1}>{i + 1} guests</option>
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