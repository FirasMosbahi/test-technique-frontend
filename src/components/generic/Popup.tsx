import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

type PopupProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export default function Popup({ open, title, children, onClose }: PopupProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
