const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {}; // fetching data from local storage and also saving the pre-existing data for future use.
let completedGoalsCount=Object.values(allGoals).filter((goal)=>goal.completed).length; // calculating the count of how many completed properties are true.(Object.value is converting values of allGoals object into an array).
progressValue.style.width= `${completedGoalsCount/3 * 100}%`; // whenever our page gets reload, the progress bar should be display on screen. 
progressValue.firstElementChild.innerText=`${completedGoalsCount}/3 completed`;
if( progressValue.firstElementChild.innerText=='3/3 completed'){
    progressValue.firstElementChild.innerText=`🥳🥳 Hurray!! you Completed your Daily Task`;
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
    
      const inputID = checkbox.nextElementSibling.id; // using nextsibling method we accessed the input element id's and using id we can access the allGoals object.
      allGoals[inputID].completed=!allGoals[inputID].completed; // if it is true then it becomes false and vice-versa.
      completedGoalsCount=Object.values(allGoals).filter((goal)=>goal.completed).length;

      progressValue.style.width= `${completedGoalsCount/3 * 100}%`; // Counting the percentage completed and using percentage it is increasing and decreasing width. 
      progressValue.firstElementChild.innerText=`${completedGoalsCount}/3 completed`; // Using firstElementChild we are accessing the span tag of progress value. 
      if( progressValue.firstElementChild.innerText=='3/3 completed'){
        progressValue.firstElementChild.innerText=`🥳🥳 Hurray!! you Completed your Daily Task`;
      }
      localStorage.setItem("allGoals", JSON.stringify(allGoals)); // to store above statement in the local storage. 

    } else {
      progressBar.classList.add("show-error"); // As soon as the condition gets false progress-bar will add this class and the show-error class and red text will be displayed.
    }
  });
});

// Logic for inserting value into inputField and also storing it in local storage.
inputFields.forEach((input) => {
  // this input is pointing to each element of inputFields array.

  input.value = allGoals[input.id].name; // to display on the web-app Screen.

  // Logic for the completed property of allGoals we have to add completed property as class to inputs parent element.
  // It is also used to display on the screen after refreshing it. 
  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error"); // removing the error line as soon as we click on inputFields this event will be triggered.
  });

  // This is the Logic of inserting input value into allGoals object and also storing input values into local storage.
  input.addEventListener("input", (e) => {
    allGoals[input.id] =
      // this object has been created to store name and completed property.
      {
        name: input.value,
        completed: false,
      };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
