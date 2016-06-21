/**
 * Created by yangrui on 15/7/10.
 */
window.list = (function () {
    var state= 3,//1代表街道列表，2代表审核列表，3代表转件列表
        arr_name={1:['已完成','未完成'],2:['已审核','未审核'],3:['已转件','未转件']};
    function start() {
        console.log('-----你好呀-----');

        //根据页面类型初始化页面
        $('.sel1').text(arr_name[state][0]);
        $('.sel2').text(arr_name[state][1]);

        //查询
        $('#query').bind('click',function(){
            Rui.Alert.getAlert('查询'+$('#query_txt').val());
        });

        /*三个条件处理*/
        //所有事件
        $('.n1').bind('click',function(){
            n_show();
        });
        //所有事件，点击事件的处理
        $('.mn_elist>span').each(function(){
            $(this).bind('click',function(){
                console.log($(this).text());
                $('#pop1').hide();
                $('.mn_elist').hide();
                $('.mn_elist>span').removeClass('sel');
                $(this).addClass('sel');
            });
        });

        //时间
        $('.n2').bind('click',function(){
            n_hide();
            Rui.Alert.getAlert('按时间排序');
        });

        //筛选
        $('.n3').bind('click',function(){
            n_hide();
            $('#pop2').show();
            $('.mn_t').show().animate({left: "0"}, 1000);
        });
        //筛选，点击事件的处理
        $('.mne_title>.back,.mne_title>.sure').bind('click',function(){
            console.log($(this).attr('class'));
            var c_class=$(this).attr('class')=='sure'?true:false,
                time_start_n,time_start_y,time_start_r,
                time_end_n,time_end_y,time_end_r,
                current_time;
            $('.mn_t').animate({left: "100%"}, 1000,function(){
                $(this).hide();
                $('#pop2').hide();
                if(c_class){
                    time_start_n=$('.mnetime_end>.nian').find("option:selected").text();
                    time_start_y=$('.mnetime_end>.yue').find("option:selected").text();
                    time_start_r=$('.mnetime_end>.ri').find("option:selected").text();

                    time_end_n=$('.mnetime_end>.nian').find("option:selected").text();
                    time_end_y=$('.mnetime_end>.yue').find("option:selected").text();
                    time_end_r=$('.mnetime_end>.ri').find("option:selected").text();
                    current_time=time_start_n+'-'+time_start_y+'-'+time_start_r+'到'+time_end_n+'-'+time_end_y+'-'+time_end_r;
                }
                Rui.Alert.getAlert(c_class?current_time:'取消');
            });
        });
        //筛选，点击清除选项
        $('.mne_btn>button').bind('click',function(){
            $('.nian').val(1);
            $('.yue').val(1);
            $('.ri').val(1);
            Rui.Alert.getAlert('初始化时间段');
        });
    }

    //所有事件，打开
    function n_show(){
        $('#pop1').show();
        $('.mn_elist').show();
    }

    //所有事件，关闭
    function n_hide(){
        $('#pop1').hide();
        $('.mn_elist').hide();
    }

    return {
        start: start
    }
})();
list.start();