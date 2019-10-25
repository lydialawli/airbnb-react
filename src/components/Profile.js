import React from 'react'
import Nav from '../components/Nav.js'
import Sidebar from '../components/Sidebar.js'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/gallery.css'
import '../styles/forms.css'
import '../styles/buttons.css'


class Profile extends React.Component {
    state = {
        user: {
            name: '',
            avatar: '',
            email: '',
            location: ''
        }
    }

    UNSAFE_componentWillMount() {
        let token = localStorage.getItem('token')

        if (token) {
            axios.get(`${process.env.REACT_APP_API}/auth?token=${token}`)
                .then(res => {
                    console.log('user info ==> ', res.data)
                    this.setState({
                        user: res.data,
                    })
                })
                .catch(err => { console.log('err==>', err) })
        }
    }

    logout = () => {
        localStorage.removeItem('token')
        // this.props.history.push({
        // 	pathname: '/'
        // })
    }

    render() {
        return (
            <div >
                <div >
                    <Nav user={this.state.user}/>
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
                            <Link to="/">
                                <button className="secondary" onClick={this.logout}>Logout</button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}


export default Profile