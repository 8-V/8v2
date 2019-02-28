clear_cache = ->
  if not navigator.serviceWorker?
    console.error 'Cant remove cache'
    return
  navigator.serviceWorker.getRegistrations()
  .then (x) ->
    for i in x
      i.unregister()
    return
  .catch (e) ->
    console.error e
load_hw = ->
  fetch 'https://homework-63c7.restdb.io/rest/email_inbound',
    method: 'GET'
    cache: 'no-cache'
    headers: 'x-apikey': '5c6ecf1828ca2e129e8696e8'
  .then (res) -> res.json()
  .then (res) ->
    for predmet in res
      appendTo = if predmet.subject.match(/1$/) then '#hw1' else '#hw2'
      $("<div data-role=\"collapsible\" data-filtertext=\"#{predmet.subject}\">").html("<h3>#{predmet.subject}</h3>#{predmet.body}").appendTo($(appendTo))
    $('#hw1 #hw2').collapsibleset('refresh')
    $.mobile.loading('hide')
    return
  .catch (e) ->
    console.error(e)
    return
init_chat = ->

calc_food = ->
  result = $('#food-result')
  count_by =
    '0': 0
    '5': 0
    '30': 0
    '35': 0
  count= 0
  for i in $('#food-group').controlgroup().children().children()
    i = i.childNodes[1]
    count_by[i.name]++ if not i.checked
  console.log(count_by)
  price = count_by['5'] * 5 + count_by['30'] * 30 + count_by['35'] * 35
  result.html("<p>#{count_by['0']+count_by['5']+count_by['30']+count_by['35']} человек</p><p>#{count_by['0']} бесплатников</p><p>#{count_by['5']} по 5 грн</p><p>#{count_by['30']} по 30 грн</p><p>#{count_by['35']} по 35</p><p>Итого #{price} грн.</p>")
  return

role_change = ->
  user_action_btn = $('#user_action')
  user_action_btn.hide()
  role = localStorage.role
  role_friendly_names =
    'role_leader': 'Чат старостата'
    'role_prefect': 'Чат старостата'
    'role_culture': 'Чат старостата'
    'role_food': 'Счетчик порций'
  role_urls =
    'role_leader': '#chat'
    'role_prefect': '#chat'
    'role_culture': '#chat'
    'role_food': '#food_calc'
  role_icons =
    'role_leader': 'comment'
    'role_prefect': 'comment'
    'role_culture': 'comment'
    'role_food': 'user'
  $('#' + role).click().click()
  if role != 'role_default'
    user_action_btn.attr 'href', role_urls[role]
    user_action_btn.html role_friendly_names[role]
    user_action_btn.buttonMarkup icon: role_icons[role]
    user_action_btn.show()
    return

$ ->
  $.mobile.loading 'show', textVisible: true, text: "Загрузка домашки..."
  load_hw()
  $('[data-netlify-identity-button]').enchanceWithin()
  if navigator.serviceWorker? && false
    navigator.serviceWorker.register '/sw.js'
    .catch (e) ->
      console.error(e)
      return
  localStorage.role ?= 'role_default'
  $('input[type=radio][name=role]').change ->
    localStorage.role = $(this).attr('id')
    role_change()
    return
  $('#settings div a[data-icon=back]').on 'click', user_action
  $(document).on 'swiperight', '.ui-page', ->
    $('#settings-panel').panel 'open'
    return
  $('a[href=#chat]').on 'click', init_chat
  for child in $('#food-group').controlgroup().children().children()
    $(child).on 'change', calc_food
  role_change()
  return
