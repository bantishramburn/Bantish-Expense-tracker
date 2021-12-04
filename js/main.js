let incomes=[/*{
    name:'fulltime job',
    income:5000,
    date: 2021-11-27
},
{
    name:'partime job',
    income:3000,
    date: 2021-11-27
}*/
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
        

        //const newContent = document.createTextNode(expenses[i].description);

        newDiv.appendChild(iconDiv);
        newDiv.appendChild(expenseDiv);
        newDiv.appendChild(expenseAmountDiv);

        document.querySelector('#tab-expenses .content').append(newDiv);
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
