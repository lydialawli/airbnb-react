import React from 'react'
import Nav from '../components/Nav.js'
import Sidebar from '../components/Sidebar.js'
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/gallery.css'
import '../styles/forms.css'
import '../styles/buttons.css'


class Profile extends React.Component {
    state = {
        userProfile: 'https://randomuser.me/api/portraits/men/9.jpg',
    }


    render() {
        return (
            <div >
                <div >
                    <Nav />
                </div>
                <div className="grid medium">
                    <div className="grid sidebar-left">
                        <Sidebar />

                        <div className="content">
                            <h2>My Profile</h2>
                            <form>
                                <div className="group">
                                    <label>Name</label>
                                    <input type="text" value="Tony" />
                                </div>
                                <div className="group">
                                    <label>Email</label>
                                    <input type="email" value="tony@tortugacoders.com" />
                                </div>
                                <div className="group">
                                    <label>Location</label>
                                    <input type="text" value="Thailand" />
                                </div>
                                <div className="group">
                                    <label>Profile Picture</label>
                                    <div className="user">
                                        <div className="avatar" style={{ backgroundImage: `url(${this.state.userProfile})` }}></div>
                                        <div className="name">
                                            <input type="file" />
                                        </div>
                                    </div>
                                </div>
                                <button>Save Changes</button>
                            </form>
                            <hr />
                            <button className="secondary">Logout</button>
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}


export default Profile