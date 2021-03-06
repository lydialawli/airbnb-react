import React from 'react'
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/reviews.css'
import '../styles/forms.css'
import '../styles/buttons.css'
import '../styles/users.css'
import moment from "moment"

class ReviewCard extends React.Component {

    state = {
        review: this.props.review

    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({
            review: props.review
        })
    }

    render() {
        return (
            <div className="card review">
                <div className="content">
                    <div className="user">
                        <div className="avatar" style={{ backgroundImage: `url(${this.state.review.author.avatar})` }}></div>
                        <div className="name">
                            <small>{moment(this.state.review.date).format('D MMMM YYYY')}</small>
                            <span>{this.state.review.author.name}</span>
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