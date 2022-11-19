/**
 * original:
 *   ?D of K / Function.prototype.applyとかArray.prototype.spliceのIE5用のコード
 *   https://ofk.hatenadiary.org/entry/20080904/1220485969
 *
 * for: IE4~5
 */
Array.prototype.shift || (Array.prototype.shift = function () {
    var j = this.length; // IE5 : this.length === 0, --this.length, this.length === 4294967296

    if (j) {
        var r = this[0], i = 1;

        for (; i < j; ++i)
            this[i - 1] = this[i];
        --this.length;
        return r;
    };
});