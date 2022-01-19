import { Device } from "../../services/device";
import { DEVICE_TYPES } from "../../utils/constants";
import Button from "../buttons/Button";
import Dialog from "./Dialog";
import { ChangeEvent } from "react";

interface EditDialogProps {
  open: boolean;
  editing?: boolean;
  currDevice?: Device;
  onSave: () => void;
  onClose: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function EditDialog({
  open,
  editing,
  currDevice,
  onSave,
  onClose,
  onChange,
}: EditDialogProps) {
  const renderEditDialogHeader = () => (
    <h2>{editing ? `Edit ${currDevice?.system_name}` : "Add new device"}</h2>
  );
  const renderEditDialogBody = () => (
    <form className="edit-form">
      <label>
        System Name
        <input
          autoFocus
          required
          name="system_name"
          defaultValue={currDevice?.system_name}
          onChange={onChange}
        />
      </label>
      <label>
        Type
        <select
          required
          name="type"
          defaultValue={currDevice?.type}
          onChange={onChange}
        >
          <option defaultChecked />
          {DEVICE_TYPES.map((el, i) => (
            <option key={`${i}_${el}`}>{el}</option>
          ))}
        </select>
      </label>
      <label>
        HDD Capacity (GB)
        <input
          required
          name="hdd_capacity"
          defaultValue={currDevice?.hdd_capacity}
          onChange={onChange}
        />
      </label>
    </form>
  );
  const renderEditDialogFooter = () => (
    <>
      <Button color="info" onClick={onSave}>
        Save
      </Button>
      <Button onClick={onClose}>Cancel</Button>
    </>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      header={renderEditDialogHeader()}
      body={renderEditDialogBody()}
      footer={renderEditDialogFooter()}
    />
  );
}
