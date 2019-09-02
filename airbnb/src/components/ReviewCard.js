import React from 'react'
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/reviews.css'
import '../styles/forms.css'
import '../styles/buttons.css'
import '../styles/users.css'

class ReviewCard extends React.Component {
    state = {
        user: this.props.user
    }

    render() {
        return (
            <div className="card review">
                <div className="content">
                    <div className="user">
                        <div className="avatar" style={{ backgroundImage: `url(${this.state.user.avatar})` }}></div>
                        <div className="name">
                            <small>{this.state.user.date}</small>
                            <span>{this.state.user.name}</span>
                        </div>
                    </div>
                    <div className="rating">
                        {[...Array(5)].map((n, i) => i >= this.state.user.rating ? <i className="far fa-star"></i> : <i className="fas fa-star"></i>)}
                    </div>
                    <p>{this.state.user.comment}</p>
                </div>
            </div>
        )
    }
}


export default ReviewCard