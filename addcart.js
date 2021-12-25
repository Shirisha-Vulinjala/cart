let cartarray=document.querySelectorAll('.cartButton');
let products=[
    { 
        name: 'Samsung Galaxy Tab A7 26.31 cm(10.4 inch)',
        tag: 'samsungGtabA7',
        price:17789,
        incart:0                                                                                                
    },
    { 
        name: '2021 Apple 10.2 inch',
        tag: 'appleipad',
        price:30900,
        incart:0                                                                                                
    },
    { 
        name: 'Lenovo Tab M10 HD 2nd Gen',
        tag: 'Lenovotab2ndGen',
        price:9999,
        incart:0                                                                                                
    },
    { 
        name: 'Lenovo Tab M10 FHD plus Tablet',
        tag: 'Lenovo-tab-FHD-plus',
        price:18990,
        incart:0                                                                                                
    },
    { 
        name: 'Samsung Galaxy Tab A7 Lite',
        tag: 'sam-galaxy-A7-lite',
        price:11883,
        incart:0                                                                                                
    },
    { 
        name: 'Lenovo Yoga Smart Tablet',
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
function onLoadCartNumbers(){
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
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    if(cartItems !=null){
        if(cartItems[product.tag]==undefined){
            cartItems={
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].incart+=1;
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
    cartItems=JSON.parse(cartItems);
    let productContainer=document.querySelector(".productimages");
    if(cartItems&&productContainer){
        productContainer.innerHTML=" ";
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML +=`
            <div class="product">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img src="./tabimages/${item.tag}.jpg">
            <span>${item.name}</span>
            </div>
            <div class="price">
            ${item.price}

            <div>
            <div class="quantity">
            <ion-icon name="remove" class="decrease"></ion-icon>
            <span>${item.incart}</span>
            <ion-icon name="add" class="increase"></ion-icon>
            </div>
            <div class="total">
            ${item.incart*item.price}
            </div>      


            `


        })


    }


}
//whenever we load the page the following function gets executed
onLoadCartNumbers();
displayCart();