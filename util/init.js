const getTheme = _ => {
  localStorage.theme = localStorage.theme || 'a';
  const theme = localStorage.theme;
  $('#theme')
    .prop('checked', theme == 'b')
    .checkboxradio('refresh');
  const torem = theme == 'a' ? 'b' : 'a';
  [...document.querySelectorAll('.ui-mobile-viewport')].map(i =>
    i.classList.remove(`ui-overlay-${torem}`),
  );
  [...document.querySelectorAll('[data-role=page]')].map(i =>
    i.classList.remove(`ui-page-theme-${torem}`),
  );
  [
    ...document.querySelectorAll(
      '[data-role=header], [data-role=listview] > li',
    ),
  ].map(i => i.classList.remove(`ui-bar-${torem}`));

  [...document.querySelectorAll('.ui-mobile-viewport')].map(i =>
    i.classList.add(`ui-overlay-${theme}`),
  );
  [...document.querySelectorAll('[data-role=page]')].map(i =>
    i.classList.add(`ui-page-theme-${theme}`),
  );
  [
    ...document.querySelectorAll(
      '[data-role=header], [data-role=listview] > li',
    ),
  ].map(i => i.classList.add(`ui-bar-${theme}`));
};
$(document).on('pageinit', getTheme);
$(document).one('pagebeforeshow', _ => {
  $(document).on('swiperight', '.ui-page', () => {
    if ($.mobile.activePage.prop('id') == 'main')
      $('#settings-panel').panel('toggle');
    else if ($.mobile.activePage.prop('id') == 'contact')
      $.mobile.changePage('/', {
        transition: 'pop',
        reverse: true,
      });
    else
      $.mobile.changePage('/', {
        transition: 'slide',
        reverse: true,
      });
  });
});
console.log('[init] done');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

Notification.requestPermission().then(r => {
  if (r === 'denied') return console.log('[notifications] denied');
  if (r === 'default') return console.log('[notifications] skipped');
});
