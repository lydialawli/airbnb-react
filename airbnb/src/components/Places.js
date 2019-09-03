import React from 'react'
import Nav from '../components/Nav.js'
import Thumbnail from '../components/Thumbnail'
import '../styles/filters.css'
import '../styles/grid.css'
import '../styles/users.css'

class Places extends React.Component {
    state = {
        places: [
            {
                title: 'Duplex with Garden',
                description: 'Entire Duplex • 2 Rooms',
                price: 250,
                location: 'Marina',
                id: 0,
                stars: 4,
                reviews: 37,
                bg: 'https://q-ak.bstatic.com/images/hotel/max1024x768/186/186223203.jpg',
                fav: false
            },
            {
                title: 'Double Room Shared House',
                description: 'Shared House • 4 Rooms',
                price: 500,
                location: 'Ramblas',
                id: 1,
                stars: 3,
                reviews: 12,
                bg: 'https://a0.muscache.com/4ea/air/v2/pictures/eee424d0-ca05-4405-8bdb-e5caf2db3fbe.jpg',
                fav: false

            },
            {
                title: 'Single Room Shared House',
                description: 'Shared House • 3 Rooms',
                price: 300,
                location: 'Ramblas',
                id: 2,
                stars: 5,
                reviews: 50,
                bg: 'https://a0.muscache.com/4ea/air/v2/pictures/58f86a91-a526-4e1b-934e-8f6bc3f60e10.jpg',
                fav: false
            },
            {
                title: 'Studio Lounge small',
                description: 'Studio Lounge • 2 Rooms',
                price: 280,
                location: 'Barceloneta',
                id: 3,
                stars: 5,
                reviews: 4,
                bg: 'https://q-ak.bstatic.com/images/hotel/max1024x768/186/186223203.jpg',
                fav: false
            },
            {
                title: 'Studio Lounge Big',
                description: 'Entire Studio Lounge • 1 Rooms',
                price: 300,
                location: 'Barceloneta',
                id: 4,
                stars: 2,
                reviews: 36,
                bg: 'https://a0.muscache.com/4ea/air/v2/pictures/eee424d0-ca05-4405-8bdb-e5caf2db3fbe.jpg',
                fav: false
            },
            {
                title: 'Single room private House',
                description: 'Private house • 1 Rooms',
                price: 250,
                location: 'Eixample',
                id: 5,
                stars: 4,
                reviews: 43,
                bg: 'https://q-ak.bstatic.com/images/hotel/max1024x768/186/186223203.jpg',
                fav: false
            },
        ],
        placeTitles: ['All types', 'Shared House', 'Shared Villa', 'Private Room', 'Shared room double bed'],
        filterTypes: [{ value: 'date', name: 'Latest' }, { value: 'price', name: 'Price' }, { value: 'rating', name: 'Rating' }],
        originalPlaces: []
    }

    componentWillMount() {
        this.setState({
            originalPlaces: this.state.places
        })
    }


    changeFav = (e, i) => {
        let places = this.state.places
        let element = places[i]
        element.fav = !element.fav
        this.setState({ places })

    }

    filterPlaces = (event) => {
        let text = event.target.value
        let filtered = this.state.originalPlaces.filter(e =>
            e.title.toUpperCase().includes(text.toUpperCase()))

        this.setState({ places: filtered })
    }



    render() {
        return (
            <div>
                <div>
                    <Nav></Nav>
                </div>
                <div className="filters">
                    <select>
                        {[...Array(10)].map((n, i) => { return <option key={i} value="1">Rooms: {i + 1}</option> })}
                    </select>
                    <select>
                        {this.state.placeTitles.map((e, i) => { return <option key={i} value="1">{e}</option> })}
                    </select>
                    <input type="number" placeholder="max price" />
                    <select>
                        {this.state.filterTypes.map(e => { return <option value={e.value}>{e.name}</option> })}
                    </select>
                    <input className='search' type='text' onChange={this.filterPlaces} placeholder={'Search...'} />
                </div>
                <div className="grid five large">
                    {this.state.places.map((p, i) => {
                        return (
                            <Thumbnail key={i} place={p} index={i} fav={p.fav} like={this.changeFav} />
                        )
                    })}
                </div>



            </div>

        )
    }
}

export default Places
