

console.log("API CALLED -----------------------------------------------------------------");

var url = "https://api.squarespace.com/1.0/commerce/orders?&fulfillmentStatus=PENDING";

var xhr = new XMLHttpRequest();
xhr.open("GET", url, true);

xhr.setRequestHeader("Authorization", "Bearer 2c247a47-b073-42e9-916a-549cf0b0aeed");
xhr.setRequestHeader("User-Agent", "halp me");
xhr.setRequestHeader("Access-Control-Allow-Origin", url);
xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
xhr.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");



xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
    //   console.log(xhr.responseText);
      var daResponse = xhr.responseText;
      console.log(daResponse);
   }};

xhr.send();



