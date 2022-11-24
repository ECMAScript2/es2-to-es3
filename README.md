# es2 to es3

Polyfill of built-in objects and built-in methods to run IE6 and later code in early DHTML browsers.

## Corresponding starting versions of built-in objects and methods

| Built-in objects and methods  | IE  | Opera | Gecko | Chrome | Safari |
|:------------------------------|----:|------:|------:|-------:|-------:|
| `atob`(*1, *3)                | 10  | 10.50 | 1.0   | 1      | ?      |
| `btoa`(*1, *3)                | 10  | 10.50 | 1.0   | 1      | ?      |
| `decodeURI`                   | 5.5 | 7.0   | 0.6   | 1      | ?      |
| `decodeURIComponent`          | 5.5 | 7.0   | 0.6   | 1      | ?      |
| `encodeURI`                   | 5.5 | 7.0   | 0.6   | 1      | ?      |
| `encodeURIComponent`          | 5.5 | 7.0   | 0.6   | 1      | ?      |
| `JSON`(*2, *3)                | 8   | 10.50 | 1.9.1 | 3      | 4.0    |
| `Array.prototype.indexOf`(*3) | 9   | 9.60  | 1.8   | 1      | ?      |
| `Array.prototype.pop`         | 5.5 | 7.0   | 0.6   | 1      | ?      |
| `Array.prototype.push`        | 5.5 | 7.0   | 0.6   | 1      | ?      |
| `Array.prototype.shift`       | 5.5 | 7.0   | 0.6   | 1      | ?      |
| `Array.prototype.splice`      | 5.5 | 7.0   | 0.6   | 1      | ?      |
| `Array.prototype.unshift`     | 5.5 | 7.0   | 0.6   | 1      | ?      |
| `Function.prototype.apply`    | 5.5 | 7.0   | 0.6   | 1      | ?      |
| `Function.prototype.call`     | 5.5 | 7.0   | 0.6   | 1      | ?      |

1. [es2-base64](https://github.com/ECMAScript2/es2-base64)
2. es2-json (in preparation...)
3. ES5

## Usage

~~~js
const es2ToEs3 = require('es2-to-es3'),
      resultObject = {};

sourceOfMain = es2ToEs3(sourceOfMain, {minIEVersion: 5, resultObject : resultObject});

console.log(resultObject.requiredPolyfills); // ["Function.prototype.apply", ... ]
console.log(resultObject.embeddedPolyfills); // ["Function.prototype.apply", ... ]

sourceOfLibrary = es2ToEs3(sourceOfLibrary, {minIEVersion: 5, skipEmbedPolyfills : resultObject.embeddedPolyfills});
~~~

### gulp plugin

~~~js
gulp.task('post_process_for_ie_lte_5',
    function(){
        return gulp.src('main.js')
                   .pipe(
                       require('es2-to-es3').gulp({minIEVersion: 5})
                   ).pipe(
                       gulp.dest('dist/js/legacy')
                   );
    }
);
~~~

## Options

| Property              | Description                                                                     | Default value |
|:----------------------|:--------------------------------------------------------------------------------|--------------:|
| `minIEVersion`        | Set to `4` if you want to fix syntax errors or warnings that occurs in IE4.     | `5.5`         |
| `minOperaVersion`     | Set to `7` if you want to fix syntax errors or warnings that occurs in Opera 7. | `8.0`         |
| `minGeckoVersion`     | Set to `0.6` if you want to work around a bug that occurs in Gecko ~0.7.        | `0.8`         |
| `resultObject`        | Set to `{}` if you want to report.                                              | `null`        |
| `skipEmbedPolyfills`  | Set `report.embeddedPolyfills` if you wont to embed twice. `*`: Never embed.    | `[]`          |
| `forceEmbedPolyfills` | Set `report.requiredPolyfills` if you want to embed for other script file.      | `[]`          |

### Result Object

| Property            | Description                                                                     | Example |
|:--------------------|:--------------------------------------------------------------------------------|--------:|
| `requiredPolyfills` | Contains `forceEmbedPolyfills` and `skipEmbedPolyfills`.                        | `[]`    |
| `embeddedPolyfills` |                                                                                 | `[]`    |

## License

[MIT License](https://opensource.org/licenses/MIT)

## Dependency Licenses

<table>
<thead>
<tr>
<th>Object and Method<th>Author<th>URL<th>License
<tbody>
<tr>
<th>decodeURI, decodeURIComponent, encodeURI, encodeURIComponent<th>ヌルコムアーカイブス・デジタル制作室<th><a href="https://web.archive.org/web/20100413085309/http://nurucom-archives.hp.infoseek.co.jp/digital/trans-uri.html">TransURI (UTF-8)</a><th>?
<tr>
<th>Array.prototype.indexOf<th>Mozilla Contributors<th><a href="https://web.archive.org/web/20131011160850/https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Compatibility">MDN / Array.prototype.indexOf</a><th><a href="https://web.archive.org/web/20131009222441/https://developer.mozilla.org/en-US/docs/Project:MDN/About?redirectlocale=en-US&redirectslug=Project%3ACopyrights#Copyrights_and_licenses">MIT or public domain</a>
<tr>
<th>Array.prototype.pop, Array.prototype.push, Array.prototype.shift, Array.prototype.splice, Array.prototype.unshift<th>ofk<th><a href="https://ofk.hatenadiary.org/entry/20080904/1220485969">?D of K / Function.prototype.applyとかArray.prototype.spliceのIE5用のコード</a><th>?
<tr>
<th>Function.prototype.apply, Function.prototype.call<th>ofk<th><a href="https://ofk.hatenadiary.org/entry/20080904/1220485969">?D of K / Function.prototype.applyとかArray.prototype.spliceのIE5用のコード</a><th>?
</table>