import React from 'react'

export default function CheckoutStep(props) {
    return (
        <div className="checkout-steps">
            <div className={props.step1 ? 'active' : ''}>Profilga Kirish</div>
            <div className={props.step2 ? 'active' : ''}>Xarid qilish</div>
            <div className={props.step3 ? 'active' : ''}>Buyurtma Berish</div>
        </div>
    )
}
