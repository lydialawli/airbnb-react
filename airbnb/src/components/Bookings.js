import React from 'react'
import Nav from '../components/Nav.js'
import Sidebar from '../components/Sidebar.js'
import Thumbnail from '../components/Thumbnail'
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/gallery.css'
import '../styles/forms.css'
import '../styles/buttons.css'


class Bookings extends React.Component {
    state = {
        userProfile: 'https://randomuser.me/api/portraits/men/9.jpg',
        places: [
            {
                title: 'Luxury Villa Indu Siam',
                description: 'Entire Villa • 3 Rooms',
                price: '5 nights • $1,750 Total',
                location: 'Koh Samui, Thailand',
                id: 0,
                stars: 4,
                reviews: 37,
                nights:5,
                date: '10 Aug 2020 - 15 Aug 2020',
                bg: 'https://q-ak.bstatic.com/images/hotel/max1024x768/186/186223203.jpg',
                fav: true
            },
            {
                title: 'Villa Kelusa',
                description: 'Entire Villa • 6 Rooms',
                price: '3 nights • $190 Total',
                location: 'Bali, Indonesia',
                id: 1,
                stars: 3,
                reviews: 18,
                nights:3,
                date: '01 May 2019 - 04 May 2019',
                bg: 'https://a0.muscache.com/4ea/air/v2/pictures/eee424d0-ca05-4405-8bdb-e5caf2db3fbe.jpg',
                fav: false
            },
            {
                title: 'Tropical Architecture',
                description: 'Private Room',
                price: '9 nights • $2,980 Total',
                location: 'Koh Samui, Thailand',
                id: 2,
                stars: 5,
                reviews: 290,
                nights:9,
                date: '18 Apr 2019 - 27 Apr 2019',
                bg: 'https://a0.muscache.com/4ea/air/v2/pictures/58f86a91-a526-4e1b-934e-8f6bc3f60e10.jpg',
                fav: false
            },]
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
                    <Nav />
                </div>
                <div className="grid medium">
                    <div className="grid sidebar-left">
                        <Sidebar page="bookings" />
                        <div className="content">
                            <h2>Upcoming Trips</h2>
                            <div className="grid two">
                                <Thumbnail key={this.state.places[0].id} page="bookings" place={this.state.places[0]} index={0} fav={this.state.places[0].fav} like={this.changeFav}/>
                            </div>
                            <h2>Past Trips</h2>
                            <div className="grid two">
                                {this.state.places.map((p, i) => {
                                    if (i !== 0) {
                                        return (
                                            <Thumbnail key={i} page="bookings" place={p} index={i}  fav={p.fav} like={this.changeFav}/>
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