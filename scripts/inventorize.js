console.log("shaaaaa ----------------------------------------------------------------------------------------");

import fetch from "node-fetch";

    const getInventory=async()=>{
      const response = await fetch("https://api.squarespace.com/1.0/commerce/inventory", {

        headers: {'Authorization': 'Bearer 2c247a47-b073-42e9-916a-549cf0b0aeed', 
                  'Idempotency-Key':'jQdhkYKxhwBJrW72jPWVj8a4wts6Ea4f', 
                  'User-Agent':'This is a test'}
      });
      const data = await response.json();
      const data2 = data.inventory;
      return data2;
    }


    const getOrderItem=async()=>{
        const response = await fetch("https://api.squarespace.com/1.0/commerce/orders?&fulfillmentStatus=PENDING", {
  
          headers: {'Authorization': 'Bearer 2c247a47-b073-42e9-916a-549cf0b0aeed', 
                    'User-Agent':'This is a test'}
        });
        const orderData = await response.json();
        return orderData;
      }

      

export {getInventory};
export {getOrderItem};





    



