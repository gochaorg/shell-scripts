/**
Подгружает JavaScript
Параметры
	url - Адрес Javascript
	onScriptLoaded - функция вызываемая после погрузки JavaScript
*/
function loadJS( url ){
    var opt = null;
    var onScriptLoaded = null;
    if( arguments.length>1 ){
        onScriptLoaded = arguments[1];
        if( arguments.length>2 ){
            opt = arguments[2];
        }
    }
    
	var doc = window.document;
    if( opt && typeof(opt.document)!=='undefined' && opt.document!==null ){
        doc = opt.document;
    }
    
	var script = doc.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	script.async = true;
    if( onScriptLoaded instanceof Function ){
        script.onload = function(){
            onScriptLoaded();
            //console.log( "script loaded" );
            if( opt!==null && opt.clear ){
                //console.log( "try script remove" );
                setTimeout( function(){
                    //console.log( "script remove by timeout" );
                    window.document.body.removeChild( script );
                }, 1000 );
            }
        };
        //script.onload = onScriptLoaded; // works in most browsers
    }

	// for IE
	if (script.onreadystatechange !== undefined) {
		script.timer = setInterval(function () {
			if (script.readyState == "loaded" || script.readyState == "complete") {
                if( onScriptLoaded instanceof Function ){
                    onScriptLoaded();
                }
				clearInterval(script.timer);
			}
		}, 100);
	}

	doc.body.appendChild(script);
}

/**
 * Отправляет POST запрос на указананный адрес.
 * 
 * Второй аргумент объект/либо функция принимающая ответ.
 * В случаи с объектом (obj):
 * 
 * obj.nocache - булево - указывает, на отключение кэширования, добавляет к адресу значение nocache=....
 * 
 * obj.data - либо строка, либо объект - данные передаваемые в теле POST
 * Если obj.data - объект, то передает пары ключ(строка) и значение (строка,число,булево)
 * 
 * obj.calback - функция принимающая ответ, 
 * obj.callback ( text, request ) - где text - текст ответа, request - объект XMLHttpRequest
 * 
 * @param Строка url адрес запрашиваемой страницы
 * @returns Объект XMLHttpRequest
 */
function sendPost( url ){
    function createRequestObject() {
        if (typeof XMLHttpRequest === 'undefined') {
          XMLHttpRequest = function() {
            try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
              catch(e) {}
            try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
              catch(e) {}
            try { return new ActiveXObject("Msxml2.XMLHTTP"); }
              catch(e) {}
            try { return new ActiveXObject("Microsoft.XMLHTTP"); }
              catch(e) {}
            throw new Error("This browser does not support XMLHttpRequest.");
          };
        }
        return new XMLHttpRequest();
    }
    
    var args = arguments;
    
    var req = createRequestObject();
    var addrURL = url;
    if( arguments.length>1 && typeof( arguments[1] )==='object' ){
        var arg = arguments[1];
        if( arg.nocache ){
            if( addrURL.indexOf( "?" )>=0 ){
                addrURL += "&nocache="+((new Date()).getTime());
            }else{
                addrURL += "?nocache="+((new Date()).getTime());
            }
        }
    }
    req.open("POST",addrURL);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.onreadystatechange = function(){
        if( req.readyState !== 4 ) return;
        if( req.status===200 ){
            if( args.length>1 ){
                var arg = args[1];
                if( typeof(arg)==='object' ){
                    var res = req.responseText;
                    if( typeof(arg.callback)==='function' ){
                        arg.callback( res, req );
                    }
                }else if( typeof(arg)==='function' ){
                    var res = req.responseText;
                    arg( res, req );
                }
            }
        }else{
            if( args.length>1 ){
                var arg = args[1];
                if( typeof(arg)==='object' ){
                    if( typeof(arg.callback)==='function' ){
                        arg.callback( null, req );
                    }
                }else if( typeof(arg)==='function' ){
                    arg( null, req );
                }
            }
        }
    };
    
    // Тело запроса
    var txtData = null;
    if( arguments.length>1 && 
        typeof( arguments[1] )==='object' &&
        typeof(arguments[1].data)!=='undefined' ){
        var data = arguments[1].data;
        if( typeof(data)==='object' ){
            txtData = "";
            var co = 0;
            for( var key in data ){
                var val = data[key];
                var entry = "";
                if( typeof(key)==='string' ){
                    entry = encodeURIComponent(key);
                    if( typeof(val)==='string' ){
                        entry += '=' + encodeURIComponent(val);
                        if( co>0 ){
                            txtData += "&";
                        }
                        txtData += entry;
                        co++;
                    }else if( typeof(val)==='number' ){
                        entry += '=' + encodeURIComponent(""+val);
                        if( co>0 ){
                            txtData += "&";
                        }
                        txtData += entry;
                        co++;
                    }else if( typeof(val)==='boolean' ){
                        entry += '=' + encodeURIComponent(""+val);
                        if( co>0 ){
                            txtData += "&";
                        }
                        txtData += entry;
                        co++;
                    }
                }
            }
        }else if( typeof(data)==='string' ){
            txtData = data;
        }
    }
    req.send( txtData );
    return req;
}

function loadCSS( url ){
	var head = document.getElementsByTagName('head')[0];
	var fileref=document.createElement("link")
	fileref.rel  = "stylesheet";
	fileref.type = "text/css";
	fileref.href = url;
	head.appendChild(fileref);
}

/*
Возвращает версию IE (номер) или false, если это не IE
Пример:
	if (isIE () == 8) {
		// IE8 
	} else {
		// Other versions IE or not IE
	}

	Или

	if (isIE () < 9) {
		// is IE version less than 9
	} else {
		// is IE 9 and later or not IE
	}

	Или

	if (isIE()) {
		// is IE
	} else {
		// Other browser
	}
*/
function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

// Bug ie8, no support String.trim()
if( isIE() ){
	if(typeof String.prototype.trim !== 'function') {
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, ''); 
		}
	}
}

function createEl_hasClass( className ){
	var c = this.getAttribute( 'class' );
	if( typeof(c)=='string' ){
		if( c.indexOf( ' ' )>=0 ){
			var clss = c.split( ' ' );
			for( var k in clss ){
				var cls = clss[k];
				if( cls==className ){
					return true;
				}
			}
		}
	}
	return false;
}

function createEl_removeClass( className ){
	if( !(this.hasClass(className)) )return;
	var c = this.getAttribute( 'class' );
	if( typeof(c)=='string' ){
		if( c.indexOf( ' ' )>=0 ){
			var clss = c.split( ' ' );
			var ncls = '';
			for( var k in clss ){
				var cl = clss[k];
				if( cl.length>0 ){
					if( cl!=className ){
						ncls = ncls + ' ' + cl;
					}
				}
			}
			this.setAttribute( 'class', ncls );
		}
	}
}

function createEl_addClass( className ){
	var c = this.getAttribute( 'class' );
    if( c!==null ){
        if( this.hasClass( className ) )return;
        c = c + ' ' + className;
    }else{
        c = className;
    }
    this.setAttribute( 'class', c );
}

/**
 * Создание HTML элемента
 * Первый аргумент tagName - имя тэга
 * Второй опционально - объект с перечнем свойств
 */
function createEl( tagName ){
	var e = document.createElement( tagName );
	if( arguments.length>1 ){
		var opt = arguments[1];
		if( opt instanceof Object ){
			if( opt.className ){
				e.setAttribute( 'class', opt.className );
			}
			if( opt.style ){
				e.setAttribute( 'style', opt.style );
			}
			if( opt.display ){
				e.style.display = opt.display;
			}
			if( opt.position ){
				e.style.position = opt.position;
			}
			if( opt.onclick ){
				e.onclick = opt.onclick;
			}
			if( opt.host ){
				opt.host.appendChild( e );
			}
			if( opt.innerHTML ){
				e.innerHTML = opt.innerHTML;
			}
			if( opt.text ){
				e.textContent = opt.text;
				if( isIE() )e.innerText = opt.text;
			}
			if( opt.textContent ){
				e.textContent = opt.textContent;
				if( isIE() )e.innerText = opt.textContent;
			}
			if( opt.title ){
				e.title = opt.title;
			}
			if( opt.zIndex ){
				e.style["z-index"] = opt.zIndex;
			}
		}
	}
	e.addClass = createEl_addClass;
	e.hasClass = createEl_hasClass;
	e.removeClass = createEl_removeClass;
	return e;
}

function templateText( text ){
	var vars = null;
	var res = "";
	var state = 0;
	var buff = '';
	
	if( arguments.length>1 ){
		var sa = arguments[1];
		if( sa.vars ){ vars=sa.vars; }
	}

	function lookupRef( ref ){
		if( vars===null )return;
		if( typeof(vars)==='object' ){
			if( typeof(vars[ref])!=='undefined' && vars[ref]!==null ){
				var refVal = vars[ref];
				var refType = typeof( refVal );
				if( refType==='function' ){
					return refVal( ref );
				}else{
					if( refType==='number' || refType==='string' || refType==='boolean' ){
						return refVal;
					}
				}
			}
		}
	}

	for( var ci=0; ci<text.length; ci++ ){
		var c = text.charAt( ci );
		if( state===0 ){
			if( c==='{' ){
				if( buff.length>0 ){
					res += buff;
				}
				buff='';
				state=1;
			}else{
				buff += c;
			}
		}else if( state===1 ){
			if( c==='}' ){
				if( buff.length>0 ){
					var ref = buff;
					var lres = lookupRef( ref );
					if( typeof(lres)==='object' ){
					}else{
						if( typeof(lres)==='string' || typeof(lres)==='number' || typeof(lres)==='boolean' ){
							res += lres;
						}
					}
				}
				buff='';
				state=0;
			}else{
				buff += c;
			}
		}
	}
	if( buff.length>0 ){
		res += buff;
	}
	return res;
}

function templateUI_template( text ){
	var vars = null;
	var res = [];
	var state = 0;
	var buff = '';
	
	if( arguments.length>1 ){
		var sa = arguments[1];
		if( sa.vars ){ vars=sa.vars; }
	}

	function lookupRef( ref ){
		if( vars===null )return;
		if( typeof(vars)==='object' ){
			if( typeof(vars[ref])!=='undefined' && vars[ref]!==null ){
				var refVal = vars[ref];
				var refType = typeof( refVal );
				if( refType==='function' ){
					return refVal( ref );
				}else{
					if( refType==='number' || refType==='string' || refType==='boolean' ){
						return refVal;
					}else{
						return refVal;
					}
				}
			}
		}
	}
	
	for( var ci=0; ci<text.length; ci++ ){
		var c = text.charAt( ci );
		if( state===0 ){
			if( c==='{' ){
				if( buff.length>0 ){
					var txtNode = window.document.createTextNode( buff );
					res[res.length] = txtNode;
				}
				buff='';
				state=1;
			}else{
				buff += c;
			}
		}else if( state===1 ){
			if( c==='}' ){
				if( buff.length>0 ){
					var ref = buff;
					var lres = lookupRef( ref );
					if( typeof(lres)==='object' ){
						var added = false;
						if( isIE() )
						{
							if( lres.nodeType && (lres.nodeType == 1 || lres.nodeType==3 ) ){
								res[res.length] = lres;
								added = true;
							}
						}else{
							if( lres instanceof HTMLElement || lres instanceof Text ){
								res[res.length] = lres;
								added = true;
							}
						}
						if( !added ){
							for( var ri in lres ){
								var re = lres[ri];
								if( isIE() )
								{
									if( re.nodeType ){
										res[res.length] = re;
									}else if( typeof(re)==='string' || typeof(re)==='number' || typeof(re)==='boolean' ){
										res[res.length] = window.document.createTextNode( re );
									}
								}else{
									if( re instanceof HTMLElement || re instanceof Text ){
										res[res.length] = re;
									}else if( typeof(re)==='string' || typeof(re)==='number' || typeof(re)==='boolean' ){
										res[res.length] = window.document.createTextNode( re );
									}
								}
							}
						}
					}else{
						if( typeof(lres)==='string' || typeof(lres)==='number' || typeof(lres)==='boolean' ){
                            var txtEl = window.document.createTextNode( lres );
							res[res.length] = txtEl;
						}
					}
				}
				buff='';
				state=0;
			}else{
				buff += c;
			}
		}
	}
	if( buff.length>0 ){
		res[res.length] = window.document.createTextNode( buff );
	}
	return res;
}

function templateUI_parse( template ){
	var args = arguments;
	var sarg = null;
	if( args.length>1 )sarg = args[1];

	function lookupRef( ref ){
		if( vars===null )return;
		if( typeof(vars)==='object' ){
			if( typeof(vars[ref])!=='undefined' && vars[ref]!==null ){
				var refVal = vars[ref];
				var refType = typeof( refVal );
				if( refType==='function' ){
					return refVal( ref );
				}else{
					if( refType==='number' || refType==='string' || refType==='boolean' ){
						return refVal;
					}
				}
			}
		}
	}
	
	function parseAttribs( text ){
		var re = /(\w[\w\d]*)\s*=\s*((\"([^\"]*)\")|(\'([^\']*)\'))/g;
		var m;
		var attr = {};
		while ((m = re.exec(text)) !== null){
			var name = m[1];
			var val = null;
			if( m[4] ){
				val = m[4];
			}else if( m[6] ){
				val = m[6];
			}
			if( val!==null ){
				val = val.replace( '&quot;','"' );
				val = val.replace( '&lt;','<' );
				val = val.replace( '&gt;','>' );
				val = val.replace( '&amp;','&' );
				
				if( typeof(sarg)==='object' ){
					if( sarg.attrVars ){
						if( val.indexOf('{')>=0 ){
							val = templateText(val,{vars:sarg.attrVars});
						}
					}else if( sarg.vars ){
						if( val.indexOf('{')>=0 ){
							val = templateText(val,{vars:sarg.vars});
						}
					}
				}
				
				attr[name] = val;
			}
		}
		return attr;
	}
	
	var reTag = /<(\/)?(\w[\w\d]*)([^>]*)?>/g;
	var tags = [];
	var m;
	while ((m = reTag.exec(template)) !== null)
	{
		var tagName = m[2];
		var open = true;
		var hasBody = true;
		var parseAttr = false;
		if( m[1] ){
			open = false;
		}
		if( m[3] ){
			parseAttr = true;
			var g = m[3];
			if( g.length>0 && g.charAt(g.length-1)=='/' ){
				hasBody = false;
			}
		}
		tags[tags.length] = {
			name : tagName,
			type : 'tag',
			isTag : true,
			isText : false,
			matched : m,
			open : open,
			hasBody : hasBody,
			attributes : (parseAttr ? parseAttribs( m[3] ) : {})
		};
	}

	var res = [];
	var ptr = 0;
	for( var ti in tags ){
		var tag = tags[ti];
		var begin = tag.matched.index;
		var len = tag.matched[0].length;
		if( ptr<begin ){
			res[res.length] = template.substr( ptr, begin - ptr );
		}
		res[res.length] = tag;
		ptr = begin + len;
	}
	if( ptr<template.length ){
		res[res.length] = template.substr( ptr, template.length - ptr );
	}
	
	var flatList = res;
	
	res = [];
	var stack = [];
	for( var fi in flatList ){
		var it = flatList[fi];
		if( typeof(it)==='string' ){
			var top = stack.length>0 ? stack[stack.length-1] : null;
			var txtNode = window.document.createTextNode( it );
			if( top!==null ){
				top.appendChild( txtNode );
			}else{
				res[res.length] = txtNode;
			}
		}else if( typeof(it)==='object' ){
			if( it.open ){
				var top = stack.length>0 ? stack[stack.length-1] : null;
				var el = window.document.createElement( it.name );
				
                el.addClass = createEl_addClass;
				el.removeClass = createEl_removeClass;
				el.hasClass = createEl_hasClass;
                el.appendTo = function( elTarget ){
					var e = this;
					if( isIE() ){
						if( e.nodeType ){
							// DispHTMLDivElement
							if( elTarget.appendChild ){
								elTarget.appendChild( e );
							}else if( elTarget[0] && elTarget[0].appendChild ){
								elTarget[0].appendChild( e );
							}
						}
					}else{
						if( e instanceof HTMLElement || e instanceof Text ){
							if( elTarget instanceof Array ){
								for( var elIdx in elTarget ){
									var elVal = elTarget[elIdx];
									if( elVal.appendChild )elVal.appendChild( e );
								}
							}else{
								elTarget.appendChild( e );
							}
						}
					}
                };
                
				for( var aname in it.attributes ){
					var aval = it.attributes[aname];
					el.setAttribute( aname, aval );
				}
				if( top!==null ){
					top.appendChild( el );
				}else{
					res[res.length] = el;
				}
				if( it.hasBody ){
					stack.push( el );
				}
			}else{
				if( stack.length>0 ){
					var el = stack.pop();
				}
			}
		}
	}
	
	//res._elements = res;
	res.appendTo = function( el ){
		for( var i in this ){
			var e = this[i];
			if( isIE() ){
				if( e.nodeType ){
					// DispHTMLDivElement
					if( el.appendChild ){
						el.appendChild( e );
					}else if( el[0] && el[0].appendChild ){
						el[0].appendChild( e );
					}
				}
			}else{
				if( e instanceof HTMLElement || e instanceof Text ){
					if( el instanceof Array ){
                        for( var elIdx in el ){
                            var elVal = el[elIdx];
                            if( elVal.appendChild )elVal.appendChild( e );
                        }
//						for( ele of el ){
//							ele.appendChild( e );
//						}
					}else{
						el.appendChild( e );
					}
				}
			}
		}
	};
	
	return res;
}

function templateUI( template ){
	if( typeof(template)==='string' ){
		var args = arguments;
		var vars = null;
		var host = null;
        var idAttr = 'id';
        var elById = {};
        var captureElById = true;
        var removeCapturedIdAttr = true;
        
        var styles = {};
        var innerText = null;
        var innerHTML = null;
        var onclick = null;
        var title = null;
        
		if( args.length>1 ){
			var sarg = args[1];
			if( typeof(sarg)==='object' ){
                if( sarg.className ){ styles.className = sarg.className; }
                if( sarg.style ){ styles.style = sarg.style; }
                if( sarg.display ){ styles.display = sarg.display; }
                if( sarg.position ){ styles.style = sarg.position; }
                if( sarg.zIndex ){ styles.zIndex = sarg.zIndex; }
                if( sarg.text ){ innerText = sarg.text; }
                if( sarg.innerHTML ){ innerHTML = sarg.innerHTML; }
                if( sarg.onclick ){ onclick = sarg.onclick; }
                if( sarg.title ){ title = sarg.title; }
				if( sarg.vars ){ vars = sarg.vars; }
				if( sarg.host ){ host = sarg.host; }
                if( sarg.elById ){ elById = sarg.elById; }
                if( sarg.elements ){ elById = sarg.elements; }
                if( sarg.id ){ idAttr = sarg.id; }
                if( sarg.idAttr ){ idAttr = sarg.idAttr; }
                if( typeof(sarg.captureElById)!=='undefined' ){
                    captureElById = sarg.captureElById;
                }
                if( typeof(sarg.removeCapturedIdAttr)!=='undefined' ){
                    removeCapturedIdAttr = sarg.removeCapturedIdAttr;
                }
			}
		}

		var tags = templateUI_parse( template, {vars:vars} );

		function visit( e ){
			if(    ( isIE() && ( e.nodeType == 3 )) 
				|| (!isIE() && (e instanceof Text) && !(e instanceof HTMLElement))
			){
				var text = isIE() ? e.nodeValue : e.textContent;
				if( text.indexOf( "{" )<0 ){
					return;
				}

				var host = isIE() ? e.parentNode : e.parentElement;
				var replaceElements = templateUI_template( text, {vars:vars} );
				
				if( isIE() ){ e.nodeValue = ''; } else { e.textContent = ''; }
				
				var afterNode = e.nextSibling;
				
				for( var i in replaceElements ){
					var el = replaceElements[i];
					if( afterNode ){
						host.insertBefore( el, afterNode );
					}else{
						host.appendChild( el );
					}
				}
			}else if( (isIE() && e.nodeType == 1 ) || (!isIE() && e instanceof HTMLElement) ){
                if( captureElById ){
                    var aval = e.getAttribute( idAttr );
                    if( aval!==null ){
                        if( aval.length>0 ){
                            elById[aval] = e;
                        }
                        if( removeCapturedIdAttr ){
                            e.removeAttribute( idAttr );
                        }
                    }
                }
				if( e.hasChildNodes() ){
					var cn = [];
					for( var i in e.childNodes ){
						cn[cn.length] = e.childNodes[i];
					}
					for( var i in cn ){
						visit( cn[i] );
					}
				}
			}
		}
		
		for( var ti in tags ){
			var tag = tags[ti];
			if( host!==null )
			{   if( isIE() ){
					if( tag.nodeType ){
						host.appendChild( tag );
					}
				}else{
					if( tag instanceof HTMLElement || tag instanceof Text ){
						host.appendChild( tag );
					}
				}
			}
            
            if( onclick ){ tag.onclick = onclick; }
            if( styles.style && tag.setAttribute ){ tag.setAttribute( 'style', styles.style ); }
            if( styles.className && tag.setAttribute ){ tag.setAttribute( 'class', styles.className ); }
            if( styles.display && tag.style ){ tag.style.display = styles.display; }
            if( styles.position && tag.style ){ tag.style.position = styles.position; }
            if( styles.zIndex && tag.style ){ tag.style["z-index"] = styles.zIndex; }
            if( title ){ tag.title = title; }
            
			if( isIE() )
			{
				if( tag.nodeType ){ visit( tag ) };
			}else{
				if( tag instanceof HTMLElement || tag instanceof Text ){
					visit( tag );
				}
			}
		}
		
		if( arguments.length>1 ){
			if( typeof(arguments[1])==='object' ){
				var sa = arguments[1];
				if( sa.one || sa.returnFirst ){
					if( tags.length>0 )return tags[0];
				}
			}
		}
		
		return tags;
	}
}

function addOnLoad( doLoad ){
	if( isIE() ){
		if ( window.addEventListener ) {
			window.addEventListener( "load", doLoad, false );
		}
		else if ( window.attachEvent ) {
			window.attachEvent( "onload", doLoad );
		} else if ( window.onLoad ) {
			window.onload = doLoad;
		}
	}else{
		if( window.addEventListener ){
			window.addEventListener( "load", doLoad, false );
		}
	}
}

function addOnMouseMove( doMove ){
	if( isIE() ){
		if ( window.addEventListener ) {
			window.addEventListener( "mousemove", doMove, false );
		}
		else if ( window.attachEvent ) {
			window.attachEvent( "onmousemove", doMove );
		} else if ( window.onLoad ) {
			window.onload = doMove;
		}
	}else{
		if( window.addEventListener ){
			window.addEventListener( "mousemove", doMove, false );
		}
	}
}

function removeOnMouseMove( doMove ){
	if( isIE() ){
		if ( window.removeEventListener ) {
			window.removeEventListener( "mousemove", doMove, false );
		}
		else if ( window.detachEvent ) {
			window.detachEvent( "onmousemove", doMove );
		} else if ( window.onLoad ) {
			window.onload = doMove;
		}
	}else{
		if( window.removeEventListener ){
			window.removeEventListener( "mousemove", doMove, false );
		}
	}
}

/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path], domain)
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

var docCookies = {
  getItem: function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};