/**
 * original:
 *   ?D of K / Function.prototype.applyとかArray.prototype.spliceのIE5用のコード
 *   https://ofk.hatenadiary.org/entry/20080904/1220485969
 *
 * for: IE4~5
 */
Array.prototype.splice || (Array.prototype.splice = function (x, y) {
    var t = this, a = arguments, s = a.length - 2 - y, r = t.slice(x, x + y),i,j;

    if (s > 0) {
        for (i = t.length - 1, j = x + y; i >= j; --i)
            t[i + s] = t[i];
    }
    else if (s < 0) {
        for (i = x + y, j = t.length; i < j; ++i)
            t[i + s] = t[i];
        t.length += s;
    };
    for (i = 2, j = a.length; i < j; ++i)
        t[i - 2 + x] = a[i];
    return r;
});