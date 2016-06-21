/**
 * Created by yangrui on 16/3/15.
 */
window.Rui = window.Rui || {
        Module: {},
        Check: {},
        DeValue: {},
        Tool: {},
        Alert: {}
    };
Rui.Alert = (function () {
    //弹出框
    function getAlert(msg, time) {
        $("body").append('<div class="alert"><span>' + msg + '</span></div>');
        $('.alert').css('bottom',(window.innerHeight-40)/2 +'px').fadeIn();
        setTimeout(function () {
            $('.alert').fadeOut(1000);
            setTimeout(function (){ $('.alert').remove();},1000);
        }, time ? time : 1000);
    }
    return {
        getAlert: getAlert
    }
})();