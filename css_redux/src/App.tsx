import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  return (
    <div>
      {/* TODO 17: Create app layout */}
      {/* - Navbar at top with title "Redux Shopping Cart" */}
      {/* - Two-column layout: Products on left (wider), Cart on right */}
      {/*
        Bootstrap classes to use:
        - navbar, navbar-dark, bg-dark, navbar-brand for the navbar
        - container-fluid for full-width container
        - row for the row
        - col-md-8 for products column
        - col-md-4 for cart column
        - mt-4 for top margin
      */}
      <div className="navbar navbar-dark bg-dark justify-content-center">
        <h1 className="navbar-brand h1 mb-0 text-white">Redux Shopping Cart</h1>
      </div>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-8">
            <ProductList />
          </div>
          <div className="col-md-4">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;