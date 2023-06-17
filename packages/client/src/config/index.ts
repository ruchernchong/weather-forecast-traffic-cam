import * as dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Singapore");

export const DATA_GOV_SG_API_URL = `https://api.data.gov.sg/v1`;
export const DEBOUNCE_WAIT_DURATION = 250;
