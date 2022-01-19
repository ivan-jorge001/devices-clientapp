import Dialog from "./Dialog";
import Button from "../buttons/Button";
import { Device } from "../../services/device";

interface ConfirmDialogProps {
  open: boolean;
  currDevice?: Device;
  onDelete: () => void;
  onClose: () => void;
}

export default function ConfirmDialog({
  open,
  currDevice,
  onDelete,
  onClose,
}: ConfirmDialogProps) {
  const renderConfirmDialogBody = () => (
    <h2>Delete device {currDevice?.system_name}?</h2>
  );
  const renderConfirmDialogFooter = () => (
    <>
      <Button color="error" onClick={onDelete}>
        Delete
      </Button>
      <Button onClick={onClose}>Cancel</Button>
    </>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      body={renderConfirmDialogBody()}
      footer={renderConfirmDialogFooter()}
    />
  );
}
