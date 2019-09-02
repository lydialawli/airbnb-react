import React from 'react'
import Nav from '../components/Nav.js'
import '../styles/filters.css'

class Places extends React.Component {
    state = {
        places: ['All Types', 'Entire Villa', 'Shared Villa', 'Entire House', 'Shared House', 'Private Room'],
        rooms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        filterTypes: [{ value: 'date', name: 'Latest' }, { value: 'price', name: 'Price' }, { value: 'rating', name: 'Rating' }]
    }


    render() {
        return (
            <div>
                <div>
                    <Nav></Nav>
                </div>
                <div className="filters">
                    <select>
                        {this.state.rooms.map((e, i) => { return <option value="1">Rooms: {e}</option> })}
                    </select>
                    <select>
                        {this.state.places.map(e => { return <option value="1">{e}</option> })}
                    </select>
                    <input type="number" placeholder="max price" />
                    <select>
                        {this.state.filterTypes.map(e => { return <option value={e.value}>{e.name}</option> })}
                    </select>
                    <input type="text" className="search" placeholder="Search..." />
                </div>
            </div>

        )
    }
}

export default Places
