$(function () {
  const render = function () {
    $.ajax({
      url: 'http://127.0.0.1:3000/api/getcoupon',
      type: 'get',
      success(info) {
        console.log(info)
        $('.coupon-title ul').html(template('tpl', info))
      }
    })
  }
  render()
})