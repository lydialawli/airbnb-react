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


class Bookings extends React.Component {
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
        //         nights: 5,
        //         date: '10 Aug 2020 - 15 Aug 2020',
        //         bg: 'https://q-ak.bstatic.com/images/hotel/max1024x768/186/186223203.jpg',
        //         fav: true,
        //         rooms: 2,
        //         type: {
        //             name: 'Entire Villa'
        //         }
        //     },
        //     {
        //         title: 'Villa Kelusa',
        //         description: 'Entire Villa • 6 Rooms',
        //         price: '3 nights • $190 Total',
        //         location: 'Bali, Indonesia',
        //         id: 1,
        //         stars: 3,
        //         reviews: 18,
        //         nights: 3,
        //         date: '01 May 2019 - 04 May 2019',
        //         bg: 'https://a0.muscache.com/4ea/air/v2/pictures/eee424d0-ca05-4405-8bdb-e5caf2db3fbe.jpg',
        //         fav: false,
        //         rooms: 4,
        //         type: {
        //             name: 'Entire Villa'
        //         }
        //     },
        //     {
        //         title: 'Tropical Architecture',
        //         description: 'Private Room',
        //         price: '9 nights • $2,980 Total',
        //         location: 'Koh Samui, Thailand',
        //         id: 2,
        //         stars: 5,
        //         reviews: 290,
        //         nights: 9,
        //         date: '18 Apr 2019 - 27 Apr 2019',
        //         bg: 'https://a0.muscache.com/4ea/air/v2/pictures/58f86a91-a526-4e1b-934e-8f6bc3f60e10.jpg',
        //         fav: false,
        //         rooms: 3,
        //         type: {
        //             name: 'Private Room'
        //         }
        //     },]
    }

    UNSAFE_componentWillMount() {
        let token = localStorage.getItem('token')

        Promise.all([
            axios.get(`${process.env.REACT_APP_API}/places/`),
            axios.get(`${process.env.REACT_APP_API}/auth?token=${token}`)
        ])

            .then(([places, user]) => {
                console.log( 'B:places =>', places.data[0])
                this.setState({
                    user: user.data,
                    places: places.data,
                    token: token
                })
            })
            .catch(err => { console.log('err==>', err) })
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
                        <Sidebar page="bookings" />
                        <div className="content">
                            <h2>Upcoming Trips</h2>
                            <div className="grid two">
                                {/* <Thumbnail key={'none'} page="bookings" place={this.state.places[0]} index={0} user={this.state.user} like={this.updateLike} /> */}
                            </div>
                            <h2>Past Trips</h2>
                            <div className="grid two">
                                {this.state.places.map((p, i) => {
                                    if (i >= 0) {
                                        return (
                                            <Thumbnail key={i} page="bookings" place={p} index={i} user={this.state.user} like={this.updateLike} />
                                        )
                                    }

                                })}
                            </div>


                        </div>
                    </div>
                </div>

            </div >
        )
    }
}


export default Bookings