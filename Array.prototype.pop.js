/**
 * original:
 *   ?D of K / Function.prototype.applyとかArray.prototype.spliceのIE5用のコード
 *   https://ofk.hatenadiary.org/entry/20080904/1220485969
 *
 * for: IE4~5
 */
Array.prototype.pop || (Array.prototype.pop = function () {
    // IE5 : this.length === 0, --this.length, this.length === 4294967296
    var j = this.length, r = this[j - 1];

    j && (--this.length);
    return r;
});