const setTheme = _=>{
    localStorage.theme = document.querySelector('#theme').checked ? 'b' : 'a';
    getTheme();
}
;
const getTheme = _=>{
    const theme = localStorage.theme;
    $('#theme').prop('checked', theme == 'b').checkboxradio('refresh');
    const torem = theme == 'a' ? 'b' : 'a';
    [...document.querySelectorAll('.ui-mobile-viewport')].map(i=>i.classList.remove(`ui-overlay-${torem}`));
    [...document.querySelectorAll('[data-role=page]')].map(i=>i.classList.remove(`ui-page-theme-${torem}`));
    [...document.querySelectorAll('[data-role=header], [data-role=listview] > li')].map(i=>i.classList.remove(`ui-bar-${torem}`));

    [...document.querySelectorAll('.ui-mobile-viewport')].map(i=>i.classList.add(`ui-overlay-${theme}`));
    [...document.querySelectorAll('[data-role=page]')].map(i=>i.classList.add(`ui-page-theme-${theme}`));
    [...document.querySelectorAll('[data-role=header], [data-role=listview] > li')].map(i=>i.classList.add(`ui-bar-${theme}`));
}
;
$(document).on('pageinit', getTheme);
