function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 43.8356, lng: 25.9657 },
        zoom: 13
    });

    var input = document.getElementById('pac-input'),
        autocomplete = new google.maps.places.Autocomplete(input),
        infowindow = new google.maps.InfoWindow(),
        infowindowContent = document.getElementById('infowindow-content');

    infowindow.setContent(infowindowContent);

    var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29),
        icon: image
    });

    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();

        if (!place.geometry) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    });

    var geocoder = new google.maps.Geocoder();

    google.maps.event.addListener(map, 'click', function (event) {
        geocoder.geocode(
            {
                latLng: event.latLng
            },
            function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        input.value = results[0].formatted_address;
                    }
                }
                
                marker.setPosition(event.latLng);
            }
        );
    });
}

$(function () {
    $("form[name='user-data']").on('submit', function (e) {
        
        if (localStorage.length > 0) {
            var userData = localStorage.getItem('user-data');
            var email = JSON.parse(userData).email;

            if ($("input[name='email']").val() === email) {
                e.preventDefault();
                swal('Warning!', 'This email exist!', 'error');
            }
        }

        if ($('.error').text().length > 0) {
            e.preventDefault();
            swal('Warning!', 'Form has incorect fiends!', 'error');
        } else {
            var inputs = $("form[name='user-data'] input");
            var values = {};

            inputs.each(function () {
                values[$(this).attr('name')] = $(this).val();
            });

            localStorage.setItem('user-data', JSON.stringify(values));
        }
    });

    var regexSpecial = /^[^~!@#$%&*()'" -\[\]\{\}\<\>\^+=:,;?/\\]+$/,
        regexNumbers = /^([^0-9]*)$/,
        regexLetters = /^([^a-zA-Z]*)$/;

    $("input[name='name']").on('input', function () {
        var regex = /^[a-zA-Z]{4,10}$/,
            input = $(this),
            inputVal = input.val(),
            error = input.next('.error');

        if (!inputVal.match(regex)) {
            if (inputVal === '') {
                error.fadeOut();
            } else if (inputVal.length < 4 && inputVal.length > 0) {
                error.fadeIn().text('The name should be minimum 4 symbols!');
            } else if (inputVal.length > 10) {
                error.fadeIn().text('The name should be maximum 10 symbols!');
            } else if (!inputVal.match(regexNumbers)) {
                error.fadeIn().text('The name should not contain numbers!');
            } else if (!inputVal.match(regexSpecial)) {
                error.fadeIn().text('The name should not contain special characters!');
            }
        } else {
            error.text('');
            error.fadeOut();
        }
    });

    $("input[name='phone']").on('input', function () {
        var regex = /^[0-9\-\+\ ]{9,20}$/,
            input = $(this),
            inputVal = input.val(),
            error = input.next('.error');

        if (!input.val().match(regex)) {
            if (inputVal === '') {
                error.fadeOut();
            } else if (inputVal.length < 9) {
                error.fadeIn().text('The phone should be minimum 9 numbers!');
            } else if (inputVal.length > 20) {
                error.fadeIn().text('The phone should be maximum 20 numbers!');
            } else if (!inputVal.match(regexLetters)) {
                error.fadeIn().text('The phone should not contain letters!');
            } else if (!inputVal.match(regexSpecial)) {
                error.fadeIn().text('The phone should not contain special characters!');
            }
        } else {
            error.text('');
            error.fadeOut();
        }
    });

    $("input[name='email']").on('input', function () {
        var regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            input = $(this),
            inputVal = input.val(),
            error = input.next('.error');

        if (inputVal === '') {
            error.fadeOut();
        } else if (!input.val().match(regex)) {
            error.fadeIn().text('Invalid email!');
        } else {
            error.text('');
            input.next('.error').fadeOut();
        }
    });

    $("input[name='website']").on('input', function () {
        var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
            input = $(this),
            inputVal = input.val(),
            error = input.next('.error');

        if (inputVal === '') {
            error.fadeOut();
        } else if (!input.val().match(regex)) {
            error.fadeIn().text('Invalid url!');
        } else {
            error.text('');
            input.next('.error').fadeOut();
        }
    });
});
