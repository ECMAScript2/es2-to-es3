/**
 * original:
 *   ?D of K / Function.prototype.applyとかArray.prototype.spliceのIE5用のコード
 *   https://ofk.hatenadiary.org/entry/20080904/1220485969
 * 
 * for: IE4~5
 * --------
 * Using `eval`. So Closure Compiler "ADVANCED" and "SIMPLE" compilation is not possible!
 */
Function.prototype.apply || (Function.prototype.apply = function (_x, _y) {
    var f = this,
        x = _x != null ? _x : {},
        y = _y || [],
        j = y.length,
        i = 0, r, a /** flag */, u /** = undefined */;

    x.__apply = f;
    if (!x.__apply) {
        a = x.constructor.prototype.__apply = f;
    };
    switch (j) {
        case 0: r = x.__apply(); break;
        case 1: r = x.__apply(y[0]); break;
        case 2: r = x.__apply(y[0], y[1]); break;
        case 3: r = x.__apply(y[0], y[1], y[2]); break;
        case 4: r = x.__apply(y[0], y[1], y[2], y[3]); break;
        case 5: r = x.__apply(y[0], y[1], y[2], y[3], y[4]); break;
        case 6: r = x.__apply(y[0], y[1], y[2], y[3], y[4], y[5]); break;
        case 7: r = x.__apply(y[0], y[1], y[2], y[3], y[4], y[5], y[6]); break;
        case 8: r = x.__apply(y[0], y[1], y[2], y[3], y[4], y[5], y[6], y[7]); break;
        case 9: r = x.__apply(y[0], y[1], y[2], y[3], y[4], y[5], y[6], y[7], y[8]); break;
        default:
            r = [];
            for (; i < j; ++i)
                r[i] = 'y[' + i + ']';
            r = eval('x.__apply(' + r.join(',') + ')');
            // ↓ for Closure Compiler "ADVANCED" compilation
            // r = (new Function('x,y', 'return x.__apply(' + a.join(',') + ')'))(x, y);
    };
    a ? (delete x.constructor.prototype.__apply) : (x.__apply = u); // delete (window|document|element).__apply <= IE~8 throw error!;
    return r;
});
