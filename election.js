document.addEventListener("DOMContentLoaded", function(e) {
  var votes = document.querySelector('button');
  var list = document.querySelector('#results_data');
  votes.addEventListener('click', function(){
    $.ajax({
      url: 'https://bb-election-api.herokuapp.com/',
      method: 'GET',
      datatype: 'json'
    }).done(function(responseData) {
        var candidate = responseData.candidates
        for (var i = 0; i < candidate.length; i++){
          var listItem = document.createElement('li')
          listItem.innerHTML = 'Name: ' + candidate[i].name + ' ' + 'Votes: ' + candidate[i].votes;
          list.append(listItem);

          var voteForm = document.createElement('form');
          voteForm.setAttribute('method', 'POST');
          voteForm.setAttribute('action', 'https://bb-election-api.herokuapp.com/vote');
          listItem.append(voteForm);

          var hiddenFeild = document.createElement('input');
          hiddenFeild.setAttribute('type', 'hidden')
          hiddenFeild.setAttribute('name', 'id');
          hiddenFeild.setAttribute('value', responseData.candidates[i].id);
          voteForm.append(hiddenFeild);

          var submitButton = document.createElement('input');
          submitButton.setAttribute('type', 'submit')
          submitButton.setAttribute('class', 'submit')
          voteForm.append(submitButton);

          document.querySelectorAll('form')[i].addEventListener('submit', function (e) {
            e.preventDefault();
            var vote = $(this).children('input[type=hidden]').val();
            $.ajax({
                  url: 'https://bb-election-api.herokuapp.com/vote?id=' + vote,
                  method: 'POST',
                  datatype: 'json'
                }).done(function(responseData) {
                    console.log('voted');
                }).fail(function(responseData){
                    console.log('something went wrong');
                  });
            });
        }

    });
  });

    // var refreshButton = document.querySelector('#refresh');
    // refreshButton.addEventListener('click', function(e) {
    //   e.preventDefault();
    //   $.ajax({
    //     url: 'https://bb-election-api.herokuapp.com/',
    //     method: 'GET',
    //     datatype: 'json'
    //   }).done(function(responseData) {
    //       var candidate = responseData.candidates
    //       for (var i = 0; i < candidate.length; i++){
    //           document.querySelector('li').innerHTML = 'Name: ' + candidate[i].name + ' ' + 'Votes: ' + candidate[i].votes;
    //       }
    //     });
    // })


});
