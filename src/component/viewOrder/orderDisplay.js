import React from 'react';
import { Link } from 'react-router-dom';
import './orderDisplay.css';

const OrderDisplay = (props) => {
    console.log(props);
    const renderDate = (item) => {
        console.log('item.date ----: ', item.date)
        if(item.date) return 'Ordered On ' + item.date.split('%')[0];
        else return '';
    }
    const renderItems = ({ orderData }) => {
        if (!sessionStorage.getItem('ltk')) {
            return (
                <div style={{ textAlign: 'center', marginTop: '2%', marginBottom: '2%' }}>
                    <h1>Login first to See Orders Items !</h1>
                    <Link to={'/login'} className="btn btn-primary btn-lg">Login</Link>
                </div>
            )
        } else if (orderData && orderData.length > 0) {
            return orderData.map((item) => {
                console.log('in mapping')
                console.log(item);
                let itemDesc = item.description.length > 35 ? item.description.substring(0, 30) + '...' : item.description;
                return (
                    <div className="order-summary" style={{ margin: 'auto', display: 'block', height: 'auto'}} key={item._id}>
                        <Link to={`/details/${item.item_type}?${item.item_id}`}>
                            {/* <!-- item --> */}
                            <div className="checkout-item">
                                <div className="img-icon" style={{ height: '80px', width: '80px' }}>
                                    <img src={item.image} alt="item name" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                                </div>
                                <div className="checkout-item-details order-details">
                                    <div className="checkout-item-description">{itemDesc}</div>
                                    <div className="checkout-item-color">{item.color}</div>
                                    <span className="checkout-new-price">₹{item.new_price}</span>
                                </div>
                                <div className="delivered">
                                    <div className="delivered-text">{renderDate(item)}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })
        }
    }

    return (
        <div className="container view-booking-info" style={{marginTop: '1%'}}>
            <div className="order-summary-heading" style={{ width: '69%', margin: 'auto', marginTop: '2%' }}><span>#</span>Your Orders</div>
            {renderItems(props)}
        </div >
    )
}

export default OrderDisplay;