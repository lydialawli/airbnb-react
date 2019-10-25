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
        places: [
            {
                title: 'Villa Kelusa',
                description: 'Entire Villa • 6 Rooms',
                price: 190,
                location: 'Bali, Indonesia',
                id: 1,
                stars: 3,
                reviews: 18,
                bg: 'https://a0.muscache.com/4ea/air/v2/pictures/eee424d0-ca05-4405-8bdb-e5caf2db3fbe.jpg',
                fav: false,
                rooms: 4,
                type: {
                    name: 'Entire Villa'
                }
            },
            {
                title: 'Tropical Architecture',
                description: 'Private Room',
                price: 190,
                location: 'Koh Samui, Thailand',
                id: 2,
                stars: 5,
                reviews: 290,
                bg: 'https://a0.muscache.com/4ea/air/v2/pictures/58f86a91-a526-4e1b-934e-8f6bc3f60e10.jpg',
                fav: false,
                rooms: 1,
                type: {
                    name: 'Private Room'
                }
            },]
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

    changeFav = (e, i) => {
        let places = this.state.places
        let element = places[i]
        element.fav = !element.fav
        this.setState({ places })
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
                                        <Thumbnail key={i} place={p} index={i} page={this.state.page} fav={p.fav} like={this.changeFav} />
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