/**
 * component tc
 * @author yiminghe@gmail.com
 */

var Control = require('component/control');
var Container = require('component/container');
var $ = require('node');

/*jshint quotmark:false*/
function invalidNode(n) {
    return n == null || n.nodeType === 11;
}

describe('container', function () {
    it('support dom node', function () {
        var control = new Control({
            content: 'control'
        });
        var a,b;
        var container = new Container({
            render: 'body',
            children: [a=$('<div>dom1</div>'), control, b=$('<div>dom3</div>')]
        });
        container.render();
        var containerChildren = container.get('children');
        expect(containerChildren.length).to.be(3);
        expect(containerChildren[0]).to.be(a);
        expect(containerChildren[2]).to.be(b);
        var children = container.$el.children();
        expect(children.length).to.be(3);
        expect(children[0]).to.be(a[0]);
        expect(children[2]).to.be(b[0]);
        container.destroy();
        expect(container.get('children').length).to.be(0);
        children = container.$el.children();
        expect(children.length).to.be(0);
    });

    describe('container.destroy', function () {
        it('will remove node by default', function () {
            var my = new Container({
                children: [
                    new Control({
                        content: '1'
                    }),
                    new Control({
                        content: '2'
                    })
                ]
            }).render();
            expect(my.$el.text()).to.be('12');
            my.destroy();
            expect(my.$el.html()).to.be('');
            expect(invalidNode(my.el.parentNode)).to.be(true);
        });

        it('can keep node', function () {
            var my = new Container({
                children: [
                    new Control({
                        content: '1'
                    }),
                    new Control({
                        content: '2'
                    })
                ]
            }).render();
            my.destroy(false);
            expect(my.$el.text()).to.be('12');
            expect(invalidNode(my.el.parentNode)).to.be(false);
        });
    });

    describe('addChild/removeChild event', function () {
        it('can listen and preventDefault', function () {
            var c = new Container({
                content: "xx"
            });

            var child = new Container({
                content: "yy"
            });

            (function () {
                var beforeCalled = 0,
                    afterCalled = 0;

                c.on('beforeAddChild', {
                    fn: function (e) {
                        expect(e.component).to.be(child);
                        expect(e.index).to.be(0);
                        e.preventDefault();
                        beforeCalled = 1;
                    },
                    once: 1
                });

                c.on('afterAddChild', {
                    fn: function () {
                        afterCalled = 1;
                    },
                    once: 1
                });

                c.addChild(child);

                expect(beforeCalled).to.be(1);
                expect(afterCalled).to.be(0);
                expect(c.get('children').length).to.be(0);

                beforeCalled = 0;
                afterCalled = 0;

                c.on('beforeAddChild', {
                    fn: function (e) {
                        expect(e.component).to.be(child);
                        expect(e.index).to.be(0);
                        beforeCalled = 1;
                    },
                    once: 1
                });

                c.on('afterAddChild', {
                    fn: function (e) {
                        expect(e.component).to.be(child);
                        expect(e.index).to.be(0);
                        afterCalled = 1;
                    },
                    once: 1
                });

                c.addChild(child);

                expect(beforeCalled).to.be(1);
                expect(afterCalled).to.be(1);
                expect(c.get('children').length).to.be(1);
                expect(c.get('children')[0]).to.be(child);
            })();

            (function () {
                var beforeCalled = 0,
                    afterCalled = 0;

                c.on('beforeRemoveChild', {
                    fn: function (e) {
                        expect(e.component).to.be(child);
                        expect(e.index).to.be(0);
                        e.preventDefault();
                        beforeCalled = 1;
                    },
                    once: 1
                });

                c.on('afterRemoveChild', {
                    fn: function () {
                        afterCalled = 1;
                    },
                    once: 1
                });

                c.removeChild(child);

                expect(beforeCalled).to.be(1);
                expect(afterCalled).to.be(0);
                expect(c.get('children').length).to.be(1);
                expect(c.get('children')[0]).to.be(child);

                beforeCalled = 0;
                afterCalled = 0;

                c.on('beforeRemoveChild', {
                    fn: function (e) {
                        expect(e.component).to.be(child);
                        expect(e.index).to.be(0);
                        beforeCalled = 1;
                    },
                    once: 1
                });

                c.on('afterRemoveChild', {
                    fn: function (e) {
                        expect(e.component).to.be(child);
                        expect(e.index).to.be(0);
                        afterCalled = 1;
                    },
                    once: 1
                });

                c.removeChild(child);

                expect(beforeCalled).to.be(1);
                expect(afterCalled).to.be(1);
                expect(c.get('children').length).to.be(0);
            })();
        });

        it('can bubble', function () {
            var c = new Container({
                content: "xx"
            });

            var child = new Container({
                content: "yy"
            });

            var grandChild = new Container({
                content: "zz"
            });

            c.addChild(child);

            var beforeCalled = 0,
                afterCalled = 0;

            c.on('beforeAddChild', function () {
                beforeCalled++;
            });

            c.on('afterAddChild', function () {
                afterCalled++;
            });

            child.addChild(grandChild);

            expect(beforeCalled).to.be(1);
            expect(afterCalled).to.be(1);
        });
    });

    describe('parent', function () {
        it('parent can be changed', function () {
            var c1 = new Container({
                content: "xx"
            });

            var c2 = new Container({
                content: "xx"
            });

            var child = new Container({
                content: "yy"
            });

            var xxCalledC1, xxCalledC2;
            xxCalledC1 = 0;
            xxCalledC2 = 0;

            c1.on('xx', function () {
                xxCalledC1 = 1;
            });

            c2.on('xx', function () {
                xxCalledC2 = 1;
            });

            expect(c1.get('children').length).to.be(0);
            c1.addChild(child);
            expect(c1.get('children').length).to.be(1);

            child.fire('xx');

            expect(xxCalledC1).to.be(1);
            expect(xxCalledC2).to.be(0);

            xxCalledC1 = 0;
            xxCalledC2 = 0;

            c1.removeChild(child, false);
            c2.addChild(child);
            expect(c1.get('children').length).to.be(0);
            expect(c2.get('children').length).to.be(1);

            child.fire('xx');

            expect(xxCalledC1).to.be(0);
            expect(xxCalledC2).to.be(1);

            expect(c1.get('el')).not.to.be.ok();
        });

        it('parent can be changed after render', function () {
            var c1 = new Container({
                content: "xx"
            }).render();

            var c2 = new Container({
                content: "yy"
            }).render();

            var child = new Container({
                content: "zz"
            }).render();

            var xxCalledC1, xxCalledC2;
            xxCalledC1 = 0;
            xxCalledC2 = 0;

            c1.on('xx', function () {
                xxCalledC1 = 1;
            });

            c2.on('xx', function () {
                xxCalledC2 = 1;
            });

            expect(c1.get('children').length).to.be(0);
            expect(c1.get('el')[0].children.length).to.be(0);
            c1.addChild(child);
            expect(c1.get('children').length).to.be(1);
            expect(c1.get('el')[0].children[0]).to.be(child.get('el')[0]);
            expect(c1.get('el')[0].children.length).to.be(1);


            child.fire('xx');

            expect(xxCalledC1).to.be(1);
            expect(xxCalledC2).to.be(0);

            xxCalledC1 = 0;
            xxCalledC2 = 0;

            c1.removeChild(child, false);
            c2.addChild(child);
            expect(c1.get('children').length).to.be(0);
            expect(c2.get('children').length).to.be(1);
            expect(c1.get('el')[0].children.length).to.be(0);
            expect(c2.get('el')[0].children.length).to.be(1);
            expect(c2.get('el')[0].children[0]).to.be(child.get('el')[0]);

            child.fire('xx');

            expect(xxCalledC1).to.be(0);
            expect(xxCalledC2).to.be(1);

            c1.destroy();
            c2.destroy();
        });
    });

    describe("xclass", function () {
        var A = Container.extend({

        }, {
            ATTRS: {
                defaultChildCfg: {
                    valueFn: function () {
                        return {
                            prefixXClass: 'a-b'
                        };
                    }
                }
            }
        }, {
            xclass: 'a'
        });

        var B = Container.extend({}, {
            xclass: 'a-b'
        });

        var C = B.extend({

        }, {
            xclass: 'a-b-c'
        });

        var D = B.extend({

        }, {
            xclass: 'a-b-d'
        });

        it('only xclass', function () {
            var a = new A({
                children: [
                    {xclass: 'a-b-d'}
                ]
            });
            a.render();
            var children = a.get('children');
            expect(children[0] instanceof D).to.be(true);
        });

        it('only prefixXClass', function () {
            var a = new A({
                children: [
                    {}
                ]
            });
            a.render();
            var children = a.get('children');
            expect(children[0] instanceof B).to.be(true);
        });

        it('prefixXClass + xtype', function () {
            var a = new A({
                children: [
                    {xtype: 'c'}
                ]
            });
            a.render();
            var children = a.get('children');
            expect(children[0] instanceof C).to.be(true);
        });

        it('xclass and prefixXClass + xtype', function () {
            var a = new A({
                children: [
                    {xtype: 'c', xclass: 'a-b-d'}
                ]
            });
            a.render();
            var children = a.get('children');
            expect(children[0] instanceof D).to.be(true);
        });
    });
});