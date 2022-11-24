/**
 * original:
 *   ヌルコムアーカイブス・デジタル制作室 / TransURI (UTF-8)
 *   https://web.archive.org/web/20100413085309/http://nurucom-archives.hp.infoseek.co.jp/digital/trans-uri.html
 *
 * for: IE4~5
 */
window.decodeURI || (decodeURI = 
    function (_x) {
        var result = [],
            toInt  = parseInt,
            toChar = String.fromCharCode,
            x      = _x + '',
            n      = -1,
            i      = 0,
            l      = x.length,
            chr, decode, code, memory;

        for (; i < l; ++i) {
            if (decode) {
                code = toInt(x.substr(i, 2), 16);
                ++i;
                if (127 < code) {
                    if (223 < code) {
                        memory = (code & 15) << 12;
                        code = toInt(x.substr(i + 2, 2), 16) & 63; // 00%00%00
                        i += 3;
                        memory += code << 6;
                    } else {
                        memory = (code & 63) << 6;
                    };
                    code = toInt(x.substr(i + 2, 2), 16) & 63;
                    i += 3;
                    code += memory;
                };
                // if(code !== code) error
                //console.log(code);
                result[++n] = toChar(code);
                decode = false;
            } else {
                chr = x.charAt(i);
                if(!(decode = chr === '%')){
                    result[++n] = chr;
                };
            };
        };
        
        return result.join('');
    }
);
window.decodeURIComponent || (decodeURIComponent = decodeURI);