import { id } from "date-fns/locale";
import { format, parseISO } from "date-fns";

export const localeID: Locale = {
  code: "id-ID",
  localize: {
    ordinalNumber() {
      return "";
    },
    era() {
      return "";
    },
    quarter() {
      return "";
    },
    month() {
      return "";
    },
    day() {
      return "";
    },
    dayPeriod() {
      return "";
    },
  },
};

export const formatID: typeof format = (d, f, o = {}) =>
  format(d, f, { ...o, locale: id });
export const parseDateInput: typeof parseISO = parseISO;
