$(function () {
  // 加载商品数据
  let pageCount = 0
  let pageId = 1
  let renderProduct = function () {
    $.ajax({
      type: 'get',
      url: 'http://localhost:3000/api/getmoneyctrl',
      data: {
        pageid: pageId
      },
      success(info) {
        console.log(info)
        const html = template('productTpl', info)
        $('.recommen-product-list ul').html(html)
        //获取总页面数
        pageCount = Math.ceil(info.count / 10)
        console.log(pageCount)

        if (!$('#selectPage').val()) {
          for (i = 1; i <= pageCount; i++) {
            let $option = $('<option>第' + i + '页</option>')
            $('#selectPage').append($option)
          }
        }
      }
    })
  }
  renderProduct()

  // 图片错误处理
  $(document).on('error', 'img', function () {
    console.log('2')
  })

  // 分页
  $('#selectPage').on('change', function () {
    pageId = parseInt($(this).val().substring(1))
    console.log(pageId)
    renderProduct()
  })

  // 上一页
  $('#pageAdd').on('click', function (e) {
    e.preventDefault()
    //判断是否是第一页
    if (pageId === 1) {
      return
    }

    //判断是否超出总页数
    if (pageId > pageCount) {
      pageId = pageCount
      return
    }

    pageId--
    $('#selectPage').val('第' + pageId + '页')
    renderProduct()
  })

  // 下一页
  $('#pageRemove').on('click', function (e) {
    e.preventDefault()

    //判断是否超出总页数
    if (pageId >= pageCount) {
      return
    }

    pageId++
    $('#selectPage').val('第' + pageId + '页')
    renderProduct()
  })
})