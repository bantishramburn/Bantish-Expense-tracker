let incomes=[{
    name:'fulltime job',
    income:5000,
    date: '2021/11/27'
},
{
    name:'partime job',
    income:3000,
    date: '2021/11/27'
},
{
    name: 'others',
    income: 200,
    date:'2021/12/05'
}
];
//array of incomes as we can have multiple income sources
let expenses=[
    {
        description:'Eat dholl puri',
        amount:25,
        date: 2021-11-27,
        category:'Eating out',
     
    },
    {
        description:'Car insurance',
        amount:10000,
        date: 2021-11-30,
        category:'Car',
      
    },
    {
        description:'Paid home loan',
        amount:15000.50,
        date: 2021-11-30,
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
    for(let i in expenses){
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
        rowCatTitleDiv.appendChild(document.createTextNode(expenses[i].category));
        expenseDiv.appendChild(rowCatTitleDiv);
        //expense desc
        const expenseDescDiv= document.createElement("div");
        expenseDescDiv.classList.add('row-2');
        expenseDescDiv.appendChild(document.createTextNode(expenses[i].description));
        expenseDiv.appendChild(expenseDescDiv);
        
        //element for category title and expense description 
        const expenseAmountDiv= document.createElement("div");
        expenseAmountDiv.classList.add('column-3');
        const amount=document.createTextNode(`Rs ${expenses[i].amount.toFixed(2)}`);
        expenseAmountDiv.appendChild(amount);
        totalExpenses+=expenses[i].amount;

        //const newContent = document.createTextNode(expenses[i].description);

        newDiv.appendChild(iconDiv);
        newDiv.appendChild(expenseDiv);
        newDiv.appendChild(expenseAmountDiv);

        document.querySelector('#tab-expenses .content').append(newDiv);
    }
    const totalExpensesDiv=document.createElement("div");
    totalExpensesDiv.classList.add('total');
    totalExpensesDiv.append(toSpan('Rs','rs'));
    totalExpensesDiv.append(toSpan(totalExpenses.toFixed(2),'amount'));
    totalExpensesDiv.append(toSpan('MUR','mur'));
    document.querySelector('#tab-expenses .content').prepend(totalExpensesDiv);

    let totalIncome=0;
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