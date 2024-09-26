import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { ProductsProvider } from './components/ProductsProvider';
{
  <script
  src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossOrigin></script>
}
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductsProvider>
      <App />
    </ProductsProvider>
  </React.StrictMode>
);
