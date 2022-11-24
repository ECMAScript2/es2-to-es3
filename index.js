const esprima    = require( 'esprima'    );
const estraverse = require( 'estraverse' );
const polyfills  = require( __dirname + '/polyfills.json' );

module.exports = process;

function process( source, opt_options ){
    const options         = opt_options             || {};
    const RESULT_OBJECT   = options.resultObject    || {};
    const minIEVersion    = options.minIEVersion    || 5.5;
    const minOperaVersion = options.minOperaVersion || 8;
    const minGeckoVersion = options.minGeckoVersion || 0.8;

    // polyfill
    const EMBED_ARRAY_PROTOTYPE_INDXOF = minIEVersion < 9 || minOperaVersion < 9.6 || minGeckoVersion < 1.8;
    const EMBED_POLYFILLS_FOR_IE_LTE_5 = minIEVersion < 5.5;

    if( !EMBED_POLYFILLS_FOR_IE_LTE_5 && !EMBED_ARRAY_PROTOTYPE_INDXOF ){
        return source;
    };

    const BUILTIN_OBJECTS          = {};
    const SKIP_TO_EMBED_POLYFILLS  = options.skipEmbedPolyfills  || [];
    const FORCE_TO_EMBED_POLYFILLS = options.forceEmbedPolyfills || [];
    const REQUIRED_POLYFILLS       = [];
    const EMBEDDED_POLYFILLS       = [];

    let polyfillCodesOnlyForIE = '';
    let polyfillCodesNotOnlyIE = '';

    while( FORCE_TO_EMBED_POLYFILLS.length ){
        BUILTIN_OBJECTS[ FORCE_TO_EMBED_POLYFILLS.shift() ] = true;
    };

    const ast = esprima.parse( source );

    estraverse.traverse(
        ast,
        {
            enter : function( astNode, parent ){
                if( astNode.type === esprima.Syntax.CallExpression && astNode.callee ){
                    switch( astNode.callee.name ){
                        case 'decodeURI' :
                        case 'decodeURIComponent' :
                            BUILTIN_OBJECTS[ 'decodeURIComponent' ] = true;
                            break;
                        case 'encodeURI' :
                        case 'encodeURIComponent' :
                            BUILTIN_OBJECTS[ 'encodeURIComponent' ] = true;
                            break;
                    };
                };
                if( astNode.type === esprima.Syntax.Identifier ){
                    switch( astNode.name ){
                        case 'decodeURI' :
                        case 'decodeURIComponent' :
                            if( EMBED_POLYFILLS_FOR_IE_LTE_5 ){
                                BUILTIN_OBJECTS[ 'decodeURIComponent' ] = true;
                            };
                            break;
                        case 'encodeURI' :
                        case 'encodeURIComponent' :
                            if( EMBED_POLYFILLS_FOR_IE_LTE_5 ){
                                BUILTIN_OBJECTS[ 'encodeURIComponent' ] = true;
                            };
                            break;
                        case 'indexOf' :
                            if( !EMBED_ARRAY_PROTOTYPE_INDXOF ) break;
                        case 'shift' :
                        case 'pop' :
                        case 'push' :
                        case 'splice' :
                        case 'unshift' :
                            if( EMBED_POLYFILLS_FOR_IE_LTE_5 ){
                                BUILTIN_OBJECTS[ 'Array.prototype.' + astNode.name ] = true;
                            };
                            break;
                        case 'call' :
                            if( EMBED_POLYFILLS_FOR_IE_LTE_5 ){
                                BUILTIN_OBJECTS[ 'Function.prototype.apply' ] = true;
                            };
                        case 'apply' :
                            if( EMBED_POLYFILLS_FOR_IE_LTE_5 ){
                                BUILTIN_OBJECTS[ 'Function.prototype.' + astNode.name ] = true;
                            };
                            break;
                    };
                };
            }
        }
    );

    for( let builtinName in BUILTIN_OBJECTS ){
        REQUIRED_POLYFILLS.push( builtinName );
        if( SKIP_TO_EMBED_POLYFILLS !== '*' && SKIP_TO_EMBED_POLYFILLS.indexOf( builtinName ) === -1 ){
            if( !polyfills[ builtinName ] ){
                throw new Error( builtinName + ' Polyfill Not Found!' );
            };
            if( builtinName === 'Array.prototype.indexOf' ){
                polyfillCodesNotOnlyIE += polyfills[ builtinName ] + '\n';
            } else {
                if( polyfillCodesOnlyForIE ) polyfillCodesOnlyForIE += '\n';
                polyfillCodesOnlyForIE += polyfills[ builtinName ]
            };
            EMBEDDED_POLYFILLS.push( builtinName );
        };
    };

    RESULT_OBJECT.requiredPolyfills = REQUIRED_POLYFILLS;
    RESULT_OBJECT.embeddedPolyfills = EMBEDDED_POLYFILLS;

    return ( polyfillCodesOnlyForIE ? '/*@cc_on ' + polyfillCodesOnlyForIE + ' @*/\n' : '' ) + polyfillCodesNotOnlyIE + source;
};

process.gulp = function( _options ){
    const PluginError = require( 'plugin-error' ),
          through     = require( 'through2'     ),
          pluginName  = 'gulp-es2-to-es2';
    
    return through.obj(
        function( file, encoding, callback ){
            if( file.isNull() ) return callback();
    
            if( file.isStream() ){
                this.emit( 'error', new PluginError( pluginName, 'Streaming not supported' ) );
                return callback();
            };
    
            if( file.extname === '.js' ){
                try {
                    let contents = file.contents.toString( encoding );
                    file.contents = Buffer.from( process( contents, _options ) );
                    this.push( file );
                } catch(O_o){
                    this.emit( 'error', new PluginError( pluginName, O_o ) );
                };
            };
            callback();
        }
    );
};