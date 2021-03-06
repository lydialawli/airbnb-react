import React from 'react'
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/gallery.css'
import '../styles/forms.css'
import '../styles/buttons.css'

class Gallery extends React.Component {
    state = {
        user: this.props,
        place: this.props.place,
        liked: '',
        bigImage: 'default',
    }

    UNSAFE_componentWillReceiveProps(props) {
        let liked = this.state.liked
        let bigImage = props.place.images[0]
        if (props.user.likes.includes(props.place._id)) {
            liked = true
        }
        else { liked = false }

        if (this.state.bigImage !== 'default')
            bigImage = this.state.bigImage

        this.setState({
            place: props.place,
            user: props.user,
            bigImage,
            liked
        })
    }

    componentDidMount() {
        let user = this.state.user.user

        if (user.likes.includes(this.state.place._id))
            this.setState({ liked: true })
    }

    like = (e) => {
        e.preventDefault()
        this.props.like(this.state.place._id)
    }

    changeBigImage = (i) => {
        this.setState({
            bigImage: this.state.place.images[i]
        })
    }

    render() {
        return (
            <div className="gallery">
                <div className="image-main" style={{ backgroundImage: `url(${this.state.bigImage})` }}>
                    <button className="icon" type="button" onClick={(e) => { this.like(e) }}>
                        <i className={this.state.liked ? "fas fa-heart" : "far fa-heart"}></i>
                    </button>
                </div>
                <div className="thumbnails">
                    {this.state.place.images.map((e, i) => {
                        return <div key={i} className={`thumbnail ${this.state.bigImage === e ? 'selected' : ''}`} onClick={() => this.changeBigImage(i)} style={{ backgroundImage: `url(${this.state.place.images[i]})` }}></div>
                    })}

                </div>
            </div>
        )
    }
}


export default Gallery