import { Button, Checkbox, TextField } from "@mui/material";
import { useState } from "react";
import Popup from "../generic/Popup";
import { deleteProduct, Product } from "../../redux/slices/productSlice";
import "./product-popups.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../generic/Loader";

export default function DeleteProductPopup({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/products/${product._id}`;

  async function onConfirmDelete() {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/", { replace: true });
        return;
      }

      await axios.delete(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOpen(false);
    } catch (err: any) {
      console.log(err);
      if (err?.response?.status === 401) {
        navigate("/", { replace: true });
      } else {
        setError(err?.response?.data?.message || "Failed to delete product");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <Button onClick={() => setOpen(true)} color="error" size="small">
        Delete
      </Button>
      <Popup
        open={open}
        onClose={() => setOpen(false)}
        title={`Delete product ${product.name}`}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <p>Are you sure that you want to delete {product.name}</p>
            {error && <span className="error-message">{error}</span>}
            <div className="actions">
              <Button
                onClick={onConfirmDelete}
                className="action-button"
                color="error"
                variant="contained"
              >
                Delete
              </Button>
              <Button
                onClick={() => setOpen(false)}
                variant="contained"
                className="action-button"
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </Popup>
    </div>
  );
}
