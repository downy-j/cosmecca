$(function () { 
  
    //서브 메뉴(로그아웃)
    let userMenu = $('.user_info');
    let infoMenu = $('.submenu');

    userMenu.click(function () {
        $(this).children('.arrow img').attr("src", "/main_page/static/image/chevron_down.svg");
        infoMenu.toggleClass("active");

        if(infoMenu.hasClass("active")){
            $(this).children('.arrow img').attr("src", "/main_page/static/image/chevron_up.svg");
        }
    });

    //기간 설정
    let periodTab = $('.period ul li');
    let dateTab = $('.period ul li.dateP');
    let dateTabInput = $('input[name="datefilter"]');

    periodTab.click(function () {
        periodTab.removeClass('active');
        dateTab.removeClass('active'); cancelIdleCallback
        dateTabInput.val('');
        $(this).addClass('active');
    });

    //구분 설정
    let productDiv = $('.group .div p');
    productDiv.click(function () {
        productDiv.removeClass('active');
        $(this).addClass('active');
    });

    //캘린더
    $('input[name="datefilter"]').daterangepicker({
        autoUpdateInput: false,
        locale: { 
            cancelLabel: 'Clear'
        }
    });

    $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('YYYY/MM/DD') + ' - ' + picker.endDate.format('YYYY/MM/DD'));
    });


    //페이저
    $(document).on('click','.pager a', function (e) { 
    	$(this).parent('.f_c_c').find('a').removeClass('current');
        $(this).addClass('current');
    });

    //모달
    let modalClose = $('.m_close');
    let $etcModal = $('.etc');

    modalClose.click(function () { 
        $etcModal.removeClass('active');
        $('body').css("overflow", "auto");
        $("input[type=text]").val("");
        $("input[type=file]").val("");
        $('select').prop('selectedIndex', 0);
        $(':checkbox:checked').prop('checked', false);
        $(':radio:checked').prop('checked', false);
        $("textarea").val("");
    });
});


// 숫자 앞에 0 추가
function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}


