$(function () {
  let renderTitle = function () {
    $.ajax({
      url: 'http://127.0.0.1:3000/api/getbrandtitle',
      type: 'get',
      success(info) {
        console.log(info)
        $('.category').html(template('cateTpl', info))
      }
    })
  }
  renderTitle()

})