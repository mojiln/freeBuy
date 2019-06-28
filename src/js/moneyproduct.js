$(function () {
  let id = location.search.split('=')[1]
  console.log(id)
  const render = function () {
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:3000/api/getmoneyctrlproduct',
      data: {
        productid: +id
      },
      success(info) {
        console.log(info)
        $(".container").html(template('tpl', info.result))
      }
    })
  }
  render()
})