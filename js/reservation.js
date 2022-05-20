let favorites = []

var $ = function (id) {
    return document.getElementById(id);
}

function validateForm() {
    var regexphoneus = /^(\d{3})-(\d{3})-(\d{4})/
    if (isEmpty($('data_3').value.trim())) {
        alert('Name is required!');
        return false;
    }
    if ($('data_4').value.trim().length != 0 && !regexphoneus.test($('data_5').value.trim())) {
        $("phone_err").firstChild.nodeValue = " Invalid Phone number: xxx-xxx-xxxx"
        return false;
    }
    if (!validateEmail($('data_5').value.trim())) {
        alert('Email must be a valid email address!');
        return false;
    }
    if (isEmpty($('data_6').value.trim())) {
        alert('Date is required!');
        return false;
    }
    if (isEmpty($('data_7').value.trim())) {
        alert('Time is required!');
        return false;
    }

    $("reservation_form").submit(); 

}

function isEmpty(str) { return (str.length === 0 || !str.trim()); }

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,15}(?:\.[a-z]{2})?)$/i;
    return isEmpty(email) || re.test(email);
}

var setFavorites = function () {
    if (favorites.length === 0) {
        favorites = getStorage("favorite_wineries");
    }
    favorites.forEach(w => {
        $("winery").add(new Option(w));
    });
}

window.onload = function () {
    setFavorites()
    $("Submit").onclick = validateForm;
    //initMap()
}