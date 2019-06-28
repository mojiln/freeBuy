$(function () {
  const renderTitle = function () {
    $.ajax({
      url: 'http://127.0.0.1:3000/api/getbaicaijiatitle',
      type: 'get',
      success(info) {
        console.log(info)
        $('.ul-wapper ul').html(template('titleTpl', info))
      }
    })
  }
  renderTitle()
  let titleid = 0
  const renderProduct = function () {
    $.ajax({
      url: 'http://127.0.0.1:3000/api/getbaicaijiaproduct',
      type: 'get',
      data: {
        titleid: titleid
      },
      success(info) {
        console.log(info)
        $('.bcj-list ul').html(template('productTpl', info))

        // let a = info.result.productPrice.substring(0, v.lastIndexOf('￥'))
        // console.log(a)
      }
    })
  }
  renderProduct()

  $('.bcj-head-cat').on('click', 'li', function () {
    titleid = $(this).data('id')
    renderProduct()
  })

  // 封装的回到顶部方法
  jQuery.fn.gotoTop = function (opt) {
    var ele = this;
    var win = $(window);
    var doc = $('html,body');
    var index = false;
    var defaultOpt = {
      offset: 420,
      speed: 500,
      iconSpeed: 200,
      animationShow: { 'opacity': '1' },
      animationHide: { 'opacity': '0' }
    };
    var options = $.extend(defaultOpt, opt);
    ele.click(function () {
      doc.animate(
        { scrollTop: '0' },
        options.speed);
    });
    $.each(options.animationShow, function (i) {
      if (i == 'transform') {
        index = true;
      }
    });
    function animateShow() {
      if (index) {
        ele.css(options.animationShow);
      } else {
        ele.stop().animate(options.animationShow, options.iconSpeed);
      }
    }
    function animateHide() {
      if (index) {
        ele.css(options.animationHide);
      } else {
        ele.stop().animate(options.animationHide, options.iconSpeed);
      }
    }
    win.scroll(function () {
      if (win.scrollTop() > options.offset) {
        animateShow();
      } else {
        animateHide();
      }
    });
    if (win.scrollTop() > options.offset) {
      ele.css(options.animationShow);
    } else {
      ele.css(options.animationHide);
    }
  }

  $('#js-go_top').gotoTop({
    offset: 500, //距离顶部的位置
    speed: 300, //移动到顶部的速度
    /*     iconSpeed : 300, //icon动画样式的速度*/
    animationShow: {
      'transform': 'translate(0,0)',
      'transition': 'transform .5s ease-in-out'
    }, //icon动画样式显示时
    animationHide: {
      'transform': 'translate(80px,0)',
      'transition': 'transform .5s ease-in-out'
    } //icon动画样式隐藏时
  })

})