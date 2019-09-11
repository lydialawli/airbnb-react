import React from 'react'
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/reviews.css'
import '../styles/forms.css'
import '../styles/buttons.css'
import '../styles/users.css'

class ReviewCard extends React.Component {
    state = {
        review: this.props.review,
        author: this.props.review.author
    }


    render() {
        return (
            <div className="card review">
                <div className="content">
                    <div className="user">
                        <div className="avatar" style={{ backgroundImage: `url(${this.state.author.avatar})` }}></div>
                        <div className="name">
                            <small>{this.state.review.date}</small>
                            <span>{this.state.author.name}</span>
                        </div>
                    </div>
                    <div className="rating">
                        {[...Array(5)].map((n, i) => i >= this.state.review.rating ? <i key={i} className="far fa-star"></i> : <i key={i} className="fas fa-star"></i>)}
                    </div>
                    <p>{this.state.review.content}</p>
                </div>
            </div>
        )
    }
}


export default ReviewCard