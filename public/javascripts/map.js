$(document).ready(() => {
$('#logout').click(function(){
  console.log('test')
  event.preventDefault();

  const logout = {
    dataType: 'json',
    type: 'DELETE',
    url: '/token'
  };

  $.ajax(logout)
    .done(()=>{
      window.location.href = '/';
    })
    .fail(()=>{
      window.location.href='/';
      console.error(err);
      console.error('something went wrong..')
    })


})
$.getJSON('/token')
  .done((data)=>{
    if(data===false){
      window.location.href = '/'
    }else{

    }
  })

})
