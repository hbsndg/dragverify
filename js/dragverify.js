/**
 * dragverify.js for drag buttons to verify,not input verification code
 *
 * @author hbsndg_code
 * @version 1.0
 * @createdtime 2015-11-12
 * @contact hbsndg_code@126.com
 */

(function($){
    $.fn.dragverify = function(params){
        var x ;
        var dragverify = this;
        var moveFlag = false;
        var defaults = {};
        var params = $.extend(defaults,params);
        var htmls = '<div class="dragverifybg"></div><div class="dragverifytext" onselectstart="return false;" unselectable="on">拖动滑块验证</div><div class="block blockbg"></div>';

        this.append(htmls);

        var block = dragverify.find(".block");
        var dragverifybg = dragverify.find(".dragverifybg");
        var drafverifytext = dragverify.find(".dragverifytext");
        var maxWidth = dragverify.width() - block.width();
        block.mousedown(function(e){
            moveFlag = true;
            x = e.pageX - parseInt(block.css("left"),10);

        });



        $(document).mousemove(function(e){
            var moveX = e.pageX - x;
            if(moveFlag){
                if(moveX > 0 && moveX < maxWidth){
                    block.css({"left":moveX});
                    dragverifybg.css({"width":moveX});
                }else if(moveX > maxWidth){
                    verifySuc();
                }
            }
        }).mouseup(function(e){
            moveFlag = false;
            var mX = e.pageX - x;
            if(mX < maxWidth){
                block.css({"left":0});
                dragverifybg.css({"width":0});
            }
        });
        function verifySuc(){
            block.removeClass("blockbg").addClass("blockbgsuc");
            drafverifytext.text("验证通过");
            dragverify.css({"color":"#ffffff"});
            block.unbind("mousedown");
            $(document).unbind("mousemove");
            $(document).unbind("mouseup");
        }

    }
})(jQuery);

//usedemo

$("#dragverify").dragverify();