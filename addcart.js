let cartarray=document.querySelectorAll('.cartButton');

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
        name: 'Samsung Galaxy Tab A7 Lite 22.05 cm (8.7 inch), Slim Metal Body, Dolby Atmos Sound, RAM 3 GB, ROM 32 GB Expandable, Wi-Fi-only Tablet, Gray',
        tag: 'sam-galaxy-A7-lite',
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
function onLoadCartNumbers()
{   // independent of event i.e; gets executed when the page loads
    
    let productNumbers=localStorage.getItem('cartNumbers');
    if(productNumbers)
    { 
        if(productNumbers==-1)
        {
            document.querySelector('.cart span').textContent=0;
        }
        document.querySelector('.cart span').textContent=productNumbers;
    }
    else{
        document.querySelector('.cart span').textContent=0;

    }
    
   
    

}
    
function cartNumbers(product){
    
    let productNumbers=localStorage.getItem('cartNumbers');
  productNumbers=parseInt(productNumbers);
  let cartItems=localStorage.getItem('productsInCart');
  cartItems=JSON.parse(cartItems);

    if(productNumbers)
   {
      if(cartItems[product.tag]==undefined)  
           {  
           
              localStorage.setItem('cartNumbers',productNumbers+1);
      
            document.querySelector('.cart span').textContent= productNumbers+1;
           }
       else
       {
             localStorage.setItem('cartNumbers',productNumbers);      
             document.querySelector('.cart span').textContent= productNumbers;
       }
   }
      

 else
 {
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
function totalCost(product)
{
    let cartCost=localStorage.getItem('totalCost');
    // cartcost will be in string format as we are fetching from local storage so need to be parsed        
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
function displayCart()

{
    let cartItems=localStorage.getItem("productsInCart");
    let cartCost=localStorage.getItem('totalCost');
    cartItems=JSON.parse(cartItems);
    let productContainer=document.querySelector(".productimages");
    if(cartItems&&productContainer)
    {
        productContainer.innerHTML=" ";
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML +=`
    <div class="display">
            <div class="product-title"><span>
              <ion-icon name="close-circle-outline" class="remove" ></ion-icon></span>
              <a class="image">
              <img src="./tabimages/${item.tag}.jpg">
              </a>
              <p class="imagename">
              ${item.name}
              </p>
            </div>
            
            <div class="price">
            <a class="pricevalue">
            ${item.price}
            </a>
            </div>
                  
                       
            <div class="quantity">
               <button class="btn minus-btn " type="button" id="decrement"  >-</button>
            
              <span id="number" class="count"><a class="value">${item.incart}</a></span>
              <button class="btn plus-btn" type="button" id="increment" >+</button>
              
            </div>
            
            <div class="total">
            <a class="totalprice">
              ${item.incart*item.price}
              </a>
              
    </div>  
         
            `;
                            
        
        });

    
        productContainer.innerHTML+=`
        <div class="overAllCostContainer">
        <h5 class="overAllCostTitle"> OverallPrice</h5>
        <h5 class="overAllCost ">
        <a class="overall" >
        ${cartCost}
        </a>
        </h5>
        </div>`;


    }
     

}
  
// function for increment and decrement
function quantityDecrease( )
{
          let decbtn=document.querySelectorAll('.minus-btn');
          //array for fetching price
          let price=[];          
          let value=[];
          let totalprice=[];
          var OverallPrice=[]
   
          for(let k=0;k<decbtn.length;k++)
          {
            value[k]=document.querySelectorAll('.value')[k].innerText;
            price[k]= document.getElementsByClassName('pricevalue')[k].innerText;
            totalprice[k]=document.getElementsByClassName('totalprice')[k].innerText;
          }
        
          for(let i=0;i<decbtn.length;i++)
          {       
             decbtn[i].addEventListener("click", function ()
             {                              
                 value[i]=parseInt(value[i]);
                 itemCost=parseInt(price[i]);                      
                 let updatedcost=value[i]*itemCost;
                 value[i]--;
                if(value[i]<1)
                       {
                        document.getElementsByClassName("value")[i].innerHTML=1;
                        document.getElementsByClassName('totalprice')[i].innerHTML=1*itemCost;  
                     
                        // updating cart quantity in local storage 
                        let cartItems=JSON.parse(localStorage.getItem('productsInCart'));
                        let productKeys=Object.keys(cartItems);
                        console.log(productKeys[i])
                        cartItems[productKeys[i]].incart=1;
                        localStorage.productsInCart=JSON.stringify(cartItems);                   
                        
                        }
                        
                else
                       {                     
                         document.getElementsByClassName("value")[i].innerHTML=value[i];
                         document.getElementsByClassName('totalprice')[i].innerHTML=value[i]*itemCost; 
                            // updating cart quantity in local storage   
                         let cartItems=JSON.parse(localStorage.getItem('productsInCart'));
                         let productKeys=Object.keys(cartItems);
                         console.log(productKeys[i]);
                         cartItems[productKeys[i]].incart=value[i];
                         localStorage.productsInCart=JSON.stringify(cartItems);                                        
                       } 
                 overAllAmount(); 
                 quantityIncrease();     
                   
                     
                          
                     
             })               
                    
                
    } 
    
  
}
 // function to increase the quantity

function quantityIncrease( )
{

    let plusbtn=document.getElementsByClassName('plus-btn');
    let price=[];  //stores price
    let values=[];// stores quantity
    let totalprice=[];// stores total price
    for(let i=0;i<plusbtn.length;i++)
    {
        values[i]=document.getElementsByClassName('value')[i].innerText;
        price[i]= document.getElementsByClassName('pricevalue')[i].innerText;
        totalprice[i]=document.getElementsByClassName('totalprice')[i].innerText;
      
    }
    
    for(let i=0;i<plusbtn.length;i++)
    {
        plusbtn[i].addEventListener("click",function ()
        {
            values[i]=parseInt(values[i]);
             price[i]=parseInt(price[i]);
                     
            values[i]++;
            document.getElementsByClassName('value')[i].innerHTML=values[i];
            document.getElementsByClassName('totalprice')[i].innerHTML=values[i]*price[i];

             // updating cart quantity in local storage   
             let cartItems=JSON.parse(localStorage.getItem('productsInCart'));
             let productKeys=Object.keys(cartItems);
             console.log(productKeys[i]);
             cartItems[productKeys[i]].incart=values[i];
             localStorage.productsInCart=JSON.stringify(cartItems);  
             // calling functions to update the changes
            overAllAmount() ;
            quantityDecrease();
            

        })
       
    }
   
     
}

/// updating OverAllprice for increment and decrement in quantity
function overAllAmount()
{
           
    let overAllCost=document.querySelectorAll('.totalprice');    
    var array=[];
    var sum=0;
    for(let i=0;i<overAllCost.length;i++)
    {  
       array[i]=Number(overAllCost[i].textContent);
       sum=sum+array[i];     


    }
   
    document.querySelector('.overAllCost').innerHTML=sum;  
    localStorage.totalCost=JSON.stringify(sum);
}
// function to update overAllPrice when the product is removed
function overAllAmount1(reducedquantityprice,index)
{
     var updatedprice=Number(reducedquantityprice);
     var productIndex=Number(index);       
    let overAllCost=document.querySelectorAll('.totalprice');   
    
    var array=[]; 
    var sum=0;

    for(let i=0;i<overAllCost.length;i++)
         {     
             if(i==productIndex)
             {
               overAllCost[i].textContent=0;
               

             }
            
             array[i]=Number(overAllCost[i].textContent);
             sum=sum+array[i];    
             


         }
           
            document.querySelector('.overAllCost').innerHTML=sum; 
            // updating totalCost in localStorage
            localStorage.totalCost=JSON.stringify(sum);        

    
 }


/// function for removig the item
function productRemove( )
{  
    let removebuttons= document.querySelectorAll('.remove');
    
               
     let totalprice=[];  
     for(let i=0;i<removebuttons.length;i++)
     {
                  // array to store total price of product
        totalprice[i]=document.getElementsByClassName('totalprice')[i].innerText;   
               
        removebuttons[i].addEventListener('click',function ()
        {  
            let productContainer= document.querySelectorAll('.display')[i].style.display="none";
            
             overAllAmount1(totalprice[i],i);
            //removing product from local Storage
           let productTags=JSON.parse( localStorage.productsInCart );
           let tagArray=Object.keys(productTags); 
           console.log(tagArray)
           if(i==0)
           {
            delete productTags[tagArray[i]];
           }
           else{
               i=0;

               delete productTags[tagArray[i]];
              }
            console.log(productTags,productTags.length)
           localStorage.productsInCart=JSON.stringify(productTags);
          
           //updating cartCount in localstorage
           let productNumbers=JSON.parse(localStorage.cartNumbers);
           
           productNumbers--;
           localStorage.cartNumbers=JSON.stringify(productNumbers);
           document.querySelector('.cart span').textContent=productNumbers;        
                                                              
                 
         })  
     }  
     
 }
  
//functions to execute when the page loads.
displayCart();
onLoadCartNumbers();

quantityDecrease(),quantityIncrease();

productRemove();
 function reload()
 {
     window.location.reload(true);
     localStorage.clear();
 }
