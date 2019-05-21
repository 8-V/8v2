let load_hw = async _=>{
    let hw = await fetch('https://homework-63c7.restdb.io/rest/email_inbound',{method:'GET',headers:{'x-apikey':'5c6ecf1828ca2e129e8696e8',},}).then(x=>x.json());

    if ('message'in hw) {
        $.unblockUI();
        $.blockUI({
            message: predmets.message,
        });
        return;
    }
    parse_hw(hw);
    $('#hw1').collapsibleset('refresh');
}

let parse_hw = hw=>{

    for (let predmet of hw) {
        let x = $(`<div data-role="collapsible" data-filtertext="${predmet.subject}">`, ).html(`<h3>${predmet.subject}</h3>${predmet.body}`);
        x.appendTo($('#hw1'));
    }
    return true;
}

load_hw()
