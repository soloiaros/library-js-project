const myLibrary = []

function Book(title, author, yearPublished, genre) {
  this.title = title;
  this.author = author;
  this.yearPublished = yearPublished;
  this.genre = genre;
  this.id = crypto.randomUUID();
  this.read = false;
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
    [titleInput.value, authorInput.value, yearInput.value, genreSelect.value] = ["", "", "2010", "Fiction"];
  }
)

// Rendering the cards
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
    let [editButton, deleteButton, copyButton, readToggleLabel] = [document.createElement('button'), document.createElement('button'), document.createElement('button'), document.createElement('label')];
    [editButton.innerText, deleteButton.innerText, copyButton.innerText] = ['Edit', 'Delete', 'Copy'];
    readToggleLabel.setAttribute('for', `read-toggle-${book.id}`);
    readToggleLabel.innerHTML = `<input ${'checked'.repeat(Number(book.read))} type="checkbox" id="read-toggle-${book.id}" name="read">Read`;
    for (let button of [copyButton, readToggleLabel, editButton, deleteButton]) {
      button.setAttribute('data-book-id', book.id);
      buttonContainer.appendChild(button);
    }

    deleteButton.addEventListener(
      'click',
      () => {
        let bookIndex = myLibrary.indexOf(book);
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

    readToggleLabel.addEventListener(
      'click',
      () => {
        book.read = !book.read;
      }
    )

    copyButton.addEventListener(
      'click',
      () => {
        const bookInfo = `${book.title} by ${book.author}, published in the year ${book.yearPublished}. The genre of the book is ${book.genre}`;
        let timeout = undefined;
        navigator.clipboard.writeText(bookInfo);

        const popUpDiv = document.querySelector('.clipboard-popup');
        popUpDiv.classList.add('showing');
        if (!timeout) {
          timeout = setTimeout(() => {
            popUpDiv.classList.remove('showing');
          }, 3000);
        }
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
addNewBook("Murder on the Orient Express", "Agatha Christie", '1934', 'detective');
addNewBook("The Hound of the Baskervilles", "Sir A. Conan Doyle", '1902', 'fantasy');
addNewBook("Heated Rivalry", "Rachel Reid", '2019', 'romance');

displayBooks();
