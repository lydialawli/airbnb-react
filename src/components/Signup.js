import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/global.css'
import '../styles/grid.css'
import '../styles/users.css'
import '../styles/reviews.css'
import '../styles/forms.css'
import '../styles/buttons.css'

class Signup extends React.Component {
    state = {
        logo: './logo-airbnb.png',
        bg: './thailand.jpg',
        user: {
            name: '',
            email: '',
            password: '',
            location: '',
            avatar: '',
        },
        errorMsg: '',
        spinner: 'transparent'
    }

    UNSAFE_componentWillMount() {
        let token = localStorage.getItem('token')
        if (token) {
            this.props.history.push('/places')
        }
    }

    signup = (e) => {
        e.preventDefault()
        let fields = ['name', 'email', 'password', 'location']
        let error = fields.forEach(f => {
            if (this.state.user[f] === '') {
                this.setState({
                    errorMsg: `missing ${f}`
                })
                return true
            }
            else { return false }
        })

        if (!error) {
            this.setState({ spinner: '' })

            const data = new FormData()
            for (var key in this.state.user) {
                data.append(key, this.state.user[key])
            }

            axios.post(`${process.env.REACT_APP_API}/signup`, data, {})
                .then(res => {
                    if (!res.data) {
                        this.setState({
                            errorMsg: 'user or email is already in use'
                        })
                    }
                    else {
                        console.log(res.statusText)
                        localStorage.setItem('token', res.data)
                        this.props.history.push({
                            pathname: `/`
                        })
                    }
                })
                .catch(err => console.log(err))
        }
    }

    changeField = (e, field) => {
        let user = this.state.user
        user[field] = e.target.value
        this.setState({ user })
    }

    updateFile = (e) => {
        let user = this.state.user
        user.avatar = e.target.files[0]
        this.setState({ user })
    }

    render() {
        return (<div className="grid center middle tall image" style={{ backgroundImage: `url(${this.state.bg})` }}>
            <div className="card small">
                <div className="content">
                    <div className="logo" style={{ backgroundImage: `url(${this.state.logo})` }}></div>
                    <form onSubmit={this.signup}>
                        <div className="group">
                            <label>Name</label>
                            <input type="text" value={this.state.user.name} onChange={(e) => this.changeField(e, 'name')} />
                        </div>
                        <div className="group">
                            <label>Email</label>
                            <input type="email" value={this.state.user.email} onChange={(e) => this.changeField(e, 'email')} />
                        </div>
                        <div className="group">
                            <label>Password</label>
                            <input type="password" value={this.state.user.password} onChange={(e) => this.changeField(e, 'password')} />
                        </div>
                        <div className="group">
                            <label>Location</label>
                            <input type="text" value={this.state.user.location} onChange={(e) => this.changeField(e, 'location')} />
                        </div>
                        <div className="group">
                            <label>Profile Picture</label>
                            <input type="file" name="file" onChange={this.updateFile} />
                        </div>

                        <button className="primary">Signup</button> <i style={{color:this.state.spinner}} className="fas fa-spinner spinnerIcon"></i>
                    </form>
                    <span style={{ color: "red" }}>{this.state.errorMsg}</span>
                    <p className="footer">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>)
    }

}

export default Signup