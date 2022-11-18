/**
 * original:
 *   ?D of K / Function.prototype.applyとかArray.prototype.spliceのIE5用のコード
 *   https://ofk.hatenadiary.org/entry/20080904/1220485969
 *
 * for: IE4~5
 */
Array.prototype.unshift || (Array.prototype.unshift = function () {
    var t = this, a = arguments, l = a.length, j = t.length += l - 1, i = j;

    for (; i >= l; --i)
        t[i] = t[i - l];
    for (i = 0; i < l; ++i)
        t[i] = a[i];
    return j;
});