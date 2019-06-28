$(function () {
  let renderTitle = function () {
    $.ajax({
      url: 'http://127.0.0.1:3000/api/getsitenav',
      type: 'get',
      success(info) {
        console.log(info)
        $('.link').html(template('tpl', info))
      }
    })
  }
  renderTitle()
})