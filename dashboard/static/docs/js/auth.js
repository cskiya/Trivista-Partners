$(document).ready(function(){
  $('#loginForm').on('submit', function(e){
      // validation code here
        e.preventDefault();
        $('#loginLoader').fadeIn(200)

        setTimeout(()=>{
          loginUser()
        }, 2000)
    });
})

function loginUser(){
  var singnInEmail = document.querySelector('#id_username')
  var singnInPassword = document.querySelector('#id_password')

  // csrf token
  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  var csrftoken = getCookie('csrftoken');

  // ##
  fd = new FormData()
  fd.append('user_email', singnInEmail.value)
  fd.append('user_password', singnInPassword.value)

  $.ajax({
    type: "POST",
    headers: {
      "X-CSRFToken": csrftoken,
    },
    url: "/accounts/login-confirm/",
    data: fd,
    dataType: "json",
    success: function (res) {
        if(res == 'Error'){
            $('#loaderDiv').fadeOut(200)
            $('#messageDiv').fadeIn(100)

            $('#messageDiv').html(
              `
              <div class="mb-3">
                <i class="fa fa-exclamation-circle site-yellow" style="font-size: 32px;"></i>
              </div>
              <h5>Login attempt failed!</h5>
              <p class="messageText greyWhite">
                  Incorrect email or password
              </p>
              <div class="mt-4">
                  <button class="Btn py-2 px-50 boldText" style="width: fit-content;" onclick="dismissloginLoader()">
                      OK
                  </button>
              </div>
              `
            )
          }

        else{
          $('#loaderDiv').fadeOut(200)
            $('#messageDiv').fadeIn(100)
            $('#messageDiv').html(
                `
                <div style="font-family: 'roboto';">
                  <div class="mb-3">
                  <i class="material-icons-outlined blueText" style="font-size: 40px;">
                    task_alt
                </i>
                  </div>
                  <h5 class="reduceH5 blueText">Logged In</h5>
              </div>
                `
            ).animate({'opacity': 1}, 300)
            setTimeout(function(){
              location.href = `/${res}`
          }, 300)
        }
    },
    cache: false,
    contentType: false,
    processData: false,
  });
  
}

function dismissloginLoader() { 
  $('#loginLoader').fadeOut(300)
  $('#loaderDiv').show()
  $('#messageDiv').hide()
}