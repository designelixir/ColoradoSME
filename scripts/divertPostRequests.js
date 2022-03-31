import { getOrderItem , getInventory } from './inventorize.js'
import fetch from "node-fetch";

const inventorySummary = await getInventory();

const orders = await getOrderItem();
const orderedItem = orders.result;
const goldSponsor = 'd062c74a-c25c-4134-bfa6-a5b5e9a426c2';
const silverSponsor = 'a922fce9-55f2-4e0f-a641-f3ee2687daaf';
const copperSponsor = '289d1903-ccc5-49bc-b677-6df323391de1';
const foursome = 'c26a3e4a-bbc4-4933-af0b-7d4f9198ba2d';


for (let i = 0; i < orderedItem.length; i++) {
   var order = orderedItem[i];
    var orderId = order.id;
    var orderItem = order.lineItems[0].variantId

    if (orderItem === goldSponsor){
        console.log("gold"); 
        adjustGold();
        //adjust inventory by 48
        //post that order is fulfilled
    } else if (orderItem === silverSponsor){
        console.log("silver")
        //adjust inventory by 24
        //post that order is fulfilled
    } else if (orderItem === copperSponsor){
        console.log("copper")
        //adjust inventory by 16
        //post that order is fulfilled
    } else if (orderItem === foursome){
        console.log("foursome")
        //adjust inventory by 4
        //post that order is fulfilled
    } else {
        console.log("no inventorizing necessary")
        //post that marks orders at fulfilled 
    }

    // orderList[orderItem] = orderId;
    console.log("order ",i, "has an id of ", orderId, ". Line items are ", order.lineItems[0].productName, " with variant ", orderItem);
  }


async function adjustGold(){
    const response = await fetch("https://api.squarespace.com/1.0/commerce/inventory/adjustments", {

      headers: {
                'Authorization': 'Bearer 2c247a47-b073-42e9-916a-549cf0b0aeed',
                'Content-Type': 'application/json', 
                'Idempotency-Key':'jQdhkYKxhwBJrW72jPWVj8a4wts6Ea4f', 
                'User-Agent':'This is a test'}
    }, {body: '{"decrementOperations": [{"variantId": "f3548701-5696-4439-9407-c4f71718e660","quantity": 48}]}'}
    );
    console.log("its been done!!!")

  }
