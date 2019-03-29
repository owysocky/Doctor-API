import $ from 'jquery';

export class DocService{
  getDocsByName(name, count) {
   return new Promise(function(resolve, reject) {
     let request = new XMLHttpRequest();
     let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&location=37.773%2C-122.413%2C100&skip=0&limit=${count}&user_key=${process.env.exports.apiKey}`;
     request.onload = function() {
       if (this.status === 200) {
         resolve(request.response);
       } else {
         reject(Error(request.statusText));
       }
     }
     request.open("GET", url, true);
     request.send();
   });
 }

 printName(response){
    let result = "";
    if(response.data.length === 0){
      return "Unfortunately we did not find matching result."
    }
    for (let i = 0; i < response.data.length; i++) {
      result += "<li>" + response.data[i].profile.first_name + " " + response.data[i].profile.last_name + "</li><br>";
    }
    return result;
  }

  printAddress(response){
    let result = "";
    for (let i = 0; i < response.data.length; i++) {
      result += "<li>" + response.data[i].practices[0].visit_address.street + " " + response.data[i].practices[0].visit_address.city + " " + response.data[i].practices[0].visit_address.state + " " + response.data[i].practices[0].visit_address.zip + "</li><br>";
    }
     return result;
   }

   printPhone(response){
      let result = "";
      for (let i = 0; i < response.data.length; i++) {
        result += "<li>" + response.data[i].practices[0].phones[0].number + "</li><br>";
      }
      return result;
    }

   printAcceptPat(response){
    let result = "";
    for (let i = 0; i < response.data.length; i++) {
      result += "<li>" + response.data[i].practices[0].accepts_new_patients + "</li><br>";
    }
    return result;
  }
}




// https://api.betterdoctor.com/2016-03-01/practices?name=${practice}&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=1&user_key=f2f8f15acc3f3990a5e660f0f2aca967
