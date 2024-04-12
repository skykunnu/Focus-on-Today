const checkBoxList=document.querySelectorAll('.custom-checkbox');

checkBoxList.forEach((checkbox)=>{
    checkbox.addEventListener('click',(e)=>{
        checkbox.parentElement.classList.toggle('completed'); // toggle means it will add the class if not present and remove it when it is present. 
    })
})