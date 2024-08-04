const myLibrary = [];
const fiction = document.querySelector(".fiction");
const nonfiction = document.querySelector(".non-fiction");
const newButton = document.querySelector(".new");

const lotr = new Book(['Lord of the Rings', 'J.R.R Tolkien', 200, 'This book follows the story of Frodo who goes on an impossible quest to destroy a very powerful and magical ring.', 'fict']);

const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const closeButton = document.querySelector("dialog button");

newButton.addEventListener("click", () => {
  dialog.showModal();
  form.reset();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Retrieve form data
  const formData = new FormData(form);
  const formValues = [];
  formData.forEach((value) => {
    formValues.push(value);
  });

  const newBook = new Book(formValues);
  addBookToLibrary(newBook);
  dialog.close();
}

function Book(info) {
  this.title = info[0];
  this.author = info[1];
  this.pages = info[2];
  this.synopsis = info[3];
  this.read = false;
  this.fiction = info[4] === 'fict';
  
  this.changeRead = function() {
    this.read = !this.read;
  }
}

function addBookToLibrary(book) {
  // Newbook div
  const newBookDiv = document.createElement("div");
  newBookDiv.classList.add("book");

  // Summary div
  const summary = document.createElement("div");
  summary.classList.add("summary");
  const title = document.createElement("div");
  title.textContent = `${book.title}`;
  summary.appendChild(title);
  const author = document.createElement("div");
  author.textContent = `By ${book.author}`;
  summary.appendChild(author);
  const pages = document.createElement("div");
  pages.textContent = `${book.pages} Pages`;
  summary.appendChild(pages);
  newBookDiv.appendChild(summary);

  // Synopsis div
  const synopsis = document.createElement("div");
  synopsis.classList.add("synopsis");
  synopsis.textContent = `${book.synopsis}`;
  newBookDiv.appendChild(synopsis);

  // Buttons div
  const buttons = document.createElement("div");
  buttons.classList.add("buttons");
  const read = document.createElement("button");
  read.classList.add("read");
  read.textContent = book.read ? "Finished" : "In Progress";
  read.addEventListener("click", () => {
    book.changeRead();
    if (book.read) {
      read.textContent = "Finished";
      read.style.backgroundColor = '#99F6E4';
    } else {
      read.textContent = "In Progress";
      read.style.backgroundColor = '#FEF08A';
    }
  });
  buttons.appendChild(read);
  const rtn = document.createElement("button");
  rtn.classList.add("return");
  const rtnIcon = document.createElement("img");
  rtnIcon.src = "assets/book.svg";
  rtn.appendChild(rtnIcon);
  buttons.appendChild(rtn);
  newBookDiv.appendChild(buttons);

  // Append everything to the library bit
  if (book.fiction) {
    fiction.appendChild(newBookDiv);
  } else {
    nonfiction.appendChild(newBookDiv);
  }

  // Add book to myLibrary array
  myLibrary.push(book);
}

addBookToLibrary(lotr);
