//remove form error message 
function removeErrorMsg(){
    const errSpans=document.querySelectorAll('.errSpan');
    errSpans.forEach(
        function(currentValue, currentIndex, listObj) {
            currentValue.remove();
        },
      );

}
//display form error message
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
    const regex1 = new RegExp(/^(19|20)\d{2}-(0[1-9]|1[0-2]-(0[1-9]|1\d|2\d|3[01]))$/);
 
    //test for valid date format
    if(!regex1.test(income_date)){
       addErr("Date is invalid.",'.income_date');
        err=true;
    }

// if any error do not add new income
if(err) return;

// add new income

const date = new Date();
const [month, day, year]       = [date.getMonth(), date.getDate(), date.getFullYear()];
const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];

     incomes=incomes||[];
    incomes.push({name:income_name,income:parseFloat(amount),date:income_date,date_added:`${year}-${(month+1)}-${day} ${hour}:${minutes}:${seconds}`});
    localStorage.setItem('incomeObject', JSON.stringify(incomes));
    render();
    cancel();
}


function saveExpense(e){

    let err=false;

    //prevent form from submitting
    e.preventDefault(); 
    
    //remove error messages if any
    removeErrorMsg();

    let expense_description=document.querySelector('.expense_description').value;

    if(expense_description.length==0){
        addErr("Expense description is required.",'.expense_description');
        err=true;
    }
    
    //amount validation
    const amount=document.querySelector('.expense_amount').value;
    const regex = new RegExp(/^\d+(\.\d+)?$/);

    if(!regex.test(amount)){
        addErr("Expense amount is invalid.",'.expense_amount');
        err=true;
    }
     //date validation
     const expense_date=document.querySelector('.expense_date').value;
     const regex1 = new RegExp(/^(19|20)\d{2}-(0[1-9]|1[0-2]-(0[1-9]|[12][0-9]|3[01]))$/);

     //test for valid date format
    if(!regex1.test(expense_date)){
        addErr("Date is invalid.",'.expense_date');
         err=true;
     }
    
    if(err) return;

    expenses=expenses||[];
 
const date = new Date();
const [month, day, year]       = [date.getMonth(), date.getDate(), date.getFullYear()];
const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
        expenses.push({description:expense_description,category:document.querySelector('.expense_category').value,amount:parseFloat(amount),date:expense_date,date_added:`${year}-${(month+1)}-${day} ${hour}:${minutes}:${seconds}`});
        localStorage.setItem('expenseObject', JSON.stringify(expenses));
        render();
        renderChart(); // re render the chart each time a new expense is added
        cancel();
}


function saveCategory(e){
    e.preventDefault(); 
const date = new Date();
const [month, day, year]       = [date.getMonth(), date.getDate(), date.getFullYear()];
const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    categories.push({name:document.querySelector('.cat_input').value,default:false,color:document.querySelector('.category-color').value,date_added:`${year}-${(month+1)}-${day} ${hour}:${minutes}:${seconds}`});
    //save to local storage
    localStorage.setItem('categoryObject', JSON.stringify(categories));

    render();
    cancel();
}