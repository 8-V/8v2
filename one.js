let load_hw = async _ => {
  $.mobile.loading('show');
  let hw = await fetch('https://howork-3bce.restdb.io/rest/group1', {
    method: 'GET',
    headers: {'x-apikey': '5d4da79558a35b31adeba65f'},
  }).then(x => x.json());

  if ('message' in hw) {
    $.unblockUI();
    $.blockUI({
      message: predmets.message,
    });
    return;
  }
  parse_hw(hw);
  $('#hw1').collapsibleset('refresh');
  $.mobile.loading('hide');
};

let parse_hw = hw => {
  for (let predmet of hw) {
    let x = $(
      `<div data-role="collapsible" data-filtertext="${predmet.subject}">`,
    ).html(`<h3>${predmet.subject}</h3>${predmet.body}`);
    x.appendTo($('#hw1'));
  }
  return true;
};

load_hw();
