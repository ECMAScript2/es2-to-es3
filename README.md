# es2 to es3

Polyfills of built-in objects and methods to run IE6 and later code in early DHTML browsers.

And, tool to add the required polyfills to your code.

## Polyfills

* `decodeURI`, `decodeURIComponent`
* `encodeURI`, `encodeURIComponent`
* `Function.prototype.apply`, `Function.prototype.call`
* `Array.prototype.pop`, `Array.prototype.push`, `Array.prototype.shift`, `Array.prototype.splice`, `Array.prototype.unshift`
* `Array.prototype.indexOf`

## Workaround bugs in Javascript implementation, learn about unimplemented

1. [ECMAScript2/es2-postprocessor](https://github.com/ECMAScript2/es2-postprocessor) A post-processor that workaround bugs in the Javascript implementation and warns about unimplemented.
2. [ECMAScript2/es2-regexpcompat](https://github.com/ECMAScript2/es2-regexpcompat), Mobile IE4 does not support `RegExp`!

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
                       gulp.dest('js/legacy')
                   );
    }
);
~~~

See the `gulpfile.js` of the following project for other usage examples.

1. [itozyun/web-doc-base](https://github.com/itozyun/web-doc-base)
2. [ECMAScript2/es2-code-prettify](https://github.com/ECMAScript2/es2-code-prettify)
3. [ECMAScript2/es2-regexpcompat](https://github.com/ECMAScript2/es2-regexpcompat)

## Options

| Property              | Description                                                                  | Default value |
|:----------------------|:-----------------------------------------------------------------------------|--------------:|
| `minIEVersion`        |                                                                              | `5.5`         |
| `minOperaVersion`     |                                                                              | `8.0`         |
| `minGeckoVersion`     |                                                                              | `0.9`         |
| `skipEmbedPolyfills`  | Set `result.embeddedPolyfills` if you wont to embed twice. `*`: Never embed. | `[]`          |
| `forceEmbedPolyfills` | Set `result.requiredPolyfills` if you want to embed for other script file.   | `[]`          |
| `resultObject`        | Set `resultObject = {}` if you want to use it for later tasks.               | `null`        |

1. Embedding polyfills is simply done by looking at the Identifier name. This may result in unnecessary embedding. For Example, Embed `Array.prototype.indexOf` polyfill for `"str".indexOf()`. In this case, use `skipEmbedPolyfills : ["Array.prototype.indexOf"]`.

### Result Object

| Property            | Description                                                                    | Example |
|:--------------------|:-------------------------------------------------------------------------------|--------:|
| `requiredPolyfills` | Contains `forceEmbedPolyfills` and `skipEmbedPolyfills`.                       | `[]`    |
| `embeddedPolyfills` |                                                                                | `[]`    |

## Reference : Corresponding starting versions of built-in objects and built-in methods

| Built-in objects and methods             | IE  | Opera | Gecko | Chrome | Safari |
|:-----------------------------------------|----:|------:|------:|-------:|-------:|
| `decodeURI`                              | 5.5 | 7.0   | 0.6   | 1      | ?      |
| `decodeURIComponent`                     | 5.5 | 7.0   | 0.6   | 1      | ?      |
| `encodeURI`                              | 5.5 | 7.0   | 0.6   | 1      | ?      |
| `encodeURIComponent`                     | 5.5 | 7.0   | 0.6   | 1      | ?      |
| `Function.prototype.apply`               | 5.5 | 7.0   | 0.6   | 1      | ?      |
| `Function.prototype.call`                | 5.5 | 7.0   | 0.6   | 1      | ?      |
| `Array.prototype.pop`                    | 5.5 | 7.0   | 0.6   | 1      | ?      |
| `Array.prototype.push`                   | 5.5 | 7.0   | 0.6   | 1      | ?      |
| `Array.prototype.shift`                  | 5.5 | 7.0   | 0.6   | 1      | ?      |
| `Array.prototype.splice`                 | 5.5 | 7.0   | 0.6   | 1      | ?      |
| `Array.prototype.unshift`                | 5.5 | 7.0   | 0.6   | 1      | ?      |
| `Array.prototype.indexOf`(ECMAScript 5+) | 9   | 9.60  | 1.8   | 1      | ?      |
| `atob`(*1, HTML5+)                       | 10  | 10.50 | 1.0   | 1      | ?      |
| `btoa`(*1, HTML5+)                       | 10  | 10.50 | 1.0   | 1      | ?      |
| `JSON`(*2, ECMAScript 5+)                | 8   | 10.50 | 1.9.1 | 3      | 4.0    |

1. [es2-base64](https://github.com/ECMAScript2/es2-base64)
2. [es2-json](https://github.com/ECMAScript2/es2-json) (in preparation...)

## Dependency Licenses

<table>
<thead>
<tr>
<th>Built-in objects and methods<th>Author<th>Link to original<th>License
<tbody>
<tr>
<th><code>decodeURI</code>, <code>decodeURIComponent</code>, <code>encodeURI</code>, <code>encodeURIComponent</code><td>ヌルコムアーカイブス・デジタル制作室<td><a href="https://web.archive.org/web/20100413085309/http://nurucom-archives.hp.infoseek.co.jp/digital/trans-uri.html">TransURI (UTF-8)</a><td>?
<tr>
<th><code>Array.prototype.indexOf</code><td>Mozilla Contributors<td><a href="https://web.archive.org/web/20131011160850/https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Compatibility">MDN / Array.prototype.indexOf</a><td><a href="https://web.archive.org/web/20131009222441/https://developer.mozilla.org/en-US/docs/Project:MDN/About?redirectlocale=en-US&redirectslug=Project%3ACopyrights#Copyrights_and_licenses">MIT or public domain</a>
<tr>
<th><code>Array.prototype.pop</code>, <code>Array.prototype.push</code>, <code>Array.prototype.shift</code>, <code>Array.prototype.splice</code>, <code>Array.prototype.unshift</code>,<br><code>Function.prototype.apply</code>, <code>Function.prototype.call</code>
<td>ofk<td><a href="https://ofk.hatenadiary.org/entry/20080904/1220485969">?D of K / Function.prototype.applyとかArray.prototype.spliceのIE5用のコード</a><td>?
</table>

## License

es2-to-es3 is licensed under MIT license.

(C) 2022-2023 [itozyun](https://github.com/itozyun)([blog](//outcloud.blogspot.com/))