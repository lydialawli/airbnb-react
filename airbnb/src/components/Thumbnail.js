import React from 'react'
import '../styles/cards.css'
import '../styles/icons.css'
import {Link} from 'react-router-dom'

class Thumbnail extends React.Component {
    
    state = {
        image: 'https://q-ak.bstatic.com/images/hotel/max1024x768/186/186223203.jpg',
    }

    render() {
        return (
            <Link className="card link" to="/place">
				<div className="image" style={{backgroundImage: `url(${this.state.image})` }}>
					<button className="icon">
						<i className="far fa-heart"></i>
					</button>
				</div>
				<div className="content">
					<small className="meta">{this.props.place.description}</small>
					<h2>{this.props.place.title}</h2>
					<span className="price">$350/night</span>
					<span className="rating">
                        {[...Array(5)].map((n,i) => i >= this.props.place.stars ?  <i className="far fa-star"></i> : <i className="fas fa-star"></i>)}
						<span>{this.props.place.reviews} Reviews</span>
					</span>
				</div>
			</Link>
        )
    }
}

export default Thumbnail

