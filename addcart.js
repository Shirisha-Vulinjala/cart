
let cartarray=document.getElementsByClassName('cartButton');// or we can use querySelectorAll(."classname")

let products=[
    { 
        name: 'Samsung Galaxy Tab A7 26.31 cm(10.4 inch),Slim Metal Body,Quad Speakers with Dolby Atoms,RAM 3 GB,ROM 32 GB  Expandable,Wi-Fi only,Gold',
        tag: 'samsungGtabA7',
        price:17789,
        incart:0                                                                                                
    },
    { 
        name: '2021 Apple 10.2-inch (25.91 cm) iPad with A13 Bionic chip (Wi-Fi, 64GB) - Space Grey (9th Generation)',
        tag: 'appleipad',
        price:30900,
        incart:0                                                                                                
    },
    { 
        name: 'Lenovo Tab M10 HD 2nd Gen (25.65 cm (10.1 inch), 2 GB, 32 GB, Wi-Fi) with Metallic Body and Octa core Processor',
        tag: 'Lenovotab2ndGen',
        price:9999,
        incart:0                                                                                                
    },
    { 
        name: 'Lenovo Tab M10 FHD Plus Tablet (26.16 cm (10.3-inch), 4GB, 128GB, Wi-Fi + LTE, Volte Calling), Platinum Grey',
        tag: 'Lenovo-tab-FHD-plus',
        price:18990,
        incart:0                                                                                                
    },
    { 
        name: 'Samsung Galaxy Tab A7 Lite',
        tag: 'Samsung Galaxy Tab A7 Lite 22.05 cm (8.7 inch), Slim Metal Body, Dolby Atmos Sound, RAM 3 GB, ROM 32 GB Expandable, Wi-Fi-only Tablet, Gray',
        price:11883,
        incart:0                                                                                                
    },
    { 
        name: 'Lenovo Yoga Smart Tablet with The Google Assistant 25.65 cm (10.1 inch, 4GB, 64GB, WiFi + 4G LTE), Iron Grey',
        tag: 'lenovo-yoga-smart',
        price:25999,
        incart:0                                                                                                
    }

];
for(let i=0;i<cartarray.length;i++)
{
    
    cartarray[i].addEventListener('click',()=> {
        cartNumbers(products[i]);
        totalCost(products[i]);

    })
}
function onLoadCartNumbers(){   // independent of event i.e; gets executed when the page loads
    let productNumbers=localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent=productNumbers;
    }

}
function cartNumbers(product){

    let productNumbers=localStorage.getItem('cartNumbers');
  productNumbers=parseInt(productNumbers);

  if(productNumbers){
     
    localStorage.setItem('cartNumbers',productNumbers+1);
    document.querySelector('.cart span').textContent=productNumbers+1;
} 
else{
    localStorage.setItem('cartNumbers',1);
    document.querySelector('.cart span').textContent=1;

}
setItems(product);
}

function setItems(product){
    let cartItems=localStorage.getItem('productsInCart');  // cartitems returns array
    cartItems=JSON.parse(cartItems);
    if(cartItems !=null){
        if(cartItems[product.tag]==undefined){
            cartItems={
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag]['incart']+=1;// equivalent to cartItems[product.tag]['incart']=cartItems[product.tag]['incart']+1;
                                             // we can use .incart or ['incart']
    }
    else{
       
        product.incart=1;
     cartItems={
        [product.tag]:product
    }
}
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
    

}
function totalCost(product){
    let cartCost=localStorage.getItem('totalCost');
    // cartcost will be in string format as we are fetching from 
    //local storage so need to be parsed.
    
    if(cartCost != null)
    {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost+(product.price));

    }
    else{
        
    localStorage.setItem("totalCost",product.price);
}
}
// function for displaying local storage data into cart page
function displayCart(){
    let cartItems=localStorage.getItem("productsInCart");
    let cartCost=localStorage.getItem('totalCost');
    cartItems=JSON.parse(cartItems);
    let productContainer=document.querySelector(".productimages");
    if(cartItems&&productContainer){
        productContainer.innerHTML=" ";
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML +=`
        <div class="display">
            <div class="product-title"><span>
              <ion-icon name="close-circle-outline"></ion-icon></span>
              <img src="./tabimages/${item.tag}.jpg">
              <p >
              ${item.name}
              </p>
            </div>
            
            <div class="price">
            ${item.price}

            </div>
                  
                       
            <div class="quantity">
              <button class="btn minus-btn disabled" type="button">-</button>
              <span>${item.incart}</span>
              <button class="btn plus-btn" type="button">+</button>
              
            </div>
            
            <div class="total">
            
              ${item.incart*item.price}
            </div>  
         </div>
            `;


        });
        productContainer.innerHTML+=`
        <div class="overAllCostContainer">
        <h5 class="overAllCostTitle"> OverallPrice</h5>
        <h5 class="overAllCost">
        ${cartCost}
        </h5>`;


    }

}

//whenever we load the page the following function gets executed
onLoadCartNumbers();
displayCart();