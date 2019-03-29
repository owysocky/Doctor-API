import $ from 'jquery';

export class DocService{
  getDocsByName(name, count) {
   return new Promise(function(resolve, reject) {
     let request = new XMLHttpRequest();
     let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&location=47.611%2C-122.340%2C090&skip=0&limit=${count}&user_key=${process.env.exports.apiKey}`;
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

 getDocsByPractice(practice, count) {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${practice}&location=47.611%2C-122.340%2C090&skip=0&limit=${count}&user_key=${process.env.exports.apiKey}`;
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

    printSite(response){
       let result = "";
       for (let i = 0; i < response.data.length; i++) {
         if(response.data[i].practices[0].website){
          result = "<li>" + response.data[i].practices[0].website + "<li><br>";
         }else{
           result += "<li>None<li><br>";
         }
         console.log(response.data[i].practices[0].website);
       }
       return result;
     }

    printAcceptPat(response){
      let result = "";
      for (let i = 0; i < response.data.length; i++) {
        if(response.data[i].practices[0].accepts_new_patients === true){
          result += "<li>Yes<li><br>";
        }else{
          result += "<li>No<li><br>";
        }
      }
      return result;
    }
}
