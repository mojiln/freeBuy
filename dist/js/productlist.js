$(function () {
  let urlObj = location.search.split('=')[1]
  let id = parseInt(urlObj)
  let pageId = parseInt(location.search.split('=')[3])

  let pageCount = 1
  console.log(pageId)
  const renderPro = function () {
    $.ajax({
      url: 'http://127.0.0.1:3000/api/getproductlist',
      type: 'get',
      data: {
        categoryid: id,
        pageid: pageId
      },
      success(info) {
        console.log(info)
        $('#recommen-product ul').html(template('proTpl', info.result))
        //获取总页面数
        pageCount = Math.ceil(info.result.count / 10)
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
  renderPro()

  // 分页
  $('#selectPage').on('change', function () {
    pageId = parseInt($(this).val().substring(1))
    renderPro()
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
    renderPro()
  })

  // 下一页
  $('#pageRemove').on('click', function (e) {
    e.preventDefault()
    //判断是否超出总页数
    if (pageId > pageCount) {
      pageId = pageCount
      return
    }
    pageId++
    $('#selectPage').val('第' + pageId + '页')
    renderPro()
  })
})