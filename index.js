var user_action = () => {}

var parse_hw = predmets => {
  for (var predmet of predmets) {
    var hw2 = predmet.from == 'khorsun_dv@dlit.dp.ua'
    var hw1 = predmet.from == 'jupavlenko005@gmail.com'
    var x = $(
      `<div data-role="collapsible" data-filtertext="${predmet.subject}">`
    ).html(`<h3>${predmet.subject}</h3>${predmet.body}`)
    if (hw2) x.appendTo($('#hw2'))
    else if (hw1) x.appendTo($('#hw1'))
    else x.appendTo($('#cool'))
  }
  return true
}

var getDate = d => {
  console.log(d)
  d = new Date(d)
  return [d.getDate(), d.getMonth() + 1].join('/')
}

var clear_cache = async () => {
  if (navigator.serviceWorker == null) {
    console.error('Cant remove cache')
    return
  }
  try {
    const x = await navigator.serviceWorker.getRegistrations()
    for (var i of x) i.unregister()
  } catch (e) {
    console.error(e)
  }
}

var load_hw = async () => {
  var predmets = await fetch('https://homework-63c7.restdb.io/rest/email_inbound', {
    method: 'GET',
    headers: {
      'x-apikey': '5c6ecf1828ca2e129e8696e8'
    }
  })
  predmets = await predmets.json()
  if ('message' in predmets) {
    $.unblockUI()
    $.blockUI({
      message: predmets.message
    })
    return
  }
  parse_hw(predmets)
  $('#hw1 #hw2').collapsibleset('refresh')
  $.unblockUI()
}

var init_chat = () => {}

var calc_food = () => {
  var result = $('#food-result')
  var count_by = {
    '0': 0,
    '5': 0,
    '30': 0,
    '35': 0
  }
  var group = document.querySelectorAll('#food-group input')
  // console.dir(group)
  group.forEach(chbox => {
    // console.log(chbox)
    if ('undefined' != typeof chbox && chbox.checked);
    else {
      count_by[chbox.name]++
    }
  })
  // console.log(count_by)
  var price = count_by['5'] * 5 + count_by['30'] * 30 + count_by['35'] * 35
  result.html(
    `<p>${count_by['0'] +
      count_by['5'] +
      count_by['30'] +
      count_by['35']} человек</p><p>${count_by['0']} бесплатников</p><p>${
      count_by['5']
    } по 5 грн</p><p>${count_by['30']} по 30 грн</p><p>${
      count_by['35']
    } по 35</p><p>Итого ${price} грн.</p>`
  )
}

var role_change = () => {
  var user_action_btn = $('#user_action')
  user_action_btn.hide()
  var role = localStorage.role
  var role_friendly_names = {
    food: 'Счетчик порций'
  }
  var role_urls = {
    food: '#food'
  }
  var role_icons = {
    food: 'user'
  }
  if (role !== 'default') {
    user_action_btn.attr('href', role_urls[role])
    user_action_btn.html(role_friendly_names[role])
    user_action_btn.buttonMarkup({
      icon: role_icons[role]
    })
    user_action_btn.show()
  } else {
    user_action_btn.hide()
  }
}

$(() => {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js')
  $.blockUI({
    message: 'Загрузка домашки...'
  })
  load_hw()
  if (localStorage.role == null) {
    localStorage.role = 'default'
  }
  $('input[name=role]').change(() => {
    role = document.querySelector('.ui-checkbox-off + [name=role]')
    if (!role) role = {
      id: 'default'
    }
    localStorage.role = role.id
    role_change()
  })
  $(document).on('swiperight', '.ui-page', () => {
    if ($.mobile.activePage.attr('id') == 'main')
      $('#settings-panel').panel('open')
    else
      $.mobile.changePage('#main', {
        transition: 'slide',
        reverse: true
      })
  })
  var group = $('#food-group')[0].form
  for (var child of group) {
    $(child).on('change', calc_food)
  }
  role_change()
})
