const myLibrary = []

function Book(title, author, yearPublished, genre) {
  this.title = title;
  this.author = author;
  this.yearPublished = yearPublished;
  this.genre = genre;
  this.id = crypto.randomUUID();
}

function addNewBook (title, author, yearPublished, genre) {
  let newBook = new Book(title, author, yearPublished, genre);
  myLibrary.push(newBook);
}

function updateBook(bookId, title, author, yearPublished, genre) {
  const book = myLibrary.find(obj => obj.id === bookId);
  book.title = title;
  book.author = author;
  book.yearPublished = yearPublished;
  book.genre = genre;
}

// Handling a modal
const actionButton = document.querySelector('.book-display + button');
const submitButton = document.querySelector('.book-info-dialog button');
const dialog = document.querySelector('.book-info-dialog');

const titleInput = dialog.querySelector('#title');
const authorInput = dialog.querySelector('#author');
const yearInput = dialog.querySelector('#release-year');
const genreSelect = dialog.querySelector('#genre');
const bookId = dialog.querySelector('#id');

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
      bookId.value,
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
    if (dialog.returnValue) {
      let [title, author, year, genre, bookId] = dialog.returnValue.split(',');
      if (bookId) {
        updateBook(bookId, title, author, year, genre)
      } else {
        addNewBook(title, author, year, genre);
      }
      displayBooks();
    }
  }
)

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
    buttonContainer.classList.add('button-container');
    let [editButton, deleteButton, copyButton] = [document.createElement('button'), document.createElement('button'), document.createElement('button')];
    [editButton.innerText, deleteButton.innerText, copyButton.innerText] = ['Edit', 'Delete', 'Copy'];
    for (let button of [copyButton, editButton, deleteButton]) {
      button.setAttribute('data-book-id', book.id);
      buttonContainer.appendChild(button);
    }

    deleteButton.addEventListener(
      'click',
      () => {
        bookIndex = myLibrary.indexOf(book);
        myLibrary.splice(bookIndex, 1);
        displayBooks();
      }
    )

    editButton.addEventListener(
      'click',
      () => {
        titleInput.value = book.title;
        authorInput.value = book.author;
        yearInput.value = book.yearPublished;
        genreSelect.value = book.genre;
        bookId.value = book.id;
        dialog.showModal();
      }
    )

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
