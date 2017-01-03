$(document).ready(function() {
    $('.form-register').validate({
        rules: {
            first: {
                required: true
            },
            last: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                minlength: 6,
                required: true
            },
            password2: {
                minlength: 6,
                required: true
            },
            dob: {
                required: true,
                date: true
            }
        },
            success: function(element) {
                element
                .text('OK!').addClass('valid')
            }
    });
});