import React from 'react'
import '../styles/nav.css'
import '../styles/buttons.css'
import '../styles/users.css'
import {Link} from 'react-router-dom'

class Nav extends React.Component {
    state = {
        logo : '../logo-airbnb.png',
        bgImage: 'https://seakoala.io/docs/images/universeLy.png',
    }

    render() {
        return (
            <nav>
                <Link to="/" className="logo" style={{backgroundImage: `url(${this.state.logo})` }}></Link>
                <div className="profile">
                    <Link to="/profile" className="button">
                        <div className="avatar" style={{backgroundImage: `url(${this.state.bgImage})` }}></div>
                        <span>Ly</span>
                    </Link>
                </div>
            </nav>
        )
    }
}

export default Nav
