import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (product) => {
    // Check if the product is already in the cart
    const productIndex = cart.findIndex((item) => item.id === product.id);

    if (productIndex === -1) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      const updatedCart = [...cart];
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);
    }
  };

  const openDetailsModal = (product) => {
    setSelectedProduct(product);
  };

  const closeDetailsModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="App">
      <header>
        <h1>Fake Store</h1>
        <div className="cart">
          <span className="cart-icon" role="img" aria-label="cart">
            🛒
          </span>
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </div>
      </header>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img className="image" src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>${product.price}</p>
            <button onClick={() => openDetailsModal(product)}>
              View Details
            </button>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <img src={selectedProduct.image} alt={selectedProduct.title} />
            <div>
              <h2>{selectedProduct.title}</h2>
              <p>{selectedProduct.description}</p>
              <p>${selectedProduct.price}</p>
              <button onClick={closeDetailsModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
