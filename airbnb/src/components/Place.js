import React from 'react'
import Nav from '../components/Nav.js'
import Gallery from '../components/Gallery.js'
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/users.css'


class Place extends React.Component {
    
    render(){
       return( <div>
            <Nav />
            <Gallery />
        </div>
       )
    }
}


export default Place