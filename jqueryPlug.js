$.extend({ effect: {} });
//滚动
$.effect.marquee = function (el, settings) {
    this.box = el;
    this.cfg = $.extend({
        d: "left", //方向
        s: 30, //速度
        c: 0, //是否复制
        m: 5  //空隙
    }, settings);
    this.vh = { "left": "h", "right": "h" }[this.cfg.d] || "v";
    this.build();
    this.odl, this.odt, this.odd;
    this._timer;
}

$.effect.marquee.prototype = {
    build: function () {
        this.box.css({ overflow: "hidden", width: this.box.width(), height: this.box.height() }); //必须设定外部容器宽高

        var space = { "left": "right", "right": "left", "up": "bottom", "down": "top" }[this.cfg.d];
        this.box.children().wrapAll("<dl><dt>").css("margin-" + space, this.cfg.m + "px");
        $("dl", this.box).append("<dd>");
        this.odl = $("dl", this.box);
        this.odt = $("dt", this.box);
        this.odd = $("dd", this.box);
        if (this.vh == "h") {
            this.odl.css("width", "5000%");
            $("dl,dt,dd", this.box).css("float", "left");
        }
        $("dl,dt,dd", this.box).css({ margin: "0", padding: "0" });
        if (this.cfg.c) { this.odt.append(this.odt.html()); }
        this.odd.html(this.odt.html());
    },
    left: function () {
        if (this.box.scrollLeft() >= this.odd.width()) {
            this.box.scrollLeft(0);
        } else
            this.box.scrollLeft(this.box.scrollLeft() + 1);
        var a = this;
        this._timer = setTimeout(function () {
            a.start("left")
        }, this.cfg.s);
    },
    right: function () {
        this.box.scrollLeft(this.odd.width());
        this.right = function () {
            if (this.box.scrollLeft() <= 0) {
                this.box.scrollLeft(this.odd.width());
            } else
                this.box.scrollLeft(this.box.scrollLeft() - 1);
            var a = this;
            this._timer = setTimeout(function () {
                a.start("right")
            }, this.cfg.s)
        };
        this.start("right")
    },
    up: function () {
        if (this.box.scrollTop() >= this.odd[0].offsetTop) {
            this.box.scrollTop(0);
        } else {
            this.box.scrollTop(this.box.scrollTop() + 1);
        }
        var a = this;
        this._timer = setTimeout(function () {
            a.start("up")
        }, this.cfg.s);
    },
    down: function () {
        this.box.scrollTop(this.odd[0].offsetTop);
        this.down = function () {
            if (this.box.scrollTop() <= 0) {
                this.box.scrollTop(this.odd[0].offsetTop);
            } else
                this.box.scrollTop(this.box.scrollTop() - 1);
            var a = this;
            this._timer = setTimeout(function () {
                a.start("down");
            }, this.cfg.s)
        };
        this.down();
    },
    start: function () {
        var a = this.cfg.d;
        this.start = function () {
            this[a]();
        };
        this.start()
    },
    stop: function () {
        clearTimeout(this._timer);
        this._timer = null
    },
    hover: function () {
        var a = this;
        this.box.mouseover(function () {
            a.stop();
        });
        this.box.mouseout(function () {
            a.start();
        });
    }
}


//ChatOnline
$.effect.chatOnline = function (el, setting) {
    this.box = el;
    this.cfg = $.extend({
        d: "left"
    }, setting);
    this.build();
    this.off;
}

$.effect.chatOnline.prototype = {
    build: function () {
        if (this.cfg.d == 'none') {
            this.box.hide();
        } else {
            var window_w = $(window).width();
            var box = this.box;
            if (window_w > 1000) { box.show(); }
            $(window).scroll(function () {
                var scrollTop = $(window).scrollTop();
                box.stop().animate({ top: scrollTop + 80 });
            });

            var boxcss = '{ top: "80px", position: "absolute", ' + this.cfg.d + ': "6px" }';
            box.css(eval("(" + boxcss + ")"));

            this.off = $("div[chatOnline] > p");
            this.off.css({ "background": "#fff", "cursor": "pointer", "margin": "0", "width": "30px", "height": "20px", "line-height": "20px", "margin": "0 auto", "text-align": "center", "font-size": "13px", "text-decoration": "none" })
            this.off.click(function () {
                $(this).parent().hide();
                return false;
            });
        }
    }
}


//对联
$.effect.duilian = function (el, setting) {
    this.box = el;
    this.cfg = $.extend({
        d: "left"
    }, setting);
    this.build();
    this.off;
}

$.effect.duilian.prototype = {
    build: function () {
        if (this.cfg.d == 'none') {
            this.box.hide();
        } else {
            var window_w = $(window).width();
            var box = this.box;
            if (window_w > 1000) { box.show(); }
            $(window).scroll(function () {
                var scrollTop = $(window).scrollTop();
                box.stop().animate({ top: scrollTop + 190 });
            });

            var boxcss = '{ top: "190px", position: "absolute", ' + this.cfg.d + ': "6px" }';
            box.css(eval("(" + boxcss + ")"));

            this.off = $("div[duilian] > p");
            this.off.css({ "background": "#fff", "cursor": "pointer", "margin": "0", "width": "30px", "height": "20px", "line-height": "20px", "margin": "0 auto", "text-align": "center", "font-size": "13px", "text-decoration": "none" })
            this.off.click(function () {
                $(this).parent().hide();
                return false;
            });
        }
    }
}


//视频浮窗
$.effect.video = function (el, setting) {
    this.box = el;
    this.cfg = $.extend({
        d: "left"
    }, setting);
    this.build();
    this.off;
}

$.effect.video.prototype = {
    build: function () {
        if (this.cfg.d == 'none') {
            this.box.hide();
        } else {
            var box = this.box;
            if ($.browser.msie && $.browser.version == "6.0") {
                //var window_w = $(window).width();
                var window_h = $(window).height();
                //var box_w = this.box.width();
                var box_h = this.box.height();
                $(window).scroll(function () {

                    if ($(window) && $(window).scrollTop()) {
                        var scrollTop = $(window).scrollTop() - 50;
                    } else if ($(document)) {
                        var scrollTop = $(document).scrollTop() - 50;
                    } else { }

                    box.stop().animate({ top: window_h + scrollTop - box_h + "px" });
                });
                var boxcss = '{ bottom:"50px", position: "absolute",' + this.cfg.d + ': "0px" }';

            } else {
                var boxcss = '{ "bottom":"50px", "position": "fixed",' + this.cfg.d + ': "0px"}';
            }
            box.css(eval("(" + boxcss + ")"));

        }
    }
}






//浮动
$.effect.floatad = function (el, setings) {
    this.box = el;
    this.cfg = $.extend({
        top: 0, 	//默认的广告的Y坐标
        left: 0, 	//默认的广告的X坐标
        delay: 30, //延迟
        step: 3,		//默认的广告每次移动的距离(像素)
        close: 0 //默认显示
    }, setings);
    this.interval = null;
    this.xPos = this.cfg.left;
    this.yPos = this.cfg.top;
    this.yon = 0;
    this.xon = 0;
    this.isPause = false;
    this.build();
    this.close;
}

$.effect.floatad.prototype = {
    build: function () {
        var me = this;
        me.box.css("display", "block");
        me.box.css({ position: "absolute", left: me.cfg.left, top: me.cfg.top, overflow: "hidden" })
        me.box.hover(function () { clearInterval(me.interval) }, function () { me.interval = setInterval(function () { me.changePos(); }, me.cfg.delay); });
        this.close = $("div[floatad] > p");
        this.close.css({ "background": "#fff", "width": "30px", "height": "20px", "margin": "0", "cursor": "pointer", "line-height": "20px", "float": "right", "text-align": "center", "font-size": "13px" })
        this.close.click(function () {
            $(this).parent().hide();
            return false
        })
    },
    changePos: function () {
        var me = this;
        var clientWidth = $(window).width();
        var clientHeight = $(window).height();
        var Hoffset = me.box.height();
        var Woffset = me.box.width();
        me.box.css({ left: me.xPos + $(document).scrollLeft(), top: me.yPos + $(document).scrollTop() });
        if (me.yon) {
            me.yPos = me.yPos + me.cfg.step;
        } else {
            me.yPos = me.yPos - me.cfg.step;
        }
        if (me.yPos < 0) { me.yon = 1; me.yPos = 0; }
        if (me.yPos >= (clientHeight - Hoffset)) { me.yon = 0; me.yPos = (clientHeight - Hoffset); }
        if (me.xon) {
            me.xPos = me.xPos + me.cfg.step;
        } else {
            me.xPos = me.xPos - me.cfg.step;
        }
        if (me.xPos < 0) { me.xon = 1; me.xPos = 0; }
        if (me.xPos >= (clientWidth - Woffset)) { me.xon = 0; me.xPos = (clientWidth - Woffset); }
    },
    start: function () {
        var me = this;
        if (me.cfg.close == 1) {
            me.box.hide();
        }
        else {
            me.box.css("top", me.yPos);
            me.interval = setInterval(function () { me.changePos(); }, me.cfg.delay);
        }
    }
}



//轮播
$.effect.lunbo = function (el, settings) {
    this.box = el;
    this.picnum = this.box.children().length;
    this.cfg = $.extend({
        s: 3000, //速度
        f: 1.4   //特效速度
    }, settings);
    this.build();
    this.change_margin();
    this._timer;
}

$.effect.lunbo.prototype = {
    build: function () {

        this.pics = this.box.children();
        this.pics.css("position", "absolute");
    },
    start: function () {


        if (this.pics[0].filters) {
            this.pics.hide();
            var initurl = this.pics.eq(0).attr("src");
            var img = $("<img src='" + initurl + "'/>").prependTo(this.box);
            img.css("filter", "revealTrans()");

            var _this = this;
            var index = 1;

            this._timer=setInterval(function(){
                if (index == _this.picnum) index = 0;
                with (img[0].filters.revealTrans) {
                    Transition = 23; Duration = _this.cfg.f; apply(); play();
                }
                var nImg = _this.pics.eq(index);
                img.attr("src", nImg.attr("src"));
                ++index;
            },_this.cfg.s);
        }
        else {
            this.box.find("img:not(:first-child)").hide();
            var _this = this;
            var i = 1;
            this._timer = setInterval(function () {
                if (i == _this.picnum) i = 0;
                _this.pics.hide();
                _this.pics.eq(i).show();
                ++i;
            }, _this.cfg.s);           
        }
    },
    change_margin: function () {

    	var box_width = this.box.width();
    	var window_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    	if (box_width > window_width) {
    		var size = box_width - window_width;
    		//console.log(size / 2);
    		//debugger;
    		this.box.css('margin-left', '-' + size / 2 + 'px');
    	}

    }
	
}

//初始化
$.effect.init = function () {

    //滚动
    $("div[marquee]").each(function () {
        var p = eval("(" + $(this).attr("marquee") + ")");
        var ef = new $.effect.marquee($(this), p);
        ef.start();
        ef.hover();
    });

    //轮播
    $("div[lunbo]").each(function () {
        var p = eval("(" + $(this).attr("lunbo") + ")");
        var ef = new $.effect.lunbo($(this), p);
        ef.start();
    });

    //对联
    $("div[duilian]").each(function () {
        var p = eval("(" + $(this).attr("duilian") + ")");
        new $.effect.duilian($(this), p);
    });

    //tq-qq-53 对联
    $("div[chatOnline]").each(function () {
        var p = eval("(" + $(this).attr("chatOnline") + ")");
        new $.effect.chatOnline($(this), p);
    });

    //视频浮窗
    $("div[video]").each(function () {
        var p = eval("(" + $(this).attr("video") + ")");
        new $.effect.video($(this),p);
    });

    //漂浮
    $("div[floatad]").each(function () {
        var p = eval("(" + $(this).attr("floatad") + ")");
        var ef = new $.effect.floatad($(this), p);
        ef.start();
    });
}

$(function () {
    $.effect.init();
})