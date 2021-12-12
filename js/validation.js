
function removeErrorMsg(){
    const errSpans=document.querySelectorAll('.errSpan');
    errSpans.forEach(
        function(currentValue, currentIndex, listObj) {
            currentValue.remove();
        },
      );

}

function addErr(msg,afterEl){
    const errSpan=document.createElement('span');
    errSpan.classList.add('errSpan');
    errSpan.innerHTML=msg;
    document.querySelector(afterEl).after(errSpan);

}

function saveIncome(e){

    let err=false;

    //prevent form from submitting
    e.preventDefault();   

    // remove previous error messages if any
    removeErrorMsg();

    //name validation
    let income_name=document.querySelector('.income_name').value;
    
    if(income_name.length==0){
        addErr("Income name is required.",'.income_name');
        err=true;
    }

    //amount validation

    const amount=document.querySelector('.income_amount').value;
    const regex = new RegExp(/^\d+(\.\d+)?$/);
 
    if(!regex.test(amount)){
       addErr("Income amount is invalid.",'.income_amount');
        err=true;
    }
    //date validation
    const income_date=document.querySelector('.income_date').value;
    const regex1 = new RegExp(/^(19|20)\d{2}-(0[1-9]|1\d|2\d|3[01])-(0[1-9]|1[0-2])$/);
 
    //test for valid date format
    if(!regex1.test(income_date)){
       addErr("Date is invalid.",'.income_date');
        err=true;
    }

// if any error do not add new income
if(err) return;

// add new income
     incomes=incomes||[];
    incomes.push({name:income_name,income:parseFloat(amount),date:income_date});
    localStorage.setItem('incomeObject', JSON.stringify(incomes));
    render();
    cancel();
}


function saveExpense(e){
    e.preventDefault(); 
    removeErrorMsg();

    expenses=expenses||[];
    console.log(expenses);
        expenses.push({description:document.querySelector('.expense_description').value,category:document.querySelector('.expense_category').value,amount:parseFloat(document.querySelector('.expense_amount').value),date:document.querySelector('.expense_date').value});
        localStorage.setItem('expenseObject', JSON.stringify(expenses));
        render();
        cancel();
}


function saveCategory(e){
    e.preventDefault(); 
    categories.push({name:document.querySelector('.cat_input').value,default:false});
    //save to local storage
    localStorage.setItem('categoryObject', JSON.stringify(categories));

    render();
    cancel();
}