/**
 * original:
 *   ?D of K / Function.prototype.applyとかArray.prototype.spliceのIE5用のコード
 *   https://ofk.hatenadiary.org/entry/20080904/1220485969
 *
 * for: IE4~5
 */
Array.prototype.push || (Array.prototype.push = function () {
    var t = this, a = arguments, i = 0, j = a.length, l = t.length;

    for (; i < j; ++i)
        t[l + i] = a[i];
    return t.length;
});