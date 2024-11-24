import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { Product } from "../../redux/slices/productSlice";
import EditProductPopup from "./EditProductPopup";
import DeleteProductPopup from "./DeleteProductPopup";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Type: {product.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {product.rating}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Warranty: {product.warranty_years} years
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Available: {product.available ? "Yes" : "No"}
        </Typography>
      </CardContent>
      <CardActions>
        <EditProductPopup product={product} />
        <DeleteProductPopup product={product} />
      </CardActions>
    </Card>
  );
}
