import { Device } from "../../services/device";
import "./DevicesTable.scss";
import IconButton from "../buttons/IconButton";
import {
  FaCheck,
  FaChevronDown,
  FaPencilAlt,
  FaPlus,
  FaTrashAlt,
} from "react-icons/fa";
import Dropdown from "../Dropdown/Dropdown";
import { DEVICE_SORT_BY, DEVICE_TYPES } from "../../utils/constants";
import clsx from "clsx";
import { Sort } from "../../store/reducer";

interface DevicesTableProps {
  devices: Device[];
  onAdd: () => void;
  onEdit: (device: Device) => void;
  onDelete: (device: Device) => void;
  filter: string[];
  onFilter: (type: string) => void;
  filterOpen: boolean;
  onOpenFilter: () => void;
  onCloseFilter: () => void;
  sort: Sort;
  sortOpen: boolean;
  onOpenSort: () => void;
  onCloseSort: () => void;
  onSort: (by: string) => void;
}

export default function DevicesTable({
  devices,
  onAdd,
  onEdit,
  onDelete,
  filter,
  onFilter,
  filterOpen,
  onOpenFilter,
  onCloseFilter,
  sort,
  sortOpen,
  onOpenSort,
  onCloseSort,
  onSort,
}: DevicesTableProps) {
  const renderRow = (device: Device) => (
    <tr id={device.id} key={device.id}>
      <td onDoubleClick={() => onEdit(device)}>
        {device.system_name && (
          <p className="device-system_name">{device.system_name}</p>
        )}
        {device.type && <p className="device-type">{device.type}</p>}
        {device.hdd_capacity && (
          <p className="device-hdd_capacity">{device.hdd_capacity}</p>
        )}
      </td>
      <td>
        <IconButton color={"info"} onClick={() => onEdit(device)}>
          <FaPencilAlt />
        </IconButton>
        <IconButton color={"error"} onClick={() => onDelete(device)}>
          <FaTrashAlt />
        </IconButton>
      </td>
    </tr>
  );

  const renderDeviceTypeFilter = () =>
    filter.length
      ? filter.length === 1
        ? filter[0]
        : filter[0] + " + " + (filter.length - 1)
      : "All";

  return (
    <div className="table-container">
      <div className="table-container-header">
        <Dropdown
          open={filterOpen}
          onOpen={onOpenFilter}
          onClose={onCloseFilter}
          options={DEVICE_TYPES.map((el, index) => ({
            key: `${index}_${el}`,
            children: (
              <>
                {filter.includes(el) && <FaCheck />}
                {el}
              </>
            ),
            onClick: () => onFilter(el),
            className: clsx({
              selected: filter.includes(el),
            }),
          }))}
        >
          Device Type: {renderDeviceTypeFilter()} <FaChevronDown />
        </Dropdown>
        <Dropdown
          open={sortOpen}
          onOpen={onOpenSort}
          onClose={onCloseSort}
          options={DEVICE_SORT_BY.map((el, index) => ({
            key: `${index}_${el}`,
            children: (
              <>
                {sort.by === el && <FaCheck />}
                {el}
              </>
            ),
            onClick: () => onSort(el),
            className: clsx({
              selected: sort.by === el,
            }),
          }))}
        >
          Sort by: {sort.by} <FaChevronDown />
        </Dropdown>
        <div className="grow" />
        <IconButton color={"success"} onClick={() => onAdd()}>
          <FaPlus />
        </IconButton>
      </div>
      <table className={"devices"}>
        <tbody>{devices.map(renderRow)}</tbody>
      </table>
    </div>
  );
}
