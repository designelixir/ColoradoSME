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
