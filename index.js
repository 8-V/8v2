getDate = d => {
  console.log(d)
  d = new Date(d)
  return [d.getDate(), d.getMonth() + 1].join('/')
}

clear_cache = () => {
  if (navigator.serviceWorker == null) {
    console.error('Cant remove cache');
    return;
  }
  return navigator.serviceWorker.getRegistrations().then(x => {
    for (i of x) {
      i.unregister();
    }
  }).catch(e => {
    console.error(e);
  });
};

load_hw = () => {
  fetch('https://homework-63c7.restdb.io/rest/email_inbound', {
    method: 'GET',
    headers: {
      'x-apikey': '5c6ecf1828ca2e129e8696e8'
    }
  }).then(x => x.json()).then(predmets => {
    for (predmet of predmets) {
      hw2 = predmet.from == 'khorsun_dv@dlit.dp.ua'
      hw1 = predmet.from == 'anton.gimnasium@gmail.com'
      x = $(`<div data-role="collapsible" data-filtertext="${predmet.subject}">`).html(`<h3>${predmet.subject}</h3>${predmet.body}`)
      if (hw2) x.appendTo($('#hw2'))
      else if (hw1) x.appendTo($('#hw1'))
      else x.appendTo($('#cool'))
    }
    $('#hw1 #hw2').collapsibleset('refresh');
    $.unblockUI();
  }).catch(e => {
    console.error(e);
  });
};

init_chat = () => { };

calc_food = () => {
  result = $('#food-result');
  count_by = {
    '0': 0,
    '5': 0,
    '30': 0,
    '35': 0
  };
  count = 0;
  ref = $('#food-group').controlgroup().children().children();
  for (i of ref) {
    i = i.childNodes[1];
    if (!i.checked) {
      count_by[i.name]++;
    }
  }
  console.log(count_by);
  price = count_by['5'] * 5 + count_by['30'] * 30 + count_by['35'] * 35;
  result.html(`<p>${count_by['0'] + count_by['5'] + count_by['30'] + count_by['35']} человек</p><p>${count_by['0']} бесплатников</p><p>${count_by['5']} по 5 грн</p><p>${count_by['30']} по 30 грн</p><p>${count_by['35']} по 35</p><p>Итого ${price} грн.</p>`);
};

role_change = () => {
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
    user_action_btn.show();
  } else user_action_btn.hide();
};

$(() => {
  var child, j, len, ref;
  $.blockUI({ message: 'Загрузка домашки...' });
  load_hw();
  if (localStorage.role == null) {
    localStorage.role = 'role_default';
  }
  $('input[type=radio][name=role]').change(() => {
    localStorage.role = $('input[type=radio][name=role][selected]').attr('id') || 'role_default';
    role_change();
  });
  $('#settings div a[data-icon=back]').on('click', user_action);
  $(document).on('swiperight', '.ui-page', () => {
    $('#settings-panel').panel('open');
  });
  $('a[href=#chat]').on('click', init_chat);
  ref = $('#food-group').controlgroup().children().children();
  for (j = 0, len = ref.length; j < len; j++) {
    child = ref[j];
    $(child).on('change', calc_food);
  }
  role_change();
});
