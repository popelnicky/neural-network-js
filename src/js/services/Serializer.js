export class Serializer {
  static _alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  static encode(decoded) {
    const result = [];
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;

    const data = this._utf8_encode(JSON.stringify(decoded));

    while (i < data.length) {
      chr1 = data.charCodeAt(i++);
      chr2 = data.charCodeAt(i++);
      chr3 = data.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      result.push(this._alphabet.charAt(enc1));
      result.push(this._alphabet.charAt(enc2));
      result.push(this._alphabet.charAt(enc3));
      result.push(this._alphabet.charAt(enc4));
    }

    return result.join("");
  }

  static decode(encoded) {
    const output = [];
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;

    encoded = encoded.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < encoded.length) {
      enc1 = this._alphabet.indexOf(encoded.charAt(i++));
      enc2 = this._alphabet.indexOf(encoded.charAt(i++));
      enc3 = this._alphabet.indexOf(encoded.charAt(i++));
      enc4 = this._alphabet.indexOf(encoded.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output.push(String.fromCharCode(chr1));

      if (enc3 != 64) {
        output.push(String.fromCharCode(chr2));
      }

      if (enc4 != 64) {
        output.push(String.fromCharCode(chr3));
      }
    }

    const result = this._utf8_decode(output.join(""));

    try {
      return JSON.parse(result);
    } catch (ex) {
      return result;
    }
  }

  static _utf8_encode(str) {
    const result = [];

    str = str.replace(/\r\n/g, "\n");

    for (let i = 0; i < str.length; i++) {
      const chr = str.charCodeAt(i);

      if (chr < 128) {
        result.push(String.fromCharCode(chr));

        continue;
      }

      if (chr > 127 && chr < 2048) {
        result.push(String.fromCharCode((chr >> 6) | 192));
        result.push(String.fromCharCode((chr & 63) | 128));

        continue;
      }

      result.push(String.fromCharCode((chr >> 12) | 224));
      result.push(String.fromCharCode(((chr >> 6) & 63) | 128));
      result.push(String.fromCharCode((chr & 63) | 128));
    }

    return result.join("");
  }

  static _utf8_decode(str) {
    const result = [];
    let i = 0;
    let chr1 = 0;
    let chr2 = 0;
    let chr3 = 0;

    while (i < str.length) {
      chr1 = str.charCodeAt(i);

      if (chr1 < 128) {
        result.push(String.fromCharCode(chr1));

        i++;

        continue;
      }

      if (chr1 > 191 && chr1 < 224) {
        chr2 = str.charCodeAt(i + 1);

        result.push(String.fromCharCode(((chr1 & 31) << 6) | (chr2 & 63)));

        i += 2;

        continue;
      }

      chr2 = str.charCodeAt(i + 1);
      chr3 = str.charCodeAt(i + 2);

      result.push(
        String.fromCharCode(
          ((chr1 & 15) << 12) | ((chr2 & 63) << 6) | (chr3 & 63)
        )
      );

      i += 3;
    }

    return result.join("");
  }
}
