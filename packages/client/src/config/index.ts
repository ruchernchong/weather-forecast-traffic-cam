import * as dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Singapore");

export const DEBOUNCE_WAIT_DURATION = 250;
