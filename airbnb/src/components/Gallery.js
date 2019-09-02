import React from 'react'
import '../styles/icons.css'
import '../styles/grid.css'
import '../styles/gallery.css'
import '../styles/forms.css'
import '../styles/buttons.css'

class Gallery extends React.Component {
    state = {
        thumbnails: [
            'https://q-ak.bstatic.com/images/hotel/max1024x768/186/186223203.jpg',
            'https://q-ak.bstatic.com/images/hotel/max1280x900/186/186223171.jpg',
            'https://r-ak.bstatic.com/images/hotel/max1280x900/186/186223174.jpg',
            'https://r-ak.bstatic.com/images/hotel/max1280x900/186/186223178.jpg',
            'https://q-ak.bstatic.com/images/hotel/max1280x900/186/186223180.jpg',
            'https://q-ak.bstatic.com/images/hotel/max1280x900/186/186223186.jpg',
            'https://r-ak.bstatic.com/images/hotel/max1280x900/186/186223190.jpg',
            'https://q-ak.bstatic.com/images/hotel/max1280x900/186/186223195.jpg',
            'https://q-ak.bstatic.com/images/hotel/max1280x900/186/186223199.jpg'
        ],
        selected: 'https://q-ak.bstatic.com/images/hotel/max1024x768/186/186223203.jpg',
    }

    render() {
        return (
            <div className="gallery">
                <div className="image-main" style={{backgroundImage: `url(${this.state.thumbnails[0]})` }}>
                    <button className="icon">
                        <i className="far fa-heart"></i>
                    </button>
                </div>
                <div className="thumbnails">
                    {this.state.thumbnails.map((e,i)=> {
                        return  <div className={`thumbnail ${this.state.selected===this.state.thumbnails[i]? 'selected' : ''}` } style={{backgroundImage: `url(${this.state.thumbnails[i]})` }}></div>
                    })}
                  
                </div>
            </div>
        )
    }
}


export default Gallery