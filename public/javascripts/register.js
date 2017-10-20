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
      console.log('success in register')
      window.location.href = '/'
    })
    .fail(($xhr)=>{
      console.log($xhr.responseText)
    })
    console.log('test4')

})
console.log('test5')


});
