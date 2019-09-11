import React from 'react'
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/gallery.css'
import '../styles/forms.css'
import '../styles/buttons.css'

class Gallery extends React.Component {
 
	like = (e) => {
		e.preventDefault()
		this.props.like(e)
	}

  
    render() {
        return (
            <div className="gallery">
                <div className="image-main" style={{ backgroundImage: `url(${this.props.bigImage})` }}>
                    <button className="icon" type="button" onClick={(e) => {this.like(e)}}>
                        <i className={this.props.fav ? "fas fa-heart" : "far fa-heart"}></i>
                    </button>
                </div>
                <div className="thumbnails">
                    {this.props.images.map((e, i) => {
                        return <div key={i} className={`thumbnail ${this.props.bigImage === e ? 'selected' : ''}`} onClick={()=> this.props.changeImage(i)} style={{ backgroundImage: `url(${this.props.images[i]})` }}></div>
                    })}

                </div>
            </div>
        )
    }
}


export default Gallery