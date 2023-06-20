import * as dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Singapore");

const isProd = import.meta.env.NODE_ENV === "production";

export const API_URL = !isProd && `http://localhost:3000`;
export const DEBOUNCE_WAIT_DURATION = 250;
