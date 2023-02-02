if(document.readyState =='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}

function ready(){
    var removeCartItemButtons= document.getElementsByClassName("remove") // retourne tt les elts li 3ndhom classe remove
    //console.log(removeCartItemButtons)
    
    // supprimer l'article avec remove 
    for(var i=0;i<removeCartItemButtons.length;i++){
        var button=removeCartItemButtons[i]
        button.addEventListener('click',removeCartItem)
    }

    var quantiteInputs=document.getElementsByClassName('cart-quantite')
    for(var i=0;i<quantiteInputs.length;i++){
        var input=quantiteInputs[i]
        input.addEventListener('change',quantiteChanged)
}

    var addToCartButtons=document.getElementsByClassName("shop-item-button")
    for(var i=0;i<addToCartButtons.length;i++){
        var button=addToCartButtons[i]
        button.addEventListener('click',addToCartClicked)

}

    document.getElementsByClassName('acheter')[0].addEventListener('click', acheterClicked)
}

function acheterClicked() {
    alert('achat validée, Merci à vous ! ')
    var cartItems = document.getElementsByClassName('shopping-cart')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function addToCartClicked(event){
    var button=event.target
    var item=button.parentElement.parentElement
    var title=item.getElementsByClassName("title")[0].innerText
    var price=item.getElementsByClassName("prix")[0].innerText
    var imageSrc=item.getElementsByClassName("image")[0].src
    addToItemCart(title,price,imageSrc)
    updateCartTotal()
}

function removeCartItem(event){
    var buttonClicked=event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}


function addToItemCart(title,price,imageSrc){

    var cartRow=document.createElement('tr')
    cartRow.classList.add('cart-article')
    var cartItems=document.getElementsByClassName('shopping-cart')[0]
    var cartItemNames=document.getElementsByClassName('cart-titre')

    for(var i=0;i<cartItemNames.length;i++){
        if(cartItemNames[i].innerText==title){
            alert('deja selectionnee')
            return
        }
    }
    var cartRowContents= `
    <tr class="cart-article">
    <td id="img"><img src="${imageSrc}" alt="" ><h4 class="cart-titre">${title}</h4></td>
    <td><h4 class="cart-prix"> ${price} </h4></td>
    <td>
        <input type="number" value="1" class="cart-quantite"><button type="button" class="remove">Remove</button>
    </td>
   
    </tr>
    `
    cartRow.innerHTML=cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName("remove")[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName("cart-quantite")[0].addEventListener('change',quantiteChanged)

}


function quantiteChanged(event){
    var input=event.target
    if (isNaN(input.value) || input.value<=0){
        input.value=1

    }

    updateCartTotal()
} 

function updateCartTotal(){
    var cartItemContainer=document.getElementsByClassName('shopping-cart')[0]
    var cartRows= cartItemContainer.getElementsByClassName('cart-article')
    var total=0
    for(var i=0;i<cartRows.length;i++){
        var cartRow=cartRows[i]
        var cartPrix=cartRow.getElementsByClassName('cart-prix')[0]
        var cartQuantite=cartRow.getElementsByClassName('cart-quantite')[0]
        //console.log(cartPrix,cartQuantite)
        var prix=parseFloat(cartPrix.innerText.replace('DZD','')) // kan string lzm ndiro parseFloat bch nrdj3oh number
        console.log(prix)
        var quantite=cartQuantite.value
        total= total+ (prix*quantite)
        
    }
    total= Math.round(total*100)/100
    document.getElementsByClassName('cart-total-prix')[0].innerHTML=total + ' DZD'

}