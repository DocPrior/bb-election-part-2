document.addEventListener("DOMContentLoaded", function() {
var votes = document.querySelector('button');
var list = document.querySelector('#results_data');
votes.addEventListener('click', function(){
  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    datatype: 'json'
  }).done(function(responseData) {

      for (var i = 0; i < responseData.candidates.length; i++){
        var listItem = document.createElement('li')
        listItem.innerHTML = 'Name: ' + responseData.candidates[i].name + ' ' + 'Votes: ' + responseData.candidates[i].votes;
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
        submitButton.innerHTML = 'vote';
        voteForm.append(submitButton);
      }
  });
})



});
