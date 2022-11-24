/**
 * original:
 *   MDN / Array.prototype.indexOf
 *   https://web.archive.org/web/20131011160850/https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Compatibility
 *
 * for IE 4~7, Opera 7.0~9.5x, Gecko 0.6~1.7.x
 */
Array.prototype.indexOf || (Array.prototype.indexOf = function (e /* searchElement */, i /* fromIndex */) {
    var t = this, l = t.length >>> 0;
    
    if (l === 0) return -1;

    if (i) {
        i = i || 0;
        i = i === -1/0 /* -Infinity */ ? 0 : (i < 0 ? -i : i) | 0; // Math.floor
        if (l <= i) return -1;
    };

    for (i = 0 <= i ? i : 0 < l + i ? l + i : 0; i < l; ++i) {
        if (t[i] === e) return i;
    };
    return -1;
});