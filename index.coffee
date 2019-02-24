load_hw = ->
  fetch 'https://homework-63c7.restdb.io/rest/email_inbound',
    method: 'GET'
    cache: 'no-cache'
    headers: 'x-apikey': '5c6ecf1828ca2e129e8696e8'
  .then (res) -> res.json()
  .then (res) ->
    for predmet in res
      if predmet.subject.match /1$/
        $("<div data-role=\"collapsible\" data-filtertext=\"#{predmet.subject}\">").html("<h3>#{predmet.subject}</h3>#{predmet.body}").appendTo($('#hw1').controlgroup("container"))
      else
        $("<div data-role=\"collapsible\" data-filtertext=\"#{predmet.subject}\">").html("<h3>#{predmet.subject}</h3>#{predmet.body}").appendTo($('#hw2').controlgroup("container"))

init_chat = ->

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

$ ->
  load_hw()
  if navigator.serviceWorker?
    console.log 'service worker found'
    navigator.serviceWorker.register('/sw.js').then ->
      console.log 'wervice worker enabled'
  localStorage.role ?= 'role_default'
  $('input[type=radio][name=role]').change ->
    choice = $(this).attr('id')
    localStorage.role = choice
    role_change()
  $('#settings div a[data-icon=back]').on 'click', user_action
  $(document).on 'swiperight', '.ui-page', ->
    $('#settings-panel').panel 'open'
  $('a[href=#chat]').on 'click', init_chat
  role_change()
