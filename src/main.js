import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import {DocService} from "./doctor"

$(document).ready(function() {
  $('#name-form').submit(function(event) {
    event.preventDefault();
    let name = $('#name').val();
    let count = $('#count').val();
console.log(name);
    let docService = new DocService();
    let promise = docService.getDocsByName(name, count);

    promise.then(function(response) {
      let body = JSON.parse(response);
      let docService = new DocService();
      $('.name').prepend(docService.printName(body));
      $('.address').prepend(docService.printAddress(body));
      $('.accepts').prepend(docService.printAcceptPat(body));
    }, function(error) {
      $('.error').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
