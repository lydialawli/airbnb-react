import React from 'react'
import Nav from '../components/Nav.js'
import Thumbnail from '../components/Thumbnail'
import axios from 'axios'
import '../styles/filters.css'
import '../styles/grid.css'
import '../styles/users.css'

class Places extends React.Component {
    state = {
        page: 'places',
        places: [],
        types: [],
        filterTypes: ['Latest', 'Price', 'Rating'],
        originalPlaces: [],
        user: {
            name: '',
            avatar: '',
            likes: []
        },
        token: ''
    }

    UNSAFE_componentWillMount() {
        let token = localStorage.getItem('token')

        Promise.all([
            axios.get(`${process.env.REACT_APP_API}/places/`),
            axios.get(`${process.env.REACT_APP_API}/types`),
            axios.get(`${process.env.REACT_APP_API}/auth?token=${token}`)
        ])
            .then(([places, types, user]) => {
                console.log('user ==>', user.data)
                this.setState({
                    places: places.data,
                    originalPlaces: places.data,
                    types: types.data.reverse(),
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

    filterPlaces = (event) => {
        let text = event.target.value
        let filtered = this.state.originalPlaces.filter(e =>
            e.title.toUpperCase().includes(text.toUpperCase()))

        this.setState({ places: filtered })
    }


    filterByType = (event) => {
        console.log(event.target.value)
        let typeId = event.target.value
        if (typeId === "All Types") {
            this.setState({
                places: this.state.originalPlaces,
            })
        }
        else {
            axios.get(`${process.env.REACT_APP_API}/places?type=${typeId}`)
                .then(res => {
                    this.setState({
                        places: res.data,
                    })
                    // console.log(res.data)
                })
                .catch(err => { console.log(err) })
        }

    }

    filterByNumOfRooms = (e) => {
        let rooms = Number(e.target.value) + 1

        axios.get(`${process.env.REACT_APP_API}/places?min_rooms=${rooms}`)
            .then(res => {
                this.setState({
                    places: res.data,
                })
                console.log(res.data)
            })
            .catch(err => { console.log(err) })
    }


    filterByPrice = (e) => {
        let maxPrice = e.target.value
        axios.get(`${process.env.REACT_APP_API}/places?max_price=${maxPrice}`)
            .then(res => {
                this.setState({
                    places: res.data,
                })
                console.log(res.data)
            })
            .catch(err => { console.log(err) })
    }

    sortBy = (e) => {
        let type = e.target.value
        let filtered = this.state.originalPlaces
        if (type === 'Price')
            filtered = this.state.originalPlaces.sort((a, b) => { return a.price - b.price })
        else if (type === 'Rating')
            filtered = this.state.originalPlaces.sort((a, b) => { return b.stars - a.stars })
        else { filtered = this.state.originalPlaces.sort((a, b) => { return a.id - b.id }) }
        this.setState({ places: filtered })
    }


    render() {
        return (
            <div>
                <div>
                    <Nav user={this.state.user}></Nav>
                </div>
                <div className="filters">
                    <select onChange={(e) => this.filterByNumOfRooms(e)}>
                        {[...Array(10)].map((n, i) => { return <option key={i} value={i}>Rooms: {i + 1}</option> })}
                    </select>
                    <select onChange={(e) => this.filterByType(e)}>
                        {this.state.types.map((e, i) => { return <option key={i} value={e.name}>{e.name}</option> })}
                    </select>
                    <input onChange={(e) => this.filterByPrice(e)} type="number" placeholder="max price" />
                    <select onChange={(e) => this.sortBy(e)}>
                        {this.state.filterTypes.map((e, i) => { return <option key={i} value={e}>{e}</option> })}
                    </select>
                    <input className='search' type='text' onChange={this.filterPlaces} placeholder={'Search...'} />
                </div>
                <div className="grid five large">
                    {this.state.places.map((p, i) => {
                        return (
                            <Thumbnail key={i} place={p} index={i} page={this.state.page} user={this.state.user} like={this.updateLike} />
                        )
                    })}
                </div>


            </div>

        )
    }
}

export default Places


/*[
            {
                title: 'Duplex with Garden',
                description: 'Entire Duplex • 2 Rooms',
                price: 250,
                id: 0,
                stars: 4,
                reviews: 37,
                bg: 'https://q-ak.bstatic.com/images/hotel/max1024x768/186/186223203.jpg',
                fav: false,
                rooms: 2,
            },
            {
                title: 'Double Room Shared House',
                description: 'Shared House • 4 Rooms',
                price: 500,
                id: 1,
                stars: 3,
                reviews: 12,
                bg: 'https://a0.muscache.com/4ea/air/v2/pictures/eee424d0-ca05-4405-8bdb-e5caf2db3fbe.jpg',
                fav: false,
                rooms: 4,

            },
            {
                title: 'Single Room Shared House',
                description: 'Shared House • 3 Rooms',
                price: 300,
                id: 2,
                stars: 5,
                reviews: 50,
                bg: 'https://a0.muscache.com/4ea/air/v2/pictures/58f86a91-a526-4e1b-934e-8f6bc3f60e10.jpg',
                fav: false,
                rooms: 3,
            },
            {
                title: 'Studio Lounge small',
                description: 'Studio Lounge • 2 Rooms',
                price: 280,
                id: 3,
                stars: 5,
                reviews: 4,
                bg: 'https://q-ak.bstatic.com/images/hotel/max1024x768/186/186223203.jpg',
                fav: false,
                rooms: 2,
            },
            {
                title: 'Studio Lounge Big',
                description: 'Entire Studio Lounge • 1 Rooms',
                price: 300,
                id: 4,
                stars: 2,
                reviews: 36,
                bg: 'https://a0.muscache.com/4ea/air/v2/pictures/eee424d0-ca05-4405-8bdb-e5caf2db3fbe.jpg',
                fav: false,
                rooms: 1,
            },
            {
                title: 'Single room private House',
                description: 'Private house • 6 Rooms',
                price: 250,
                id: 5,
                stars: 4,
                reviews: 43,
                bg: 'https://q-ak.bstatic.com/images/hotel/max1024x768/186/186223203.jpg',
                fav: false,
                rooms: 6,
            },
            {
                title: 'Full Shared House',
                description: 'Shared House • 10 Rooms',
                price: 1000,
                id: 7,
                stars: 5,
                reviews: 54,
                bg: 'https://a0.muscache.com/4ea/air/v2/pictures/eee424d0-ca05-4405-8bdb-e5caf2db3fbe.jpg',
                fav: false,
                rooms: 8,

            },
        ]*/