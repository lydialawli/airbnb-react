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
            avatar: '',
            likes: []
        },
        places: [],
        token: ''
        // places: [
        //     {
        //         title: 'Luxury Villa Indu Siam',
        //         description: 'Entire Villa • 3 Rooms',
        //         price: '5 nights • $1,750 Total',
        //         location: 'Koh Samui, Thailand',
        //         id: 0,
        //         stars: 4,
        //         reviews: 37,
        //         bg: 'https://q-ak.bstatic.com/images/hotel/max1024x768/186/186223203.jpg',
        //         rooms: 4,
        //         type: {
        //             name: 'Entire Villa'
        //         }
        //     }]

    }

    UNSAFE_componentWillMount() {
        let token = localStorage.getItem('token')

        Promise.all([
            axios.get(`${process.env.REACT_APP_API}/favorites?token=${token}`),
            axios.get(`${process.env.REACT_APP_API}/auth?token=${token}`)
        ])
            .then(([places, user]) => {
                console.log('user =>>',user.data)
                console.log('placesFav =>>',places.data)
                this.setState({
                    places: places.data,
                    user: user.data,
                    token: token
                })
            })
            .catch(err => console.log(err))
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
                        <Sidebar page="favorites" />
                        <div className="content">
                            <h2>My Favorites</h2>
                            {this.state.places.map((p, i) => {
                                return (
                                    <Thumbnail key={i} place={p} index={i} page={this.state.page} user={this.state.user} like={this.updateLike} />
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}


export default Favorites