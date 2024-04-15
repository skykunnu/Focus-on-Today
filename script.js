const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const Fact=document.querySelector(".fact");

const fact=[
    'Raise the bar by completing your goals!',
    'Well begun is half done',
    'Just a step away, Keep going',
    'Just one step away, Come on',
    'Whoa! You just completed all the goals, time for chill :D',
]

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || { // fetching data from local storage and also saving the pre-existing data for future use.
    // Earlier we had kept object empty, but when we deleted our local storage data and restart the process again it was throwing an error 
    // because allGoals object was empty and in empty object we were accessing (.name) property, so to avoid the error we have initilized empty name key.   
    first:{
        name:'',
        completed: false,
    },
    second:{
        name:'',
        completed: false,
    },
    third:{
        name:'',
        completed: false,
    },
    fourth:{
        name:'',
        completed: false,
    }
}; 
let completedGoalsCount=Object.values(allGoals).filter((goal)=>goal.completed).length; // calculating the count of how many completed properties are true.(Object.value is converting values of allGoals object into an array).
progressValue.style.width= `${completedGoalsCount/4 * 100}%`; // whenever our page gets reload, the progress bar should be display on screen. 
progressValue.firstElementChild.innerText=`${completedGoalsCount}/4 completed`;
Fact.innerText=fact[completedGoalsCount]; // It is changing facts after the completion of each task.

if( progressValue.firstElementChild.innerText=='4/4 completed'){
    progressValue.firstElementChild.innerText=`🥳🥳 Hurray!! You Completed your Daily Task`;
  }

// Logic for clickevent on checkboxes.
checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    const allGoalsAdded = [...inputFields].every((input) => {
      // first we converted inputfields into an array using spread operator and then applied every method(to check whether there is no empty) to it.
      return input.value; // truthy(something except falsy value) or falsy value, (Nothing) will be returned and else part will be executed.
    });

    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle("completed"); // toggle means it will add the class if not present and remove it when it is present.
    
      const inputID = checkbox.nextElementSibling.id; // using nextsibling method we can access the input element id's and using id we can access the allGoals object.
      allGoals[inputID].completed=!allGoals[inputID].completed; // if it is true then it becomes false and vice-versa.
      completedGoalsCount=Object.values(allGoals).filter((goal)=>goal.completed).length;

      progressValue.style.width= `${completedGoalsCount/4 * 100}%`; // Counting the percentage completed and using percentage it is increasing and decreasing width. 
      progressValue.firstElementChild.innerText=`${completedGoalsCount}/4 completed`; // Using firstElementChild we are accessing the span tag of progress value. 
      Fact.innerText=fact[completedGoalsCount];
      if( progressValue.firstElementChild.innerText=='4/4 completed'){
        progressValue.firstElementChild.innerText=`🥳🥳 Hurray!! You Completed your Daily Task`;
      }

      localStorage.setItem("allGoals", JSON.stringify(allGoals)); // to store above statement in the local storage. 

    } else {
      progressBar.classList.add("show-error"); // As soon as the condition gets false progress-bar will add this class and the show-error class and red text will be displayed.
    }
  });
});

// Logic for inserting value into inputField and also storing it in local storage.
inputFields.forEach((input) => { // this input callback is pointing to each element of inputFields array.

  input.value = allGoals[input.id].name; // to display on the web-app Screen.

  // Logic for the completed property of allGoals we have to add completed property as class to inputs parent element.
  // It is also used to display on the screen after refreshing it. 
  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error"); // removing the error line as soon as we click on inputFields this event will be triggered.
  });
  // (e.target.value & input.value both are same).
  // This is the Logic of inserting input values into allGoals object and also storing input values into local storage.
  input.addEventListener("input", (e) => {

    //logic is for making input field non editable after completion of task. 
    if (allGoals[input.id].completed) {
        input.value=allGoals[input.id].name;
        return ; // without it will update the value even after completion. 
      }


    allGoals[input.id].name=input.value; // this statement has been made to store input.value into the name property of allGoals object. 
     
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
