import React from 'react'
import Nav from '../components/Nav.js'
import Thumbnail from '../components/Thumbnail'
import StripeForm from '../components/StripeForm'
import { Link } from 'react-router-dom'
import DatePicker from "react-datepicker"
import { Elements, StripeProvider } from 'react-stripe-elements'
import moment from "moment"
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
        bookingDates: {
            startDate: null,
            endDate: null
        },
        selectedGuests: 1,
        closePayment: false,
        totalNights: 1
    }

    UNSAFE_componentWillMount() {
        this.setState({
            bookingDates: this.props.location.bookingDates,
            selectedGuests: this.props.location.selectedGuests,
            place: this.props.location.place,
            totalNights: this.calcNights(this.props.location.bookingDates.startDate, this.props.location.bookingDates.endDate)
        })
        console.log(this.props.location.bookingDates)
    }

    handleChange = (date, startOrEnd) => {
        let bookingDates = this.state.bookingDates
        bookingDates[startOrEnd] = date
        this.setState({ bookingDates })
        let totaNights = this.calcNights(this.state.bookingDates.startDate, this.state.bookingDates.endDate)
        this.setState({ totaNights })
    }

    closePanel = () => {
        this.setState({
            closePayment: true
        })
    }

    calcNights = (date1,date2) => {
        let a = moment(date1)
        let b = moment(date2)
       return b.diff(a,'days')
     
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
                            <Thumbnail key={1} place={this.state.place} page={this.state.page} id={this.state.place._id} />
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
                                    <select defaultValue={this.state.selectedGuests}>
                                        {[...Array(this.state.place.guests)].map((n, i) => {

                                            if (i + 1 === 1)
                                                return <option key={i + 1} value={i + 1}>{i + 1} guest</option>
                                            else
                                                return <option key={i + 1} value={i + 1}>{i + 1} guests</option>
                                        })}
                                    </select>
                                </div>
                                <div className="group">
                                    <label>Total: {this.state.totalNights} nights</label>
                                    <h2>${this.state.place.price*this.state.totalNights}</h2>
                                </div>
                                <Link to='/bookings' >
                                    <button className="primary">Confirm</button>
                                </Link>
                            </form>
                            <hr />
                            {/* <Link to='/place' > */}
                            <button onClick={() => this.props.history.goBack()}>Cancel</button>
                            {/* </Link> */}
                        </div>

                    </div>
                </div>
                {!this.state.closePayment ?
                    (<StripeProvider apiKey="pk_test_nffKwuVlBG3bE3i0W1XEc6v9009tuLnrDk">
                        <div className="stripe-form">
                            <Elements>
                                <StripeForm amount={(this.state.place.price*this.state.totalNights)*100} description={this.state.place.title} onPaid={this.closePanel} />
                            </Elements>
                        </div>
                    </StripeProvider>) : <></>}

            </div>
        )
    }
}


export default Confirm