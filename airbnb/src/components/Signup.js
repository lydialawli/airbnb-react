import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/global.css'
import '../styles/grid.css'
import '../styles/users.css'
import '../styles/reviews.css'
import '../styles/forms.css'
import '../styles/buttons.css'

class Signup extends React.Component {
    state = {
        logo: './logo-airbnb.png',
        bg: './thailand.jpg'
    }

    render() {
        return (<div className="grid center middle tall image" style={{ backgroundImage: `url(${this.state.bg})` }}>
            <div className="card small">
                <div className="content">
                    <div className="logo" style={{ backgroundImage: `url(${this.state.logo})` }}></div>
                    <form>
                        <div className="group">
                            <label>Name</label>
                            <input type="text" />
                        </div>
                        <div className="group">
                            <label>Email</label>
                            <input type="email" />
                        </div>
                        <div className="group">
                            <label>Password</label>
                            <input type="password" />
                        </div>
                        <div className="group">
                            <label>Location</label>
                            <input type="text" />
                        </div>
                        <div className="group">
                            <label>Profile Picture</label>
                            <input type="file" />
                        </div>
                        <button className="primary">Signup</button>
                    </form>
                    <p className="footer">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>)
    }

}

export default Signup