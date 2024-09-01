import { Link } from "react-router-dom";

import "../../styles/OrderStyle.css"

const Checkout = ({ shipping, confirmOrder, payment }) =>{
  return(
    <section className="checkout-progress d-flex justify-content-center align-items-center mx-4 mr-md-2">
      {shipping ?
      <Link to="/shipping" className="px-2">
        <section className="step active-step">Shipping</section>
      </Link> :
      <Link to="#!" disabled className="px-2">
        <section className="step incomplete">Shipping</section>
      </Link>}

      {confirmOrder ?
      <Link to="/order/confirm" className="px-2">
        <section className="step active-step">Confirm Order</section>
      </Link> :
      <Link to="#!" disabled className="px-2">
        <section className="step incomplete">Confirm Order</section>
      </Link>}

      {payment ?
      <Link to="/payment_method" className="px-2">
        <section className="step active-step">Payment</section>
      </Link> :
      <Link to="#!" disabled className="px-2">
        <section className="step incomplete">Payment</section>
      </Link>}
    </section>
  )
}
export default Checkout;