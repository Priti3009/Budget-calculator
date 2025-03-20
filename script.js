let totalAmount=document.getElementById("total-amount");
let userAmount=document.getElementById("user-amount");
const checkAmountButton=document.getElementById("check-submit");
const totalAmountButton=document.getElementById("total-amount-button");
const productTitle=document.getElementById("product-title");
const errorMessage=document.getElementById("budget-error");
const productTitleError=document.getElementById("product-title-error");
const productCostError=document.getElementById("product-cost-error");
const amount=document.getElementById("amount");
const expenditureValue=document.getElementById("expenditure-value");
const balanceValue=document.getElementById("balance-amount");
const list=document.getElementById("list"); 

let tempAmount=0;
//Set budget part
totalAmountButton.addEventListener("click",()=>{
    tempAmount=totalAmount.value;
    if(tempAmount === "" || tempAmount < 0){
        errorMessage.classList.remove("hide");
    }
    else{
        errorMessage.classList.add("hide");
        //set budget
        amount.innerHTML=tempAmount;
        balanceValue.innerText =tempAmount-expenditureValue.innerText;
        //clear "enter total amount " box 
        totalAmount.value="";
    }
})



//function to modify expense list
const modifyElement=(element,edit = false)=>{
    let parentDiv=element.parentElement;

    let currentBalance=balanceValue.innerText;

    let currentExpense=expenditureValue.innerText;

    let parentAmount=parentDiv.querySelector(".amount").innerText;

    if(edit){
        let parentText=parentDiv.querySelector(".product").innerText;
        productTitle.value=parentText;
        userAmount.value=parentAmount;
       
    }
  
    balanceValue.innerText= parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText=parseInt(currentExpense)-parseInt(parentAmount);
    parentDiv.remove();
};
//function to create list
const listCreator=(expenseName,expenseValue)=>{
    let sublistContent=document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML=`<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
    let editButton=document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize="1.2em";
    editButton.addEventListener("click",()=>{
        modifyElement(editButton,true);
    });
    let deleteButton=document.createElement("button");
    deleteButton.classList.add("fa-solid","fa-trash-can","delete");
    deleteButton.style.fontSize="1.2em";
    deleteButton.addEventListener("click",()=>{
        modifyElement(deleteButton);
    });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(sublistContent);

};
//function to  add expense to the list
checkAmountButton.addEventListener("click",()=>{
    if(!productTitle.value || !userAmount.value){
        productTitleError.classList.remove("hide");
        return false;
    }
    else{
        productTitleError.classList.add("hide");
    }

    let expense =parseInt(userAmount.value);
    let sum=parseInt(expenditureValue.innerText) + expense;
    expenditureValue.innerText=sum;

    const totalbalance=tempAmount-sum;
    balanceValue.innerText=totalbalance;
    listCreator(productTitle.value , userAmount.value);
    productTitle.value=""; //empty expense input boxes after adding it to the list
    userAmount.value="";
});
