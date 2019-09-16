import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/buttons.css'
import '../styles/sidebar.css'
import '../styles/grid.css'

class Sidebar extends React.Component {
    state = {
        pressedButton: this.props.page
    }

    render() {

        return (
            <div className="sidebar">
                <ul>
                    <li className={this.state.pressedButton === 'profile' ? 'active' : ''}>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li className={this.state.pressedButton === 'bookings' ? 'active' : ''}>
                        <Link to="/bookings">Bookings</Link>
                    </li>
                    <li className={this.state.pressedButton === 'favorites' ? 'active' : ''}>
                        <Link to="/favorites">Favorites</Link>
                    </li>
                    <li className={this.state.pressedButton === 'host' ? 'active' : ''}>
                        <Link to="/host">Host</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Sidebar