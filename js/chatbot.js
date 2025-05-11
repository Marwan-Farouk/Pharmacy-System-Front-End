// Chatbot JavaScript functionality

document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendMessage');
    const quickActions = document.querySelectorAll('.quick-action');

    // Function to add a message to the chat
    function addMessage(message, isBot = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
        messageDiv.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to handle bot responses
    function getBotResponse(message) {
        // Simple response logic - can be expanded with more sophisticated AI/API integration
        const responses = {
            'order-status': 'To check your order status, please provide your order number.',
            'prescription': 'You can upload your prescription through our secure upload page.',
            'delivery': 'We offer free delivery for orders above $50. Standard delivery takes 2-3 business days.',
            'returns': 'Unopened items can be returned within 30 days of purchase with original receipt.'
        };

        // Check for keywords in the message
        for (const [key, response] of Object.entries(responses)) {
            if (message.toLowerCase().includes(key)) {
                return response;
            }
        }

        return "I'm here to help! You can ask about order status, prescriptions, delivery, or returns.";
    }

    // Handle send button click
    sendButton.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, false);
            userInput.value = '';

            // Get and display bot response
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage(botResponse, true);
            }, 500);
        }
    });

    // Handle enter key press
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });

    // Handle quick action buttons
    quickActions.forEach(button => {
        button.addEventListener('click', () => {
            const query = button.getAttribute('data-query');
            const response = getBotResponse(query);
            addMessage(` ${button.textContent}`, false);
            setTimeout(() => {
                addMessage(response, true);
            }, 500);
        });
    });
});