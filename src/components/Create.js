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
        token: '',
        place: {
            title: '',
            description: '',
            type: '',
            city: '',
            country: '',
            price: 0,
            rooms: 0,
            rating: 0,
            guests: 0,
            bathrooms: 0,
            host: '',
            images: [],
            amenities: []
        },
        errorMsg: '',
    }

    UNSAFE_componentWillMount() {
        let token = localStorage.getItem('token')

        Promise.all([
            axios.get(`${process.env.REACT_APP_API}/types`),
            axios.get(`${process.env.REACT_APP_API}/auth?token=${token}`),
            axios.get(`${process.env.REACT_APP_API}/amenities`)
        ])
            .then(([types, user, amenities]) => {
                let t = types.data.reverse()
                t[0] = {name:'Choose Type',_id:''}
                this.setState({
                    types: t,
                    user: user.data,
                    token: token,
                    amenities: amenities.data
                })
            })
            .catch(err => console.log(err))
    }
    changeField = (e, field) => {
        let place = this.state.place
        if (field === 'amenities') {
            let a = e.target.value
            if (place.amenities.includes(a)) {
                place.amenities = place.amenities.filter(x => x !== a)
            }
            else {
                place.amenities.push(a)
            }
        }
        else {
            place[field] = e.target.value
        }
        console.log("newPlace =>", place)
        this.setState({ place })
    }

    publish = (e) => {
        e.preventDefault()
        let fields = ['title', 'description', 'city', 'country', 'price', 'type', 'rooms', 'bathrooms', 'guests']
        let error = fields.forEach(f => {
            if (this.state.place[f] === '' || this.state.place[f] === 0) {
                this.setState({
                    errorMsg: 'missing fields'
                })
                setTimeout(() => { this.setState({ errorMsg: '' }) }, 4000)
                return true
            }
            else { return false }
        })

        if (!error) {
            let place = this.state.place
            place.host = this.state.user._id

            axios.post(`${process.env.REACT_APP_API}/places`, place).then(res => {
                if (!res.data) {
                    this.setState({
                        errorMsg: 'please modify some fields'
                    })
                }
                else {
                    this.props.history.push({
                        pathname: `/host`
                    })
                    console.log(res.data)
                }
            })
        }
    }

    render() {
        return (
            <div >
                <div >
                    <Nav user={this.state.user} />
                </div>
                <div className="grid medium">
                    <div className="grid sidebar-left">
                        <Sidebar page="host" />
                        <div className="content">
                            <h2>Host a new place</h2>
                            <form onSubmit={this.publish}>
                                <div className="group">
                                    <label>Title</label>
                                    <input type="text" onChange={(e) => this.changeField(e, 'title')} />
                                </div>
                                <div className="group">
                                    <label>Description</label>
                                    <textarea onChange={(e) => this.changeField(e, 'description')}></textarea>
                                </div>
                                <div className="group">
                                    <label>City or Town</label>
                                    <input type="text" onChange={(e) => this.changeField(e, 'city')} />
                                </div>
                                <div className="group">
                                    <label>Country</label>
                                    <input type="text" onChange={(e) => this.changeField(e, 'country')} />
                                </div>
                                <div className="group">
                                    <label>Price per Night (USD)</label>
                                    <input type="number" onChange={(e) => this.changeField(e, 'price')} />
                                </div>
                                <div className="group">
                                    <label>Type</label>
                                    <select onChange={(e) => this.changeField(e, 'type')}>
                                        {this.state.types.map((e, i) => { return <option key={i} value={e._id} >{e.name}</option> })}
                                    </select>
                                </div>
                                <div className="group">
                                    <label>Number of Rooms</label>
                                    <input type="number" onChange={(e) => this.changeField(e, 'rooms')} />
                                </div>
                                <div className="group">
                                    <label>Number of Bathrooms</label>
                                    <input type="number" onChange={(e) => this.changeField(e, 'bathrooms')} />
                                </div>
                                <div className="group">
                                    <label>Maximum number of Guests</label>
                                    <input type="number" onChange={(e) => this.changeField(e, 'guests')} />
                                </div>
                                <div className="group">
                                    <label>Upload Photos</label>
                                    <input type="file" multiple />
                                </div>
                                <div className="group">
                                    <label>Amenities</label>
                                    {this.state.amenities.map((e, i) => {
                                        return (
                                            <label key={i} className="checkbox">
                                                <input value={e._id} type="checkbox" onChange={(e) => this.changeField(e, 'amenities')} /> {e.name}
                                            </label>
                                        )
                                    })}
                                </div>

                                <button className="primary">Publish this Place</button>
                                <span style={{ color: "red" }}>{this.state.errorMsg}</span>

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