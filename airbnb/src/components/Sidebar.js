import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/buttons.css'
import '../styles/sidebar.css'
import '../styles/grid.css'

class Sidebar extends React.Component {
    render() {

        return (
            <div className="sidebar">
                <ul>
                    <li className="active">
                        <Link tp="/profile">Profile</Link>
                    </li>
                    <li className="">
                        <Link to="/bookings">Bookings</Link>
                    </li>
                    <li className="">
                        <Link to="/favorites">Favorites</Link>
                    </li>
                    <li className="">
                        <Link to="/host">Host</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Sidebar