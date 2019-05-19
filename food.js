let calc_food = ()=>{
    let result = $('#food-result');
    let count_by = {
        '0': 0,
        '5': 0,
        '30': 0,
        '35': 0,
    };
    document.querySelectorAll('#food-group input').forEach(chbox=>{
        if ('undefined' != typeof chbox && !chbox.checked)
            count_by[chbox.name]++;
    }
    );
    let price = count_by['5'] * 5 + count_by['30'] * 30 + count_by['35'] * 35;
    result.html(`<p>${count_by['0'] + count_by['5'] + count_by['30'] + count_by['35']} человек</p><p>${count_by['0']} бесплатников</p><p>${count_by['5']} по 5 грн</p><p>${count_by['30']} по 30 грн</p><p>${count_by['35']} по 35</p><p>Итого ${price} грн.</p>`, );
}

$(document).one('pagebeforeshow', ()=>{
    $(document).on('swiperight', '.ui-page', ()=>{
        $.mobile.changePage('#main', {
            transition: 'slide',
            reverse: true,
        });
    }
    );
    let group = $('#food-group')[0].form;
    for (let child of group) {
        $(child).on('change', calc_food);
    }
    calc_food();
}
);
