/*
Copyright 2014, modulex-component@1.0.2
MIT Licensed
build time: Thu, 16 Oct 2014 07:25:59 GMT
*/
modulex.add("component/extension/content-box", [], function(require, exports, module) {

/*
combined modules:
component/extension/content-box
component/extension/content-box/xtpl/view-render
*/
var componentExtensionContentBoxXtplViewRender, componentExtensionContentBox;
componentExtensionContentBoxXtplViewRender = undefined;
componentExtensionContentBox = function (exports) {
  function shortcut(self) {
    var contentEl = self.get('contentEl');
    self.$contentEl = self.$contentEl = contentEl;
    self.contentEl = self.contentEl = contentEl && contentEl[0];
  }
  var contentTpl = componentExtensionContentBoxXtplViewRender;
  function ContentBox() {
  }
  ContentBox.prototype = {
    __createDom: function () {
      shortcut(this);
    },
    __decorateDom: function () {
      shortcut(this);
    },
    getChildrenContainerEl: function () {
      return this.get('contentEl');
    },
    _onSetContent: function (v) {
      var contentEl = this.$contentEl;
      contentEl.html(v);
      if (!this.get('allowTextSelection')) {
        contentEl.unselectable();
      }
    }
  };
  ContentBox.ATTRS = {
    contentTpl: { value: contentTpl },
    contentEl: {
      selector: function () {
        return '.' + this.getBaseCssClass('content');
      }
    },
    content: {
      parse: function () {
        return this.get('contentEl').html();
      }
    }
  };
  exports = ContentBox;
  return exports;
}();
module.exports = componentExtensionContentBox;
});