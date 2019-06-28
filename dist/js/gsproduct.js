$(function () {
  let shopId = 0
  let areaId = 0
  let choose = 0
  // 商品渲染
  const renderPro = function () {
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:3000/api/getgsproduct',
      data: {
        shopid: shopId,
        areaid: areaId
      },
      success(info) {
        console.log(info)
        $("#container").html(template('productTpl', info))
      }
    })
  }
  renderPro()

  // 渲染店铺
  const renderShop = function () {
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:3000/api/getgsshop',
      success(info) {
        if (info.status === 200) {
          console.log(info)
          $("#shop ul").html(template('shopTpl', info))
          $('.popbox').css({ 'display': 'block' })
        }
      }
    })
  }

  // 渲染区域
  const renderArea = function () {
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:3000/api/getgsshoparea',
      success(info) {
        if (info.status === 200) {
          console.log(info)
          $("#shop ul").html(template('areaTpl', info))
          $('.popbox').css({ 'display': 'block' })
        }
      }
    })
  }

  $('.shopTop').on('click', function () {
    choose = $(this).data('choose')
    renderShop()
  })

  $('.area').on('click', function () {
    choose = $(this).data('choose')
    renderArea()
  })

  $('#shop').on('click', 'li', function () {
    if (choose === 0) {
      shopId = $(this).data('id')
      $('.popbox').css({ 'display': 'none' })
      $('.shopTop a').text($(this).find('a').text())
      renderPro()
    } else if (choose === 1) {
      areaId = $(this).data('id')
      $('.popbox').css({ 'display': 'none' })
      renderPro()
    }
  })

})