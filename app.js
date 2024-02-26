const textNewNode = document.getElementById('input_new_Node');
const btnCreate = document.getElementById('create');
const btnSuccess = document.getElementById('btn-success');
const btnDelete = document.getElementById('btn-delete');
const listElements = document.getElementById('list');
const itemText = document.getElementById('item-text');
const listNotes = [
   {
      title: "Записатся к врачу",
      state: false
   },
   {
      title: "Сходить в магазин",
      state: false
   },
   {
      title: "Дочетать книгу",
      state: false
   }
];

function deleteElement(arr, index) {
   return arr.splice(index,1);
}

function render(arr) {
   clearingList(listElements);
   if(arr.length == 0){
      addAlternativeText();
   } else{                    
      for(let i = 0; i < arr.length; i++){
         addNote(createNote(arr[i].title, i, arr[i].state));
      }
   }  
}

function chengeState(index){
   let arrElm = listNotes[index];
   if(arrElm.state == true){
      arrElm.state = false;
   } else{
      arrElm.state = true;
   }
}

function clearingList(list) {
   list.innerHTML="";
}

function addNote(note){
   listElements.insertAdjacentHTML('beforeend', note);
}

function createNote(text, index, state) { 
   let meaningClassText = "";
   let meaningClassBtn = "";
   if(state == false){
      meaningClassText = "";
      meaningClassBtn = "btn-success"
   } else {
      meaningClassText = "done";
      meaningClassBtn = "btn-warning"
   }
   return`
   <li class="item ">
      <span class="${meaningClassText}">${text}</span>
      <div>
         <button 
         class="btn btn-small ${meaningClassBtn}" 
         id="btn-success" 
         data-index="${index}"
         data-type="toggle">&check;</button>
         <button 
         class="btn btn-small btn-danger" 
         id="btn-delete"
         data-index="${index}"
         data-type="delete">&times;</button>
      </div>
   </li>`
}

listElements.onclick = function(event){
   const indexElm = event.target.dataset.index;
   let typeElm =  event.target.dataset.type;
   if(typeElm == "delete"){
      deleteElement(listNotes, indexElm);
      render(listNotes);
   } else if(typeElm == "toggle"){
      chengeState(indexElm);
      render(listNotes);
   }  
}

function addAlternativeText(){
   return addNote(`
      <span class="item-text" id="item-text"> 
         Нет заметок
      </span>`
      );
} 

btnCreate.onclick = function () {
   if(textNewNode.value.length == 0){
      return 
   }
   listNotes.push({title: textNewNode.value, state: false})                                        
   render(listNotes)
   textNewNode.value ='';
}

textNewNode.addEventListener('keypress', function (event) {
   let key = event.keyCode;
   if (key === 13) {
      btnCreate.onclick();
   }
});

render(listNotes);
