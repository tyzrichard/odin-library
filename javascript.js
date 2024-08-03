const myLibrary = [];
const test = new Book('helloes!', 'richard', 3, 'this is my book', false, true);
const test2 = new Book('helloes again!!', 'also richard', 3000, 'this book is NON-fiction. VERY boring.', true, false);
const fiction = document.querySelector(".fiction");
const nonfiction = document.querySelector(".non-fiction");
const newButton = document.querySelector(".new");



const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

newButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

function Book(title, author, pages, synopsis, read, fiction) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.synopsis = synopsis;
  this.read = read;
  this.fiction = fiction;
}

function addBookToLibrary(book) {
  // Newbook div
  const newBook = document.createElement("div");
  newBook.classList.add("book");

  //Summary div
  const summary = document.createElement("div");
  summary.classList.add("summary");
  const title = document.createElement("div");
  title.textContent = `${book.title}`;
  summary.appendChild(title);
  const author = document.createElement("div");
  author.textContent = `by ${book.author}`;
  summary.appendChild(author);
  const pages = document.createElement("div");
  pages.textContent = `${book.pages} Pages`;
  summary.appendChild(pages);
  newBook.appendChild(summary);

  //Synopsis div
  const synopsis = document.createElement("div");
  synopsis.classList.add("synopsis");
  synopsis.textContent = `${book.synopsis}`;
  newBook.appendChild(synopsis);

  //Buttons div
  const buttons = document.createElement("div");
  buttons.classList.add("buttons");
  const read = document.createElement("button");
  read.classList.add("read");
  if (book.read) {
    read.textContent = "Finished";
  } else {
    read.textContent = "In Progress";
  }
  buttons.appendChild(read);
  const rtn = document.createElement("button");
  rtn.classList.add("return");
  const rtnIcon = document.createElement("img");
  rtnIcon.src = "assets/book.svg";
  rtn.appendChild(rtnIcon);
  buttons.appendChild(rtn);
  newBook.appendChild(buttons);

  //Append everything to the library bit
  if (book.fiction) {
    fiction.appendChild(newBook);
  } else {
    nonfiction.appendChild(newBook);
  }
  
}

addBookToLibrary(test);
addBookToLibrary(test2);
