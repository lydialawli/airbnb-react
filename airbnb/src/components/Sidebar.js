import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/buttons.css'
import '../styles/sidebar.css'
import '../styles/grid.css'

class Sidebar extends React.Component {
    state = {
        pressedButton: this.props.page
    }

    setActiveButton = (button) => {
        return this.state.pressedButton === button ? 'active' : ''
    }

    render() {

        return (
            <div className="sidebar">
                <ul>
                    <li className={this.setActiveButton('profile')}>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li className={this.setActiveButton('bookings')}>
                        <Link to="/bookings">Bookings</Link>
                    </li>
                    <li className={this.setActiveButton('favorites')}>
                        <Link to="/favorites">Favorites</Link>
                    </li>
                    <li className={this.setActiveButton('host')}>
                        <Link to="/host">Host</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Sidebar