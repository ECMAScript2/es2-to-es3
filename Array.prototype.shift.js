/**
 * original:
 *   ?D of K / Function.prototype.applyとかArray.prototype.spliceのIE5用のコード
 *   https://ofk.hatenadiary.org/entry/20080904/1220485969
 *
 * for: IE4~5
 */
Array.prototype.shift || (Array.prototype.shift = function () {
    var t = this, r = t[0], i = 1, j = t.length;

    for (; i < j; ++i)
        t[i - 1] = t[i];
    --t.length;
    return r;
});