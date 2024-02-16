import * as dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Singapore");

export const API_URL = import.meta.env.VITE_API_URL;
export const DEBOUNCE_WAIT_DURATION = 250;
