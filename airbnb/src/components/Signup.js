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
        },
        errorMsg:''
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

        if(!error) {
            axios.post('http://localhost:5000/signup', this.state.user)
            .then(res => {
                localStorage.setItem('token', res.data)
                this.props.history.push({
                    pathname: `/`
                })
                console.log(res.data)
            })
            .catch(err => console.log(err))

        }
      

    }

    changeField = (e, field) => {
        let user = this.state.user
        user[field] = e.target.value
        this.setState({ user })
    }



    render() {
        return (<div className="grid center middle tall image" style={{ backgroundImage: `url(${this.state.bg})` }}>
            <div className="card small">
                <div className="content">
                    <div className="logo" style={{ backgroundImage: `url(${this.state.logo})` }}></div>
                    <form >
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
                            <input type="file" />
                        </div>

                        <button onClick={this.signup} className="primary">Signup</button>
                    </form>
                    <span style={{color:"red"}}>{this.state.errorMsg}</span>
                    <p className="footer">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>)
    }

}

export default Signup