/**
 * Created by yangrui on 15/7/10.
 */

window.index = (function () {
    var state=1;
    function start() {
        console.log('-----你好呀-----');
        //为图片添加张数
        getpicnum();
        //点赞
        zan_operate();

        //事件转办
        $('.s1 .s_sj_operate').bind('click',function(){
            $('li.zb').css('display',$('li.zb').is(':hidden')?'block':'none');
        });
        $('#zb_btn').bind('click',function(){
            $('.pop_container').show();
            $('.m_alert').show();
        });
        $('#sure,#back').bind('click',function(){
            $('.pop_container').hide();
            $('.m_alert').hide();
            if($(this).attr('id')=='sure'){
                $('li.zb').hide();
                Rui.Alert.getAlert('确认转办');
            }else{
                Rui.Alert.getAlert('返回');
            }
        });

        //申请延期
        $('.s3 .s_sj_operate').bind('click',function(){
            $('.tx').show();
            $('.tj').hide();
            $('li.sq').css('display',$('li.sq').is(':hidden')?'block':'none');
        });
        $('.tx .btn button').bind('click',function(){
            $('.tx').hide();
            $('.tj').show();
        });
        $('.tj .sure').bind('click',function(){
            Rui.Alert.getAlert('确认');
            $('.tx').show();
            $('.tj').hide();
            $('.sq').hide();
        });
        $('.tj .no').bind('click',function(){
            Rui.Alert.getAlert('返回');
            $('.tx').show();
            $('.tj').hide();
        });
        $('.sq input').bind('focus',function(){
            Rui.Alert.getAlert('请填写天数');
        });

        $('.op').bind('click',function(){
            $('.pop_container').show();
            $('.m_publish').show().animate({bottom: "0"}, 1000);
        });
        $('button.cancel').bind('click',function(){
            $('.m_publish').animate({bottom: "-210px"}, 1000,function(){
                $('.pop_container').hide();
                $(this).hide();
            });
        });
        $('button.sure').bind('click',function(){
            $('.m_publish').animate({bottom: "-210px"}, 1000,function(){
                $('.pop_container').hide();
                $(this).hide();
                Rui.Alert.getAlert('发表成功');
            });
        });
    }

    //点赞
    function zan_operate(){
        $('.imut_content em.zan').bind('click',function(){
            if($(this).hasClass('hui')){
                $(this).removeClass('hui').next().text(parseInt($(this).next().text())+1);
            }else
                $(this).addClass('hui').next().text(parseInt($(this).next().text())>0?parseInt($(this).next().text())-1:0);
        });
    }

    //为图片添加张数
    function getpicnum(){
        var div_max=$('body').width()-40,
            img_len=115,
            img_maxlen=parseFloat((div_max/img_len).toFixed(1));
        $('.imu_img').each(function(){
           var img_num=$(this).find('div').length;
            if(img_num>=img_maxlen)
                $(this).prev().empty().append('<span>'+img_num+'张</span>');
        });
    }

    return {
        start: start
    }
})();
index.start();