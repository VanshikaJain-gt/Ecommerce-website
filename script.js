let root =document.querySelector('.root')
let cart =document.querySelector('.cart')
async function getdata(){
    let result =await fetch('https://fakestoreapi.com/products')
    let data=await result.json()
    return data 
}   
getdata()
.then((data)=>{
    console.log(data);
    function displaycard(){
        data.map((item)=>{
            let card=document.createElement('div')
            card.classList.add('card')
            card.innerHTML=`
            <img src="${item.image}"/>
            <h1>${item.title}</h1>
            <h1>Category:- ${item.category}</h1>
                <h1>Price:- ${Math.round(item.price * 10)} Rs.</h1>
                 <button onclick="addToCart(${item.id})">Add to cart</button>
                 
                `
            root.appendChild(card)


        })
   
    }
     
displaycard()
window.addToCart = (pId) => {
    console.log(pId);
    let product = data.find((item) => item.id == pId)


    let cartItem = JSON.parse(localStorage.getItem('cart')) || []
    cartItem.push(product)
    localStorage.setItem('cart', JSON.stringify(cartItem)) 




    cart.innerHTML = ''
    cartItem.map((item,index)=>{
         console.log(item);
         let row = document.createElement('div')
         row.classList.add('row')
         row.innerHTML = `
         <div>
            <h1>${item.title}</h1>
            <h1>Price:- ${Math.round(item.price * 10)} Rs.</h1>
         </div>
            <button onclick =" removecart(${index})"> Remove</button>
         `
         cart.prepend(row)
    })
        let totalPrice =cartItem.reduce((acc , current)=> acc + Math.round(current.price*10),0)
    cart.innerHTML += totalPrice ? `<h1>Total Price:${totalPrice} </h1>`: ''
    
   

}
function displaycart(){
    let cartItem = JSON.parse(localStorage.getItem('cart')) || []
    cart.innerHTML = ''
    cartItem.map((item,index)=>{
         console.log(item);
         let row = document.createElement('div')
         row.classList.add('row')
         row.innerHTML = `
         <div>
            <h1>${item.title}</h1>
            <h1>Price:- ${Math.round(item.price * 10)} Rs.</h1>
            </div>
            <button onclick="removecart(${index})">Remove</button>



             `
         cart.prepend(row)

    })
    let totalPrice =cartItem.reduce((acc , current)=> acc + Math.round(current.price*10),0)
    cart.innerHTML += totalPrice ? `<h1>Total Price:${totalPrice} </h1>`: ''
}
displaycart()
window.removecart = (id) =>{
    console.log(id);
    let cartItem = JSON.parse(localStorage.getItem('cart')) || []
    cartItem.splice(id, 1)
    localStorage.setItem('cart', JSON.stringify(cartItem)) 

    cart.innerHTML = ''
    cartItem.map((item,index)=>{
         console.log(item);
         let row = document.createElement('div')
         row.classList.add('row')
         row.innerHTML = `
         <div>
            <h1>${item.title}</h1>
            <h1>Price:- ${Math.round(item.price * 10)} Rs.</h1>
         </div>
            <button onclick =" removecart(${index})"> </button>
         `
         cart.prepend(row)
      
    })
        let totalPrice =cartItem.reduce((acc , current)=> acc + Math.round(current.price*10),0)
    cart.innerHTML += totalPrice ? `<h1>Total Price:${totalPrice} </h1>`: ''
}
})


function showCart(){
 cart.classList.toggle('show')
}