const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');

const text = document.getElementById('newQuoteText');
const category = document.getElementById('newQuoteCategory');

const quotes = [
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
}

function showRandomQuote() {
    const quote = getRandomQuote();
   return quoteDisplay.innerHTML = `<p>${quote.text}</p><span>${quote.category}</span>`;
}
newQuoteButton.addEventListener('click', showRandomQuote);

function addQuote(){
    let textValue = text.value.trim();
    let categoryValue = category.value.trim();
    text.value = '';
    category.value = '';
    return quotes.push({ text: textValue, category: categoryValue });

}

