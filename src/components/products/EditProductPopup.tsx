import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Checkbox, TextField } from "@mui/material";
import axios from "axios";
import * as yup from "yup";

import { Product } from "../../redux/slices/productSlice";
import Loader from "../generic/Loader";
import Popup from "../generic/Popup";

import "./product-popups.css";

const productSchema = yup.object().shape({
  name: yup.string(),
  type: yup.string(),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be a positive number"),
  rating: yup
    .number()
    .typeError("Price must be a number")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
  warranty_years: yup
    .number()
    .typeError("Price must be a number")
    .min(1, "Warranty must be at least 1 year"),
  available: yup.boolean(),
});

export default function EditProductPopup({ product }: { product: Product }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Product>>({
    resolver: yupResolver(productSchema),
    defaultValues: product,
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/products/${product._id}`;

  async function onSubmit(updatedProduct: Partial<Product>) {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/", { replace: true });
        return;
      }

      await axios.patch(API_URL, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOpen(false);
    } catch (err: any) {
      if (err.response?.status === 401) {
        navigate("/", { replace: true });
      } else {
        setError(err.response?.data?.message || "Failed to update product");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Button onClick={() => setOpen(true)} size="small">
        Edit
      </Button>
      <Popup
        open={open}
        onClose={() => setOpen(false)}
        title={`Edit product ${product.name}`}
      >
        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-element">
              <label>Name</label>
              <TextField
                error={!!errors.name}
                helperText={errors.name?.message}
                variant="outlined"
                {...register("name")}
              />
            </div>
            <div className="input-element">
              <label>Type</label>
              <TextField
                error={!!errors.type}
                helperText={errors.type?.message}
                variant="outlined"
                {...register("type")}
              />
            </div>
            <div className="input-element">
              <label>Price</label>
              <TextField
                error={!!errors.price}
                helperText={errors.price?.message}
                variant="outlined"
                {...register("price")}
              />
            </div>
            <div className="input-element">
              <label>Rating</label>
              <TextField
                error={!!errors.rating}
                helperText={errors.rating?.message}
                variant="outlined"
                {...register("rating")}
              />
            </div>
            <div className="input-element">
              <label>Warranty</label>
              <TextField
                error={!!errors.warranty_years}
                helperText={errors.warranty_years?.message}
                variant="outlined"
                {...register("warranty_years")}
              />
            </div>
            <div>
              <label>Availability</label>
              <Checkbox {...register("available")} />
              {errors.available && (
                <span className="form-error">{errors.available?.message}</span>
              )}
            </div>
            {error && <span className="error-message">{error}</span>}
            <div className="actions">
              <Button
                type="submit"
                className="action-button"
                variant="contained"
              >
                Edit
              </Button>
              <Button
                variant="contained"
                onClick={() => setOpen(false)}
                className="action-button"
                color="error"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Popup>
    </div>
  );
}
