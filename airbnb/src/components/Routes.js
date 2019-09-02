import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Places from './Places'
import Place from './Place'
import '../styles/global.css'

//make sure larger paths goes first
class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                <Route path='/place' component={Place}></Route>
                    <Route path='/' component={Places}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Routes