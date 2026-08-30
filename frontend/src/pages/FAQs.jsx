import { useState } from 'react';

const faqItems = [
  {
    id: 'faq1',
    question: 'What is the AntiQ?',
    answer: 'AntiQ is an online queue management system that allows users to book tokens and track their queue status easily.',
  },
  {
    id: 'faq2',
    question: 'How can I book a token?',
    answer: 'You can book a token from the Book Token page by entering the required details and receiving a booking ID.',
  },
  {
    id: 'faq3',
    question: 'How do I check my queue status?',
    answer: 'Visit the Check Status page and enter your booking ID to see your current position in the queue.',
  },
  {
    id: 'faq4',
    question: 'Is login required?',
    answer: 'Login is not mandatory, but it helps you manage and track your bookings more efficiently.',
  },
];

function FAQs() {
  const [openFaq, setOpenFaq] = useState(faqItems[0].id);

  return (
    <main>
      <div className="faq-page-title">
        <h1>Frequently Asked Questions</h1>
      </div>
      <div className="faq-container">
        {faqItems.map((item) => {
          const isOpen = openFaq === item.id;

          return (
            <div className="faq-item" key={item.id}>
              <button
                type="button"
                className={`faq-question ${isOpen ? 'open' : ''}`}
                onClick={() => setOpenFaq(isOpen ? '' : item.id)}
                aria-expanded={isOpen}
              >
                {item.question}
              </button>
              <div className={`faq-answer ${isOpen ? 'open' : ''}`}>{item.answer}</div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default FAQs;
