import React from 'react'
import Nav from '../components/Nav.js'
import Sidebar from '../components/Sidebar.js'
import { Link } from 'react-router-dom'
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/gallery.css'
import '../styles/forms.css'
import '../styles/buttons.css'
import axios from 'axios'


class Create extends React.Component {
    state = {
        page: 'create',
        userProfile: 'https://randomuser.me/api/portraits/men/9.jpg',
        types: [],
        amenities: [],
        user: {
            name: '',
            avatar: '',
            likes: []
        },
        token: ''
    }
    UNSAFE_componentWillMount() {
        let token = localStorage.getItem('token')

        Promise.all([
            axios.get(`${process.env.REACT_APP_API}/types`),
            axios.get(`${process.env.REACT_APP_API}/auth?token=${token}`),
            axios.get(`${process.env.REACT_APP_API}/amenities`)
        ])
            .then(([types, user, amenities]) => {
                console.log('user ==>', user.data)
                this.setState({
                    types: types.data,
                    user: user.data,
                    token: token,
                    amenities:amenities.data
                })
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <div >
                <div >
                    <Nav user={this.state.user}/>
                </div>
                <div className="grid medium">
                    <div className="grid sidebar-left">
                        <Sidebar page="host" />
                        <div className="content">
                            <h2>Host a new place</h2>
                            <form>
                                <div className="group">
                                    <label>Title</label>
                                    <input type="text" />
                                </div>
                                <div className="group">
                                    <label>Description</label>
                                    <textarea></textarea>
                                </div>
                                <div className="group">
                                    <label>City or Town</label>
                                    <input type="text" />
                                </div>
                                <div className="group">
                                    <label>Country</label>
                                    <input type="text" />
                                </div>
                                <div className="group">
                                    <label>Price per Night (USD)</label>
                                    <input type="number" />
                                </div>
                                <div className="group">
                                    <label>Type</label>
                                    <select>
                                        {this.state.types.map((e,i) => { return <option key={i} defaultValue="1">{e.name}</option> })}
                                    </select>
                                </div>
                                <div className="group">
                                    <label>Number of Rooms</label>
                                    <input type="number" />
                                </div>
                                <div className="group">
                                    <label>Number of Bathrooms</label>
                                    <input type="number" />
                                </div>
                                <div className="group">
                                    <label>Maximum number of Guests</label>
                                    <input type="number" />
                                </div>
                                <div className="group">
                                    <label>Upload Photos</label>
                                    <input type="file" multiple />
                                </div>
                                <div className="group">
                                    <label>Amenities</label>
                                    {this.state.amenities.map((e,i) => {
                                        return (
                                            <label key={i} className="checkbox">
                                                <input type="checkbox" /> {e.name}
                                            </label>
                                        )
                                    })}
                                </div>
                                <Link to='/host' className="group">
                                    <button className="primary">Publish this Place</button>
                                </Link>
                                <Link to='/host' className="group">
                                    <button className="cancel"><i className="fas fa-times"></i></button>
                                </Link>
                            </form>

                        </div>
                    </div>
                </div>

            </div >
        )
    }
}


export default Create