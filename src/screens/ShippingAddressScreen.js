import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { saveShippingAddress } from "../actions/cartAction";
import CheckoutSteps from "../components/CheckoutStep";

export default function ShippingAddressScreen() {
    
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const navigate = useNavigate();
    
    console.log(userInfo);
    
    if (!userInfo) {
        console.log('yes');
      navigate("/signin");
    }
  const [fullName, setFullName] = useState("");
  const [address, setAddreess] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ fullName, address, phoneNumber }));
    alert('Buyurtma qabul qilindi. Tez orada yetkazib beriladi...');
    navigate('/');
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form onSubmit={submitHandler} className="sign-in-form">
        <h2 className="title">Quyidagi Ma'lumotlarni to'ldiring</h2>
        <div className="input-field">
          <i className="fas fa-user"></i>
          <input
            type="text"
            value={fullName}
            placeholder="Familiyangiz va Ismingiz"
            required
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="input-field">
          <i className="fa-solid fa-truck"></i>
          <input
            type="text"
            value={address}
            placeholder="Manzilni kiriting"
            required
            onChange={(e) => setAddreess(e.target.value)}
          />
        </div>
        <div className="input-field">
          <i className="fa-solid fa-phone"></i>
          <input
            type="text"
            value={phoneNumber}
            placeholder="Telefon Raqamingiz"
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <input type="submit" value="Buyurtma berish" className="btn shipping" />
      </form>
    </div>
  );
}
