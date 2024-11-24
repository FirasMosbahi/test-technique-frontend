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

const productSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  type: yup.string().required("Type is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be a positive number")
    .required("Price is required"),
  rating: yup
    .number()
    .typeError("Price must be a number")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5")
    .required("Rating is required"),
  warranty_years: yup
    .number()
    .typeError("Price must be a number")
    .min(1, "Warranty must be at least 1 year")
    .required("Warranty is required"),
  available: yup.boolean().required("Availability is required"),
});

export default function AddProductModal() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    resolver: yupResolver(productSchema),
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(newProduct: Product) {
    setLoading(true);

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/products`,
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
    } catch (error) {
      // @ts-ignore
      setError(error?.response?.data?.message || "Failed to add product");

      // @ts-ignore
      if (error?.response?.status === 401) {
        navigate("/", { replace: true });
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <div>
      <Button onClick={() => setOpen(true)} variant="contained" size="small">
        Add Product
      </Button>
      <Popup open={open} onClose={() => setOpen(false)} title="Create product">
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
            <div className="actions">
              <Button
                type="submit"
                className="action-button"
                variant="contained"
              >
                Create
              </Button>
              <Button
                onClick={() => setOpen(false)}
                variant="contained"
                className="action-button"
                color="error"
              >
                Cancel
              </Button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </form>
        )}
      </Popup>
    </div>
  );
}
