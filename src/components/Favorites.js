import React from 'react'
import Nav from '../components/Nav.js'
import Sidebar from '../components/Sidebar.js'
import Thumbnail from '../components/Thumbnail'
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/gallery.css'
import '../styles/forms.css'
import '../styles/buttons.css'


class Favorites extends React.Component {
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
                bg: 'https://q-ak.bstatic.com/images/hotel/max1024x768/186/186223203.jpg',
                rooms: 4,
                type: {
                    name: 'Entire Villa'
                }
            }]
       
    }


    render() {
        return (
            <div >
                <div >
                    <Nav />
                </div>
                <div className="grid medium">
                    <div className="grid sidebar-left">
                        <Sidebar page="favorites" />
                        <div className="content">
                            <h2>My Favorites</h2>
                            <div className="grid two">
                                <Thumbnail page="favorites" key={this.state.places[0].id} place={this.state.places[0]} index={0} fav="true"/>
                            </div>
                    
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}


export default Favorites