import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../actions/productActions";

import Product from "./Product";

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProducts = () => dispatch(getProductsAction());
    loadProducts();
    // eslint-disable-next-line
  }, []);

  const products = useSelector((state) => state.products.products);
  const error = useSelector((state) => state.products.error);
  const loading = useSelector((state) => state.products.loading);

  return (
    <>
      <h2 className="text-center my-5">Products List</h2>

      {error ? (
        <p className="font-weight-bold alert alert-danger text-center mt-4">
          There was an error
        </p>
      ) : null}
      {loading ? <p className="text-center">Loading...</p> : null}

      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0
            ? "No products"
            : products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
        </tbody>
      </table>
    </>
  );
};

export default Products;
