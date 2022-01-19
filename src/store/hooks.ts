import { useAppDispatch } from "./store";
import { useCallback } from "react";
import { Api } from "../services/api";
import * as reducer from "./reducer";
import { Logger } from "../utils/logger";
import { Device } from "../services/device";

const logger = new Logger("store/hooks.ts");

export const useFetchDevices = () => {
  const dispatch = useAppDispatch();

  const getAllDevices = useCallback(async () => {
    try {
      const response = await Api.devices.getAll();

      if (response) {
        dispatch(reducer.addDevices(response));
      }

      return Promise.resolve();
    } catch (e) {
      logger.error(e);
      return Promise.reject(e);
    }
  }, [dispatch]);

  const getDevice = useCallback(
    async (id: string) => {
      try {
        const response = await Api.devices.get(id);

        if (response) {
          dispatch(reducer.addDevice(response));
        }

        return Promise.resolve(response);
      } catch (e) {
        logger.error(e);
        return Promise.reject(e);
      }
    },
    [dispatch]
  );

  const addDevice = useCallback(
    async (device: Device) => {
      try {
        const response = await Api.devices.add(device);

        if (response) {
          dispatch(reducer.addDevice(response));
        }

        return Promise.resolve(response);
      } catch (e) {
        logger.error(e);
        return Promise.reject(e);
      }
    },
    [dispatch]
  );

  const updateDevice = useCallback(
    async (device: Device) => {
      try {
        const response = await Api.devices.update(device);

        if (response) {
          dispatch(reducer.addDevice(device));
        }

        return Promise.resolve(response);
      } catch (e) {
        logger.error(e);
        return Promise.reject(e);
      }
    },
    [dispatch]
  );

  const deleteDevice = useCallback(
    async (id: string) => {
      try {
        const response = await Api.devices.delete(id);

        if (response) {
          dispatch(reducer.deleteDevice(id));
        }

        return Promise.resolve(response);
      } catch (e) {
        logger.error(e);
        return Promise.reject(e);
      }
    },
    [dispatch]
  );

  return {
    getAllDevices,
    getDevice,
    addDevice,
    updateDevice,
    deleteDevice,
  };
};
