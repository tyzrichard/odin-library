const myLibrary = [];
const fiction = document.querySelector(".fiction");
const nonfiction = document.querySelector(".non-fiction");
const newButton = document.querySelector(".new");



const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const showButton = document.querySelector("dialog + button");
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

  // Perform form submission tasks here, e.g., sending data to a server
  var formData = new FormData(form);

  // Retrieve form data
  var formValues = [];
  formData.forEach((value) => {
    formValues.push(value);
  });
  console.log(formValues);

  // Log the form values (or process them as needed)
  const newBook = new Book(formValues)
  addBookToLibrary(newBook);
  dialog.close();
}

function Book(info) {
  this.title = info[0];
  this.author = info[1];
  this.pages = info[2];
  this.synopsis = info[3];
  this.read = false;
  if (info[5] == 'fict') {
    this.fiction = true;
  } else this.fiction = false;
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
  author.textContent = `By ${book.author}`;
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
