const bookCards = document.getElementById("bookCards");

async function fetchBooks(query = "bestsellers") {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10`);
  const data = await res.json();

  data.items.forEach((item, index) => {
    const book = item.volumeInfo;
    const title = book.title || "No Title";
    const authors = book.authors ? book.authors.join(", ") : "Unknown Author";
    const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : "https://via.placeholder.com/100x150?text=No+Image";

    const card = document.createElement("div");
    card.className = "card";
    card.style.animationDelay = `${index * 0.1}s`;
    card.innerHTML = `
    <div onclick="window.location.href='${item.volumeInfo.infoLink}'" class="book-card">
      <img src="${thumbnail}" alt="${title}" />
      <h3>${title}</h3>
      <p>${authors}</p>
    </div>
    `;

    bookCards.appendChild(card);
  });
}

fetchBooks();
