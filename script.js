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