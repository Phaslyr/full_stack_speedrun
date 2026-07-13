import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity, type Item } from '../store/cartSlice';

function CartItem({ item }: { item: Item }) {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(updateQuantity({id: item.id, quantity: 1}));
  };

  const handleDecrease = () => {
    dispatch(updateQuantity({id: item.id, quantity: -1}));
  };

  const handleRemove = (i: Item) => {
    dispatch(removeItem(i))
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      {/* TODO 16: Display item name, price, quantity with +/- buttons, and Remove button */}
      {/*
        Bootstrap classes to use:
        - d-flex, justify-content-between, align-items-center for layout
        - btn btn-sm btn-secondary for +/- buttons
        - btn btn-sm btn-danger for Remove button
        - mb-0 for removing margin from text elements
      */}
      <p className="mb-0">{item.name}, ${item.price}, Quantity: {item.quantity}</p>
      <button className="btn btn-sm btn-secondary" onClick={handleIncrease}>+</button>
      <button className="btn btn-sm btn-secondary" onClick={handleDecrease}>-</button>
      <button className="btn btn-sm btn-danger" onClick={() => handleRemove(item)}>Remove</button>
    </div>
  );
}

export default CartItem;