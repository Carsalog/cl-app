import JwtDecode from "jwt-decode";

export const decodeUser = token => {
  /**
   * Try to decode user, return user object or null
   * @param token: String
   * @return Object|null:
   */

  try {
    return JwtDecode(token);
  } catch (e) {
    return null;
  }
};

export const formatDate = date => {
  /**
   * Convert date string to object
   * @param date: String
   * @type {Date}
   * @return String:
   */

  const d = new Date(date);
  const year = String(d.getUTCFullYear());
  const month = d.getUTCMonth() < 10 ? `0${d.getUTCMonth()}` : `${d.getUTCMonth()}`;
  const day = d.getUTCDay() < 10 ? `0${d.getUTCDay()}` : `${d.getUTCDay()}`;
  const hours = d.getUTCHours() < 10 ? `0${d.getUTCHours()}` : `${d.getUTCHours()}`;
  const minutes = d.getUTCMinutes() < 10 ? `0${d.getUTCMinutes()}` : `${d.getUTCMinutes()}`;
  const seconds = d.getUTCSeconds() < 10 ? `0${d.getUTCSeconds()}` : `${d.getUTCSeconds()}`;

  return {day, month, year, hours, minutes, seconds};
};

export const getCurrentYear = () => Number((new Date()).getFullYear());
