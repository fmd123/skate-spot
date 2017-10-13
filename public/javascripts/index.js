$(document).ready(() => {
  console.log('test')

  $('#loginForm').submit(function(event) {
    event.preventDefault()

    const email = $('#email').val()
    const password = $('#pwd').val()


    if (!email) {
      alert('yo bro, need yr email STAT')
    }
    if (!password) {
      alert('who you foolin dawg? no password?')
    }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify({email, password}),
      dataType: 'json',
      type: 'POST',
      url: '/token'
    }


    $.ajax(options)
      .done((data) => {
        console.log('success')
        window.location.href = '/map'
      })
      .fail(($xhr) => {
        console.log($xhr.responseText)
        window.location.href = '/'
      })

    console.log(email)
    console.log(password)
    console.log('test')
  })
})

  //
  // $('#loginForm').bootstrapValidator({
  //     // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
  //     feedbackIcons: {
  //         valid: 'glyphicon glyphicon-ok',
  //         invalid: 'glyphicon glyphicon-remove',
  //         validating: 'glyphicon glyphicon-refresh'
  //     },
  //     fields: {
  //
  //    user_name: {
  //             validators: {
  //                  stringLength: {
  //                     min: 8,
  //                 },
  //                 notEmpty: {
  //                     message: 'Please enter your Username'
  //                 }
  //             }
  //         },
  //    user_password: {
  //             validators: {
  //                  stringLength: {
  //                     min: 8,
  //                 },
  //                 notEmpty: {
  //                     message: 'Please enter your Password'
  //                 }
  //             }
  //         },
  //   confirm_password: {
  //             validators: {
  //                  stringLength: {
  //                     min: 8,
  //                 },
  //                 notEmpty: {
  //                     message: 'Please confirm your Password'
  //                 }
  //             }
  //         },
  //         email: {
  //             validators: {
  //                 notEmpty: {
  //                     message: 'Please enter your Email Address'
  //                 },
  //                 emailAddress: {
  //                     message: 'Please enter a valid Email Address'
  //                 }
  //             }
  //         },
  //             }
  //         })
  //     })
  //     .on('success.form.bv', function(e) {
  //         $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
  //             $('#loginForm').data('bootstrapValidator').resetForm();
  //
  //         // Prevent form submission
  //         e.preventDefault();
  //
  //         // Get the form instance
  //         var $form = $(e.target);
  //
  //         // Get the BootstrapValidator instance
  //         var bv = $form.data('bootstrapValidator');
  //
  //         // Use Ajax to submit form data
  //         $.post($form.attr('action'), $form.serialize(), function(result) {
  //             console.log(result);
  //         }, 'json');
  //     });
