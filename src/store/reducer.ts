import { createSlice } from "@reduxjs/toolkit";
import { Device } from "../services/device";
import { RootState } from "./store";

export type Order = "ASC" | "DESC";

export type Sort = {
  by: string;
  order: Order;
};

type AppState = {
  devices: {
    [key: string]: Device;
  };
  deviceFilter: string[];
  deviceSort: Sort;
};

type Action = {
  type: string;
};

type ActionAddDevices = Action & {
  payload: Device[];
};

type ActionAddDevice = Action & {
  payload: Device;
};

type ActionDeleteDevice = Action & {
  payload: string;
};

type ActionDeviceFilter = Action & {
  payload: string;
};

type ActionDeviceSort = Action & {
  payload: string;
};

const initialState: AppState = {
  devices: {},
  deviceFilter: [],
  deviceSort: {
    by: "type",
    order: "DESC",
  },
};

export const devicesSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    addDevices(state, { payload: devices }: ActionAddDevices) {
      devices.forEach((device) => {
        state.devices[device.id] = device;
      });
    },
    addDevice(state, { payload: device }: ActionAddDevice) {
      state.devices[device.id] = device;
    },
    deleteDevice(state, { payload: id }: ActionDeleteDevice) {
      state.devices = Object.fromEntries(
        Object.entries(state.devices).filter(([key]) => key !== id)
      );
    },
    filterDevice(state, { payload: deviceFilter }: ActionDeviceFilter) {
      if (state.deviceFilter.includes(deviceFilter)) {
        state.deviceFilter = state.deviceFilter.filter(
          (el) => el !== deviceFilter
        );
      } else {
        state.deviceFilter.push(deviceFilter);
      }
    },
    sortDevice(state, { payload: deviceSort }: ActionDeviceSort) {
      state.deviceSort.by = deviceSort;
    },
  },
});

export const { addDevices, addDevice, deleteDevice, filterDevice, sortDevice } =
  devicesSlice.actions;

export const selectDevices = (state: RootState) =>
  Object.values(state.devices)
    .filter((el) =>
      state.deviceFilter.length
        ? state.deviceFilter.includes(el.type || "")
        : el
    )
    .sort((a, b) =>
      state.deviceSort.by
        ? state.deviceSort.order === "DESC"
          ? // @ts-ignore
            a[state.deviceSort.by] > b[state.deviceSort.by]
            ? 1
            : -1
          : // @ts-ignore
          a[state.deviceSort.by] < b[state.deviceSort.by]
          ? 1
          : -1
        : 0
    );

export const selectDevice = (state: RootState, id: string) => state.devices[id];

export const selectDeviceFilter = (state: RootState) => state.deviceFilter;
export const selectDeviceSort = (state: RootState) => state.deviceSort;

export default devicesSlice.reducer;
