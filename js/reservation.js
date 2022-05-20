
function validateForm() {
    var regexphoneus = /^(\d{3})-(\d{3})-(\d{4})/
    if (isEmpty($('data_3').value.trim())) {
        alert('Name is required!');
        return false;
    }
    if ($('data_4').value.trim().length != 0 && !regexphoneus.test($('data_4').value.trim())) {
        $("phone_err").firstChild.nodeValue = " Invalid Phone number: xxx-xxx-xxxx"
        return false;
    }
    if (!validateEmail($('data_5').value.trim())) {
        alert('Email must be a valid email address!');
        return false;
    }
    if (isEmpty($('data_6').value)) {
        alert('Date is required!');
        return false;
    }

    var now = new Date();
    now.setHours(0,0,0,0);
    var given = new Date($("data_6").value)
    let diff = new Date().getTime() - given.getTime();
    if (diff > 0) {
        $("date_err").firstChild.nodeValue = " Date happens in the past"
        return
    }

    if (isEmpty($('data_7').value)) {
        alert('Time is required!');
        return false;
    }
    let fav = $("winery").value;
    if (favorites.indexOf(fav) == -1) {
        favorites.push(fav);
        setStorage("favorite_wineries", favorites);
    }
    if (reservations.indexOf(fav) == -1) {
        reservations.push(fav);
        setStorage("reserved_wineries", reservations);
    }
    $("reservation_form").submit();
}

function isEmpty(str) { return (str.length === 0 || !str.trim()); }

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,15}(?:\.[a-z]{2})?)$/i;
    return isEmpty(email) || re.test(email);
}


window.onload = function () {
    sortWinery()
    wineries.forEach(w => {
        $("winery").add(new Option(w.name));
    });
    $("Submit").onclick = validateForm;
    //initMap()
}