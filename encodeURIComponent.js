/**
 * original:
 *   ヌルコムアーカイブス・デジタル制作室 / TransURI (UTF-8)
 *   https://web.archive.org/web/20100413085309/http://nurucom-archives.hp.infoseek.co.jp/digital/trans-uri.html
 *
 * for: IE4~5
 */
(function(){
    if(!window.encodeURIComponent){
        // /[^!#$&-;=?-Z_a-z~]/g
        encodeURI = function(x){return encode(x, 0);};
        // /[^!'-*.0-9A-Z_a-z~-]/g
        encodeURIComponent = function(x){return encode(x, 1);};

        var skipEncodeURI = (function(){
            var encodeURIComponentTarget = '!\'()*-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~',
                encodeURITarget = '#$&+,-/:;=?@',
                skip = {}, i;
        
            for (i = encodeURIComponentTarget.length; i;) {
                skip[encodeURIComponentTarget.charCodeAt(--i)] = 2;
            };
            for (i = encodeURITarget.length; i;) {
                skip[encodeURITarget.charCodeAt(--i)] = 1;
            };
            return skip;
        })();
    };

    function encode (_x, kind) {
        var result = [],
            skip   = skipEncodeURI,
            p      = '%',
            x      = _x + '',
            i      = 0,
            l      = x.length,
            chr, c;

        for (; i < l; ++i) {
            if(!(kind < skip[c = x.charCodeAt(i)])){
                chr = (
                    c < 16 ? '%0' + c.toString(16) :
                    c < 128 ? p + c.toString(16) :
                    c < 2048 ? p + (c >> 6 | 192).toString(16) + p + (c & 63 | 128).toString(16) :
                    p + (c >> 12 | 224).toString(16) + p + (c >> 6 & 63 | 128).toString(16) + p + (c & 63 | 128).toString(16)
                ).toUpperCase();
            } else {
                chr = x.charAt(i);
            };
            result[i] = chr;
        };

        return result.join('');
    };
})();