const setTheme = _=>{
    localStorage.theme = $('#theme:checked').length ? 'b' : 'a';
    getTheme();
}

$(document).one('pageinit', ()=>{
    $('#theme').on('click', setTheme);
}
);
