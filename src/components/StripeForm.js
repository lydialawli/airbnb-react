import React from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import axios from 'axios'

class StripeForm extends React.Component {
    state = {
        cardDisplay: '',
        spanDisplay: 'hidden'
    }

    generateToken = () => {
        this.props.stripe.createToken({}).then(res => {
            console.log('token id: ', res.token.id)

            axios.post(`${process.env.REACT_APP_API}/pay`, {
                token: res.token.id,
                amount: this.props.amount,
                description: this.props.description

            }).then(() => {
                console.log("success!")
                this.setState({
                    cardDisplay:'hidden',
                    spanDisplay: ''
                })
                setTimeout( () => this.props.onPaid(), 2000 )
            })
                .catch(err => console.log('err1 ==> ', err))
        }).catch(err => console.log('err2 ==> ', err))

    }

    render() {
        return (
            <div>
                <div className={this.state.cardDisplay}>
                    <CardElement />
                    <button className="primary pay" onClick={this.generateToken}>Send</button>
                </div>
                <span className={this.state.spanDisplay}>Payment Succesful!</span>
            </div>
        )
    }
}

export default injectStripe(StripeForm)