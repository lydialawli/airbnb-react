import React from 'react'
import Nav from '../components/Nav.js'
import Sidebar from '../components/Sidebar.js'
import { Link } from 'react-router-dom'
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/gallery.css'
import '../styles/forms.css'
import '../styles/buttons.css'


class Create extends React.Component {
    state = {
        userProfile: 'https://randomuser.me/api/portraits/men/9.jpg',
        options: ['Entire Villa', 'Entire House', 'Entire Apartment', 'Private Room', 'Shared Villa', 'Shared House', 'Shared Apartment'],
        amenities: ['Swimming Pool', 'Kitchen', ' Wi-Fi', 'TV', 'Gym', 'Iron', 'Air Conditioning']
    }


    render() {
        return (
            <div >
                <div >
                    <Nav />
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
                                        {this.state.options.map(e => { return <option value="1">{e}</option> })}
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
                                    {this.state.amenities.map(e => {
                                        return (
                                            <label className="checkbox">
                                                <input type="checkbox" /> {e}
                                          </label>
                                        )
                                    })}
                                </div>
                                <button className="primary">Publish this Place</button>
                                <button className="cancel"><i className="fas fa-times"></i></button>
                            </form>

                        </div>
                    </div>
                </div>

            </div >
        )
    }
}


export default Create