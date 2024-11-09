const fictLibrary = [],
  nonFictLibrary = [];
const fiction = document.querySelector(".fiction");
const nonfiction = document.querySelector(".non-fiction");
const newButton = document.querySelector(".new");

// Lots of form items + their error spans + js
const title_input = document.querySelector("#title");
const title_error = document.querySelector("#title + span.error");
const author_input = document.querySelector("#author");
const author_error = document.querySelector("#author + span.error");
const pages_input = document.querySelector("#pages");
const pages_error = document.querySelector("#pages + span.error");
const desc_input = document.querySelector("#desc");
const desc_error = document.querySelector("#desc + span.error");
const fiction_input = document.querySelector("#fict");
const nonfiction_input = document.querySelector("#nonfict");
const fiction_error = document.querySelector("div.radio-input + span.error");

title_input.addEventListener("input", (event) => {
  title_input.classList.add("touched");
  if (title_input.validity.valid) {
    title_error.textContent = "";
    title_error.className = "error";
  } else {
    showError(title_error);
  }
});

author_input.addEventListener("input", (event) => {
  author_input.classList.add("touched");
  if (author_input.validity.valid) {
    author_error.textContent = "";
    author_error.className = "error";
  } else {
    showError(author_error);
  }
});

pages_input.addEventListener("input", (event) => {
  pages_input.classList.add("touched");
  if (pages_input.value >= 1) {
    pages_error.textContent = "";
    pages_error.className = "error";
  } else {
    showError(pages_error);
  }
});

desc_input.addEventListener("input", (event) => {
  desc_input.classList.add("touched");
  if (desc_input.validity.valid) {
    desc_error.textContent = "";
    desc_error.className = "error";
  } else {
    showError(desc_error);
  }
});

function showError(errorDiv) {
  if (errorDiv == title_error) {
    if (title_input.validity.valueMissing) {
      title_error.textContent = "You need to enter a title.";
    }
  } else if (errorDiv == author_error) {
    if (author_input.validity.valueMissing) {
      author_error.textContent = "You need to enter the author's name.";
    }
  } else if (errorDiv == pages_error) {
    if (pages_input.validity.valueMissing) {
      pages_error.textContent = "Missing value!";
    } else if (pages_input.value < 1) {
      pages_error.textContent = "Invalid value!";
    }
  } else if ((errorDiv = desc_error)) {
    if (desc_input.validity.valueMissing) {
      desc_error.textContent = "You need to enter a description.";
    }
  }
  errorDiv.className = "error active";
}

const lotr = new Book([
  "Lord of the Rings",
  "J.R.R Tolkien",
  200,
  "This book follows the story of Frodo who goes on an impossible quest to destroy a very powerful and magical ring.",
  "fict",
]);

const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const closeButton = document.querySelector("dialog button");

newButton.addEventListener("click", () => {
  dialog.showModal();
  form.reset();
});

closeButton.addEventListener("click", () => {
  fiction_error.textContent = "";
  title_input.classList.remove("touched");
  author_input.classList.remove("touched");
  pages_input.classList.remove("touched");
  desc_input.classList.remove("touched");
  dialog.close();
});

function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  if (!title_input.validity.valid) {
    showError(title_error);
  } else if (!author_input.validity.valid) {
    showError(author_error);
  } else if (!pages_input.validity.valid || pages_input.value < 1) {
    showError(pages_error);
  } else if (!desc_input.validity.valid) {
    showError(desc_error);
  } else if (!fiction_input.checked && !nonfiction_input.checked) {
    fiction_error.textContent = "Fill in the book's type!";
  } else {
    fiction_error.textContent = "";
    title_input.classList.remove("touched");
    author_input.classList.remove("touched");
    pages_input.classList.remove("touched");
    desc_input.classList.remove("touched");
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
}

function Book(info) {
  this.title = info[0];
  this.author = info[1];
  this.pages = info[2];
  this.synopsis = info[3];
  this.read = false;
  this.fiction = info[4] === "fict";

  this.changeRead = function () {
    this.read = !this.read;
  };
}

function addBookToLibrary(book) {
  // Determine the index to assign
  let index;
  if (book.fiction) {
    fictLibrary.push(book);
    index = fictLibrary.length - 1;
  } else {
    nonFictLibrary.push(book);
    index = nonFictLibrary.length - 1;
  }

  const newBook = document.createElement("div");
  newBook.classList.add("book");
  newBook.setAttribute("data-index", index);

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
  newBook.appendChild(summary);

  // Synopsis div
  const synopsis = document.createElement("div");
  synopsis.classList.add("synopsis");
  synopsis.textContent = `${book.synopsis}`;
  newBook.appendChild(synopsis);

  // Buttons div
  const buttons = document.createElement("div");
  buttons.classList.add("buttons");
  const read = document.createElement("button");
  read.classList.add("read");
  read.textContent = book.read ? "Finished" : "In Progress";
  read.addEventListener("click", () => {
    book.changeRead();
    read.textContent = book.read ? "Finished" : "In Progress";
    read.style.backgroundColor = book.read ? "#99F6E4" : "#FEF08A";
  });
  buttons.appendChild(read);

  const rtn = document.createElement("button");
  rtn.classList.add("return");
  const rtnIcon = document.createElement("img");
  rtnIcon.src = "assets/book.svg";
  rtn.appendChild(rtnIcon);
  // Pass the current index and fiction status
  rtn.addEventListener("click", () => {
    removeBook(parseInt(newBook.getAttribute("data-index")), book.fiction);
  });
  buttons.appendChild(rtn);
  newBook.appendChild(buttons);

  // Append to the DOM
  if (book.fiction) {
    fiction.appendChild(newBook);
  } else {
    nonfiction.appendChild(newBook);
  }

  // Update indices
  updateBookIndices();
}

function removeBook(index, isFiction) {
  if (isFiction) {
    // Remove from array
    fictLibrary.splice(index, 1);

    // Remove from DOM
    const fictionBooks = document.querySelectorAll(".fiction .book");
    fictionBooks.forEach((book) => {
      if (parseInt(book.getAttribute("data-index")) === index) {
        book.remove();
      }
    });
  } else {
    // Remove from array
    nonFictLibrary.splice(index, 1);

    // Remove from DOM
    const nonFictionBooks = document.querySelectorAll(".non-fiction .book");
    nonFictionBooks.forEach((book) => {
      if (parseInt(book.getAttribute("data-index")) === index) {
        book.remove();
      }
    });
  }

  // Update indices
  updateBookIndices();
}

function updateBookIndices() {
  // Update indices for fiction books
  const fictionBooks = document.querySelectorAll(".fiction .book");
  fictionBooks.forEach((book, newIndex) => {
    book.setAttribute("data-index", newIndex);
  });

  // Update indices for non-fiction books
  const nonFictionBooks = document.querySelectorAll(".non-fiction .book");
  nonFictionBooks.forEach((book, newIndex) => {
    book.setAttribute("data-index", newIndex);
  });

  // Update index properties in book objects
  fictLibrary.forEach((book, index) => {
    book.index = index;
  });

  nonFictLibrary.forEach((book, index) => {
    book.index = index;
  });
}

addBookToLibrary(lotr);
