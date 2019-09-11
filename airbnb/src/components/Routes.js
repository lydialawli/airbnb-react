import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
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
class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/favorites' component={Favorites}></Route>
                    <Route path='/bookings' component={Bookings}></Route>
                    <Route path='/profile' component={Profile}></Route>
                    <Route path='/confirm' component={Confirm}></Route>
                    <Route path='/create' component={Create}></Route>
                    <Route path='/signup' component={Signup}></Route>
                    <Route path='/places/:id' component={Place}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/host' component={Host}></Route>
                    <Route path='/' component={Places}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Routes