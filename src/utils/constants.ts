export const ENV = {
  API: process.env.REACT_APP_API || "",
  API_DEVICES_PATH: process.env.REACT_APP_API_DEVICES_PATH || "",
};

if (!ENV.API) throw new Error("Missing env REACT_APP_API");
if (!ENV.API_DEVICES_PATH)
  throw new Error("Missing env REACT_APP_API_DEVICES_PATH");

export const isDevelopment = process.env.NODE_ENV === "development";

export const DEVICE_TYPES = [
  "MAC",
  "WINDOWS_WORKSTATION",
  "WINDOWS_SERVER",
  "UBUNTU",
  "FEDORA",
  "ARCH_LINUX",
  "DEBIAN",
  "CENTOS",
  "NIXOS",
];

export const DEVICE_SORT_BY = ["system_name", "type", "hdd_capacity"];
