var jscolor={dir:"",bindClass:"color",binding:!0,preloading:!0,install:function(){jscolor.addEvent(window,"load",jscolor.init)},init:function(){jscolor.binding&&jscolor.bind(),jscolor.preloading&&jscolor.preload()},getDir:function(){return base_url+"assets/images/"},detectDir:function(){for(var e=location.href,t=document.getElementsByTagName("base"),o=0;o<t.length;o+=1)t[o].href&&(e=t[o].href);for(var t=document.getElementsByTagName("script"),o=0;o<t.length;o+=1)if(t[o].src&&/(^|\/)jscolor\.js([?#].*)?$/i.test(t[o].src)){var r=new jscolor.URI(t[o].src).toAbsolute(e);return r.path=r.path.replace(/[^\/]+$/,""),r.query=null,r.fragment=null,r.toString()}return!1},bind:function(){for(var e=new RegExp("(^|\\s)("+jscolor.bindClass+")\\s*(\\{[^}]*\\})?","i"),t=document.getElementsByTagName("input"),o=0;o<t.length;o+=1){var r;if(!t[o].color&&t[o].className&&(r=t[o].className.match(e))){var s={};if(r[3])try{s=new Function("return ("+r[3]+")")()}catch(e){}t[o].color=new jscolor.color(t[o],s)}}},preload:function(){for(var e in jscolor.imgRequire)jscolor.imgRequire.hasOwnProperty(e)&&jscolor.loadImage(e)},images:{pad:[181,101],sld:[16,101],cross:[15,15],arrow:[7,11]},imgRequire:{},imgLoaded:{},requireImage:function(e){jscolor.imgRequire[e]=!0},loadImage:function(e){jscolor.imgLoaded[e]||(jscolor.imgLoaded[e]=new Image,jscolor.imgLoaded[e].src=jscolor.getDir()+e)},fetchElement:function(e){return"string"==typeof e?document.getElementById(e):e},addEvent:function(e,t,o){e.addEventListener?e.addEventListener(t,o,!1):e.attachEvent&&e.attachEvent("on"+t,o)},fireEvent:function(e,t){if(e)if(document.createEvent)(o=document.createEvent("HTMLEvents")).initEvent(t,!0,!0),e.dispatchEvent(o);else if(document.createEventObject){var o=document.createEventObject();e.fireEvent("on"+t,o)}else e["on"+t]&&e["on"+t]()},getElementPos:function(e){var t=e,o=e,r=0,s=0;if(t.offsetParent)do{r+=t.offsetLeft,s+=t.offsetTop}while(t=t.offsetParent);for(;(o=o.parentNode)&&"BODY"!==o.nodeName.toUpperCase();)r-=o.scrollLeft,s-=o.scrollTop;return[r,s]},getElementSize:function(e){return[e.offsetWidth,e.offsetHeight]},getRelMousePos:function(e){var t=0,o=0;return e||(e=window.event),"number"==typeof e.offsetX?(t=e.offsetX,o=e.offsetY):"number"==typeof e.layerX&&(t=e.layerX,o=e.layerY),{x:t,y:o}},getViewPos:function(){return"number"==typeof window.pageYOffset?[window.pageXOffset,window.pageYOffset]:document.body&&(document.body.scrollLeft||document.body.scrollTop)?[document.body.scrollLeft,document.body.scrollTop]:document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)?[document.documentElement.scrollLeft,document.documentElement.scrollTop]:[0,0]},getViewSize:function(){return"number"==typeof window.innerWidth?[window.innerWidth,window.innerHeight]:document.body&&(document.body.clientWidth||document.body.clientHeight)?[document.body.clientWidth,document.body.clientHeight]:document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)?[document.documentElement.clientWidth,document.documentElement.clientHeight]:[0,0]},URI:function(e){function t(e){for(var t="";e;)if("../"===e.substr(0,3)||"./"===e.substr(0,2))e=e.replace(/^\.+/,"").substr(1);else if("/./"===e.substr(0,3)||"/."===e)e="/"+e.substr(3);else if("/../"===e.substr(0,4)||"/.."===e)e="/"+e.substr(4),t=t.replace(/\/?[^\/]*$/,"");else if("."===e||".."===e)e="";else{var o=e.match(/^\/?[^\/]*/)[0];e=e.substr(o.length),t+=o}return t}this.scheme=null,this.authority=null,this.path="",this.query=null,this.fragment=null,this.parse=function(e){var t=e.match(/^(([A-Za-z][0-9A-Za-z+.-]*)(:))?((\/\/)([^\/?#]*))?([^?#]*)((\?)([^#]*))?((#)(.*))?/);return this.scheme=t[3]?t[2]:null,this.authority=t[5]?t[6]:null,this.path=t[7],this.query=t[9]?t[10]:null,this.fragment=t[12]?t[13]:null,this},this.toString=function(){var e="";return null!==this.scheme&&(e=e+this.scheme+":"),null!==this.authority&&(e=e+"//"+this.authority),null!==this.path&&(e+=this.path),null!==this.query&&(e=e+"?"+this.query),null!==this.fragment&&(e=e+"#"+this.fragment),e},this.toAbsolute=function(e){var e=new jscolor.URI(e),o=this,r=new jscolor.URI;return null!==e.scheme&&(null!==o.scheme&&o.scheme.toLowerCase()===e.scheme.toLowerCase()&&(o.scheme=null),null!==o.scheme?(r.scheme=o.scheme,r.authority=o.authority,r.path=t(o.path),r.query=o.query):(null!==o.authority?(r.authority=o.authority,r.path=t(o.path),r.query=o.query):(""===o.path?(r.path=e.path,null!==o.query?r.query=o.query:r.query=e.query):("/"===o.path.substr(0,1)?r.path=t(o.path):(null!==e.authority&&""===e.path?r.path="/"+o.path:r.path=e.path.replace(/[^\/]+$/,"")+o.path,r.path=t(r.path)),r.query=o.query),r.authority=e.authority),r.scheme=e.scheme),r.fragment=o.fragment,r)},e&&this.parse(e)},color:function(e,t){function o(e,t,o){var r=Math.min(Math.min(e,t),o),s=Math.max(Math.max(e,t),o),n=s-r;if(0===n)return[null,0,s];var i=e===r?3+(o-t)/n:t===r?5+(e-o)/n:1+(t-e)/n;return[6===i?0:i,n/s,s]}function r(e,t,o){if(null===e)return[o,o,o];var r=Math.floor(e),s=o*(1-t),n=o*(1-t*(r%2?e-r:1-(e-r)));switch(r){case 6:case 0:return[o,n,s];case 1:return[n,o,s];case 2:return[s,o,n];case 3:return[s,n,o];case 4:return[n,s,o];case 5:return[o,s,n]}}function s(){delete jscolor.picker.owner,document.getElementsByTagName("body")[0].removeChild(jscolor.picker.boxB)}function n(t,o){if(!jscolor.picker){jscolor.picker={box:document.createElement("div"),boxB:document.createElement("div"),pad:document.createElement("div"),padB:document.createElement("div"),padM:document.createElement("div"),sld:document.createElement("div"),sldB:document.createElement("div"),sldM:document.createElement("div"),btn:document.createElement("div"),btnS:document.createElement("span"),btnT:document.createTextNode(g.pickerCloseText)};for(var r=0;r<jscolor.images.sld[1];r+=4){var s=document.createElement("div");s.style.height="4px",s.style.fontSize="1px",s.style.lineHeight="0",jscolor.picker.sld.appendChild(s)}jscolor.picker.sldB.appendChild(jscolor.picker.sld),jscolor.picker.box.appendChild(jscolor.picker.sldB),jscolor.picker.box.appendChild(jscolor.picker.sldM),jscolor.picker.padB.appendChild(jscolor.picker.pad),jscolor.picker.box.appendChild(jscolor.picker.padB),jscolor.picker.box.appendChild(jscolor.picker.padM),jscolor.picker.btnS.appendChild(jscolor.picker.btnT),jscolor.picker.btn.appendChild(jscolor.picker.btnS),jscolor.picker.box.appendChild(jscolor.picker.btn),jscolor.picker.boxB.appendChild(jscolor.picker.box)}var n=jscolor.picker;if(n.box.onmouseup=n.box.onmouseout=function(){e.focus()},n.box.onmousedown=function(){b=!0},n.box.onmousemove=function(e){(v||j)&&(v&&u(e),j&&d(e),document.selection?document.selection.empty():window.getSelection&&window.getSelection().removeAllRanges(),p())},"ontouchstart"in window){var a=function(e){var t={offsetX:e.touches[0].pageX-x.X,offsetY:e.touches[0].pageY-x.Y};(v||j)&&(v&&u(t),j&&d(t),p()),e.stopPropagation(),e.preventDefault()};n.box.removeEventListener("touchmove",a,!1),n.box.addEventListener("touchmove",a,!1)}n.padM.onmouseup=n.padM.onmouseout=function(){v&&(v=!1,jscolor.fireEvent(y,"change"))},n.padM.onmousedown=function(e){switch(f){case 0:0===g.hsv[2]&&g.fromHSV(null,null,1);break;case 1:0===g.hsv[1]&&g.fromHSV(null,1,null)}j=!1,v=!0,u(e),p()},"ontouchstart"in window&&n.padM.addEventListener("touchstart",function(e){x={X:e.target.offsetParent.offsetLeft,Y:e.target.offsetParent.offsetTop},this.onmousedown({offsetX:e.touches[0].pageX-x.X,offsetY:e.touches[0].pageY-x.Y})}),n.sldM.onmouseup=n.sldM.onmouseout=function(){j&&(j=!1,jscolor.fireEvent(y,"change"))},n.sldM.onmousedown=function(e){v=!1,j=!0,d(e),p()},"ontouchstart"in window&&n.sldM.addEventListener("touchstart",function(e){x={X:e.target.offsetParent.offsetLeft,Y:e.target.offsetParent.offsetTop},this.onmousedown({offsetX:e.touches[0].pageX-x.X,offsetY:e.touches[0].pageY-x.Y})});var h=i(g);n.box.style.width=h[0]+"px",n.box.style.height=h[1]+"px",n.boxB.style.position="absolute",n.boxB.style.clear="both",n.boxB.style.left=t+"px",n.boxB.style.top=jQuery(document).scrollTop()+o+"px",n.boxB.style.zIndex=g.pickerZIndex,n.boxB.style.border=g.pickerBorder+"px solid",n.boxB.style.borderColor=g.pickerBorderColor,n.boxB.style.background=g.pickerFaceColor,n.pad.style.width=jscolor.images.pad[0]+"px",n.pad.style.height=jscolor.images.pad[1]+"px",n.padB.style.position="absolute",n.padB.style.left=g.pickerFace+"px",n.padB.style.top=g.pickerFace+"px",n.padB.style.border=g.pickerInset+"px solid",n.padB.style.borderColor=g.pickerInsetColor,n.padM.style.position="absolute",n.padM.style.left="0",n.padM.style.top="0",n.padM.style.width=g.pickerFace+2*g.pickerInset+jscolor.images.pad[0]+jscolor.images.arrow[0]+"px",n.padM.style.height=n.box.style.height,n.padM.style.cursor="crosshair",n.sld.style.overflow="hidden",n.sld.style.width=jscolor.images.sld[0]+"px",n.sld.style.height=jscolor.images.sld[1]+"px",n.sldB.style.display=g.slider?"block":"none",n.sldB.style.position="absolute",n.sldB.style.right=g.pickerFace+"px",n.sldB.style.top=g.pickerFace+"px",n.sldB.style.border=g.pickerInset+"px solid",n.sldB.style.borderColor=g.pickerInsetColor,n.sldM.style.display=g.slider?"block":"none",n.sldM.style.position="absolute",n.sldM.style.right="0",n.sldM.style.top="0",n.sldM.style.width=jscolor.images.sld[0]+jscolor.images.arrow[0]+g.pickerFace+2*g.pickerInset+"px",n.sldM.style.height=n.box.style.height;try{n.sldM.style.cursor="pointer"}catch(e){n.sldM.style.cursor="hand"}n.btn.style.display=g.pickerClosable?"block":"none",n.btn.style.position="absolute",n.btn.style.left=g.pickerFace+"px",n.btn.style.bottom=g.pickerFace+"px",n.btn.style.padding="0 15px",n.btn.style.height="18px",n.btn.style.border=g.pickerInset+"px solid",function(){var e=g.pickerInsetColor.split(/\s+/),t=e.length<2?e[0]:e[1]+" "+e[0]+" "+e[0]+" "+e[1];n.btn.style.borderColor=t}(),n.btn.style.color=g.pickerButtonColor,n.btn.style.font="12px sans-serif",n.btn.style.textAlign="center";try{n.btn.style.cursor="pointer"}catch(e){n.btn.style.cursor="hand"}switch(n.btn.onmousedown=function(){g.hidePicker()},n.btnS.style.lineHeight=n.btn.style.height,f){case 0:m="hs.png";break;case 1:var m="hv.png"}n.padM.style.backgroundImage="url('"+jscolor.getDir()+"cross.gif')",n.padM.style.backgroundRepeat="no-repeat",n.sldM.style.backgroundImage="url('"+jscolor.getDir()+"arrow.gif')",n.sldM.style.backgroundRepeat="no-repeat",n.pad.style.backgroundImage="url('"+jscolor.getDir()+m+"')",n.pad.style.backgroundRepeat="no-repeat",n.pad.style.backgroundPosition="0 0",l(),c(),jscolor.picker.owner=g,document.getElementsByTagName("body")[0].appendChild(n.boxB)}function i(e){return[2*e.pickerInset+2*e.pickerFace+jscolor.images.pad[0]+(e.slider?2*e.pickerInset+2*jscolor.images.arrow[0]+jscolor.images.sld[0]:0),e.pickerClosable?4*e.pickerInset+3*e.pickerFace+jscolor.images.pad[1]+e.pickerButtonHeight:2*e.pickerInset+2*e.pickerFace+jscolor.images.pad[1]]}function l(){switch(f){case 0:e=1;break;case 1:var e=2}var t=Math.round(g.hsv[0]/6*(jscolor.images.pad[0]-1)),o=Math.round((1-g.hsv[e])*(jscolor.images.pad[1]-1));jscolor.picker.padM.style.backgroundPosition=g.pickerFace+g.pickerInset+t-Math.floor(jscolor.images.cross[0]/2)+"px "+(g.pickerFace+g.pickerInset+o-Math.floor(jscolor.images.cross[1]/2))+"px";var s=jscolor.picker.sld.childNodes;switch(f){case 0:for(var n=r(g.hsv[0],g.hsv[1],1),i=0;i<s.length;i+=1)s[i].style.backgroundColor="rgb("+n[0]*(1-i/s.length)*100+"%,"+n[1]*(1-i/s.length)*100+"%,"+n[2]*(1-i/s.length)*100+"%)";break;case 1:var l,c=[g.hsv[2],0,0],a=(i=Math.floor(g.hsv[0]))%2?g.hsv[0]-i:1-(g.hsv[0]-i);switch(i){case 6:case 0:n=[0,1,2];break;case 1:n=[1,0,2];break;case 2:n=[2,0,1];break;case 3:n=[2,1,0];break;case 4:n=[1,2,0];break;case 5:n=[0,2,1]}for(i=0;i<s.length;i+=1)l=1-1/(s.length-1)*i,c[1]=c[0]*(1-l*a),c[2]=c[0]*(1-l),s[i].style.backgroundColor="rgb("+100*c[n[0]]+"%,"+100*c[n[1]]+"%,"+100*c[n[2]]+"%)"}}function c(){switch(f){case 0:e=2;break;case 1:var e=1}var t=Math.round((1-g.hsv[e])*(jscolor.images.sld[1]-1));jscolor.picker.sldM.style.backgroundPosition="0 "+(g.pickerFace+g.pickerInset+t-Math.floor(jscolor.images.arrow[1]/2))+"px"}function a(){return jscolor.picker&&jscolor.picker.owner===g}function h(){y===e&&g.importColor(),g.pickerOnfocus&&g.hidePicker()}function u(e){var t=jscolor.getRelMousePos(e),o=t.x-g.pickerFace-g.pickerInset,r=t.y-g.pickerFace-g.pickerInset;switch(f){case 0:g.fromHSV(o*(6/(jscolor.images.pad[0]-1)),1-r/(jscolor.images.pad[1]-1),null,E);break;case 1:g.fromHSV(o*(6/(jscolor.images.pad[0]-1)),null,1-r/(jscolor.images.pad[1]-1),E)}}function d(e){var t=jscolor.getRelMousePos(e).y-g.pickerFace-g.pickerInset;switch(f){case 0:g.fromHSV(null,null,1-t/(jscolor.images.sld[1]-1),C);break;case 1:g.fromHSV(null,1-t/(jscolor.images.sld[1]-1),null,C)}}function p(){if(g.onImmediateChange){("string"==typeof g.onImmediateChange?new Function(g.onImmediateChange):g.onImmediateChange).call(g)}}this.required=!0,this.adjust=!0,this.hash=!1,this.caps=!0,this.slider=!0,this.valueElement=e,this.styleElement=e,this.onImmediateChange=null,this.hsv=[0,0,1],this.rgb=[1,1,1],this.minH=0,this.maxH=6,this.minS=0,this.maxS=1,this.minV=0,this.maxV=1,this.pickerOnfocus=!0,this.pickerMode="HSV",this.pickerPosition="right",this.pickerSmartPosition=!0,this.pickerButtonHeight=20,this.pickerClosable=!1,this.pickerCloseText="Close",this.pickerButtonColor="ButtonText",this.pickerFace=10,this.pickerFaceColor="ThreeDFace",this.pickerBorder=1,this.pickerBorderColor="ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight",this.pickerInset=1,this.pickerInsetColor="ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow",this.pickerZIndex=1e4;for(var m in t)t.hasOwnProperty(m)&&(this[m]=t[m]);this.hidePicker=function(){a()&&s()},this.showPicker=function(){if(!a()){var t,o,r,s=jscolor.getElementPos(e),l=jscolor.getElementSize(e),c=jscolor.getViewPos(),h=jscolor.getViewSize(),u=i(this);switch(this.pickerPosition.toLowerCase()){case"left":t=1,o=0,r=-1;break;case"right":t=1,o=0,r=1;break;case"top":t=0,o=1,r=-1;break;default:t=0,o=1,r=1}var d=(l[o]+u[o])/2;if(this.pickerSmartPosition)p=[-c[t]+s[t]+u[t]>h[t]&&-c[t]+s[t]+l[t]/2>h[t]/2&&s[t]+l[t]-u[t]>=0?s[t]+l[t]-u[t]:s[t],-c[o]+s[o]+l[o]+u[o]-d+d*r>h[o]?-c[o]+s[o]+l[o]/2>h[o]/2&&s[o]+l[o]-d-d*r>=0?s[o]+l[o]-d-d*r:s[o]+l[o]-d+d*r:s[o]+l[o]-d+d*r>=0?s[o]+l[o]-d+d*r:s[o]+l[o]-d-d*r];else var p=[s[t],s[o]+l[o]-d+d*r];n(p[t],p[o])}},this.importColor=function(){y?this.adjust?!this.required&&/^\s*$/.test(y.value)?(y.value="",k.style.backgroundImage=k.jscStyle.backgroundImage,k.style.backgroundColor=k.jscStyle.backgroundColor,k.style.color=k.jscStyle.color,this.exportColor(w|M)):this.fromString(y.value)||this.exportColor():this.fromString(y.value,w)||(k.style.backgroundImage=k.jscStyle.backgroundImage,k.style.backgroundColor=k.jscStyle.backgroundColor,k.style.color=k.jscStyle.color,this.exportColor(w|M)):this.exportColor()},this.exportColor=function(e){if(!(e&w)&&y){var t=this.toString();this.caps&&(t=t.toUpperCase()),this.hash&&(t="#"+t),y.value=t}e&M||!k||(k.style.backgroundImage="none",k.style.backgroundColor="#"+this.toString(),k.style.color=.213*this.rgb[0]+.715*this.rgb[1]+.072*this.rgb[2]<.5?"#FFF":"#000"),e&C||!a()||l(),e&E||!a()||c()},this.fromHSV=function(e,t,o,s){null!==e&&(e=Math.max(0,this.minH,Math.min(6,this.maxH,e))),null!==t&&(t=Math.max(0,this.minS,Math.min(1,this.maxS,t))),null!==o&&(o=Math.max(0,this.minV,Math.min(1,this.maxV,o))),this.rgb=r(null===e?this.hsv[0]:this.hsv[0]=e,null===t?this.hsv[1]:this.hsv[1]=t,null===o?this.hsv[2]:this.hsv[2]=o),this.exportColor(s)},this.fromRGB=function(e,t,s,n){null!==e&&(e=Math.max(0,Math.min(1,e))),null!==t&&(t=Math.max(0,Math.min(1,t))),null!==s&&(s=Math.max(0,Math.min(1,s)));var i=o(null===e?this.rgb[0]:e,null===t?this.rgb[1]:t,null===s?this.rgb[2]:s);null!==i[0]&&(this.hsv[0]=Math.max(0,this.minH,Math.min(6,this.maxH,i[0]))),0!==i[2]&&(this.hsv[1]=null===i[1]?null:Math.max(0,this.minS,Math.min(1,this.maxS,i[1]))),this.hsv[2]=null===i[2]?null:Math.max(0,this.minV,Math.min(1,this.maxV,i[2]));var l=r(this.hsv[0],this.hsv[1],this.hsv[2]);this.rgb[0]=l[0],this.rgb[1]=l[1],this.rgb[2]=l[2],this.exportColor(n)},this.fromString=function(e,t){var o=e.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);return!!o&&(6===o[1].length?this.fromRGB(parseInt(o[1].substr(0,2),16)/255,parseInt(o[1].substr(2,2),16)/255,parseInt(o[1].substr(4,2),16)/255,t):this.fromRGB(parseInt(o[1].charAt(0)+o[1].charAt(0),16)/255,parseInt(o[1].charAt(1)+o[1].charAt(1),16)/255,parseInt(o[1].charAt(2)+o[1].charAt(2),16)/255,t),!0)},this.toString=function(){return(256|Math.round(255*this.rgb[0])).toString(16).substr(1)+(256|Math.round(255*this.rgb[1])).toString(16).substr(1)+(256|Math.round(255*this.rgb[2])).toString(16).substr(1)};var g=this,f="hvs"===this.pickerMode.toLowerCase()?1:0,b=!1,y=jscolor.fetchElement(this.valueElement),k=jscolor.fetchElement(this.styleElement),v=!1,j=!1,x={},w=1,M=2,C=4,E=8;if(jscolor.addEvent(e,"focus",function(){g.pickerOnfocus&&g.showPicker()}),jscolor.addEvent(e,"blur",function(){b?b=!1:window.setTimeout(function(){b||h(),b=!1},0)}),y){var I=function(){g.fromString(y.value,w),p()};jscolor.addEvent(y,"keyup",I),jscolor.addEvent(y,"input",I),jscolor.addEvent(y,"blur",function(){y!==e&&g.importColor()}),y.setAttribute("autocomplete","off")}switch(k&&(k.jscStyle={backgroundImage:k.style.backgroundImage,backgroundColor:k.style.backgroundColor,color:k.style.color}),f){case 0:jscolor.requireImage("../images/hs.png");break;case 1:jscolor.requireImage("../images/hv.png")}jscolor.requireImage("../images/cross.gif"),jscolor.requireImage("../images/arrow.gif"),this.importColor()}};jscolor.install();