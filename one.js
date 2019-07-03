let load_hw = async _ => {
  $.mobile.loading('show');
  let hw = await fetch('https://hhwwe-e468.restdb.io/rest/email_inbound', {
    method: 'GET',
    headers: {'x-apikey': '5d1d05031e3c8507f2caa053'},
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
