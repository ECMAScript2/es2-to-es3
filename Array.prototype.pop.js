/**
 * original:
 *   ?D of K / Function.prototype.applyとかArray.prototype.spliceのIE5用のコード
 *   https://ofk.hatenadiary.org/entry/20080904/1220485969
 *
 * for: IE4~5
 */
Array.prototype.pop || (Array.prototype.pop = function () {
    var t = this, r = t[t.length - 1];

    --t.length;
    return r;
});