const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const text = document.getElementById('newQuoteText');
const category = document.getElementById('newQuoteCategory');
const quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { 
        text: "The only way to do great work is to love what you do.", 
        category: "Motivation" 
      },
      { 
        text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", 
        category: "Success" 
      },
      { 
        text: "Believe you can and you're halfway there.", 
        category: "Inspiration" 
      },
      { 
        text: "Act as if what you do makes a difference. It does.", 
        category: "Encouragement" 
      },
      { 
        text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", 
        category: "Self-Development" 
      },
      { 
        text: "Opportunities don't happen, you create them.", 
        category: "Opportunity" 
      },
      { 
        text: "Don't watch the clock; do what it does. Keep going.", 
        category: "Persistence" 
      },
      { 
        text: "The future belongs to those who believe in the beauty of their dreams.", 
        category: "Dreams" 
      },
      { 
        text: "You don't have to be great to start, but you have to start to be great.", 
        category: "Growth" 
      },
      { 
        text: "Your time is limited, so don't waste it living someone else's life.", 
        category: "Life" 
      }
]


function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
    quoteDisplay.innerHTML = '';

  // Create elements
  const quoteText = document.createElement('p');
  const quoteCategory = document.createElement('span');

  // Set the content
  quoteText.textContent = quote.text;
  quoteCategory.textContent = ` - ${quote.category}`;

  // Append elements to the quoteDisplay div
  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}
if(sessionStorage.getItem("qoute")){
  quoteDisplay.innerHTML = sessionStorage.getItem("qoute");
}
function showRandomQuote() {
    const quote = getRandomQuote();
   return quoteDisplay.innerHTML = `<p>${quote.text}</p><span>${quote.category}</span>`;
       sessionStorage.setItem("qoute", quoteDisplay.innerHTML);

}
newQuoteButton.addEventListener('click',showRandomQuote);

function createAddQuoteForm(){
    let textValue = text.value.trim();
    let categoryValue = category.value.trim();
    text.value = '';
    category.value = '';
         localStorage.setItem('quotes', JSON.stringify(quotes));

    return quotes.push({ text: textValue, category: categoryValue });
     populateCategories() ;
     filterQuotes();

}

function exportToJson() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url); // Clean up the URL
}
function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem('selectedCategory', selectedCategory); // Save filter preference.

  const filteredQuotes = selectedCategory === 'all' 
    ? quotes 
    : quotes.filter(quote => quote.category === selectedCategory);

  quoteDisplay.innerHTML = filteredQuotes.map(q =>
    `<p>${q.text} <span>[${q.category}]</span></p>`).join('');
}
function populateCategories() {
  const categories = [...new Set(quotes.map(quote => quote.category))];
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}
console.log(localStorage.getItem('quotes'));
    // Simulate server sync with conflict handling.
async function syncWithServer(newQuote) {
  try {
    // POST new quote to the server.
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuote)
    });

    syncMessage.textContent = "Quotes synced with server!";
    setTimeout(() => (syncMessage.textContent = ''), 3000);
  } catch (error) {
    console.error('Error syncing with server:', error);
  }
}

// Fetch latest quotes from the server and handle conflicts.
async function syncQuotes() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const serverQuotes = await response.json();

    // Simulate conflict resolution by prioritizing server data.
    const serverData = serverQuotes.map(q => ({
      text: q.body.substring(0, 20), // Mock text from JSONPlaceholder.
      category: 'Server'
    }));

    if (JSON.stringify(serverData) !== JSON.stringify(quotes)) {
      conflictMessage.textContent = 'Conflict detected! Server data takes precedence.';
      setTimeout(() => (conflictMessage.textContent = ''), 5000);
 syncMessage.textContent = 'Quote synced with server!';
      quotes = serverData;
      localStorage.setItem('quotes', JSON.stringify(quotes));
      populateCategories();
      filterQuotes();
    }
  } catch (error) {
    console.error('Error fetching data from server:', error);
  }
}
     syncMessage.textContent = "Quotes synced with server!";

// Periodically sync with the server every 30 seconds.
setInterval(fetchQuotesFromServer, 30000);

// Event listeners.
newQuoteButton.addEventListener('click', addQuote);
categoryFilter.addEventListener('change', filterQuotes);

