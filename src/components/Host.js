import React from 'react'
import Nav from '../components/Nav.js'
import Sidebar from '../components/Sidebar.js'
import Thumbnail from '../components/Thumbnail'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/gallery.css'
import '../styles/forms.css'
import '../styles/buttons.css'


class Host extends React.Component {
    state = {
        page: 'host',
        user: {
            name: '',
            avatar: ''
        },
        places: [],
        token: ''
    }

    UNSAFE_componentWillMount() {
        let token = localStorage.getItem('token')

        if (token) {
            axios.get(`${process.env.REACT_APP_API}/auth?token=${token}`)
                .then(res => {
                    let user = res.data
                    console.log('user', user._id)
                    axios.get(`${process.env.REACT_APP_API}/places?user=${res.data._id}`)
                        .then(res => {
                            console.log('Hostplaces => ', res.data)
                            this.setState({
                                places: res.data,
                                user: user,
                                token: token
                            })
                        })
                })
                .catch(err => { console.log('err==>', err) })
        }
    }

    updateLike = (placeId) => {
        axios.patch(`${process.env.REACT_APP_API}/users?token=${this.state.token}`, {
            place: placeId
        })
            .then(res => {
                console.log('res => ', res.data)

                let user = res.data.user
                let token = res.data.token
                this.setState({ user, token })
                localStorage.setItem('token', token)
            })
            .catch(err => { console.log(err) })
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
                            <Link className="button primary" to="/create">Host new place</Link>
                            <hr />
                            <h2>Places I'm hosting</h2>
                            <div className="grid two">
                                {this.state.places.map((p, i) => {
                                    return (
                                        <Thumbnail key={i} place={p} index={i} page={this.state.page} user={this.state.user} like={this.updateLike} />
                                    )
                                })}
                            </div>

                        </div>
                    </div>
                </div>

            </div >
        )
    }
}


export default Host