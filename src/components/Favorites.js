import React from 'react'
import Nav from '../components/Nav.js'
import Sidebar from '../components/Sidebar.js'
import Thumbnail from '../components/Thumbnail'
import axios from 'axios'
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/gallery.css'
import '../styles/forms.css'
import '../styles/buttons.css'


class Favorites extends React.Component {
    state = {
        user: {
            name: '',
            avatar: ''
        },
        places: [
            {
                title: 'Luxury Villa Indu Siam',
                description: 'Entire Villa • 3 Rooms',
                price: '5 nights • $1,750 Total',
                location: 'Koh Samui, Thailand',
                id: 0,
                stars: 4,
                reviews: 37,
                bg: 'https://q-ak.bstatic.com/images/hotel/max1024x768/186/186223203.jpg',
                rooms: 4,
                type: {
                    name: 'Entire Villa'
                }
            }]

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
    render() {
        return (
            <div >
                <div >
                    <Nav user={this.state.user} />
                </div>
                <div className="grid medium">
                    <div className="grid sidebar-left">
                        <Sidebar page="favorites" />
                        <div className="content">
                            <h2>My Favorites</h2>
                            <div className="grid two">
                                <Thumbnail page="favorites" key={this.state.places[0].id} place={this.state.places[0]} index={0} fav="true" />
                            </div>

                        </div>
                    </div>
                </div>

            </div >
        )
    }
}


export default Favorites