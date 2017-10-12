$(document).ready(()=>{
  console.log('test')

$('#registerForm').submit(function(event){
  event.preventDefault()

  const user_name = $('.userNameInput').val()
  const first_name = $('.firstNameInput').val()
  const last_name = $('.lastNameInput').val()
  const password = $('.passwordInput').val()
  const confirm_password = $('.confirmPasswordInput').val()
  const email = $('.emailInput').val()

  console.log(user_name);
  console.log(first_name);
  console.log(last_name);
  console.log(email);
  console.log(password);
  console.log(confirm_password);

  // if(!userName) {
  //   alert('need a user name dawgie!')
  // }
  // if(!firstName) {
  //   alert('what about that first name??')
  // }

  const options = {
    contentType: 'application/json',
    data: JSON.stringify({user_name, first_name, last_name, password, confirm_password, email}),
    dataType: 'json',
    type: 'POST',
    url: '/users'
  }

  console.log('test3')


  $.ajax(options)
    .done((data)=>{
      console.log('success')
      window.location.href = '/map'
    })
    .fail(($xhr)=>{
      console.log($xhr.responseText)
    })
    console.log('test4')

})
console.log('test5')


});

  //  $('#contact_form').bootstrapValidator({
  //      // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
  //      feedbackIcons: {
  //          valid: 'glyphicon glyphicon-ok',
  //          invalid: 'glyphicon glyphicon-remove',
  //          validating: 'glyphicon glyphicon-refresh'
  //      },
  //      fields: {
  //          first_name: {
  //              validators: {
  //                      stringLength: {
  //                      min: 2,
  //                  },
  //                      notEmpty: {
  //                      message: 'Please enter your First Name'
  //                  }
  //              }
  //          },
  //           last_name: {
  //              validators: {
  //                   stringLength: {
  //                      min: 2,
  //                  },
  //                  notEmpty: {
  //                      message: 'Please enter your Last Name'
  //                  }
  //              }
  //          },
  //     user_name: {
  //              validators: {
  //                   stringLength: {
  //                      min: 8,
  //                  },
  //                  notEmpty: {
  //                      message: 'Please enter your Username'
  //                  }
  //              }
  //          },
  //     user_password: {
  //              validators: {
  //                   stringLength: {
  //                      min: 8,
  //                  },
  //                  notEmpty: {
  //                      message: 'Please enter your Password'
  //                  }
  //              }
  //          },
  //    confirm_password: {
  //              validators: {
  //                   stringLength: {
  //                      min: 8,
  //                  },
  //                  notEmpty: {
  //                      message: 'Please confirm your Password'
  //                  }
  //              }
  //          },
  //          email: {
  //              validators: {
  //                  notEmpty: {
  //                      message: 'Please enter your Email Address'
  //                  },
  //                  emailAddress: {
  //                      message: 'Please enter a valid Email Address'
  //                  }
  //              }
  //          },
  //          contact_no: {
  //              validators: {
  //                stringLength: {
  //                      min: 12,
  //                      max: 12,
  //                  notEmpty: {
  //                      message: 'Please enter your Contact No.'
  //                   }
  //              }
  //          },
  //     department: {
  //              validators: {
  //                  notEmpty: {
  //                      message: 'Please select your Department/Office'
  //                  }
  //              }
  //          },
  //              }
  //          }
  //      })
  //      .on('success.form.bv', function(e) {
  //          $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
  //              $('#contact_form').data('bootstrapValidator').resetForm();
   //
  //          // Prevent form submission
  //          e.preventDefault();
   //
  //          // Get the form instance
  //          var $form = $(e.target);
   //
  //          // Get the BootstrapValidator instance
  //          var bv = $form.data('bootstrapValidator');
   //
  //          // Use Ajax to submit form data
  //          $.post($form.attr('action'), $form.serialize(), function(result) {
  //              console.log(result);
  //          }, 'json');
  //      });
