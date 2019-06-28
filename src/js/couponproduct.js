$(function () {
  let couponid = location.search.split('=')[1].split('&')[0]
  console.log(couponid)
  const render = function () {
    $.ajax({
      url: 'http://127.0.0.1:3000/api/getcouponproduct',
      type: 'get',
      data: {
        couponid: +couponid
      },
      success(info) {
        console.log(info)
        $('.coupon-list ul').html(template('tpl', info))
      }
    })
  }
  render()
})