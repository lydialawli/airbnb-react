import React from 'react'
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/gallery.css'
import '../styles/forms.css'
import '../styles/buttons.css'

class Gallery extends React.Component {
    state = {
        thumbnails: this.props.images,
        bigImage: '',
    }

    componentWillMount() {
        this.setState({
            bigImage: this.state.thumbnails[0]
        })
    }

    changeBigImage = (i) => {
        this.setState({
            bigImage: this.state.thumbnails[i]
        })
    }


  
    render() {
        return (
            <div className="gallery">
                <div className="image-main" style={{ backgroundImage: `url(${this.state.bigImage})` }}>
                    <button className="icon">
                        <i className="far fa-heart"></i>
                    </button>
                </div>
                <div className="thumbnails">
                    {this.state.thumbnails.map((e, i) => {
                        return <div className={`thumbnail ${this.state.bigImage === e ? 'selected' : ''}`} onClick={()=> this.changeBigImage(i)} style={{ backgroundImage: `url(${this.state.thumbnails[i]})` }}></div>
                    })}

                </div>
            </div>
        )
    }
}


export default Gallery