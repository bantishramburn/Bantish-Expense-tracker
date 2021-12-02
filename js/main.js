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
let expenses=[/*{
    description:'Eat dholl puri',
    amount:25,
    date: 2021-11-27,
    category:'Eating out'
}*/];
//array of expenses

//default categories for expenses
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
    
    for(let i in categories){
    const newDiv = document.createElement("div");
    newDiv.classList.add(`cat_${i}`);
    newDiv.classList.add(`category`);
    if(categories[i].default==true)
    newDiv.classList.add(`default`);
  
    // and give it some content
    const newContent = document.createTextNode(categories[i].name);
  
    // add the text node to the newly created div
    newDiv.appendChild(newContent);
    document.querySelector('#tab-categories .content').append(newDiv);
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