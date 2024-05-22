export default class Utils {
  /**
   *
   * @param {Number} value - the value being set
   * @param {Number} min - the minimum allowed value
   * @param {Number} max - the maximum allowed value
   * @returns {Number}
   */
  static clamp(value, min, max) {
    if (value < min) {
      return min
    } else if (value > max) {
      return max
    }

    return value
  }
}
