let parse_hw = (hw1, hw2) => {
  for (let predmet of hw1) {
    let x = $(
      `<div data-role="collapsible" data-filtertext="${predmet.subject}">`,
    ).html(`<h3>${predmet.subject}</h3>${predmet.body}`);
    x.appendTo($('#hw1'));
  }
  for (let predmet of hw2) {
    let x = $(
      `<div data-role="collapsible" data-filtertext="${predmet.subject}">`,
    ).html(`<h3>${predmet.subject}</h3>${predmet.body}`);
    x.appendTo($('#hw2'));
  }
  return true;
};

let load_hw = async () => {
  $.blockUI({
    message: 'Загрузка домашки...',
  });
  let hw1 = await fetch('https://homework-63c7.restdb.io/rest/email_inbound', {
    method: 'GET',
    headers: {
      'x-apikey': '5c6ecf1828ca2e129e8696e8',
    },
  }).then(x => x.json());
  let hw2 = await fetch('https://homework-63c7.restdb.io/rest/hw', {
    method: 'GET',
    headers: {
      'x-apikey': '5c6ecf1828ca2e129e8696e8',
    },
  }).then(x => x.json());

  if ('message' in hw1) {
    $.unblockUI();
    $.blockUI({
      message: predmets.message,
    });
    return;
  }
  parse_hw(hw1, hw2);
  $('#hw1 #hw2').collapsibleset('refresh');
  $.unblockUI();
};

let calc_food = () => {
  let result = $('#food-result');
  let count_by = {
    '0': 0,
    '5': 0,
    '30': 0,
    '35': 0,
  };
  let group = document.querySelectorAll('#food-group input');
  group.forEach(chbox => {
    if ('undefined' != typeof chbox && chbox.checked);
    else {
      count_by[chbox.name]++;
    }
  });
  let price = count_by['5'] * 5 + count_by['30'] * 30 + count_by['35'] * 35;
  result.html(
    `<p>${count_by['0'] +
      count_by['5'] +
      count_by['30'] +
      count_by['35']} человек</p><p>${count_by['0']} бесплатников</p><p>${
      count_by['5']
    } по 5 грн</p><p>${count_by['30']} по 30 грн</p><p>${
      count_by['35']
    } по 35</p><p>Итого ${price} грн.</p>`,
  );
};
const setTheme = _ => {
  localStorage.theme = $('#theme:checked').length ? 'a' : 'b';
  getTheme();
};
const getTheme = _ => {
  const theme = localStorage.theme;
  const torem = theme == 'a' ? 'b' : 'a';
  $('.ui-mobile-viewport').removeClass('ui-overlay-' + localStorage.theme);
  $('[data-role=page]').removeClass('ui-page-theme-' + localStorage.theme);
  $('[data-role=header], [data-role=listview] > li').removeClass(
    'ui-bar-' + localStorage.theme,
  );
  $('ui-btn').removeClass('ui-btn-' + localStorage.theme);

  $('.ui-mobile-viewport').addClass('ui-overlay-' + localStorage.theme);
  $('[data-role=page]').addClass('ui-page-theme-' + localStorage.theme);
  $('[data-role=header], [data-role=listview] > li').addClass(
    'ui-bar-' + localStorage.theme,
  );
  $('ui-btn').addClass('ui-btn-' + localStorage.theme);
};

$(() => {
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');
  load_hw();
  $(document).on('swiperight', '.ui-page', () => {
    if ($.mobile.activePage.attr('id') == 'main')
      $('#settings-panel').panel('open');
    else
      $.mobile.changePage('#main', {
        transition: 'slide',
        reverse: true,
      });
  });
  $(document).on('swipeleft', '.ui-page', _ => {
    location.href = '/game';
  });
  let group = $('#food-group')[0].form;
  for (let child of group) {
    $(child).on('change', calc_food);
  }
  calc_food();
  getTheme();
  $('#theme').on('click', setTheme);
});
