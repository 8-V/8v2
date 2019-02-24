var init_chat, load_hw, role_change;

load_hw = function() {
  return fetch('https://homework-63c7.restdb.io/rest/email_inbound', {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'x-apikey': '5c6ecf1828ca2e129e8696e8'
    }
  }).then(function(res) {
    return res.json();
  }).then(function(res) {
    var i, len, predmet, results;
    results = [];
    for (i = 0, len = res.length; i < len; i++) {
      predmet = res[i];
      if (predmet.subject.match(/1$/)) {
        results.push($(`<div data-role="collapsible" data-filtertext="${predmet.subject}">`).html(`<h3>${predmet.subject}</h3>${predmet.body}`).appendTo($('#hw1').controlgroup("container")));
      } else {
        results.push($(`<div data-role="collapsible" data-filtertext="${predmet.subject}">`).html(`<h3>${predmet.subject}</h3>${predmet.body}`).appendTo($('#hw2').controlgroup("container")));
      }
    }
    return results;
  });
};

init_chat = function() {};

role_change = function() {
  var role, role_friendly_names, role_icons, role_urls, user_action_btn;
  user_action_btn = $('#user_action');
  user_action_btn.hide();
  role = localStorage.role;
  role_friendly_names = {
    'role_leader': 'Чат старостата',
    'role_prefect': 'Чат старостата',
    'role_culture': 'Чат старостата',
    'role_food': 'Счетчик порций'
  };
  role_urls = {
    'role_leader': '#chat',
    'role_prefect': '#chat',
    'role_culture': '#chat',
    'role_food': '#food_calc'
  };
  role_icons = {
    'role_leader': 'comment',
    'role_prefect': 'comment',
    'role_culture': 'comment',
    'role_food': 'user'
  };
  $('#' + role).click().click();
  if (role !== 'role_default') {
    user_action_btn.attr('href', role_urls[role]);
    user_action_btn.html(role_friendly_names[role]);
    user_action_btn.buttonMarkup({
      icon: role_icons[role]
    });
    return user_action_btn.show();
  }
};

$(function() {
  load_hw();
  if (navigator.serviceWorker != null) {
    console.log('service worker found');
    navigator.serviceWorker.register('/sw.js').then(function() {
      return console.log('wervice worker enabled');
    });
  }
  if (localStorage.role == null) {
    localStorage.role = 'role_default';
  }
  $('input[type=radio][name=role]').change(function() {
    var choice;
    choice = $(this).attr('id');
    localStorage.role = choice;
    return role_change();
  });
  $('#settings div a[data-icon=back]').on('click', user_action);
  $(document).on('swiperight', '.ui-page', function() {
    return $('#settings-panel').panel('open');
  });
  $('a[href=#chat]').on('click', init_chat);
  return role_change();
});
