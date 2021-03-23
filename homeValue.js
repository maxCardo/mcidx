$(document).ready(function () {
    console.log('doc ready')
    // testing google varify output
    $("#submitAddressForm").on('click', function (event) {
        console.log('change made on address input')
        console.log(places)
        console.log($('#autocomplete').val())
    })
    let isNameValid, isEmailValid, isPhoneValid;

    const nameInput = $("#gss_name")
    nameInput.on("keyup", function () {
        if ($(this).val().match(/^[a-zA-Z ]{3,}$/)) {

            isNameValid = true;
            nameInput.css('border-color', 'green');

        } else {
            isNameValid = false;
            nameInput.css('border-color', 'red');

        }
    });

    const email = $("#gss_email")
    email.on("keyup", function () {
        if ($(this).val().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            isEmailValid = true;
            email.css('border-color', 'green');
        } else {
            isEmailValid = false;
            email.css('border-color', 'red');
        }
    });

    const phone = $("#gss_phone")
    phone.on("keyup", function () {
        if ($(this).val().match(/^([2-9][0-9]{2}[\-]{0,1}){2}[0-9]{4}$/)) {

            isPhoneValid = true;
            phone.css('border-color', 'green');

        } else {
            isPhoneValid = false;
            phone.css('border-color', 'red');
        }
    });

    $("#gss_name").on("blur", function () {
        if ($(this).val().match(/^[a-zA-Z ]{3,}$/)) {

            isNameValid = true;
            $("#gss_name").css('border-color', 'green');

        } else {
            isNameValid = false;
            $("#gss_name").css('border-color', 'red');

        }
    });

    $("#gss_email").on("blur", function () {
        if ($(this).val().match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {

            isEmailValid = true;
            $("#gss_email").css('border-color', 'green');

        } else {
            isEmailValid = false;
            $("#gss_email").css('border-color', 'red');
        }
    });

    $("#gss_phone").on("blur", function () {
        if ($(this).val().match(/^([2-9][0-9]{2}[\-]{0,1}){2}[0-9]{4}$/)) {

            isPhoneValid = true;
            $("#gss_phone").css('border-color', 'green');

        } else {
            isPhoneValid = false;
            $("#gss_phone").css('border-color', 'red');
        }
    });

    $("#submitAddressForm").on('click', function (event) {
        event.preventDefault()
        console.log('clicked address form')

        const step1 = $('#gss_address_form')
        step1.addClass('hidden')
        const headline = $('.form-title')
        headline.addClass('hidden')
        const step2 = $('.form-step-2')
        step2.removeClass('hidden')

    })

    $("#submitHomeValuationForm").on('click', function (event) {
        event.preventDefault()
        console.log('start pls')
        /* Home Valuation PAGE CONTACT FORM */
        if ($("#gss_contact_form").length) {

            console.log('really')


            const address = $("#autocomplete").val();
            console.log('address')
            console.log(address)

            let name = $("#gss_name")
                .val()
                .trim();
            let email = $("#gss_email")
                .val()
                .trim();
            let phone = $("#gss_phone")
                .val()
                .trim();
            let message = $("#gss_message")
                .val()
                .trim();

            let data = {
                name: name,
                email: email,
                phone: phone,
                subject: 'homeEvaluation',
                address: address,
                message: message
            };

            console.log(address);
            console.log(data)

            //""


            if (isNameValid && isEmailValid && isPhoneValid) {
                $.ajax({
                    url: "https://more-black-magic.herokuapp.com/api/web/homevalue/submit",
                    type: "post",
                    contentType: "application/json",
                    data: JSON.stringify(data),
                    success: function (responseData) {
                        var value = responseData;
                    },
                    error: function (responseData, errorThrown) {
                        alert('POST failed.');
                    }
                })
                    .done(function () {
                        window.location.replace("https://fifthgrant.com/thankyou.html");
                    });

            }

        }
        /* END OF Home Valuation PAGE CONTACT FORM */
    })
})