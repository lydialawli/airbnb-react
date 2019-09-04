import React from 'react'
import Nav from '../components/Nav.js'
import Sidebar from '../components/Sidebar.js'
import { Link } from 'react-router-dom'
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/gallery.css'
import '../styles/forms.css'
import '../styles/buttons.css'


class Profile extends React.Component {
    state = {
        user: { name: 'Ly', avatar: 'https://seakoala.io/docs/images/universeLy.png', email: 'ly@seakoala.io', location: 'Spain' }
    }


    render() {
        return (
            <div >
                <div >
                    <Nav />
                </div>
                <div className="grid medium">
                    <div className="grid sidebar-left">
                        <Sidebar page="profile" />

                        <div className="content">
                            <h2>My Profile</h2>
                            <form>
                                <div className="group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={this.state.user.name} />
                                </div>
                                <div className="group">
                                    <label>Email</label>
                                    <input type="email" defaultValue={this.state.user.email} />
                                </div>
                                <div className="group">
                                    <label>Location</label>
                                    <input type="text" defaultValue={this.state.user.location} />
                                </div>
                                <div className="group">
                                    <label>Profile Picture</label>
                                    <div className="user">
                                        <div className="avatar" style={{ backgroundImage: `url(${this.state.user.avatar})` }}></div>
                                        <div className="name">
                                            <input type="file" />
                                        </div>
                                    </div>
                                </div>
                                <button>Save Changes</button>
                            </form>
                            <hr />
                            <Link to='/login' >
                                <button className="secondary">Logout</button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}


export default Profile