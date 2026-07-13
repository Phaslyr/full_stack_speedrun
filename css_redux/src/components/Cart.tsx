import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../store/store';
import { clearCart } from '../store/cartSlice';
import CartItem from './CartItem';

function Cart() {
  const dispatch = useDispatch();
  
  const items = useSelector((s: RootState) => s.cart.items);
  const totalQuantity = useSelector((s: RootState) => s.cart.totalQuantity);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // TODO 11: Calculate total price (price * quantity for each item)
  const totalPrice = items.reduce((accumulator, i) => accumulator + i.price * i.quantity, 0);

  return (
    <div className="card">
      <h3 className="card-header">Cart</h3>
      { items.length > 0 
            ? 
            <>
                <h4 className="card-body text-muted">{totalQuantity} items</h4>
                <ul className="list-group">
                    {items.map((i) => (<li className="list-group-item" key={i.id}><CartItem item={i} /></li>))}
                </ul>
                <p className="card-body">Total Price: ${totalPrice}</p>
                <button className="btn btn-danger" onClick={handleClearCart}>Clear Cart</button>
            </> 
            : <p className="card-body text-muted">Your cart is empty</p> }
    </div>
  );
}

export default Cart;