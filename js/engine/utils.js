export default class Utils {
  static clamp(value, min, max) {
    if (value < min) {
      return min
    } else if (value > max) {
      return max
    }

    return value
  }
}
