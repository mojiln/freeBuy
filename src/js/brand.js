$(function () {
  let renderTitle = function () {
    $.ajax({
      url: 'http://127.0.0.1:3000/api/getbrand',
      type: 'get',
      success(info) {
        console.log(info)
        $('.category-title').html(template('tpl', info))
      }
    })
  }
  renderTitle()

})