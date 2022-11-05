import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  STAR_DOWNLOAD_PRODUCTS,
  DOWNLOAD_PRODUCTS_SUCCESS,
  DOWNLOAD_PRODUCTS_ERROR,
  GET_PRODUCT_DELETE,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_ERROR,
  GET_PRODUCT_EDIT,
  START_EDIT_PRODUCT,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_ERROR,
} from "../types";

import axiosClient from "../config/axios";
import Swal from "sweetalert2";

export function createNewProductAction(product) {
  return async (dispatch) => {
    dispatch(addProduct());

    try {
      await axiosClient.post("/products", product);

      dispatch(addProductSuccess(product));

      Swal.fire("Correct", "The product was added successfully", "success");
    } catch (error) {
      console.log(error);
      dispatch(addProductError(true));

      Swal.fire({
        icon: "error",
        title: "There was an error",
        text: "There was an error, try again",
      });
    }
  };
}

const addProduct = () => ({
  type: ADD_PRODUCT,
  payload: true,
});

const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});

const addProductError = (state) => ({
  type: ADD_PRODUCT_ERROR,
  payload: state,
});

export function getProductsAction() {
  return async (dispatch) => {
    dispatch(downloadProducts());

    try {
      const response = await axiosClient.get("/products");
      dispatch(downloadProductsSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(downloadProductsError());
    }
  };
}

const downloadProducts = () => ({
  type: STAR_DOWNLOAD_PRODUCTS,
  payload: true,
});

const downloadProductsSuccess = (products) => ({
  type: DOWNLOAD_PRODUCTS_SUCCESS,
  payload: products,
});

const downloadProductsError = () => ({
  type: DOWNLOAD_PRODUCTS_ERROR,
  payload: true,
});

export function deleteProductAction(id) {
  return async (dispatch) => {
    dispatch(getProductDelete(id));

    try {
      await axiosClient.delete(`/products/${id}`);
      dispatch(deleteProductSuccess());
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    } catch (error) {
      console.log(error);
      dispatch(deleteProductError());
    }
  };
}

const getProductDelete = (id) => ({
  type: GET_PRODUCT_DELETE,
  payload: id,
});

const deleteProductSuccess = () => ({
  type: PRODUCT_DELETE_SUCCESS,
});

const deleteProductError = () => ({
  type: PRODUCT_DELETE_ERROR,
  payload: true,
});

export function getProductEdit(product) {
  return (dispatch) => {
    dispatch(getProductAction(product));
  };
}

const getProductAction = (product) => ({
  type: GET_PRODUCT_EDIT,
  payload: product,
});

export const editProductAction = (product) => {
  return async (dispatch) => {
    dispatch(editProduct());

    try {
      await axiosClient.put(`/products/${product.id}`, product);
      dispatch(editProductSuccess(product));
    } catch (error) {
      console.log(error);
      dispatch(editProductError());
    }
  };
};

const editProduct = () => ({
  type: START_EDIT_PRODUCT,
});

const editProductSuccess = (product) => ({
  type: PRODUCT_EDIT_SUCCESS,
  payload: product,
});

const editProductError = () => ({
  type: PRODUCT_EDIT_ERROR,
  payload: true,
});
