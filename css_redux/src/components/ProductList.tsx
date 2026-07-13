import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import products, {type Product } from '../data/products';

function ProductList() {
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addItem(product));
  };

  return (
    <div>
      <h2>Products</h2>
      <div className="row">
        {products.map((p) => (
            <div className="card col-md-3">
                <img src={p.image} alt={p.name} className="card-img-top" />
                <h3 className="card-title">{p.name}</h3>
                <p className="card-body">${p.price}</p>
                <button className="btn btn-primary" onClick={() => handleAddToCart(p)}>Add to Cart</button>
            </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;