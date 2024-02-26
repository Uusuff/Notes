
const textNewNode = document.getElementById('input_new_Node');
const btnCreate = document.getElementById('create');
const btnSuccess = document.getElementById('btn-success');
const btnDelete = document.getElementById('btn-delete');
const listElements = document.getElementById('list');
const itemText = document.getElementById('item-text');
const locStorage = window.localStorage;

function getDataLocStor() {
   let getArray = locStorage.getItem('arr');
   let parseArr = JSON.parse(getArray);
   return parseArr;
}

function setDataLocStor(data) {
   let newArr = JSON.stringify(data);
   locStorage.setItem('arr', newArr);
}

function deleteElement(index) {
   let arr = getDataLocStor();
   arr.splice(index, 1);
   if (arr.length == 0) {
      arr = [];
   }
   setDataLocStor(arr);
}

function render() {
   clearingList();
   let listNotes = getDataLocStor();
   if (listNotes.length == 0) {
      addAlternativeText();
   } else {
      for (let i = 0; i < listNotes.length; i++) {
         addNote(createNote(listNotes[i].title, i, listNotes[i].state));
      }
   }

}

function chengeState(index) {
   let arrayNodes = getDataLocStor();
   let arrElm = arrayNodes[index];
   if (arrElm.state == true) {
      arrElm.state = false;
   } else {
      arrElm.state = true;
   }
   setDataLocStor(arrayNodes);
}

function clearingList() {
   listElements.innerHTML = "";
}

function addNote(note) {
   listElements.insertAdjacentHTML('beforeend', note);
}

function createNote(text, index, state) {
   let meaningClassText = "";
   let meaningClassBtn = "";
   if (state == false) {
      meaningClassText = "";
      meaningClassBtn = "btn-success"
   } else {
      meaningClassText = "done";
      meaningClassBtn = "btn-warning"
   }
   return `
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

listElements.onclick = function (event) {
   const indexElm = event.target.dataset.index;
   let typeElm = event.target.dataset.type;
   if (typeElm == "delete") {
      deleteElement(indexElm);
      render();
   } else if (typeElm == "toggle") {
      chengeState(indexElm);
      render();
   }

}

function addAlternativeText() {
   return addNote(`
      <span class="item-text" id="item-text"> 
         Нет заметок
      </span>`
   );
}

btnCreate.onclick = function () {
   if (textNewNode.value.length == 0) {
      return
   }
   let lists = getDataLocStor('arr')
   lists.push({ title: textNewNode.value, state: false });
   setDataLocStor(lists);
   render();
   textNewNode.value = '';
}

render();





