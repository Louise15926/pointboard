!function(t){var e={};function n(r){if(e[r])return e[r].exports;var s=e[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(r,s,function(e){return t[e]}.bind(null,s));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){n(2),n(3),n(7)},function(t,e){t.exports='<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">\n    <title>The System</title>\n</head>\n<body>\n<noscript>You need to enable JavaScript to run this app.</noscript>\n<div id="root">\n    <div class="container"><h1>The System</h1></div>\n    {{if .}}\n        <div class="container">\n            <form action="/addpeople" id="add-people-form">\n                <label for="add-people-form-name">New Acolyte\'s name</label>\n                <input id="add-people-form-name" name="new-name" type="text" required/>\n                <label for="add-people-form-initial-score">Initial score</label>\n                <input id="add-people-form-initial-score" name="new-score" type="text"/>\n                <input class="btn btn-primary" type="submit" value="Welcome :O"/>\n            </form>\n        </div>\n        <div class="container">\n            <form action="/add" id="point-form"></form>\n            <form action="/deletepeople" id="delete-people-form" method="POST"></form>\n            <table class="table table-striped">\n                {{range .People}}\n                    <tr>\n                        <td>{{.Name}}</td>\n                        <td>{{.Score}}</td>\n                        <td><input type="text" form="point-form" name="points-{{.Name}}" class="points-input"/></td>\n                        <td><input type="checkbox" form="delete-people-form" name="{{.Name}}"/></td>\n                    </tr>\n                {{end}}\n                <tr>\n                    <td/><td/>\n                    <td><input class="btn btn-primary" type="submit" form="point-form" value="Submit"></td>\n                    <td><input class="btn btn-danger" type="submit" form="delete-people-form" value="Delete"></td>\n                </tr>\n            </table>\n        </div>\n    {{else}}\n        <span>Unable to connect to database noooo ahhhhhhhhhasdfasdf@#$%$#$%$#@#$%^&*</span>\n    {{end}}\n</div>\n<script src="bundle/bundle.js" type="text/javascript"><\/script>\n<script>\n    {{if .}}\n    let awardWiningPeople = {{.Awards}} || [];\n    if (awardWiningPeople.length !== 0)\n        window.alert(awardWiningPeople.join() + " win(s) the award yayy")\n    {{end}}\n<\/script>\n</body>\n</html>\n'},function(t,e,n){var r=n(4),s=n(5);"string"==typeof(s=s.__esModule?s.default:s)&&(s=[[t.i,s,""]]);var i={insert:"head",singleton:!1};r(s,i);t.exports=s.locals||{}},function(t,e,n){"use strict";var r,s=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},i=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}(),o=[];function a(t){for(var e=-1,n=0;n<o.length;n++)if(o[n].identifier===t){e=n;break}return e}function p(t,e){for(var n={},r=[],s=0;s<t.length;s++){var i=t[s],p=e.base?i[0]+e.base:i[0],u=n[p]||0,h="".concat(p," ").concat(u);n[p]=u+1;var c=a(h),l={css:i[1],media:i[2],sourceMap:i[3]};-1!==c?(o[c].references++,o[c].updater(l)):o.push({identifier:h,updater:y(l,e),references:1}),r.push(h)}return r}function u(t){var e=document.createElement("style"),r=t.attributes||{};if(void 0===r.nonce){var s=n.nc;s&&(r.nonce=s)}if(Object.keys(r).forEach((function(t){e.setAttribute(t,r[t])})),"function"==typeof t.insert)t.insert(e);else{var o=i(t.insert||"head");if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(e)}return e}var h,c=(h=[],function(t,e){return h[t]=e,h.filter(Boolean).join("\n")});function l(t,e,n,r){var s=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(t.styleSheet)t.styleSheet.cssText=c(e,s);else{var i=document.createTextNode(s),o=t.childNodes;o[e]&&t.removeChild(o[e]),o.length?t.insertBefore(i,o[e]):t.appendChild(i)}}function f(t,e,n){var r=n.css,s=n.media,i=n.sourceMap;if(s?t.setAttribute("media",s):t.removeAttribute("media"),i&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleSheet)t.styleSheet.cssText=r;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}var v=null,d=0;function y(t,e){var n,r,s;if(e.singleton){var i=d++;n=v||(v=u(e)),r=l.bind(null,n,i,!1),s=l.bind(null,n,i,!0)}else n=u(e),r=f.bind(null,n,e),s=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else s()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=s());var n=p(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var r=0;r<n.length;r++){var s=a(n[r]);o[s].references--}for(var i=p(t,e),u=0;u<n.length;u++){var h=a(n[u]);0===o[h].references&&(o[h].updater(),o.splice(h,1))}n=i}}}},function(t,e,n){(e=n(6)(!1)).push([t.i,'html *{font-family:"Courier New" !important;font-size:11 px !important}h1{text-align:center}.col{display:inline}.container{margin:1em auto}.center-container{display:flex;justify-content:center;flex-direction:column;align-items:center}\n',""]),t.exports=e},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var s=(o=r,a=btoa(unescape(encodeURIComponent(JSON.stringify(o)))),p="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),"/*# ".concat(p," */")),i=r.sources.map((function(t){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(t," */")}));return[n].concat(i).concat([s]).join("\n")}var o,a,p;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(n,"}"):n})).join("")},e.i=function(t,n,r){"string"==typeof t&&(t=[[null,t,""]]);var s={};if(r)for(var i=0;i<this.length;i++){var o=this[i][0];null!=o&&(s[o]=!0)}for(var a=0;a<t.length;a++){var p=[].concat(t[a]);r&&s[p[0]]||(n&&(p[2]?p[2]="".concat(n," and ").concat(p[2]):p[2]=n),e.push(p))}},e}},function(t,e,n){"use strict";n.r(e);var r="INUMBER",s="IVAR",i="IEXPR";function o(t,e){this.type=t,this.value=null!=e?e:0}function a(t){return new o("IOP1",t)}function p(t){return new o("IOP2",t)}function u(t){return new o("IOP3",t)}function h(t,e,n){var o,a,p,u,v,d,y=[];if(l(t))return f(t,n);for(var m=t.length,x=0;x<m;x++){var g=t[x],w=g.type;if(w===r||"IVARNAME"===w)y.push(g.value);else if("IOP2"===w)a=y.pop(),o=y.pop(),"and"===g.value?y.push(!!o&&!!h(a,e,n)):"or"===g.value?y.push(!!o||!!h(a,e,n)):"="===g.value?(u=e.binaryOps[g.value],y.push(u(o,h(a,e,n),n))):(u=e.binaryOps[g.value],y.push(u(f(o,n),f(a,n))));else if("IOP3"===w)p=y.pop(),a=y.pop(),o=y.pop(),"?"===g.value?y.push(h(o?a:p,e,n)):(u=e.ternaryOps[g.value],y.push(u(f(o,n),f(a,n),f(p,n))));else if(w===s)if(g.value in e.functions)y.push(e.functions[g.value]);else if(g.value in e.unaryOps&&e.parser.isOperatorEnabled(g.value))y.push(e.unaryOps[g.value]);else{var E=n[g.value];if(void 0===E)throw new Error("undefined variable: "+g.value);y.push(E)}else if("IOP1"===w)o=y.pop(),u=e.unaryOps[g.value],y.push(u(f(o,n)));else if("IFUNCALL"===w){for(d=g.value,v=[];d-- >0;)v.unshift(f(y.pop(),n));if(!(u=y.pop()).apply||!u.call)throw new Error(u+" is not a function");y.push(u.apply(void 0,v))}else if("IFUNDEF"===w)y.push(function(){for(var t=y.pop(),r=[],s=g.value;s-- >0;)r.unshift(y.pop());var i=y.pop(),o=function(){for(var s=Object.assign({},n),i=0,o=r.length;i<o;i++)s[r[i]]=arguments[i];return h(t,e,s)};return Object.defineProperty(o,"name",{value:i,writable:!1}),n[i]=o,o}());else if(w===i)y.push(c(g,e));else if("IEXPREVAL"===w)y.push(g);else if("IMEMBER"===w)o=y.pop(),y.push(o[g.value]);else if("IENDSTATEMENT"===w)y.pop();else{if("IARRAY"!==w)throw new Error("invalid Expression");for(d=g.value,v=[];d-- >0;)v.unshift(y.pop());y.push(v)}}if(y.length>1)throw new Error("invalid Expression (parity)");return 0===y[0]?0:f(y[0],n)}function c(t,e,n){return l(t)?t:{type:"IEXPREVAL",value:function(n){return h(t.value,e,n)}}}function l(t){return t&&"IEXPREVAL"===t.type}function f(t,e){return l(t)?t.value(e):t}function v(t,e){for(var n,o,a,p,u,h,c=[],l=0;l<t.length;l++){var f=t[l],y=f.type;if(y===r)"number"==typeof f.value&&f.value<0?c.push("("+f.value+")"):Array.isArray(f.value)?c.push("["+f.value.map(d).join(", ")+"]"):c.push(d(f.value));else if("IOP2"===y)o=c.pop(),n=c.pop(),p=f.value,e?"^"===p?c.push("Math.pow("+n+", "+o+")"):"and"===p?c.push("(!!"+n+" && !!"+o+")"):"or"===p?c.push("(!!"+n+" || !!"+o+")"):"||"===p?c.push("(function(a,b){ return Array.isArray(a) && Array.isArray(b) ? a.concat(b) : String(a) + String(b); }(("+n+"),("+o+")))"):"=="===p?c.push("("+n+" === "+o+")"):"!="===p?c.push("("+n+" !== "+o+")"):"["===p?c.push(n+"[("+o+") | 0]"):c.push("("+n+" "+p+" "+o+")"):"["===p?c.push(n+"["+o+"]"):c.push("("+n+" "+p+" "+o+")");else if("IOP3"===y){if(a=c.pop(),o=c.pop(),n=c.pop(),"?"!==(p=f.value))throw new Error("invalid Expression");c.push("("+n+" ? "+o+" : "+a+")")}else if(y===s||"IVARNAME"===y)c.push(f.value);else if("IOP1"===y)n=c.pop(),"-"===(p=f.value)||"+"===p?c.push("("+p+n+")"):e?"not"===p?c.push("(!"+n+")"):"!"===p?c.push("fac("+n+")"):c.push(p+"("+n+")"):"!"===p?c.push("("+n+"!)"):c.push("("+p+" "+n+")");else if("IFUNCALL"===y){for(h=f.value,u=[];h-- >0;)u.unshift(c.pop());p=c.pop(),c.push(p+"("+u.join(", ")+")")}else if("IFUNDEF"===y){for(o=c.pop(),h=f.value,u=[];h-- >0;)u.unshift(c.pop());n=c.pop(),e?c.push("("+n+" = function("+u.join(", ")+") { return "+o+" })"):c.push("("+n+"("+u.join(", ")+") = "+o+")")}else if("IMEMBER"===y)n=c.pop(),c.push(n+"."+f.value);else if("IARRAY"===y){for(h=f.value,u=[];h-- >0;)u.unshift(c.pop());c.push("["+u.join(", ")+"]")}else if(y===i)c.push("("+v(f.value,e)+")");else if("IENDSTATEMENT"!==y)throw new Error("invalid Expression")}return c.length>1&&(c=e?[c.join(",")]:[c.join(";")]),String(c[0])}function d(t){return"string"==typeof t?JSON.stringify(t).replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029"):t}function y(t,e){for(var n=0;n<t.length;n++)if(t[n]===e)return!0;return!1}function m(t,e,n){for(var r=!!(n=n||{}).withMembers,o=null,a=0;a<t.length;a++){var p=t[a];p.type===s||"IVARNAME"===p.type?r||y(e,p.value)?null!==o?(y(e,o)||e.push(o),o=p.value):o=p.value:e.push(p.value):"IMEMBER"===p.type&&r&&null!==o?o+="."+p.value:p.type===i?m(p.value,e,n):null!==o&&(y(e,o)||e.push(o),o=null)}null===o||y(e,o)||e.push(o)}function x(t,e){this.tokens=t,this.parser=e,this.unaryOps=e.unaryOps,this.binaryOps=e.binaryOps,this.ternaryOps=e.ternaryOps,this.functions=e.functions}o.prototype.toString=function(){switch(this.type){case r:case"IOP1":case"IOP2":case"IOP3":case s:case"IVARNAME":case"IENDSTATEMENT":return this.value;case"IFUNCALL":return"CALL "+this.value;case"IFUNDEF":return"DEF "+this.value;case"IARRAY":return"ARRAY "+this.value;case"IMEMBER":return"."+this.value;default:return"Invalid Instruction"}},x.prototype.simplify=function(t){return t=t||{},new x(function t(e,n,a,p,u){for(var h,c,l,f,v=[],d=[],y=0;y<e.length;y++){var m=e[y],x=m.type;if(x===r||"IVARNAME"===x)Array.isArray(m.value)?v.push.apply(v,t(m.value.map((function(t){return new o(r,t)})).concat(new o("IARRAY",m.value.length)),n,a,p,u)):v.push(m);else if(x===s&&u.hasOwnProperty(m.value))m=new o(r,u[m.value]),v.push(m);else if("IOP2"===x&&v.length>1)c=v.pop(),h=v.pop(),f=a[m.value],m=new o(r,f(h.value,c.value)),v.push(m);else if("IOP3"===x&&v.length>2)l=v.pop(),c=v.pop(),h=v.pop(),"?"===m.value?v.push(h.value?c.value:l.value):(f=p[m.value],m=new o(r,f(h.value,c.value,l.value)),v.push(m));else if("IOP1"===x&&v.length>0)h=v.pop(),f=n[m.value],m=new o(r,f(h.value)),v.push(m);else if(x===i){for(;v.length>0;)d.push(v.shift());d.push(new o(i,t(m.value,n,a,p,u)))}else if("IMEMBER"===x&&v.length>0)h=v.pop(),v.push(new o(r,h.value[m.value]));else{for(;v.length>0;)d.push(v.shift());d.push(m)}}for(;v.length>0;)d.push(v.shift());return d}(this.tokens,this.unaryOps,this.binaryOps,this.ternaryOps,t),this.parser)},x.prototype.substitute=function(t,e){return e instanceof x||(e=this.parser.parse(String(e))),new x(function t(e,n,r){for(var h=[],c=0;c<e.length;c++){var l=e[c],f=l.type;if(f===s&&l.value===n)for(var v=0;v<r.tokens.length;v++){var d,y=r.tokens[v];d="IOP1"===y.type?a(y.value):"IOP2"===y.type?p(y.value):"IOP3"===y.type?u(y.value):new o(y.type,y.value),h.push(d)}else f===i?h.push(new o(i,t(l.value,n,r))):h.push(l)}return h}(this.tokens,t,e),this.parser)},x.prototype.evaluate=function(t){return t=t||{},h(this.tokens,this,t)},x.prototype.toString=function(){return v(this.tokens,!1)},x.prototype.symbols=function(t){t=t||{};var e=[];return m(this.tokens,e,t),e},x.prototype.variables=function(t){t=t||{};var e=[];m(this.tokens,e,t);var n=this.functions;return e.filter((function(t){return!(t in n)}))},x.prototype.toJSFunction=function(t,e){var n=this,r=new Function(t,"with(this.functions) with (this.ternaryOps) with (this.binaryOps) with (this.unaryOps) { return "+v(this.simplify(e).tokens,!0)+"; }");return function(){return r.apply(n,arguments)}};var g="TOP",w="TPAREN";function E(t,e,n){this.type=t,this.value=e,this.index=n}function b(t,e){this.pos=0,this.current=null,this.unaryOps=t.unaryOps,this.binaryOps=t.binaryOps,this.ternaryOps=t.ternaryOps,this.consts=t.consts,this.expression=e,this.savedPosition=0,this.savedCurrent=null,this.options=t.options,this.parser=t}E.prototype.toString=function(){return this.type+": "+this.value},b.prototype.newToken=function(t,e,n){return new E(t,e,null!=n?n:this.pos)},b.prototype.save=function(){this.savedPosition=this.pos,this.savedCurrent=this.current},b.prototype.restore=function(){this.pos=this.savedPosition,this.current=this.savedCurrent},b.prototype.next=function(){return this.pos>=this.expression.length?this.newToken("TEOF","EOF"):this.isWhitespace()||this.isComment()?this.next():this.isRadixInteger()||this.isNumber()||this.isOperator()||this.isString()||this.isParen()||this.isBracket()||this.isComma()||this.isSemicolon()||this.isNamedOp()||this.isConst()||this.isName()?this.current:void this.parseError('Unknown character "'+this.expression.charAt(this.pos)+'"')},b.prototype.isString=function(){var t=!1,e=this.pos,n=this.expression.charAt(e);if("'"===n||'"'===n)for(var r=this.expression.indexOf(n,e+1);r>=0&&this.pos<this.expression.length;){if(this.pos=r+1,"\\"!==this.expression.charAt(r-1)){var s=this.expression.substring(e+1,r);this.current=this.newToken("TSTRING",this.unescape(s),e),t=!0;break}r=this.expression.indexOf(n,r+1)}return t},b.prototype.isParen=function(){var t=this.expression.charAt(this.pos);return("("===t||")"===t)&&(this.current=this.newToken(w,t),this.pos++,!0)},b.prototype.isBracket=function(){var t=this.expression.charAt(this.pos);return!("["!==t&&"]"!==t||!this.isOperatorEnabled("["))&&(this.current=this.newToken("TBRACKET",t),this.pos++,!0)},b.prototype.isComma=function(){return","===this.expression.charAt(this.pos)&&(this.current=this.newToken("TCOMMA",","),this.pos++,!0)},b.prototype.isSemicolon=function(){return";"===this.expression.charAt(this.pos)&&(this.current=this.newToken("TSEMICOLON",";"),this.pos++,!0)},b.prototype.isConst=function(){for(var t=this.pos,e=t;e<this.expression.length;e++){var n=this.expression.charAt(e);if(n.toUpperCase()===n.toLowerCase()&&(e===this.pos||"_"!==n&&"."!==n&&(n<"0"||n>"9")))break}if(e>t){var r=this.expression.substring(t,e);if(r in this.consts)return this.current=this.newToken("TNUMBER",this.consts[r]),this.pos+=r.length,!0}return!1},b.prototype.isNamedOp=function(){for(var t=this.pos,e=t;e<this.expression.length;e++){var n=this.expression.charAt(e);if(n.toUpperCase()===n.toLowerCase()&&(e===this.pos||"_"!==n&&(n<"0"||n>"9")))break}if(e>t){var r=this.expression.substring(t,e);if(this.isOperatorEnabled(r)&&(r in this.binaryOps||r in this.unaryOps||r in this.ternaryOps))return this.current=this.newToken(g,r),this.pos+=r.length,!0}return!1},b.prototype.isName=function(){for(var t=this.pos,e=t,n=!1;e<this.expression.length;e++){var r=this.expression.charAt(e);if(r.toUpperCase()===r.toLowerCase()){if(e===this.pos&&("$"===r||"_"===r)){"_"===r&&(n=!0);continue}if(e===this.pos||!n||"_"!==r&&(r<"0"||r>"9"))break}else n=!0}if(n){var s=this.expression.substring(t,e);return this.current=this.newToken("TNAME",s),this.pos+=s.length,!0}return!1},b.prototype.isWhitespace=function(){for(var t=!1,e=this.expression.charAt(this.pos);!(" "!==e&&"\t"!==e&&"\n"!==e&&"\r"!==e||(t=!0,this.pos++,this.pos>=this.expression.length));)e=this.expression.charAt(this.pos);return t};var M=/^[0-9a-f]{4}$/i;function A(t,e,n){this.parser=t,this.tokens=e,this.current=null,this.nextToken=null,this.next(),this.savedCurrent=null,this.savedNextToken=null,this.allowMemberAccess=!1!==n.allowMemberAccess}b.prototype.unescape=function(t){var e=t.indexOf("\\");if(e<0)return t;for(var n=t.substring(0,e);e>=0;){var r=t.charAt(++e);switch(r){case"'":n+="'";break;case'"':n+='"';break;case"\\":n+="\\";break;case"/":n+="/";break;case"b":n+="\b";break;case"f":n+="\f";break;case"n":n+="\n";break;case"r":n+="\r";break;case"t":n+="\t";break;case"u":var s=t.substring(e+1,e+5);M.test(s)||this.parseError("Illegal escape sequence: \\u"+s),n+=String.fromCharCode(parseInt(s,16)),e+=4;break;default:throw this.parseError('Illegal escape sequence: "\\'+r+'"')}++e;var i=t.indexOf("\\",e);n+=t.substring(e,i<0?t.length:i),e=i}return n},b.prototype.isComment=function(){return"/"===this.expression.charAt(this.pos)&&"*"===this.expression.charAt(this.pos+1)&&(this.pos=this.expression.indexOf("*/",this.pos)+2,1===this.pos&&(this.pos=this.expression.length),!0)},b.prototype.isRadixInteger=function(){var t,e,n=this.pos;if(n>=this.expression.length-2||"0"!==this.expression.charAt(n))return!1;if(++n,"x"===this.expression.charAt(n))t=16,e=/^[0-9a-f]$/i,++n;else{if("b"!==this.expression.charAt(n))return!1;t=2,e=/^[01]$/i,++n}for(var r=!1,s=n;n<this.expression.length;){var i=this.expression.charAt(n);if(!e.test(i))break;n++,r=!0}return r&&(this.current=this.newToken("TNUMBER",parseInt(this.expression.substring(s,n),t)),this.pos=n),r},b.prototype.isNumber=function(){for(var t,e=!1,n=this.pos,r=n,s=n,i=!1,o=!1;n<this.expression.length&&((t=this.expression.charAt(n))>="0"&&t<="9"||!i&&"."===t);)"."===t?i=!0:o=!0,n++,e=o;if(e&&(s=n),"e"===t||"E"===t){n++;for(var a=!0,p=!1;n<this.expression.length;){if(t=this.expression.charAt(n),!a||"+"!==t&&"-"!==t){if(!(t>="0"&&t<="9"))break;p=!0,a=!1}else a=!1;n++}p||(n=s)}return e?(this.current=this.newToken("TNUMBER",parseFloat(this.expression.substring(r,n))),this.pos=n):this.pos=s,e},b.prototype.isOperator=function(){var t=this.pos,e=this.expression.charAt(this.pos);if("+"===e||"-"===e||"*"===e||"/"===e||"%"===e||"^"===e||"?"===e||":"===e||"."===e)this.current=this.newToken(g,e);else if("∙"===e||"•"===e)this.current=this.newToken(g,"*");else if(">"===e)"="===this.expression.charAt(this.pos+1)?(this.current=this.newToken(g,">="),this.pos++):this.current=this.newToken(g,">");else if("<"===e)"="===this.expression.charAt(this.pos+1)?(this.current=this.newToken(g,"<="),this.pos++):this.current=this.newToken(g,"<");else if("|"===e){if("|"!==this.expression.charAt(this.pos+1))return!1;this.current=this.newToken(g,"||"),this.pos++}else if("="===e)"="===this.expression.charAt(this.pos+1)?(this.current=this.newToken(g,"=="),this.pos++):this.current=this.newToken(g,e);else{if("!"!==e)return!1;"="===this.expression.charAt(this.pos+1)?(this.current=this.newToken(g,"!="),this.pos++):this.current=this.newToken(g,e)}return this.pos++,!!this.isOperatorEnabled(this.current.value)||(this.pos=t,!1)},b.prototype.isOperatorEnabled=function(t){return this.parser.isOperatorEnabled(t)},b.prototype.getCoordinates=function(){var t,e=0,n=-1;do{e++,t=this.pos-n,n=this.expression.indexOf("\n",n+1)}while(n>=0&&n<this.pos);return{line:e,column:t}},b.prototype.parseError=function(t){var e=this.getCoordinates();throw new Error("parse error ["+e.line+":"+e.column+"]: "+t)},A.prototype.next=function(){return this.current=this.nextToken,this.nextToken=this.tokens.next()},A.prototype.tokenMatches=function(t,e){return void 0===e||(Array.isArray(e)?y(e,t.value):"function"==typeof e?e(t):t.value===e)},A.prototype.save=function(){this.savedCurrent=this.current,this.savedNextToken=this.nextToken,this.tokens.save()},A.prototype.restore=function(){this.tokens.restore(),this.current=this.savedCurrent,this.nextToken=this.savedNextToken},A.prototype.accept=function(t,e){return!(this.nextToken.type!==t||!this.tokenMatches(this.nextToken,e))&&(this.next(),!0)},A.prototype.expect=function(t,e){if(!this.accept(t,e)){var n=this.tokens.getCoordinates();throw new Error("parse error ["+n.line+":"+n.column+"]: Expected "+(e||t))}},A.prototype.parseAtom=function(t){var e=this.tokens.unaryOps;if(this.accept("TNAME")||this.accept(g,(function(t){return t.value in e})))t.push(new o(s,this.current.value));else if(this.accept("TNUMBER"))t.push(new o(r,this.current.value));else if(this.accept("TSTRING"))t.push(new o(r,this.current.value));else if(this.accept(w,"("))this.parseExpression(t),this.expect(w,")");else{if(!this.accept("TBRACKET","["))throw new Error("unexpected "+this.nextToken);if(this.accept("TBRACKET","]"))t.push(new o("IARRAY",0));else{var n=this.parseArrayList(t);t.push(new o("IARRAY",n))}}},A.prototype.parseExpression=function(t){var e=[];this.parseUntilEndStatement(t,e)||(this.parseVariableAssignmentExpression(e),this.parseUntilEndStatement(t,e)||this.pushExpression(t,e))},A.prototype.pushExpression=function(t,e){for(var n=0,r=e.length;n<r;n++)t.push(e[n])},A.prototype.parseUntilEndStatement=function(t,e){return!!this.accept("TSEMICOLON")&&(!this.nextToken||"TEOF"===this.nextToken.type||this.nextToken.type===w&&")"===this.nextToken.value||e.push(new o("IENDSTATEMENT")),"TEOF"!==this.nextToken.type&&this.parseExpression(e),t.push(new o(i,e)),!0)},A.prototype.parseArrayList=function(t){for(var e=0;!this.accept("TBRACKET","]");)for(this.parseExpression(t),++e;this.accept("TCOMMA");)this.parseExpression(t),++e;return e},A.prototype.parseVariableAssignmentExpression=function(t){for(this.parseConditionalExpression(t);this.accept(g,"=");){var e=t.pop(),n=[],r=t.length-1;if("IFUNCALL"!==e.type){if(e.type!==s&&"IMEMBER"!==e.type)throw new Error("expected variable for assignment");this.parseVariableAssignmentExpression(n),t.push(new o("IVARNAME",e.value)),t.push(new o(i,n)),t.push(p("="))}else{if(!this.tokens.isOperatorEnabled("()="))throw new Error("function definition is not permitted");for(var a=0,u=e.value+1;a<u;a++){var h=r-a;t[h].type===s&&(t[h]=new o("IVARNAME",t[h].value))}this.parseVariableAssignmentExpression(n),t.push(new o(i,n)),t.push(new o("IFUNDEF",e.value))}}},A.prototype.parseConditionalExpression=function(t){for(this.parseOrExpression(t);this.accept(g,"?");){var e=[],n=[];this.parseConditionalExpression(e),this.expect(g,":"),this.parseConditionalExpression(n),t.push(new o(i,e)),t.push(new o(i,n)),t.push(u("?"))}},A.prototype.parseOrExpression=function(t){for(this.parseAndExpression(t);this.accept(g,"or");){var e=[];this.parseAndExpression(e),t.push(new o(i,e)),t.push(p("or"))}},A.prototype.parseAndExpression=function(t){for(this.parseComparison(t);this.accept(g,"and");){var e=[];this.parseComparison(e),t.push(new o(i,e)),t.push(p("and"))}};var O=["==","!=","<","<=",">=",">","in"];A.prototype.parseComparison=function(t){for(this.parseAddSub(t);this.accept(g,O);){var e=this.current;this.parseAddSub(t),t.push(p(e.value))}};var T=["+","-","||"];A.prototype.parseAddSub=function(t){for(this.parseTerm(t);this.accept(g,T);){var e=this.current;this.parseTerm(t),t.push(p(e.value))}};var k=["*","/","%"];function I(t,e){return Number(t)+Number(e)}function N(t,e){return t-e}function C(t,e){return t*e}function S(t,e){return t/e}function R(t,e){return t%e}function P(t,e){return Array.isArray(t)&&Array.isArray(e)?t.concat(e):""+t+e}function F(t,e){return t===e}function L(t,e){return t!==e}function j(t,e){return t>e}function B(t,e){return t<e}function U(t,e){return t>=e}function D(t,e){return t<=e}function V(t,e){return Boolean(t&&e)}function _(t,e){return Boolean(t||e)}function q(t,e){return y(e,t)}function W(t){return(Math.exp(t)-Math.exp(-t))/2}function Y(t){return(Math.exp(t)+Math.exp(-t))/2}function $(t){return t===1/0?1:t===-1/0?-1:(Math.exp(t)-Math.exp(-t))/(Math.exp(t)+Math.exp(-t))}function X(t){return t===-1/0?t:Math.log(t+Math.sqrt(t*t+1))}function J(t){return Math.log(t+Math.sqrt(t*t-1))}function K(t){return Math.log((1+t)/(1-t))/2}function G(t){return Math.log(t)*Math.LOG10E}function H(t){return-t}function z(t){return!t}function Q(t){return t<0?Math.ceil(t):Math.floor(t)}function Z(t){return Math.random()*(t||1)}function tt(t){return nt(t+1)}A.prototype.parseTerm=function(t){for(this.parseFactor(t);this.accept(g,k);){var e=this.current;this.parseFactor(t),t.push(p(e.value))}},A.prototype.parseFactor=function(t){var e=this.tokens.unaryOps;if(this.save(),this.accept(g,(function(t){return t.value in e}))){if("-"!==this.current.value&&"+"!==this.current.value){if(this.nextToken.type===w&&"("===this.nextToken.value)return this.restore(),void this.parseExponential(t);if("TSEMICOLON"===this.nextToken.type||"TCOMMA"===this.nextToken.type||"TEOF"===this.nextToken.type||this.nextToken.type===w&&")"===this.nextToken.value)return this.restore(),void this.parseAtom(t)}var n=this.current;this.parseFactor(t),t.push(a(n.value))}else this.parseExponential(t)},A.prototype.parseExponential=function(t){for(this.parsePostfixExpression(t);this.accept(g,"^");)this.parseFactor(t),t.push(p("^"))},A.prototype.parsePostfixExpression=function(t){for(this.parseFunctionCall(t);this.accept(g,"!");)t.push(a("!"))},A.prototype.parseFunctionCall=function(t){var e=this.tokens.unaryOps;if(this.accept(g,(function(t){return t.value in e}))){var n=this.current;this.parseAtom(t),t.push(a(n.value))}else for(this.parseMemberExpression(t);this.accept(w,"(");)if(this.accept(w,")"))t.push(new o("IFUNCALL",0));else{var r=this.parseArgumentList(t);t.push(new o("IFUNCALL",r))}},A.prototype.parseArgumentList=function(t){for(var e=0;!this.accept(w,")");)for(this.parseExpression(t),++e;this.accept("TCOMMA");)this.parseExpression(t),++e;return e},A.prototype.parseMemberExpression=function(t){for(this.parseAtom(t);this.accept(g,".")||this.accept("TBRACKET","[");){var e=this.current;if("."===e.value){if(!this.allowMemberAccess)throw new Error('unexpected ".", member access is not permitted');this.expect("TNAME"),t.push(new o("IMEMBER",this.current.value))}else{if("["!==e.value)throw new Error("unexpected symbol: "+e.value);if(!this.tokens.isOperatorEnabled("["))throw new Error('unexpected "[]", arrays are disabled');this.parseExpression(t),this.expect("TBRACKET","]"),t.push(p("["))}}};var et=[.9999999999999971,57.15623566586292,-59.59796035547549,14.136097974741746,-.4919138160976202,3399464998481189e-20,4652362892704858e-20,-9837447530487956e-20,.0001580887032249125,-.00021026444172410488,.00021743961811521265,-.0001643181065367639,8441822398385275e-20,-26190838401581408e-21,36899182659531625e-22];function nt(t){var e,n;if(function(t){return isFinite(t)&&t===Math.round(t)}(t)){if(t<=0)return isFinite(t)?1/0:NaN;if(t>171)return 1/0;for(var r=t-2,s=t-1;r>1;)s*=r,r--;return 0===s&&(s=1),s}if(t<.5)return Math.PI/(Math.sin(Math.PI*t)*nt(1-t));if(t>=171.35)return 1/0;if(t>85){var i=t*t,o=i*t,a=o*t,p=a*t;return Math.sqrt(2*Math.PI/t)*Math.pow(t/Math.E,t)*(1+1/(12*t)+1/(288*i)-139/(51840*o)-571/(2488320*a)+163879/(209018880*p)+5246819/(75246796800*p*t))}--t,n=et[0];for(var u=1;u<et.length;++u)n+=et[u]/(t+u);return e=t+4.7421875+.5,Math.sqrt(2*Math.PI)*Math.pow(e,t+.5)*Math.exp(-e)*n}function rt(t){return Array.isArray(t)?t.length:String(t).length}function st(){for(var t=0,e=0,n=0;n<arguments.length;n++){var r,s=Math.abs(arguments[n]);e<s?(t=t*(r=e/s)*r+1,e=s):t+=s>0?(r=s/e)*r:s}return e===1/0?1/0:e*Math.sqrt(t)}function it(t,e,n){return t?e:n}function ot(t,e){return void 0===e||0==+e?Math.round(t):(t=+t,e=-+e,isNaN(t)||"number"!=typeof e||e%1!=0?NaN:(t=t.toString().split("e"),+((t=(t=Math.round(+(t[0]+"e"+(t[1]?+t[1]-e:-e)))).toString().split("e"))[0]+"e"+(t[1]?+t[1]+e:e))))}function at(t,e,n){return n&&(n[t]=e),e}function pt(t,e){return t[0|e]}function ut(t){return 1===arguments.length&&Array.isArray(t)?Math.max.apply(Math,t):Math.max.apply(Math,arguments)}function ht(t){return 1===arguments.length&&Array.isArray(t)?Math.min.apply(Math,t):Math.min.apply(Math,arguments)}function ct(t,e){if("function"!=typeof t)throw new Error("First argument to map is not a function");if(!Array.isArray(e))throw new Error("Second argument to map is not an array");return e.map((function(e,n){return t(e,n)}))}function lt(t,e,n){if("function"!=typeof t)throw new Error("First argument to fold is not a function");if(!Array.isArray(n))throw new Error("Second argument to fold is not an array");return n.reduce((function(e,n,r){return t(e,n,r)}),e)}function ft(t,e){if("function"!=typeof t)throw new Error("First argument to filter is not a function");if(!Array.isArray(e))throw new Error("Second argument to filter is not an array");return e.filter((function(e,n){return t(e,n)}))}function vt(t,e){if(!Array.isArray(e)&&"string"!=typeof e)throw new Error("Second argument to indexOf is not a string or array");return e.indexOf(t)}function dt(t,e){if(!Array.isArray(e))throw new Error("Second argument to join is not an array");return e.join(t)}function yt(t){return(t>0)-(t<0)||+t}function mt(t){return t<0?-Math.pow(-t,1/3):Math.pow(t,1/3)}function xt(t){return Math.exp(t)-1}function gt(t){return Math.log(1+t)}function wt(t){return Math.log(t)/Math.LN2}function Et(t){this.options=t||{},this.unaryOps={sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,sinh:Math.sinh||W,cosh:Math.cosh||Y,tanh:Math.tanh||$,asinh:Math.asinh||X,acosh:Math.acosh||J,atanh:Math.atanh||K,sqrt:Math.sqrt,cbrt:Math.cbrt||mt,log:Math.log,log2:Math.log2||wt,ln:Math.log,lg:Math.log10||G,log10:Math.log10||G,expm1:Math.expm1||xt,log1p:Math.log1p||gt,abs:Math.abs,ceil:Math.ceil,floor:Math.floor,round:Math.round,trunc:Math.trunc||Q,"-":H,"+":Number,exp:Math.exp,not:z,length:rt,"!":tt,sign:Math.sign||yt},this.binaryOps={"+":I,"-":N,"*":C,"/":S,"%":R,"^":Math.pow,"||":P,"==":F,"!=":L,">":j,"<":B,">=":U,"<=":D,and:V,or:_,in:q,"=":at,"[":pt},this.ternaryOps={"?":it},this.functions={random:Z,fac:tt,min:ht,max:ut,hypot:Math.hypot||st,pyt:Math.hypot||st,pow:Math.pow,atan2:Math.atan2,if:it,gamma:nt,roundTo:ot,map:ct,fold:lt,filter:ft,indexOf:vt,join:dt},this.consts={E:Math.E,PI:Math.PI,true:!0,false:!1}}Et.prototype.parse=function(t){var e=[],n=new A(this,new b(this,t),{allowMemberAccess:this.options.allowMemberAccess});return n.parseExpression(e),n.expect("TEOF","EOF"),new x(e,this)},Et.prototype.evaluate=function(t,e){return this.parse(t).evaluate(e)};var bt=new Et;Et.parse=function(t){return bt.parse(t)},Et.evaluate=function(t,e){return bt.parse(t).evaluate(e)};var Mt={"+":"add","-":"subtract","*":"multiply","/":"divide","%":"remainder","^":"power","!":"factorial","<":"comparison",">":"comparison","<=":"comparison",">=":"comparison","==":"comparison","!=":"comparison","||":"concatenate",and:"logical",or:"logical",not:"logical","?":"conditional",":":"conditional","=":"assignment","[":"array","()=":"fndef"};Et.prototype.isOperatorEnabled=function(t){var e=function(t){return Mt.hasOwnProperty(t)?Mt[t]:t}(t),n=this.options.operators||{};return!(e in n)||!!n[e]};
/*!
 Based on ndef.parser, by Raphael Graf(r@undefined.ch)
 http://www.undefined.ch/mparser/index.html

 Ported to JavaScript and modified by Matthew Crumley (email@matthewcrumley.com, http://silentmatt.com/)

 You are free to use and modify this code in anyway you find useful. Please leave this comment in the code
 to acknowledge its original source. If you feel like it, I enjoy hearing about projects that use my code,
 but don't feel like you have to let me know or ask permission.
*/
var At=new Et;document.getElementById("add-people-form").addEventListener("submit",(function(t){var e,n=document.getElementById("add-people-form-initial-score");try{e=At.parse(n.value).evaluate({})}catch(e){return alert("unable to parse the value"),void t.preventDefault()}if(e>199)return alert("not > 199 though :("),void t.preventDefault();n.value=e})),document.getElementById("point-form").addEventListener("submit",(function(t){for(var e=document.getElementsByClassName("points-input"),n=0,r=Array.from(e);n<r.length;n++){var s=r[n];if(void 0!==s.value&&""!==s.value){console.log(s.value);var i=void 0;try{i=At.parse(s.value).evaluate({})}catch(e){return alert("unable to parse the value"),void t.preventDefault()}if(i>100)return alert("not > 100 though :("),void t.preventDefault();s.value=i}}}))}]);