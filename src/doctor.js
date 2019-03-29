import $ from 'jquery';

export class DocService{
  getDocsByName(name, count) {
   return new Promise(function(resolve, reject) {
     let request = new XMLHttpRequest();
     let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&location=37.773%2C-122.413%2C100&skip=0&limit=${count}&user_key=${process.env.API_KEY}`;
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
    let name = "";
    if(response.data.length === 0){
      return "Unfortunately we did not find matching result."
    }
    for (let i = 0; i < response.data.length; i++) {
      name += "<li>" + response.data.practices[i].name + "</li><br>";
    }
    return name;
  }
}
