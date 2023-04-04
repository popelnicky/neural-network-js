export class Utils {
  static shuffle(arr) {
    if (!arr.length || arr.length === 0) {
      return [];
    }

    const last = arr.length - 1;

    for (let i = last; i > 0; i--) {
      let t = Math.floor(Math.random() * last);

      [arr[i], arr[t]] = [arr[t], arr[i]];
    }

    return arr;
  }

  static random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
  }
}
