const myLibrary = []

function Book(title, author, yearPublished, genre) {
  this.title = title;
  this.author = author;
  this.yearPublished = yearPublished;
  this.genre = genre;
}

function addNewBook (title, author, yearPublished, genre) {
  let newBook = new Book(title, author, yearPublished, genre);
  myLibrary.push(newBook);
}

function displayBooks() {
  const bookshelf = document.querySelector('.book-display');
  bookshelf.innerHTML = "";
  for (let book of myLibrary) {
    let bookCard = document.createElement('div');

    let bookTitle = document.createElement('span');
    bookTitle.innerText = book.title;

    let bookAuthor = document.createElement('span');
    bookAuthor.innerText = book.author;

    let bookYear = document.createElement('span');
    bookYear.innerText = book.yearPublished;

    let bookGenre = document.createElement('span');
    bookGenre.innerText = book.genre;

    let buttonContainer = document.createElement('div');
    let editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    for (let button of [editButton, deleteButton]) {buttonContainer.appendChild(button)}

    for (let info of [bookTitle, bookAuthor, bookYear, bookGenre]) {
      bookCard.appendChild(info);
    }
    bookCard.appendChild(buttonContainer);
    bookshelf.appendChild(bookCard);
  }
}

// A temporary solution for setting initial values
addNewBook("Harry Potter and the Philosopher's Stone", "J. K. Rowling", '1997', 'fantasy');
addNewBook("The Hobbiet", "J. R. R. Tolkien", '1937', 'fantasy');

displayBooks();

// Handling a modal
const actionButton = document.querySelector('.book-display + button');
const submitButton = document.querySelector('.book-info-dialog button');
const dialog = document.querySelector('.book-info-dialog');

const titleInput = dialog.querySelector('#title');
const authorInput = dialog.querySelector('#author');
const yearInput = dialog.querySelector('#release-year');
const genreSelect = dialog.querySelector('#genre');

yearInput.addEventListener(
  'focus', () => yearInput.select()
)

submitButton.addEventListener(
  'click',
  (e) => {
    e.preventDefault();
    dialog.close([
      titleInput.value, authorInput.value,
      yearInput.value, genreSelect.value,
    ]);
  }
)

actionButton.addEventListener(
  'click',
  () => {
    dialog.showModal();
  }
)

dialog.addEventListener(
  'close',
  (e) => {
    if (dialog.returnValue != 'default') {
      let [title, author, year, genre] = dialog.returnValue.split(',');
      addNewBook(title, author, year, genre);
      displayBooks();
    }
  }
)