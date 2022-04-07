
import fetch from "../node_modules/node-fetch";


function BALLS(){
    console.log("HEY YOU"); 
    alert("HEYYYYYYYYYYYYYYY")
}

BALLS()

console.log("shaaaaa ----------------------------------------------------------------------------------------");

const getOrderItem=async()=>{
    console.log("getting orders.")
    const response = await fetch("https://api.squarespace.com/1.0/commerce/orders?&fulfillmentStatus=PENDING", {
        headers: {'Authorization': 'Bearer 2c247a47-b073-42e9-916a-549cf0b0aeed', 
                    'User-Agent':'Getting PENDING Orders'}
    });
    const orderData = await response.json();
    return orderData;
}

getOrderItem();


      

const orders = await getOrderItem();
const orderedItem = orders.result;
const goldSponsor = 'd062c74a-c25c-4134-bfa6-a5b5e9a426c2';
const silverSponsor = 'a922fce9-55f2-4e0f-a641-f3ee2687daaf';
const copperSponsor = '289d1903-ccc5-49bc-b677-6df323391de1';
const foursome = 'c26a3e4a-bbc4-4933-af0b-7d4f9198ba2d';
const bbq = '99525432-f0a4-4055-beb4-ae714d5de494';
const bar = '1b433fe5-7352-4759-81ad-d4db07830d06';
const golfcart = 'fe8587a7-e54e-4e38-ae84-997020dc4a8a';

var totalAdjust = 0; 

console.log("there are a total of ", orderedItem.length, " unfulfilled orders. getting quantities to adjust...");

for (let i = 0; i < orderedItem.length; i++) {
   var order = orderedItem[i];
    var orderId = order.id;
    var orderItem = order.lineItems[0].variantId

    if (orderItem === goldSponsor){
        totalAdjust +=48;
        //adjust inventory by 48
    } else if (orderItem === silverSponsor){
        totalAdjust +=24;
        //adjust inventory by 24
    } else if (orderItem === copperSponsor){
        totalAdjust +=16;
        //adjust inventory by 16
    } else if (orderItem === bbq){
        totalAdjust +=12;
        //adjust inventory by 12
    } else if (orderItem === bar){
        totalAdjust +=8;
        //adjust inventory by 8
    } else if (orderItem === golfcart){
        totalAdjust +=8;
        //adjust inventory by 8
    }else if (orderItem === foursome){
        totalAdjust +=4;
        //adjust inventory by 4
    } else {
        console.log("no inventorizing necessary")
        fulfillOrder(orderId);
    }
    console.log("order ",i, "has an id of ", orderId, ". Line items are ", order.lineItems[0].productName, " with variant ", orderItem);
  }


async function adjustInventory(totalAdjust){
    console.log("adjusting individual tickets by ", totalAdjust);
    var foursomeAdjust = totalAdjust / 4; 
    console.log("adjust foursomes by ", foursomeAdjust);
    const response = await fetch("https://api.squarespace.com/1.0/commerce/inventory/adjustments", {

      headers: {
                'Authorization': 'Bearer 2c247a47-b073-42e9-916a-549cf0b0aeed',
                'Content-Type': 'application/json', 
                'Idempotency-Key':'jQdhkYKxhwBJrW72jPWVj8a4wts6Ea4f', 
                'User-Agent':'This is a test'}
    }, {body: '{"decrementOperations": [{"variantId": "f3548701-5696-4439-9407-c4f71718e660","quantity": totalAdjust}, {"variantId": "c26a3e4a-bbc4-4933-af0b-7d4f9198ba2d","quantity": foursomeAdjust}]}'}
    );
    console.log("inventory has been adjusted.")
    fulfillOrder(orderId);
}

//get total ticket and make a check for if certain items should be sold out 

adjustInventory(totalAdjust);

async function fulfillOrder(orderId){
    console.log("now let's fulfill this order", orderId);
    var fulfillUrl = "https://api.squarespace.com/1.0/commerce/orders/" + orderId + "/fulfillments";
    console.log("using this link ", fulfillUrl);
    const response = await fetch(fulfillUrl, {

        headers: {
            'Authorization': 'Bearer 2c247a47-b073-42e9-916a-549cf0b0aeed',
            'Content-Type': 'application/json', 
            'User-Agent':'This is to fulfill an order.'}
        }, 
        {body: '{"shouldSendNotification": false}'}
    )
        console.log(response);
}
// , "shipments": [{"shipDate": "2022-08-22T00:00:00.726Z", "carrierName": "USPS", "service": "Digital Delivery", "trackingNumber": "9400109699939624119857","trackingUrl": "https://www.fedex.com/apps/fedextrack/?tracknumbers=103932814692659"}]}


export {getOrderItem, adjustInventory, fulfillOrder};