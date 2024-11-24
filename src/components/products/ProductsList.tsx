import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import {
  addProduct,
  deleteProduct,
  setProducts,
  updateProduct,
} from "../../redux/slices/productSlice";
import ProductItem from "./ProductItem";
import "./products-list.css";
import AddProductModal from "./AddProductModal";
import axios from "axios";
import { io } from "socket.io-client";

export default function ProductsList() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/products`,
        );
        dispatch(setProducts(response.data));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();

    const socket = io(process.env.REACT_APP_BACKEND_URL);

    socket.on("productAdded", (product) => {
      dispatch(addProduct(product));
    });

    socket.on("productUpdated", (product) => {
      dispatch(updateProduct(product));
    });

    socket.on("productDeleted", (product) => {
      dispatch(deleteProduct(product?._id));
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="products-list">
      <h1>Products List</h1>
      <AddProductModal />
      <div className="products">
        {products.map((product) => (
          <ProductItem product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
