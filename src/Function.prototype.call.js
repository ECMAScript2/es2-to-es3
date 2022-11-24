/** 
 * original:
 *   ?D of K / Function.prototype.applyとかArray.prototype.spliceのIE5用のコード
 *   https://ofk.hatenadiary.org/entry/20080904/1220485969
 * 
 * for: IE4~5
 * --------
 * Depends on Function.prototype.apply.js!
 */
Function.prototype.call || (Function.prototype.call = function () {
    var a = arguments, y = [], i = 1, j = a.length;

    for (; i < j; ++i)
        y[i - 1] = a[i];
    return this.apply(a[0], y);
});