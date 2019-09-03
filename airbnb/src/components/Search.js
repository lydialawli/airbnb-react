import React from 'react'


class Search extends React.Component {


    handleChange = (event) => {
        this.props.onChanged(event.target.value)
    }

    render() {
        return <input className={'input'} type={'text'} onChange={this.handleChange} placeholder={'Search'}
        ></input>
    }


}


export default Search