import React from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import axios from 'axios'

class StripeForm extends React.Component {

    generateToken = () => {
        this.props.stripe.createToken({}).then(res => {
            console.log('token id: ', res.token.id)

            axios.post(`${process.env.REACT_APP_API}/pay`, {
                token: res.token.id,
                amount: this.props.amount,
                description: this.props.description,
            }).then(data => console.log(data))
                .catch(err => console.log('err ==> ',err))
        }).catch(err => console.log('err ==> ',err))
        
    }

    render() {
        return (
            <div >
                <CardElement />
                <button className="primary pay" onClick={this.generateToken}>Send</button>
            </div>
        )
    }
}

export default injectStripe(StripeForm)