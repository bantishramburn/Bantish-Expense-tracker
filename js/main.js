function renderChart(){
    const el=document.getElementById('myChart');
    if(el!=null){
    el.remove();
    }
    //recreate cavas element if renderChart is called again
const canvas=document.createElement('canvas');
canvas.setAttribute('id','myChart');
document.querySelector('#tab-stats .content').prepend(canvas);

const ctx = document.getElementById('myChart').getContext('2d');
const labels=[];
const colors=[];
const expenses_by_category=[];

for(let i in expenses){
    if(!labels.includes(expenses[i].category)){
        labels.push(expenses[i].category);
        for(j in categories){
            if(categories[j].name==expenses[i].category)
        colors.push(categories[j].color);
        }
    }
}
for(let i in labels){
    let total_category=0;
    for(let j in expenses){
        if(expenses[j].category==labels[i]){
            total_category+=expenses[j].amount;
        }
    }
    expenses_by_category.push(total_category);
}

const data = {
    labels:labels,
    datasets: [{
      label: 'My Expenses',
      data: expenses_by_category,
      backgroundColor:colors,
      hoverOffset: 4
    }]
  };


 

    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data:    data
    });
   
}
//array of recently added income and expenses
let recentlyAdded=[];

//array of incomes as we can have multiple income sources
let incomes=[];


//array of expenses as we can have multiple expenses
let expenses=[];


//array of categories as we can have multiple expense categories
let categories=[
    {
        name:'Car',
        default:true,
        color:"rgb(2,246,197)"

    },
    {
        name:'Clothing',
        default:true,
        color:"rgb(255,201,44)"
    },
    {
        name:'Eating out',
        default:true,
        color:"rgb(255,129,80)"
    },
    {
        name:'Loan',
        default:true,
        color:"rgb(83,54,223)"
    },
    {
        name:'Rent',
        default:true,
        color:"rgb(66,116,244)"
    },
    {
        name:'Utilities',
        default:true,
        color:"rgb(4,245,230)"
    },
    {
        name:'Other',
        default:true,
        color:"rgb(117,202,239)"
    }
]
   //store default categories to localstorage
   let categoryObject = localStorage.getItem('categoryObject');
   if(categoryObject ==null){
       localStorage.setItem('categoryObject', JSON.stringify(categories));
       categoryObject = localStorage.getItem('categoryObject');
   }
   categories=JSON.parse(categoryObject);
   
   //retrieve expenses from localstorage
   let expenseObject = localStorage.getItem('expenseObject');
   if(expenseObject !=null){
       expenses=JSON.parse(expenseObject);
   }
   
   //retrieve income from localstorage
   let incomeObject = localStorage.getItem('incomeObject');
   if(incomeObject !=null){
       incomes=JSON.parse(incomeObject);
   }

function render(){ // this function is called after each action performed ex: after adding an expense or after adding an income or any other action that requires the data on screen to be updated.
 



    document.querySelector('#tab-categories .content').innerHTML="";
    document.querySelector('#tab-incomes .content').innerHTML="";
    document.querySelector('#tab-expenses .content').innerHTML="";
    //document.querySelector('#tab-stats').innerHTML="";
   
    //rendering categories
    for(let i in categories){
        const newDiv = document.createElement("div");
        newDiv.classList.add(`cat_${i}`);
        newDiv.classList.add(`category`);
        if(categories[i].default==true){
            newDiv.classList.add(`default`);
        }
      
    newDiv.setAttribute('style',`background-color:${categories[i].color}`);
        // and give it some content
        const newContent = document.createTextNode(categories[i].name);
    
        // add the text node to the newly created div
        newDiv.appendChild(newContent);
        document.querySelector('#tab-categories .content').append(newDiv);
    }

    //rendering expenses

    
    let totalExpenses=0;
    if(expenses!=null)
    expenses.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        const bdate=b.date.split('-');
        const adate=a.date.split('-');
      
        
        return new Date( parseInt(bdate[0]), parseInt(bdate[1])-1, parseInt(bdate[2]), 0, 0, 0, 0) - new Date(parseInt(adate[0]), parseInt(adate[1])-1, parseInt(adate[2]), 0, 0, 0, 0);
      });

    let group_expenses=[];
    for(let i in expenses){
        //group expenses in by timeline
        group_expenses[dateto_timeline_name(expenses[i].date)]=group_expenses[dateto_timeline_name(expenses[i].date)]||[];
        group_expenses[dateto_timeline_name(expenses[i].date)].push(expenses[i]);
    }
   
    for(let timeline in group_expenses){
        ex=group_expenses[timeline];
        for(let i in ex){
            
            const newDivTimeline = document.createElement("div");
            newDivTimeline.innerHTML=timeline;
            newDivTimeline.classList.add(`expense_timeline`);


            const newDiv = document.createElement("div");
            newDiv.classList.add(`exp_${i}`);
            newDiv.classList.add(`expense`);
            //element to for icon of category
            const iconDiv= document.createElement("div");
            iconDiv.classList.add('column-1');

            //element for category title and expense description 
            const expenseDiv= document.createElement("div");
            expenseDiv.classList.add('column-2');
            //category title
            const rowCatTitleDiv= document.createElement("div");
            rowCatTitleDiv.classList.add('row-1');
            rowCatTitleDiv.appendChild(document.createTextNode(ex[i].category));
            expenseDiv.appendChild(rowCatTitleDiv);
            //expense desc
            const expenseDescDiv= document.createElement("div");
            expenseDescDiv.classList.add('row-2');
            expenseDescDiv.appendChild(document.createTextNode(ex[i].description+'-'+ex[i].date));
            expenseDiv.appendChild(expenseDescDiv);
            
            //element for category title and expense description 
            const expenseAmountDiv= document.createElement("div");
            expenseAmountDiv.classList.add('column-3');
            const amount=document.createTextNode(`Rs ${ex[i].amount}`);
            expenseAmountDiv.appendChild(amount);
            totalExpenses+=ex[i].amount;

            //const newContent = document.createTextNode(expenses[i].description);

            newDiv.appendChild(iconDiv);
            newDiv.appendChild(expenseDiv);
            newDiv.appendChild(expenseAmountDiv);
            if(i==0)
            document.querySelector('#tab-expenses .content').append(newDivTimeline);
            document.querySelector('#tab-expenses .content').append(newDiv);
        }
    }
    const totalExpensesDiv=document.createElement("div");
    totalExpensesDiv.classList.add('total');
    totalExpensesDiv.append(toSpan('Rs','rs'));
    totalExpensesDiv.append(toSpan(totalExpenses.toFixed(2),'amount'));
    totalExpensesDiv.append(toSpan('MUR','mur'));
    document.querySelector('#tab-expenses .content').prepend(totalExpensesDiv);

    let totalIncome=0;
    incomes.sort(function(a,b){
       
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        const bdate=b.date.split('-');
        const adate=a.date.split('-');
        return new Date( parseInt(bdate[0]), parseInt(bdate[1])-1, parseInt(bdate[2]), 0, 0, 0, 0) - new Date(parseInt(adate[0]), parseInt(adate[1])-1, parseInt(adate[2]), 0, 0, 0, 0);
      });
    for(let i in incomes){
        const newDiv = document.createElement("div");
        newDiv.classList.add(`inco_${i}`);
        newDiv.classList.add(`income`);
      


        const nameDiv= document.createElement("div");
        nameDiv.classList.add('column-1');
        //add title of income to first column in first row
        const rowIncomeTitleDiv = document.createElement("div");
        rowIncomeTitleDiv.classList.add('row-1');
        rowIncomeTitleDiv.appendChild(document.createTextNode(incomes[i].name));
        nameDiv.appendChild(rowIncomeTitleDiv);

        //add date of income to first column in second row 
        const rowIncomeDateDiv = document.createElement("div");
        rowIncomeDateDiv.classList.add('row-2');
        rowIncomeDateDiv.appendChild(document.createTextNode(incomes[i].date));
        nameDiv.appendChild(rowIncomeDateDiv);

        // add income to 2nd column
        const incomeDiv= document.createElement("div");
        incomeDiv.classList.add('column-2');
        const amount=document.createTextNode(`Rs ${incomes[i].income}`);
        incomeDiv.appendChild(amount);

        totalIncome+=incomes[i].income;


        newDiv.appendChild(nameDiv);
        newDiv.appendChild(incomeDiv);

        
        document.querySelector('#tab-incomes .content').append(newDiv);
    }
    const totalIncomeDiv=document.createElement("div");
    totalIncomeDiv.classList.add('total');
    totalIncomeDiv.append(toSpan('Rs','rs'));
    totalIncomeDiv.append(toSpan(totalIncome.toFixed(2),'amount'));
    totalIncomeDiv.append(toSpan('MUR','mur'));
    document.querySelector('#tab-incomes .content').prepend(totalIncomeDiv);


    //render recently added record
    recentlyAddedRecord();
    document.querySelector('.recentlyadded').innerHTML='';
    const ulEl=document.createElement('ul');
  
    for(i in recentlyAdded){
        const newLi=document.createElement('li');
        const date_array=recentlyAdded[i].date_added.replace(' ','-').replace(/:/g,'-').split('-');
        const d=new Date(date_array[0],parseInt(date_array[1])-1,date_array[2],date_array[3],date_array[4],date_array[5]);
        if(recentlyAdded[i].category!=undefined){
            newLi.addEventListener('click',showtabexpenses);
        }else{
            newLi.addEventListener('click',showtabincomes);  
        }
        newLi.innerHTML=`${d.toLocaleString('en-GB', { timeZone: 'UTC' })} Recently added ${(recentlyAdded[i].category!=undefined?` expense - ${recentlyAdded[i].description}`:`income - ${recentlyAdded[i].name}`)}`;
        ulEl.append(newLi);
    }
    document.querySelector('.recentlyadded').append(ulEl);

    let balance=totalIncome-totalExpenses;
    document.querySelector('#tab-stats .total').classList.remove('debt'); 
    document.querySelector('#tab-stats .total').classList.remove('savings'); 
    if(balance>0){
        document.querySelector('#tab-stats .total').classList.add('savings'); 
    }
    if(balance<0){
        document.querySelector('#tab-stats .total').classList.add('debt'); 
    }
    document.querySelector('#tab-stats .total .amount').innerHTML=balance.toFixed(2);

}
window.onload=(event) => {
    //bind click events
    document.querySelector('.menu-icon').addEventListener('click',showmenu);
    document.querySelector('.txt-menu').addEventListener('click',showmenu);
    document.querySelector('.tab-stats').addEventListener('click',showtabstats);
    document.querySelector('.tab-incomes').addEventListener('click',showtabincomes);
    document.querySelector('.tab-expenses').addEventListener('click',showtabexpenses);
    document.querySelector('.tab-categories').addEventListener('click',showtabcategories);
    document.getElementById('showAddIncomeModal').addEventListener('click',showAddIncomeModal);
    document.getElementById('showAddExpenseModal').addEventListener('click',showAddExpenseModal);
    document.getElementById('showAddCategoryModal').addEventListener('click',showAddCategoryModal);
 
    render();
    renderChart();
  };

    function showtabstats(){
        document.querySelector('#page').innerHTML="";
        showtab('tab-stats');
    }
    function showtabincomes(){
        document.querySelector('#page').innerHTML="My incomes";
        showtab('tab-incomes');
    }
    function showtabexpenses(){
        document.querySelector('#page').innerHTML="My expenses";
        showtab('tab-expenses');
    }
    function showtabcategories(){
        document.querySelector('#page').innerHTML="Manage categories";
        showtab('tab-categories');
    }
    function showmenu(){
        if(document.querySelector('.main-menu ul').classList.contains('show')){
            document.querySelector('.main-menu ul').classList.remove('show');
        }else{
            document.querySelector('.main-menu ul').classList.add('show');
        }  
    }

    function showtab(tab){
        let t= document.querySelectorAll(`.tab`);
        t.forEach( function(currentValue, currentIndex,listObj ) {
            currentValue.classList.remove('active');
        });

        document.querySelector(`#${tab}`).classList.add('active');
        if(document.querySelector('.main-menu ul').classList.contains('show')){
            document.querySelector('.main-menu ul').classList.remove('show');
        }
        
    }


function toSpan(str,classname){
    const span=document.createElement('span');
    span.classList.add(classname);
    span.append(document.createTextNode(str));
    return span;
}

//close form modal
function cancel(){

    document.querySelector('.form-modal-overlay').classList.add('hidden');
    setTimeout(function(){
        document.querySelector('.form-modal-title').innerHTML='';
        document.querySelector('.form-modal-content').innerHTML='';
    },1000);
   
}

function showAddCategoryModal(){
    document.querySelector('.form-modal-title').innerHTML='Add new category';
    const btn=document.createElement('button');
    btn.setAttribute('type','submit');
    btn.classList.add('btnsave');
    btn.append(document.createTextNode('Save'));

    const form=document.createElement('form');
    form.addEventListener('submit',saveCategory);
  
    const inputDivWrapper=document.createElement('div');
    inputDivWrapper.classList.add('input-wrapper');

    const categoryInput=document.createElement('input');
    categoryInput.classList.add('cat_input');
    categoryInput.setAttribute('type','text');
    categoryInput.setAttribute('placeholder','Category name');
    categoryInput.addEventListener('keyup',activateCatSave);
    inputDivWrapper.append(categoryInput);

    const colorInput=document.createElement('input');
    colorInput.setAttribute('type','color');
    colorInput.setAttribute('value','#ff0000')
    colorInput.classList.add('category-color');
    inputDivWrapper.append(colorInput);

    form.append(inputDivWrapper);

    const formModalAction=document.createElement('div');
    formModalAction.classList.add('form-modal-action');
    const col1=document.createElement('div');
    col1.classList.add('column-1');
    const cancelbtn=document.createElement('button');
    cancelbtn.setAttribute('type','button');
    cancelbtn.classList.add('btnlink');
    cancelbtn.innerHTML='Cancel';
    cancelbtn.addEventListener('click',cancel);
    col1.append(cancelbtn);
    const col2=document.createElement('div');
    col2.classList.add('column-2');
    col2.append(btn);
    formModalAction.append(col1);
    formModalAction.append(col2);
    form.append(formModalAction);

    document.querySelector('.form-modal-content').append(form);

    document.querySelector('.form-modal-overlay').classList.remove('hidden');
}


//activate save button only when category name is specified
function activateCatSave(){
    if(document.querySelector('.cat_input').value.length>0){
        document.querySelector('.btnsave').classList.add('active');
    }else{
        document.querySelector('.btnsave').classList.remove('active');
    }
}

function showAddExpenseModal(){
    document.querySelector('.form-modal-title').innerHTML='Add new Expense';
    const btn=document.createElement('button');
    btn.setAttribute('type','submit');
    btn.classList.add('btnsave');
    btn.classList.add('active');

    btn.append(document.createTextNode('Save'));

    const form=document.createElement('form');
    form.addEventListener('submit',saveExpense);
  
    const inputDivWrapper=document.createElement('div');
    inputDivWrapper.classList.add('input-wrapper');

    const expenseCatSelect=document.createElement('select');
    expenseCatSelect.classList.add('expense_category');
    for(let i in categories){
        const catoption=document.createElement('option');
        catoption.setAttribute('value',categories[i].name);
        catoption.innerHTML=categories[i].name;
        expenseCatSelect.appendChild(catoption);
    }
    inputDivWrapper.append(expenseCatSelect);
 

    const expensenameInput=document.createElement('input');
    expensenameInput.classList.add('expense_description');
    expensenameInput.setAttribute('type','text');
    expensenameInput.setAttribute('placeholder','Name');
    inputDivWrapper.append(expensenameInput);
  

    const expenseamountInput=document.createElement('input');
    expenseamountInput.classList.add('expense_amount');
    expenseamountInput.setAttribute('type','float');
    expenseamountInput.setAttribute('placeholder', 'Amount');
    inputDivWrapper.append(expenseamountInput);



    const expenseDateInput=document.createElement('input');
    expenseDateInput.classList.add('expense_date');
    expenseDateInput.setAttribute('type','date');
    expenseDateInput.setAttribute('placeholder', 'YYYY-MM-DD');
    expenseDateInput.setAttribute('max',new Date().toISOString().split("T")[0]);
    inputDivWrapper.append(expenseDateInput);
    form.append(inputDivWrapper);

        
    const formModalAction=document.createElement('div');
    formModalAction.classList.add('form-modal-action');
    const col1=document.createElement('div');
    col1.classList.add('column-1');
    const cancelbtn=document.createElement('button');
    cancelbtn.setAttribute('type','button');
    cancelbtn.classList.add('btnlink');
    cancelbtn.innerHTML='Cancel';
    cancelbtn.addEventListener('click',cancel);
    col1.append(cancelbtn);
    const col2=document.createElement('div');
    col2.classList.add('column-2');
    col2.append(btn);

    formModalAction.append(col1);
    formModalAction.append(col2);
    form.append(formModalAction);

    document.querySelector('.form-modal-content').append(form);

    document.querySelector('.form-modal-overlay').classList.remove('hidden');
}


//ADD INCOME FORM
function showAddIncomeModal(){
    document.querySelector('.form-modal-title').innerHTML='Add new Income';
    const btn=document.createElement('button');
    btn.setAttribute('type','submit');
    btn.classList.add('btnsave');
    btn.classList.add('active');

    btn.append(document.createTextNode('Save'));

    const form=document.createElement('form');
    form.addEventListener('submit',saveIncome);
  
    const inputDivWrapper=document.createElement('div');
    inputDivWrapper.classList.add('input-wrapper');

    const incomenameInput=document.createElement('input');
    incomenameInput.classList.add('income_name');
    incomenameInput.setAttribute('type','text');
    incomenameInput.setAttribute('placeholder','Name');
    inputDivWrapper.append(incomenameInput);


    const incomeamountInput=document.createElement('input');
    incomeamountInput.classList.add('income_amount');
    incomeamountInput.setAttribute('type','float');
    incomeamountInput.setAttribute('placeholder', 'Amount');
    inputDivWrapper.append(incomeamountInput);
  


    const incomeDateInput=document.createElement('input');
    incomeDateInput.classList.add('income_date');
    incomeDateInput.setAttribute('type','date');
    incomeDateInput.setAttribute('placeholder', 'YYYY-MM-DD');
    incomeDateInput.setAttribute('max',new Date().toISOString().split("T")[0]);
    inputDivWrapper.append(incomeDateInput);
    form.append(inputDivWrapper);


    const formModalAction=document.createElement('div');
    formModalAction.classList.add('form-modal-action');
    const col1=document.createElement('div');
    col1.classList.add('column-1');
    const cancelbtn=document.createElement('button');
    cancelbtn.setAttribute('type','button');
    cancelbtn.classList.add('btnlink');
    cancelbtn.innerHTML='Cancel';
    cancelbtn.addEventListener('click',cancel);
    col1.append(cancelbtn);
    const col2=document.createElement('div');
    col2.classList.add('column-2');
    col2.append(btn);

    formModalAction.append(col1);
    formModalAction.append(col2);
    form.append(formModalAction);
    document.querySelector('.form-modal-content').append(form);

    document.querySelector('.form-modal-overlay').classList.remove('hidden');
}


function dateto_timeline_name(datestr){
	const _MS_PER_DAY = 1000 * 60 * 60 * 24;
	const date1array=datestr.split('-');
	const a= new Date(`${date1array[1]}/${date1array[2]}/${date1array[0]}`);
	const b=new Date();
	//ignore timezone
	const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
	const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
	//find days passed
	const diffdays= Math.floor((utc2 - utc1) / _MS_PER_DAY);

	const currentwk=getWeekNumber(b);
	const wk=getWeekNumber(a);
	const diffwk=currentwk[1]-wk[1];
	const diffyear=currentwk[0]-wk[0];
	const diffmonth=b.getMonth()-a.getMonth();
	
	if(diffyear==1) 
		return 'Last year';
	if(diffyear>1) 	
		return `${diffyear} years ago`;

	
	if(diffmonth==1) 
		return 'Last month';
	
	if(diffmonth>=2&&diffmonth<3) 
		return 'Less than 3 months';
	if(diffmonth>3&&diffmonth<6) 
		return 'Less than 6 months';
	if(diffmonth>=6&&diffmonth<12) 
		return 'Less than 12 months';
	
	if(diffwk==1) 
		return 'Last week';
	if(diffwk==2) 
		return 'Two weeks ago';



	if(diffdays==0) 
		return 'Today';
	if(diffdays==1) 
		return 'Yesterday';
	if(diffdays==2) 
		return 'Two days ago';
	if(diffdays==3) 
		return 'Three days ago';
	if(diffdays>3) 
		return 'Ealier this week';
	if(diffmonth==0) 
		return 'This month';
}

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}

//group recenlty added record

function recentlyAddedRecord(){
    recentlyAdded=[];
    for(i in incomes){
        const date_added=incomes[i].date_added;
        const date_array=date_added.replace(' ','-').replace(/:/g,'-').split('-');
        const date_added_obj=new Date(date_array[0],date_array[1]-1,date_array[2],date_array[3],date_array[4],date_array[5]);
        const now=new Date();
        const hours = Math.abs(now - date_added_obj) / 36e5;
        if(hours<=24){ // if less or equal than 24 hours consider as recently added
            recentlyAdded.push(incomes[i]);
        }
    }
    for(i in expenses){
        const date_added=expenses[i].date_added;
        const date_array=date_added.replace(' ','-').replace(/:/g,'-').split('-');
        const date_added_obj=new Date(date_array[0],date_array[1]-1,date_array[2],date_array[3],date_array[4],date_array[5]);
        const now=new Date();
        const hours = Math.abs(now - date_added_obj) / 36e5;
        if(hours<=24){ // if less or equal than 24 hours consider as recently added
            recentlyAdded.push(expenses[i]);
        }
    }

    recentlyAdded.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        const bdate=b.date_added.replace(' ','-').replace(/:/g,'-').split('-');
        const adate=a.date_added.replace(' ','-').replace(/:/g,'-').split('-');
      
        
        return new Date( parseInt(bdate[0]), parseInt(bdate[1])-1, parseInt(bdate[2]), parseInt(bdate[3]),parseInt(bdate[4]), parseInt(bdate[5]), 0) - new Date(parseInt(adate[0]), parseInt(adate[1])-1, parseInt(adate[2]), parseInt(adate[3]), parseInt(adate[4]), parseInt(adate[5]), 0);
      });

}