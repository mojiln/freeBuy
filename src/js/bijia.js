$(function () {
  let urlObj = location.search.split('=')[1]
  let id = parseInt(urlObj)
  console.log(id)
  const renderPro = function () {
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:3000/api/getproduct',
      data: {
        productid: id
      },
      success(info) {
        console.log(info)
        $('.product-bijia').html(template('proTpl', info.result))
        $('.price .logo').html(template('priceTpl', info.result))
      }
    })
  }
  renderPro()
  const render = function () {
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:3000/api/getproductcom',
      data: {
        productid: id
      },
      success(info) {
        console.log(info)
        $('.product-com-list ul').html(template('commentTpl', info))
      }
    })
  }
  render()
})