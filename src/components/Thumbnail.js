import React from 'react'
import '../styles/cards.css'
import '../styles/icons.css'
import '../styles/buttons.css'
import { Link } from 'react-router-dom'

class Thumbnail extends React.Component {

	state = {
		user: {
			likes: []
		},
		place: this.props.place,
		liked: '',
	}

	UNSAFE_componentWillReceiveProps(props) {
		let liked = this.state.liked

		if (props.user.likes.includes(props.place._id)) {
			liked = true
		}
		else { liked = false }

		this.setState({
			place: props.place,
			user: props.user,
			liked
		})
	}

	componentDidMount() {
		let user = this.state.user

		if (user.likes.includes(this.state.place._id))
			this.setState({ liked: true })
	}

	like = (e) => {
		e.preventDefault()
		this.props.like(this.state.place._id)
	}

	render() {
		return (
			<Link className="card link" to={`/place/${this.state.place._id}`} >
				<div className="image" style={{ backgroundImage: `url(${this.state.place.image})` }}>
					<button className="icon" type="button" onClick={(e) => { this.like(e) }}>
						<i className={this.state.liked ? "fas fa-heart" : "far fa-heart"} ></i>
					</button>
				</div>
				<div className="content">
					<small className="meta">{this.props.place.type.name} • {this.props.place.rooms} Rooms</small>
					<h2>{this.props.place.title}</h2>

					{this.props.place.location ? <small className="location">
						<i className="fas fa-map-marker-alt"></i><span>{this.props.place.location}</span></small> : ''}

					{this.props.page === 'bookings' ? <span className="price">{this.props.place.price}</span> : <span className="price">${this.props.place.price}/night</span>}

					<span className="rating">
						{[...Array(5)].map((n, i) => i >= this.props.place.rating ? <i key={i} className="far fa-star"></i> : <i key={i} className="fas fa-star"></i>)}
						<span>{this.props.place.reviews} Reviews</span>
					</span>
					<span className={this.props.place.date ? 'date' : ''}>{this.props.place.date ? this.props.place.date : ''}</span>
				</div>
			</Link >
		)
	}
}

export default Thumbnail

