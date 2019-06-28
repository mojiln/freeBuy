$(function () {
  const render = function () {
    $.ajax({
      url: 'http://127.0.0.1:3000/api/getinlanddiscount',
      type: 'get',
      success(info) {
        if (info.status === 200) {
          $('.recommen-product-list ul').html(template('productTpl', info))
        }
      }
    })
  }
  render()
})