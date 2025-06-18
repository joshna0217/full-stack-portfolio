// Chatbot data and responses
const botGreetings = [
  "Hello! I'm Joshna's personal assistant bot. Ask me about skills, projects, or experience.",
  "Hi! How can I assist you today? You can ask about my work, skills, or certifications.",
];

const faqDatabase = [
  { keywords: ["skills", "technical skills", "technologies", "languages"], answer: "I am proficient in HTML5, CSS3, JavaScript (ES6+), Python, R, React, Redux, Node.js, Express.js, Tailwind CSS, Django, MongoDB, MySQL, and more." },
  { keywords: ["projects", "work", "portfolio", "experience"], answer: "I have worked on projects such as YouTube Clone, ShoppyGlobe E-commerce app, Cryptocurrency Price Prediction, Human Resource Management System, and Face Recognition Smart Attendance System." },
  { keywords: ["certifications", "courses", "training"], answer: "I hold certifications in Full Stack Web Development, Front-End Development, Back-End Development, UI/UX Design, and AWS Cloud Essentials." },
  { keywords: ["experience", "internship", "job"], answer: "I completed an internship at Colt Assist Pvt. Ltd, where I developed dynamic web applications and collaborated using Agile methodologies." },
  { keywords: ["contact", "email", "phone"], answer: "You can contact me at joshnareddy2003@gmail.com or phone +91 63643 54740." },
  { keywords: ["achievements", "hackathon"], answer: "I managed over 300 attendees and collected over ₹50,000 in fees at AMC Hackathon and participated in Smart India Hackathon with innovative solutions." },
  { keywords: ["help"], answer: "Feel free to ask about my skills, projects, experience, certifications, or contact details." },
];

const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotPanel = document.getElementById('chatbotPanel');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotForm = document.getElementById('chatbotForm');
const chatbotInput = document.getElementById('chatbotInput');

// Utility: Append bot or user messages
function appendMessage(text, sender = 'bot') {
  const messageElem = document.createElement('div');
  messageElem.classList.add('chatbot-message', sender);
  messageElem.textContent = text;
  chatbotMessages.appendChild(messageElem);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getBotResponse(input) {
  input = input.toLowerCase();
  for (const entry of faqDatabase) {
    for (const kw of entry.keywords) {
      if (input.includes(kw)) {
        return entry.answer;
      }
    }
  }
  return "Sorry, I didn't understand that. You can ask about my skills, projects, experience, certifications, or contact info.";
}

// Open/close chatbot panel
chatbotToggle.addEventListener('click', () => {
  const expanded = chatbotToggle.getAttribute('aria-expanded') === 'true';
  if (expanded) {
    chatbotPanel.hidden = true;
    chatbotToggle.setAttribute('aria-expanded', 'false');
  } else {
    chatbotPanel.hidden = false;
    chatbotToggle.setAttribute('aria-expanded', 'true');
    chatbotInput.focus();
    if (chatbotMessages.children.length === 0) {
      appendMessage(botGreetings[Math.floor(Math.random() * botGreetings.length)], 'bot');
    }
  }
});
chatbotClose.addEventListener('click', () => {
  chatbotPanel.hidden = true;
  chatbotToggle.setAttribute('aria-expanded', 'false');
  chatbotToggle.focus();
});

// Handle form submit
chatbotForm.addEventListener('submit', e => {
  e.preventDefault();
  const userText = chatbotInput.value.trim();
  if (!userText) return;
  appendMessage(userText, 'user');
  chatbotInput.value = '';
  setTimeout(() => {
    const botText = getBotResponse(userText);
    appendMessage(botText, 'bot');
  }, 700);
});
