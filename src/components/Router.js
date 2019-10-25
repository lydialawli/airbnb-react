import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Places from './Places'
import Place from './Place'
import Confirm from './Confirm'
import Profile from './Profile'
import Bookings from './Bookings'
import Favorites from './Favorites'
import Host from './Host'
import Create from './Create'
import Signup from './Signup'
import Login from './Login'
import '../styles/global.css'

//make sure larger paths goes first
class Router extends React.Component {

    checkAuth = () => {

        if (localStorage.getItem('token')) {
            console.log('true!!')
            return true
        }
        else {
            console.log('false!!')
            return false
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/place/:id' render={(props) => this.checkAuth() ? <Place {...props} /> : <Redirect to='/login' />} />
                    <Route path='/favorites' render={() => this.checkAuth() ? <Favorites /> : <Redirect to='/login' />} />
                    <Route path='/bookings' render={() => this.checkAuth() ? <Bookings /> : <Redirect to='/login' />} />
                    <Route path='/profile' render={() => this.checkAuth() ? <Profile /> : <Redirect to='/login' />} />
                    <Route path='/confirm' render={() => this.checkAuth() ? <Confirm /> : <Redirect to='/login' />} />
                    <Route path='/create' render={() => this.checkAuth() ? <Create /> : <Redirect to='/login' />} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/login' component={Login} />
                    <Route path='/host' render={() => this.checkAuth() ? <Host /> : <Redirect to='/login' />} />
                    <Route path='/' render={() => this.checkAuth() ? <Places /> : <Redirect to='/login' />} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router

