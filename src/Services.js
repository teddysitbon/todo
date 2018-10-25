export function saveItem(item) {
    let currentItem = {},
        data = [];
    currentItem['id'] = Math.floor(Math.random() * Math.floor(1000000));
    currentItem['title'] = item;
    currentItem['done'] = false;
    
    if(localStorage.getItem("todo-react") !== null)
    {
        data = JSON.parse(localStorage.getItem("todo-react"));
    }
    data.push(currentItem);
    localStorage.setItem("todo-react", JSON.stringify(data));
}
export function itemExist(){
    if(localStorage.getItem("todo-react") === null)
    {
        return false;
    }
    else
    {
        return true;
    }   
}
export function getItems(){
    return JSON.parse(localStorage.getItem("todo-react")); 
}
export function deleteItem(id){
    var data = JSON.parse(localStorage.getItem("todo-react"));
    for(var i = 0; i < data.length; i++)
    {
        if(data[i].id === id)
        {
            data.splice(i, 1);
        }
    }
    if(data.length === 0)
    {
        localStorage.removeItem("todo-react");
    }
    else
    {
        localStorage.setItem("todo-react", JSON.stringify(data));
    }    
}
export function doneItem(id){
    var data = JSON.parse(localStorage.getItem("todo-react"));
    for(var i = 0; i < data.length; i++)
    {
        if(data[i].id === id)
        {
            data[i].done = !data[i].done;
        }
    }
    localStorage.setItem("todo-react", JSON.stringify(data));
}
export function editTextItem(id, newValue){
    var data = JSON.parse(localStorage.getItem("todo-react"));
    data.forEach(function(item){
        if(item.id === id)
        {
            item['title'] = newValue;
        }
    });
    localStorage.setItem("todo-react", JSON.stringify(data));
}