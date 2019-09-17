import React from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'

class StripeForm extends React.Component {

    render() {
        return (
          <div className="checkout">
            <CardElement />
            <button>Send</button>
          </div>
        )
      }
}

export default injectStripe(StripeForm)