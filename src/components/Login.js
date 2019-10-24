import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/global.css'
import '../styles/grid.css'
import '../styles/users.css'
import '../styles/reviews.css'
import '../styles/forms.css'
import '../styles/buttons.css'

class Login extends React.Component {
    state = {
        logo: './logo-airbnb.png',
        bg: './thailand.jpg',
        user: {
            email: '',
            password: '',
        },
        errorMsg: ''
    }

    changeField = (e, field) => {
        let user = this.state.user
        user[field] = e.target.value
        this.setState({ user })
    }

    login = (e) => {
        e.preventDefault()
        if (!this.state.user.email || !this.state.user.password) {
            this.setState({ errorMsg: 'missing fields' })
            console.log('got stuck here')
        }   
        else {
            axios.post(`${process.env.REACT_APP_API}/login`, this.state.user)
                .then(res => {
                    if (!res.data.token) {
                        this.setState({ errorMsg: res.data })
                    }
                    else {
                        localStorage.setItem('token', res.data.token)
                        this.props.history.push({
                            pathname: `/`
                        })
                        console.log('data==>', res.data.token)
                    }

                })
                .catch(err => console.log(err))
        }
    }

    render() {
        return (<div className="grid center middle tall image" style={{ backgroundImage: `url(${this.state.bg})` }
        }>
            <div className="card small">
                <div className="content">
                    <div className="logo" style={{ backgroundImage: `url(${this.state.logo})` }}></div>
                    <form onSubmit={this.login}>
                        <div className="group">
                            <label>Email</label>
                            <input type="email" value={this.state.user.email} onChange={(e) => this.changeField(e, 'email')} />
                        </div>
                        <div className="group">
                            <label>Password</label>
                            <input type="password" value={this.state.user.password} onChange={(e) => this.changeField(e, 'password')} />
                        </div>

                        <button className="primary">Login</button>

                    </form>
                    <span style={{ color: "red" }}>{this.state.errorMsg}</span>
                    <p className="footer">
                        New to Airbnb?  <Link to="/signup">Signup</Link>
                    </p>
                </div>
            </div>
        </div >)
    }

}

export default Login