import { ENV } from "../utils/constants";
import { Logger } from "../utils/logger";

const logger = new Logger("services/device.ts");

export type Device = {
  id: string;
  system_name?: string;
  type?: string;
  hdd_capacity?: number;
};

export type SuccessFetch = 0 | 1;

class DevicesService {
  private base = `${ENV.API}${ENV.API_DEVICES_PATH}`;

  async getAll() {
    try {
      const data = await fetch(this.base);
      const res: Device[] | undefined = await data.json();

      return Promise.resolve(res);
    } catch (e) {
      logger.error(e);
      return Promise.reject(e);
    }
  }

  async get(id: string) {
    try {
      const data = await fetch(`${this.base}/${id}`);
      const res: Device | undefined = await data.json();

      return Promise.resolve(res);
    } catch (e) {
      logger.error(e);
      return Promise.reject(e);
    }
  }

  async add(device: Device) {
    const init: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(device),
    };

    try {
      const data = await fetch(this.base, init);
      const res: Device | undefined = await data.json();

      return Promise.resolve(res);
    } catch (e) {
      logger.error(e);
      return Promise.reject(e);
    }
  }

  async update(device: Device) {
    const init: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(device),
    };

    try {
      const data = await fetch(`${this.base}/${device.id}`, init);
      const res: SuccessFetch = await data.json();

      return Promise.resolve(!!res);
    } catch (e) {
      logger.error(e);
      return Promise.reject(e);
    }
  }

  async delete(id: string) {
    const init: RequestInit = {
      method: "DELETE",
    };

    try {
      const data = await fetch(`${this.base}/${id}`, init);
      const res: SuccessFetch = await data.json();

      return Promise.resolve(!!res);
    } catch (e) {
      logger.error(e);
      return Promise.reject(e);
    }
  }
}

export default new DevicesService();
