import "./Home.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { useFetchDevices } from "../store/hooks";
import { Logger } from "../utils/logger";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  filterDevice,
  selectDeviceFilter,
  selectDevices,
  selectDeviceSort,
  sortDevice,
} from "../store/reducer";
import DevicesTable from "../components/DevicesTable/DevicesTable";
import EditDialog from "../components/Dialog/EditDialog";
import ConfirmDialog from "../components/Dialog/ConfirmDialog";
import { Device } from "../services/device";

const logger = new Logger("pages/Home.tsx");

export default function HomePage() {
  const dispatch = useAppDispatch();

  const { getAllDevices, addDevice, updateDevice, deleteDevice } =
    useFetchDevices();

  const devices = useAppSelector(selectDevices);
  const deviceFilter = useAppSelector(selectDeviceFilter);
  const deviceSort = useAppSelector(selectDeviceSort);

  const [editing, setEditing] = useState<boolean>();
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [currDevice, setCurrDevice] = useState<Device>();

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const handleEditDevice = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // @ts-ignore
    setCurrDevice({
      ...currDevice,
      [e.target.name]: e.target.value,
    });
  };

  const openConfirmDialog = (device: Device) => {
    setCurrDevice(device);
    setConfirmDialog(true);
  };
  const closeConfirmDialog = () => {
    setConfirmDialog(false);
    setCurrDevice(undefined);
  };

  const openAddDialog = () => {
    setEditing(false);
    setEditDialog(true);
  };
  const openEditDialog = (device: Device) => {
    setEditing(true);
    setCurrDevice(device);
    setEditDialog(true);
  };
  const closeEditDialog = () => {
    setEditDialog(false);
    setCurrDevice(undefined);
  };

  const openFilter = () => {
    setFilterOpen(true);
  };
  const closeFilter = () => {
    setFilterOpen(false);
  };

  const openSort = () => {
    setSortOpen(true);
  };
  const closeSort = () => {
    setSortOpen(false);
  };

  const handleConfirmEdit = async () => {
    if (currDevice) {
      if (typeof editing === "undefined") {
        closeEditDialog();
        return;
      }

      if (editing) {
        await updateDevice(currDevice);
      } else {
        await addDevice(currDevice);
      }
      closeEditDialog();
    }
  };

  const handleConfirmDelete = async () => {
    if (currDevice) {
      await deleteDevice(currDevice.id);
      closeConfirmDialog();
    }
  };

  const handleFilterDevice = (type: string) => {
    dispatch(filterDevice(type));
    closeFilter();
  };

  const handleSortDevice = (by: string) => {
    dispatch(sortDevice(by));
    closeSort();
  };

  useEffect(() => {
    getAllDevices().catch(logger.error);
  }, [getAllDevices]);

  return (
    <main>
      <DevicesTable
        filter={deviceFilter}
        filterOpen={filterOpen}
        onOpenFilter={openFilter}
        onCloseFilter={closeFilter}
        devices={devices}
        onAdd={openAddDialog}
        onEdit={openEditDialog}
        onDelete={openConfirmDialog}
        onFilter={handleFilterDevice}
        sort={deviceSort}
        sortOpen={sortOpen}
        onOpenSort={openSort}
        onCloseSort={closeSort}
        onSort={handleSortDevice}
      />
      <EditDialog
        editing={editing}
        open={editDialog}
        currDevice={currDevice}
        onSave={handleConfirmEdit}
        onClose={closeEditDialog}
        onChange={handleEditDevice}
      />
      <ConfirmDialog
        open={confirmDialog}
        currDevice={currDevice}
        onDelete={handleConfirmDelete}
        onClose={closeConfirmDialog}
      />
    </main>
  );
}
