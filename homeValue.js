$(document).ready(function () {

    let isNameValid, isEmailValid, isPhoneValid;

    const leadData = {
        buyer: {
            buyer_type: {required: true, valid: false, value: ''},
            buyer_exp: { required: true, valid: false, value: '' },
            buyer_timeframe: { required: true, valid: false, value: '' },
        }, 
        seller: {
            seller_timeframe: { required: true, valid: false, value: '' },
            property_condition: { required: true, valid: false, value: '' },
        }
    }

    //validation
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

    
    //submit page/form
    $("#submitAddressForm").on('click', function (event) {
        event.preventDefault()
        const valid = places.address_components
        const address = $("#autocomplete")
        if (valid) {
            console.log(places);
            const step1 = $('#gss_address_form')
            step1.addClass('hidden')
            const headline = $('.form-title')
            headline.addClass('hidden')
            $('.form-steps').removeClass('hidden')
            const step2 = $('.form-step-2')
            step2.removeClass('hidden')
        }else if(!valid && !address.val()){
            console.log($("#autocomplete").val());
            alert('Please Enter A Valid Address')
        }
    })

    let type 
    $(".gss_interest_type").on('click', function (e) {
        type = $(e.target)
        if ($(e.target).val() === 'buyer') {
            $('.form-step-2').addClass('hidden')
            $('#step-3-buy').removeClass('hidden')
        } else if ($(e.target).val() === 'seller') {
            $('.form-step-2').addClass('hidden')
            $('#step-3-sell').removeClass('hidden')
        }
    })

    //update form data 
    $(".form-update").on('click', function (e) {
        const current = $(e.target).parent().attr('id')
        let next = $(e.target).parent().attr('next')

        console.log(e.target.value);
        
        //update the value
        leadData[type.val()][$(e.target).parent().attr('id')].value = e.target.value
        leadData[type.val()][$(e.target).parent().attr('id')].valid = true

        //go to next quastion or if no other go to next step
        if (next != 'false') {
            console.log(`#${current}`);
            $(`#${current}`).addClass('hidden')
            $(`#${next}`).removeClass('hidden')
        }else{
            $('.form-step-3').addClass('hidden')
            $('.form-step-4').removeClass('hidden')
            console.log('leadData: ', leadData);
        }
    })
    

    $("#submitHomeValuationForm").on('click', function (event) {
        $("#submitHomeValuationForm").prop('disabled', true).text('....')
        event.preventDefault()
        console.log('start pls')
        /* Home Valuation PAGE CONTACT FORM */
        if ($(".gss_contact_form").length) {

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
            let data = {
                name: name,
                email: email,
                phone: phone,
                subject: 'home-value',
                propertyAddress: places.address_components,
                leadType: type.val(),
                leadData: leadData[type.val()] 
            };

            console.log('data: ', data)

            //""
            const testURL = "http://localhost:8080/api/web/homevalue/submit" 

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