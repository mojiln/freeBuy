$(function () {
  let renderTitle = function () {
    $.ajax({
      url: 'http://127.0.0.1:3000/api/getcategorytitle',
      type: 'get',
      success(info) {
        // console.log(info)
        $('.category').html(template('cateTpl', info))
      }
    })
  }
  renderTitle()

  let id = 0
  // 显示隐藏
  $('.category').on('click', '.title', function () {
    id = $(this).data('id')
    // console.log(id)

    let renderList = function () {
      $.ajax({
        url: 'http://127.0.0.1:3000/api/getcategory',
        type: 'get',
        data: {
          titleid: id
        },
        success(info) {
          console.log(info)
          $('.category .category-content').eq(id).toggleClass('cateHide').html(template('listTpl', info))
        }
      })
    }
    renderList()

  })
})