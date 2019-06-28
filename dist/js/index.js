$(function () {
  // 发送ajax请求获取导航
  let renderNav = function () {
    $.ajax({
      url: 'http://localhost:3000/api/getindexmenu',
      type: 'get',
      success(info) {
        const html = template('menuTpl', info)
        $('#menu .row').html(html)
      }
    })
  }
  renderNav()

  // 点击收起和展开菜单
  $('#menu .row').on('click', '.menu-item', function () {
    $(this)
      .nextAll()
      .toggleClass('active')
  })

  // 加载商品数据
  let renderProduct = function () {
    $.ajax({
      type: 'get',
      url: 'http://localhost:3000/api/getmoneyctrl',
      success(info) {
        // console.log(info)
        const html = template('productTpl', info)
        $('.recommen-product-list ul').html(html)
      }
    })
  }
  renderProduct()

  // 图片错误处理
  $(document).on('error', 'img', function () {
    console.log('2')
  })
})
