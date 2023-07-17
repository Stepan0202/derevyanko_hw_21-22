'use strict'
const form = document.forms[0];
const table = document.querySelector('#userInfo');
table.style.display = "none";
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    const formElements = event.target;
    const tableRow = document.createElement('tr');
    table.appendChild(tableRow);
    for(let i = 0; i < formElements.length; i++){
        let td = document.createElement('td');
        tableRow.appendChild(td);
        console.log(formElements[i].type);
        switch(formElements[i].type){
            case 'textarea':
            case 'text':
            case 'date':
            case 'select-one':
                td.textContent = firstLetterToUpperCase(processText(formElements[i]));
                break;
            case 'checkbox':
            case 'radio':
                const name = formElements[i].name;
                const radioNodeList = formElements[name];
                td.textContent = processRadio(radioNodeList, formElements[i].type);
                i += radioNodeList.length-1;
                break;
            case 'submit':
                break;
            default:
                td.textContent = "Not specified"
        }
    }
    form.style.display = "none";
    table.style.display = "table";
});
function processText(input){
    return input.value;
}
function processRadio(radioNodeList, type){
    let checked = [];
    for(let i = 0; i < radioNodeList.length; i++){
        if (radioNodeList[i].checked === true){
            console.log(type)
            if (type === 'checkbox')  checked.push(firstLetterToUpperCase(radioNodeList[i].id));
            else checked.push(radioNodeList[i].value);
            
        } 
    }
    return checked;

}
function firstLetterToUpperCase(string){
    return string.slice(0,1).toUpperCase() + string.slice(1);
}