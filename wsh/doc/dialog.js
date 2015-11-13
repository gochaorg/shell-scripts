var dialogs = [];

/**
 * Конструктор диалога
 * Аргменты не обязательны
 * Первый аргумент
 * Object {
 *      className : string // Имя css класса,
 * }
 * @returns {Dialog}
 */
function Dialog(){
	var arg = {};
	var self = this;
	if( arguments.length>0 ){
		arg = arguments[0];
	}
	
	var addClass = " round";
    if( arg.className ) addClass = " "+arg.className;
	
	this.ui = {};
    this.ui.wrapper = templateUI(
        '<table class="dialog {addCss}">'+
            // header
            '<tr id="titleRow" class="title row {addCss}">'+
                '<td id="topLeftCorner" class="title top left corner {addCss}"></td>'+
                '<td id="titleTextCell" class="title text cell top border {addCss}">'+
                    // header items
                    '<span id="titleIcoSpan" class="ico {addCss}"></span>'+
                    '<span id="titleTextSpan" class="title text data {addCss}">{title}</span>'+
                    '<span id="closeButton" title="{buttonCloseTitle}" class="button close {addCss}">x</span>'+
                '</td>'+
                '<td id="topRightCorner" class="title top right corner {addCss}"></td>'+
            '</tr>'+
            // toolbar
            '<tr id="toolbarRow" class="toolbar row {addCss}">'+
                '<td class="content left border {addCss}"></td>'+
                '<td class="content cell {addCss}">'+
                    '<div id="toolbar" class="toolbar cell {addCss}">{toolbar}</div>'+
                '</td>'+
                '<td class="content right border {addCss}"></td>'+
            '</tr>'+
            // content
            '<tr id="contentRow" class="content row {addCss}">'+
                '<td id="leftBorder" class="content left border {addCss}"></td>'+
                '<td id="contentCell" class="content cell {addCss}">'+
                    '<div id="contentBody" class="content body {addCss}">{content}</div>'+
                '</td>'+
                '<td id="rightBorder" class="content right border {addCss}"></td>'+
            '</tr>'+
            // footer
            '<tr id="bottomRow" class="bottom row {addCss}">'+
                '<td id="leftBottomCorner" class="corner left bottom {addCss}"></td>'+
                '<td id="bottomBorder" class="bottom border {addCss}"></td>'+
                '<td id="rightBottomCorner" class="corner right bottom resize resizeWidth resizeHeight {addCss}"></td>'+
            '</tr>'+
        '</table>'
        ,{
        returnFirst : true,
        elements : this.ui,
        host : document.body,
        display : "none",
        zIndex : this.default.zIndex,
        vars:{
            title : this.title,
            buttonCloseTitle : 'Закрыть окно',
            content : 'content text',
            addCss : addClass,
            toolbar : function(){
                var buttons = [];
                if( arg.toolbar ){
                    for( var i in arg.toolbar ){
                        var v = arg.toolbar[i];
                        if( typeof(i)==='string' && typeof(v)==='function' ){
                            var button = templateUI( '<span class="button">{text}</span>',{
                                returnFirst : true,
                                vars : {
                                    text : i
                                }
                            });
                            button.callFunc = v;
                            button.onclick = function(){
                                this.callFunc( self );
                            };
                            buttons[buttons.length] = button;
                        }
                    }
                }
                return buttons;
            }
        }}
    );

    this.ui.closeButton.onclick = function(){
        if( self.onclose instanceof Function ){
            var res = self.onclose();
            if( !res )return;
        }

        if( self.hideOnClose ){
            self.hide();
        }else{
            self.close();
        }
    };
    
	self.moveDialog = function(event){
		if( self.drag && !self.drag.isdragging )return;
		var dx = event.screenX - self.drag.screenX;
		var dy = event.screenY - self.drag.screenY;
		var nx = self.drag.offsetLeft + dx;
		var ny = self.drag.offsetTop + dy;
		self.ui.wrapper.style.left = nx + "px";
		self.ui.wrapper.style.top = ny + "px";
	};
	
	this.fOnMouseDown = function(event){
		if( self.drag && self.drag.isdragging )return;
		self.drag = {
			screenX: event.screenX, 
			screenY: event.screenY,
			offsetTop: self.ui.wrapper.offsetTop,
			offsetLeft: self.ui.wrapper.offsetLeft,
			isdragging:true,
		};
		self.toTopZ();
		addOnMouseMove( self.moveDialog );
		return false;
	};
	this.fOnMouseUp = function(event){
		if( self.drag )self.drag.isdragging = false;
		removeOnMouseMove( self.moveDialog );
		return false;
	};
	
	this.ui.titleTextCell.onmousedown = this.fOnMouseDown;
	this.ui.titleTextCell.onmouseup = this.fOnMouseUp;
	this.ui.titleTextCell.self = this;
	
	self.resizeDialog = function( event ){
		if( !self.resize )return;
		if( !self.resize.isresizing )return;
		var dx = event.screenX - self.resize.screenX;
		var dy = event.screenY - self.resize.screenY;
		var nw = self.resize.offsetWidth + dx;
		var nh = self.resize.offsetHeight + dy;
		if( nw < self.resize.minWidth )nw = self.resize.minWidth;
		if( nh < self.resize.minHeight )nh = self.resize.minHeight;
		self.ui.wrapper.style.width = nw + "px";
		self.ui.wrapper.style.height = nh + "px";
	};
	
	this.ui.rightBottomCorner.onmousedown = function(event){
		if( self.resize && self.resize.isresizing )return;
		self.resize = {
			screenX: event.screenX, 
			screenY: event.screenY,
			minWidth: 80,
			minHeight: 80,
			offsetWidth : self.ui.wrapper.offsetWidth,
			offsetHeight : self.ui.wrapper.offsetHeight,
			isresizing : true,
		};
		self.toTopZ();
		addOnMouseMove( self.resizeDialog );
		return false;
	};
	
	this.ui.rightBottomCorner.onmouseup = function(event){
		if( self.resize ){
			if( self.resize.isresizing ){
				self.resize.isresizing = false;
				removeOnMouseMove( self.resizeDialog );
				return false;
			}
		}
	};
	
	this.centerToPage();
	if( arguments.length>0 && arguments[0] instanceof Object ){
		var arg = arguments[0];
		if( arg.title )this.title = arg.title;
		if( typeof(arg.content)==='string' ){
			this.content = arg.content;
		}else if( typeof(arg.content)==='object' ){
			this.content = "";
			this.ui.contentBody.appendChild( arg.content );
		}
	}
	
	dialogs[dialogs.length] = this ;
}

Dialog.prototype = Object.create(Object.prototype);

// Значения по умолчанию
Dialog.prototype.default = {
	// z уровень
	zIndex : 10,
	
	// Параметры загрузки HTML
	loadHTML : {
		disableExistsCSS : true,
		appendCSS : ["css/fonts.css","css/help.css"],
        appendJS : ["help.js"],
		nocache : true,
        //nocache : false,
		readTitle : true,
	},
};

Dialog.prototype.ui = {
    iframe : null,
};

//<editor-fold defaultstate="collapsed" desc="Свойство title - для HTML">
Dialog.prototype._title = "title";
Dialog.prototype.__defineGetter__( "title", function(){
	if( this.ui && 
		this.ui.titleTextSpan && 
		(typeof(this.ui.titleTextSpan.innerHTML)!="undefined") ){
		return this.ui.titleTextSpan.innerHTML;
	}
	return this._title;
});
Dialog.prototype.__defineSetter__( "title", function(val){
	if( this._title != val ){
		this._title = val;
		if( this.ui && this.ui.titleTextSpan ){
			this.ui.titleTextSpan.innerHTML = val;
		}
	}
});
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Свойство caption - для плоского текста">
Dialog.prototype.__defineGetter__( "caption", function(){
	if( this.ui && 
		this.ui.titleTextSpan && 
		(typeof(this.ui.titleTextSpan.innerHTML)!=="undefined") ){
		return this.ui.titleTextSpan.textConent;
	}
	return null;
});
Dialog.prototype.__defineSetter__( "caption", function(val){
    if( this.ui && this.ui.titleTextSpan ){
        this.ui.titleTextSpan.textContent = val;
    }
});
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Свойство content - для HTML и HTML elements">
Dialog.prototype._content = "body";
Dialog.prototype.__defineGetter__( "content", function(){
	if( this.ui && this.ui.contentBody && typeof(this.ui.contentBody.innerHTML)!="undefined" ){
		return this.ui.contentBody.innerHTML;
	}
	return this._content;
});
Dialog.prototype.__defineSetter__( "content", function(val){
	if( this._content != val ){
		this._content = val;
		if( typeof(val)=="object" ){
			if( this.ui && this.ui.contentBody ){
				this.ui.contentBody.innerHTML = "";
				this.ui.contentBody.appendChild( val );
			}
		}else{
			if( this.ui && this.ui.contentBody ){
				this.ui.contentBody.innerHTML = val;
			}
		}
	}
});
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Свойство text - для плоского текста">
// Свойство text
Dialog.prototype._text = "body";
Dialog.prototype.__defineGetter__( "text", function(){
	if( this.ui && this.ui.contentBody && typeof(this.ui.contentBody.innerHTML)!=="undefined" ){
		return this.ui.contentBody.textContent;
	}
	return null;
});
Dialog.prototype.__defineSetter__( "text", function(val){
    if( typeof(val)==="string" ){
        if( this.ui && this.ui.contentBody ){
            this.ui.contentBody.innerHTML = "";
            this.ui.contentBody.textContent = val;
        }
    }
});
//</editor-fold>

Dialog.prototype.width = 400;
Dialog.prototype.height = 400;

Dialog.prototype.centerToPage = function(){
	this.ui.wrapper.style.width = this.width + "px";
	this.ui.wrapper.style.height = this.height + "px";
	
	var ih = window.innerHeight;
	var iw = window.innerWidth;
	
	var x = (iw/2) - (this.width/2);
	var y = (ih/2) - (this.height/2);
	
	this.ui.wrapper.style.left = x + "px";
	this.ui.wrapper.style.top = y + "px";
};

Dialog.prototype.getZStat = function(){
	var minZ = -1;
	var maxZ = -1;
	for( var i in dialogs ){
		var d = dialogs[i];
		var z = d.ui.wrapper.style.zIndex;
		z = parseInt( z );
		if( Number.isNaN(z) )continue;
		if( z < minZ ){
			minZ = z;
		}
		if( z > maxZ ){
			maxZ = z;
		}
	}
	return {minz:minZ, maxz:maxZ};
};

Dialog.prototype.toTopZ = function(){
	var minmax = this.getZStat();
	var nz = minmax.maxz + 1;
	if( nz < this.default.zIndex )nz = this.default.zIndex;
	this.ui.wrapper.style.zIndex = nz;
};

Dialog.prototype.hideOnClose = true;

/**
 * Закрытие диалога
 * @returns {undefined}
 */
Dialog.prototype.close = function(){
    document.body.removeChild( this.ui.wrapper );
    var newDlg = [];
    for( var k in dialogs ){
        var o = dialogs[k];
        if( o!==this ){
            newDlg.push( o );
        }
    }
    dialogs = newDlg;
};

Dialog.prototype.show = function(){
	this.ui.wrapper.style.display = "";
	this.toTopZ();
	//this.centerToPage();
};

Dialog.prototype.hide = function(){
	this.ui.wrapper.style.display = "none";
};

Dialog.prototype.isVisible = function(){
	return this.ui.wrapper.style.display != 'none';
};

Dialog.prototype.loadHTML = function(){
	if( arguments.length<1 )return;
	var arg = arguments[0];
	var self = this;
    var wnd = window;
    
    function getThisPrefixCSS(){
        var URL = wnd.document.URL;
        var mPreffix = URL.match( /^((http|ftp|https):\/\/)/i );
        var isPreffixURL = mPreffix!=null;
        var isAbsURL = URL.indexOf( "/" )==0;
        var isRelative = !isAbsURL && !isPreffixURL;
        if( isPreffixURL ){
            var questCharI = URL.indexOf( "?" );
            if( questCharI>=0 ){
                if( questCharI==0 ){
                    return null;
                }else{
                    URL = URL.substr( 0, questCharI );
                }
            }
            
            var scheme = mPreffix[1];
            var _url1 = URL.substr( scheme.length );
            var _urlParts = _url1.split( "/" );
            var pref = "";
            for( var i=0; i<_urlParts.length-1; i++ ){
                pref += _urlParts[i] + "/";
            }
            pref = scheme + pref;
            return pref;
        }
        return null;
    }
    
	var url = arg;
	this.content = "";
	
	var frame = createEl( "iframe", {host: this.ui.contentBody} );
    self.ui.iframe = frame;
    
	frame.width = "100%";
	frame.height = "100%";
	frame.frameborder = "0";
	frame.sandbox = "allow-same-origin allow-scripts";
	frame.scrolling = "auto";
	frame.setAttribute( 'style', "border: 0;" );
	frame.onload = function(){
		if( frame.contentDocument ){
			var doc = frame.contentDocument;
			if( self.default.loadHTML.disableExistsCSS ){
				for( var k in doc.styleSheets ){
					var ss = doc.styleSheets[k];
					ss.disabled = true;
				}
			}
            
            var selfPrefURL = getThisPrefixCSS();
            if( selfPrefURL ){
                // appendCSS
                var head = doc.getElementsByTagName('head')[0];
                for( var i in self.default.loadHTML.appendCSS ){
                    var d = new Date();
                    var css = self.default.loadHTML.appendCSS[i];

                    var linkEl = doc.createElement("link");
                    linkEl.rel = "stylesheet";
                    linkEl.type = "text/css";
                    
                    var href = css;
                    if(     !(href.match(/^((https?)|ftp)/i))
                        &&  !(href.match(/^\//i))
                        ){
                        href = selfPrefURL + href;
                    }
                    if( self.default.loadHTML.nocache ){
                        href = href +"?nocache="+d.getTime();
                    }

                    linkEl.href = href;
                    head.appendChild(linkEl);
                }
                
                //appendJS
                var jsForLoad = [];
                for( var i in self.default.loadHTML.appendJS ){
                    var jsURL = self.default.loadHTML.appendJS[i];
                    var href = jsURL;
                    if(     !(href.match(/^((https?)|ftp)/i))
                        &&  !(href.match(/^\//i))
                        ){
                        href = selfPrefURL + href;
                    }
                    if( self.default.loadHTML.nocache ){
                        href = href +"?nocache="+d.getTime();
                    }
                    jsForLoad[jsForLoad.length] = href;
                }
                
                loadJS( selfPrefURL + "loadjs.js", function(){
                    for( var i in jsForLoad ){
                        var href = jsForLoad[i];
                        loadJS( href, function(){}, {document:doc} );
                    }
                }, {document:doc} );
            }

			if( self.default.loadHTML.readTitle )self.title = doc.title;
		}
	};
	frame.src=url;
};

//loadCSS( "css/dialog.css"+"?nocache="+((new Date()).getTime()) );