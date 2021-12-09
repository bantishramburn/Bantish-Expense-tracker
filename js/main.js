let incomes=[{
    name:'fulltime job',
    income:5000,
    date: '2021-11-25'
},
{
    name:'partime job',
    income:3000,
    date: '2021-11-27'
},
{
    name: 'others',
    income: 200,
    date:'2021-12-05'
}
];
//array of incomes as we can have multiple income sources
let expenses=[
    {
        description:'Eat dholl puri',
        amount:25,
        date: '2021-12-03',
        category:'Eating out',
     
    },
    {
        description:'Car insurance',
        amount:10000,
        date: '2021-12-09',
        category:'Car',
      
    },
    {
        description:'Paid home loan',
        amount:15000.50,
        date: '2021-12-09',
        category:'Loan',
     

    }
]
let categories=[
    {
        name:'Car',
        default:true,

    },
    {
        name:'Clothing',
        default:true
    },
    {
        name:'Eating out',
        default:true,
    },
    {
        name:'Loan',
        default:true,
    },
    {
        name:'Rent',
        default:true
    },
    {
        name:'Utilities',
        default:true,
    },
    {
        name:'Other',
        default:true,
    }
]

function render(){ // this function is called after each action performed ex: after adding an expense or after adding an income or any other action that requires the data on screen to be updated.
    
    document.querySelector('#tab-categories .content').innerHTML="";
    document.querySelector('#tab-incomes .content').innerHTML="";
    document.querySelector('#tab-expenses .content').innerHTML="";
    document.querySelector('#tab-stats').innerHTML="";
    
    //rendering categories
    for(let i in categories){
        const newDiv = document.createElement("div");
        newDiv.classList.add(`cat_${i}`);
        newDiv.classList.add(`category`);
        if(categories[i].default==true){
            newDiv.classList.add(`default`);
        }

        // and give it some content
        const newContent = document.createTextNode(categories[i].name);
    
        // add the text node to the newly created div
        newDiv.appendChild(newContent);
        document.querySelector('#tab-categories .content').append(newDiv);
    }

    //rendering expenses

    
    let totalExpenses=0;
    expenses.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        const bdate=b.date.split('-');
        const adate=a.date.split('-');
      console.log(bdate);
        
        return new Date( parseInt(bdate[0]), parseInt(bdate[1])-1, parseInt(bdate[2]), 0, 0, 0, 0) - new Date(parseInt(adate[0]), parseInt(adate[1])-1, parseInt(adate[2]), 0, 0, 0, 0);
      });

    let group_expenses=[];
    for(let i in expenses){
        group_expenses[dateto_timeline_name(expenses[i].date)]=group_expenses[dateto_timeline_name(expenses[i].date)]||[];
        group_expenses[dateto_timeline_name(expenses[i].date)].push(expenses[i]);
    }
    console.log(group_expenses);
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
            const amount=document.createTextNode(`Rs ${ex[i].amount.toFixed(2)}`);
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
        console.log(b);
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

}
window.onload=(event) => {
    render();
  };

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
    
}


function toSpan(str,classname){
    const span=document.createElement('span');
    span.classList.add(classname);
    span.append(document.createTextNode(str));
    return span;
}

function cancel(){

    document.querySelector('.form-modal-overlay').classList.add('hidden');
    setTimeout(function(){
        document.querySelector('.form-modal-title').innerHTML='';
        document.querySelector('.form-modal-content').innerHTML='';
        document.querySelector('.form-modal-action .column-2').innerHTML='';
    },1000);
   
}

function showAddCategoryModal(){
    document.querySelector('.form-modal-title').innerHTML='Add new category';
    const btn=document.createElement('button');
    btn.classList.add('btnsave');
    btn.addEventListener("click", saveCategory);
    btn.append(document.createTextNode('Save'));

    const categoryInput=document.createElement('input');
    categoryInput.classList.add('cat_input');
    categoryInput.setAttribute('type','text');
    categoryInput.setAttribute('placeholder','Category name');
    categoryInput.addEventListener('keyup',activateCatSave);
    document.querySelector('.form-modal-content').append(categoryInput);

    document.querySelector('.form-modal-action .column-2').append(btn);


    document.querySelector('.form-modal-overlay').classList.remove('hidden');
}

function saveCategory(){
        categories.push({name:document.querySelector('.cat_input').value,default:false});
        render();
        cancel();
}

function activateCatSave(){
    if(document.querySelector('.cat_input').value.length>0){
        document.querySelector('.btnsave').classList.add('active');
    }else{
        document.querySelector('.btnsave').classList.remove('active');
    }
}

window.onload=(event) => {
    render();
  };

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
    
}


function toSpan(str,classname){
    const span=document.createElement('span');
    span.classList.add(classname);
    span.append(document.createTextNode(str));
    return span;
}

function cancel(){

    document.querySelector('.form-modal-overlay').classList.add('hidden');
    setTimeout(function(){
        document.querySelector('.form-modal-title').innerHTML='';
        document.querySelector('.form-modal-content').innerHTML='';
        document.querySelector('.form-modal-action .column-2').innerHTML='';
    },1000);
   
}

function showAddExpenseModal(){
    document.querySelector('.form-modal-title').innerHTML='Add new Expense';
    const btn=document.createElement('button');
    btn.classList.add('btnsave');
    btn.classList.add('active');
    btn.addEventListener("click", saveExpense);
    btn.append(document.createTextNode('Save'));

    const expenseCatSelect=document.createElement('select');
    expenseCatSelect.classList.add('expense_category');
    for(let i in categories){
        const catoption=document.createElement('option');
        catoption.setAttribute('value',categories[i].name);
        catoption.innerHTML=categories[i].name;
        expenseCatSelect.appendChild(catoption);
    }

    document.querySelector('.form-modal-content').append(expenseCatSelect);

    const expensenameInput=document.createElement('input');
    expensenameInput.classList.add('expense_description');
    expensenameInput.setAttribute('type','text');
    expensenameInput.setAttribute('placeholder','Name');

    document.querySelector('.form-modal-content').append(expensenameInput);

    const expenseamountInput=document.createElement('input');
    expenseamountInput.classList.add('expense_amount');
    expenseamountInput.setAttribute('type','float');
    expenseamountInput.setAttribute('placeholder', 'Amount');

    document.querySelector('.form-modal-content').append(expenseamountInput);


    const expenseDateInput=document.createElement('input');
    expenseDateInput.classList.add('expense_date');
    expenseDateInput.setAttribute('type','date');
    expenseDateInput.setAttribute('placeholder', 'YYYY-MM-DD');

    document.querySelector('.form-modal-content').append(expenseDateInput);


    document.querySelector('.form-modal-action .column-2').append(btn);
    document.querySelector('.form-modal-overlay').classList.remove('hidden');
}

function saveExpense(){
        expenses.push({description:document.querySelector('.expense_description').value,category:document.querySelector('.expense_category').value,amount:parseFloat(document.querySelector('.expense_amount').value),date:document.querySelector('.expense_date').value});
        render();
        cancel();
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