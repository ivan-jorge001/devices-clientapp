import { isDevelopment } from "./constants";

export class Logger {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  log(...optionalParams: any[]) {
    if (isDevelopment) {
      console.log(this.key, optionalParams);
    }
  }

  info(...optionalParams: any[]) {
    if (isDevelopment) {
      console.info(this.key, optionalParams);
    }
  }

  error(...optionalParams: any[]) {
    if (isDevelopment) {
      console.error(this.key, optionalParams);
    }
  }
}
