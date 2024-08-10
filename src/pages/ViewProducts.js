import React, { useState, useEffect } from 'react';
import { Spin, Modal, message } from 'antd';
import { API_DELETE_PRODUCT, API_GET_PRODUCTS_BY_TYPE, API_UPDATE_PRODUCT } from '../api/api_product';
import ProductEditForm from '../less_use/ProductEditForm';
import ProductTable from '../less_use/ProductTable';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [ShowSpinner, setShowSpinner] = useState(false);
const [productDeleted, setproductDeleted] = useState(false);

const fetchProducts = async () => {
    setShowSpinner(true);
  try {
    const response = await API_GET_PRODUCTS_BY_TYPE('rugs');
    setProducts(response.data);
  } catch (error) {
    console.error(error);
    message.error('Failed to fetch products.');
  } finally {
    setShowSpinner(false);
  }
};
  useEffect(() => {

    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleDelete = async (productId) => {
    setShowSpinner(true);
    setProducts(products.filter((product) => product.product_id !== productId));
    const response = await API_DELETE_PRODUCT(productId);
    setShowSpinner(false);
  };

  const handleSubmit = async (values) => {
    setShowSpinner(true);
    // values.product_price_old = values.product_price_old == '' ? '0' :values.product_price_old
    await API_UPDATE_PRODUCT(values); 
    setProducts( products.map((product) => product.product_id === values.product_id ? values : product ) );
    setSelectedProduct(null);
    fetchProducts()
    setShowSpinner(false);
  };

  return (
    <div>
        {ShowSpinner && <Spin fullscreen />}
        <div className="row m-0">
        <div className="col p-0 px-5 pt-3 pt-sm-4 admin-heading">
          <p>Product Dashboard</p>
        </div>
      </div>
          <div className="row m-0 px-2">
            <div className="col">
                <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
            <Modal visible={!!selectedProduct} title="Edit Product" onCancel={() => setSelectedProduct(null)} footer={null} width={1000}>
                {selectedProduct && ( <ProductEditForm product={selectedProduct} onSubmit={handleSubmit} />)}
            </Modal>
            </div>
          </div>
    </div>
  );
};

export default ViewProducts;
