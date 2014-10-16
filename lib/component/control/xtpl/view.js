module.exports = function view(undefined){
var t;
var t0;
var t1;
var t2;
var t3;
var t4;
var t5;
var t6;
var t7;
var t8;
var t9;
var tpl = this;
var root = tpl.root;
var buffer = tpl.buffer;
var scope = tpl.scope;
var runtime = tpl.runtime;
var name = tpl.name;
var pos = tpl.pos;
var data = scope.data;
var affix = scope.affix;
var nativeCommands = root.nativeCommands;
var utils = root.utils;
var callFnUtil = utils["callFn"];
var callCommandUtil = utils["callCommand"];
var rangeCommand = nativeCommands["range"];
var foreachCommand = nativeCommands["foreach"];
var forinCommand = nativeCommands["forin"];
var eachCommand = nativeCommands["each"];
var withCommand = nativeCommands["with"];
var ifCommand = nativeCommands["if"];
var setCommand = nativeCommands["set"];
var includeCommand = nativeCommands["include"];
var parseCommand = nativeCommands["parse"];
var extendCommand = nativeCommands["extend"];
var blockCommand = nativeCommands["block"];
var macroCommand = nativeCommands["macro"];
var debuggerCommand = nativeCommands["debugger"];
function func2(scope, buffer, undefined) {
var data = scope.data;
var affix = scope.affix;
buffer.data += '\r\n ';
pos.line = 4;
var id3 = data;
buffer = buffer.writeEscaped(id3);
buffer.data += '\r\n';
return buffer;
}
function func5(scope, buffer, undefined) {
var data = scope.data;
var affix = scope.affix;
buffer.data += '\r\n ';
pos.line = 9;
var id6 = ((t=(affix.xindex)) !== undefined ? t:((t = data.xindex) !== undefined ? t :scope.resolveLooseUp(["xindex"])));
buffer = buffer.writeEscaped(id6);
buffer.data += '="';
var id7 = data;
buffer = buffer.writeEscaped(id7);
buffer.data += '"\r\n';
return buffer;
}
function func9(scope, buffer, undefined) {
var data = scope.data;
var affix = scope.affix;
buffer.data += '\r\n ';
pos.line = 14;
var id10 = ((t=(affix.xindex)) !== undefined ? t:((t = data.xindex) !== undefined ? t :scope.resolveLooseUp(["xindex"])));
buffer = buffer.writeEscaped(id10);
buffer.data += ':';
var id11 = data;
buffer = buffer.writeEscaped(id11);
buffer.data += ';\r\n';
return buffer;
}


buffer.data += '<div id="';
var id0 = ((t=(affix.id)) !== undefined ? t:((t = data.id) !== undefined ? t :scope.resolveLooseUp(["id"])));
buffer = buffer.writeEscaped(id0);
buffer.data += '"\r\n class="';
pos.line = 2;
var callRet1
callRet1 = callFnUtil(tpl, scope, {escape:1}, buffer, ["getBaseCssClasses"]);
buffer = buffer.writeEscaped(callRet1);
buffer.data += '\r\n';
pos.line = 3;
pos.line = 3;
var id4 = ((t=(affix.elCls)) !== undefined ? t:((t = data.elCls) !== undefined ? t :scope.resolveLooseUp(["elCls"])));
buffer = eachCommand.call(tpl, scope, {params:[id4],fn: func2}, buffer);
buffer.data += '\r\n"\r\n\r\n';
pos.line = 8;
pos.line = 8;
var id8 = ((t=(affix.elAttrs)) !== undefined ? t:((t = data.elAttrs) !== undefined ? t :scope.resolveLooseUp(["elAttrs"])));
buffer = eachCommand.call(tpl, scope, {params:[id8],fn: func5}, buffer);
buffer.data += '\r\n\r\nstyle="\r\n';
pos.line = 13;
pos.line = 13;
var id12 = ((t=(affix.elStyle)) !== undefined ? t:((t = data.elStyle) !== undefined ? t :scope.resolveLooseUp(["elStyle"])));
buffer = eachCommand.call(tpl, scope, {params:[id12],fn: func9}, buffer);
buffer.data += '\r\n">';
return buffer;
};
module.exports.TPL_NAME = module.id || module.name;