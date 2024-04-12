const checkBoxList=document.querySelectorAll('.custom-checkbox');
const inputFields=document.querySelectorAll('.goal-input');
const errorLabel=document.querySelector('.error-label');
const progressBar=document.querySelector('.progress-bar');






checkBoxList.forEach((checkbox)=>{
    checkbox.addEventListener('click',()=>{
        const allGoalsAdded=[...inputFields].every((input)=>{ // first we converted inputfields into an array using spread operator and then applied every method to it. 
            return input.value; // truthy(something except falsy value) or falsy value(Nothing is return) will be returned.
        })

        if(allGoalsAdded){
            checkbox.parentElement.classList.toggle('completed'); // toggle means it will add the class if not present and remove it when it is present. 
        }
        else{
            progressBar.classList.add('show-error'); // As soon as the condition gets false progress-bar will add this class and the show-error class and red text will be displayed.
        }
        
    })
})

// Focus Event on inputFields
inputFields.forEach((input)=>{
    input.addEventListener('focus',()=>{
        progressBar.classList.remove('show-error');
    })
})
