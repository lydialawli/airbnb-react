import React from 'react'
import '../styles/cards.css'
import '../styles/icons.css'
import '../styles/buttons.css'
import { Link } from 'react-router-dom'

class Thumbnail extends React.Component {

	state = {
		image: this.props.place.bg,
		date: this.props.place.date
	}

	getDate = () => {
		return this.state.date ? this.state.date : ''
	}

	render() {
		return (
			<Link className="card link" to="/place">
				<div className="image" style={{ backgroundImage: `url(${this.state.image})` }}>
					<button className="icon">
						<i className={this.props.fav ? "fas fa-heart" : "far fa-heart"}></i>
					</button>
				</div>
				<div className="content">
					<small className="meta">{this.props.place.description} </small>
					<h2>{this.props.place.title}</h2>
					<small className="location" disabled={this.props.page==="favorites"? 'disabled' : ''}>
						<i className="fas fa-map-marker-alt"></i>
						<span>{this.props.place.location}</span>

					</small>
					<span className="price">$350/night</span>
					<span className="rating">
						{[...Array(5)].map((n, i) => i >= this.props.place.stars ? <i className="far fa-star"></i> : <i className="fas fa-star"></i>)}
						<span>{this.props.place.reviews} Reviews</span>
					</span>
					<span className={this.props.place.date ? 'date' : ''}>{this.getDate()}</span>
				</div>
			</Link>
		)
	}
}

export default Thumbnail

