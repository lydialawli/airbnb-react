import React from 'react'
import '../styles/nav.css'
import '../styles/buttons.css'
import '../styles/users.css'
import {Link} from 'react-router-dom'

class Nav extends React.Component {
    state = {
        logo : '../logo-airbnb.png',
        user: {avatar: 'https://seakoala.io/docs/images/universeLy.png', name: 'Ly'}
    }

    render() {
        return (
            <nav>
                <Link to="/" className="logo" style={{backgroundImage: `url(${this.state.logo})` }}></Link>
                <div className="profile">
                    <Link to="/profile" className="button">
                        <div className="avatar" style={{backgroundImage: `url(${this.state.user.avatar})` }}></div>
                        <span>{this.state.user.name}</span>
                    </Link>
                </div>
            </nav>
        )
    }
}

export default Nav
