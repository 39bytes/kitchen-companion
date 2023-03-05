import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

type DeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export const DeleteDialog = ({
  open,
  onClose,
  onDelete,
}: DeleteDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete recipe?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
