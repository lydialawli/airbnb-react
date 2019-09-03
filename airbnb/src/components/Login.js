import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/global.css'
import '../styles/grid.css'
import '../styles/users.css'
import '../styles/reviews.css'
import '../styles/forms.css'
import '../styles/buttons.css'

class Login extends React.Component {
    state = {
        logo: './logo-airbnb.png'
    }

    render() {
        return (<div className="grid center middle tall image">
            <div className="card small">
                <div className="content">
                    <div className="logo" style={{ backgroundImage: `url(${this.state.logo})` }}></div>
                    <form>
                        <div className="group">
                            <label>Email</label>
                            <input type="email" />
                        </div>
                        <div className="group">
                            <label>Password</label>
                            <input type="password" />
                        </div>
                        <button className="primary">Login</button>
                    </form>
                    <p className="footer">
                    New to Airbnb?  <Link to="/signup">Signup</Link>
                    </p>
                </div>
            </div>
        </div>)
    }

}

export default Login