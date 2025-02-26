const buttonToggle = document.getElementById('show-modal-btn');
const form = document.getElementById('form');
const dialog = document.getElementById('dialog');
const cancelButton = document.getElementById('cancel-btn');
const bookContainer = document.querySelector('.book-container');
const addBookButton = document.getElementById('add-btn');
const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');
const pagesInput = document.getElementById('pages-input');
const statusInput = document.getElementById('status-input');
const statusArr = ['Completed', 'In Progress', 'Paused', 'Not Started'];
let currentIndex = 0;
let bookArr = [];

function Book(title,author,pages,status,id){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = id;
}

Book.prototype.toggleRead = function(){
    if(this.status === 'Yes'){
        this.status = 'No'
    }else{
        this.status = 'Yes'
    }
};

buttonToggle.addEventListener('click',()=>{
    dialog.showModal();
})

cancelButton.addEventListener('click', ()=>{
    dialog.close();
})

function addToBookLibrary(title,author,pages,status,id){
    const newBook = new Book(title,author,pages,status,id);
    bookArr.push(newBook);
}

function displayNewBook(){
    let HTML = '';
    if(bookArr.length===0){
        bookContainer.innerHTML = '';
        return;
    }

    bookArr.forEach((newBook, index)=>{

    HTML += `
        <div class='card'>
            <p>Title: ${newBook.title}</p>
            <p>Author: ${newBook.author}</p>
            <p>Pages: ${newBook.pages}</p>
            <p>Read: ${newBook.status}</p>
            <div class='button-flex'>
            <button type="button" class="remove-btn" data-index=${index}>Remove</button>
            <button type="button" class="status-btn" data-index=${index}>Change Status</button>
            </div>
        </div>
    `


    bookContainer.innerHTML = HTML;
    })

    console.log(bookArr)
    const removeButtons = [...document.querySelectorAll('.remove-btn')];
    removeButtons.forEach((el)=>{
        el.addEventListener('click',(e)=>{
            bookArr.splice(e.target.getAttribute('data-index'),1);
            displayNewBook()
        })
    })

    const changeStatusButtons = [...document.querySelectorAll('.status-btn')];
    changeStatusButtons.forEach((el)=>{
        el.addEventListener('click', (e)=>{
            bookArr[e.target.getAttribute('data-index')].toggleRead();
            displayNewBook();
        })
    })

}




addBookButton.addEventListener('click', ()=>{
    let titleValue = titleInput.value;
    let authorValue = authorInput.value;
    let pagesValue = pagesInput.value;
    let statusValue = statusInput.value;


    addToBookLibrary(titleValue,authorValue,pagesValue,statusValue);
    displayNewBook();
})