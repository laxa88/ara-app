// https://stackoverflow.com/questions/23593052/format-javascript-date-to-yyyy-mm-dd

/**
 * Returns today's date, e.g. "2018-11-16"
 */
const getDate = () => {
  const d = new Date();

  const year = d.getFullYear();
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  const resultDate = [year, month, day].join('-');

  return resultDate;
};

/**
 * Returns current time, e.g. "23:42:09"
 */
const getTime = () => {
  const d = new Date();

  let h = d.getHours().toString();
  let m = d.getMinutes().toString();
  let s = d.getSeconds().toString();

  if (h.length < 2) {
    h = `0${h}`;
  }

  if (m.length < 2) {
    m = `0${m}`;
  }

  if (s.length < 2) {
    s = `0${s}`;
  }

  const resultTime = [h, m, s].join(':');

  return resultTime;
};

/**
 * Returns formatted date, e.g. "2018-11-16 23:42:09"
 */
const formatDate = () => {
  const result = `${getDate()} ${getTime()}`;
  return result;
};

export { getDate, getTime, formatDate };
