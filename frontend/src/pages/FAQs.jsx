import { useEffect } from 'react';

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
  useEffect(() => {
    document.querySelectorAll('.faq-item').forEach((item) => {
      item.querySelector('.faq-question').addEventListener('click', () => {
        const answer = item.querySelector('.faq-answer');
        const isOpen = answer.classList.contains('open');
        document.querySelectorAll('.faq-answer').forEach((a) => {
          a.classList.remove('open');
        });
        if (!isOpen) {
          answer.classList.add('open');
        }
      });
    });
  }, []);

  return (
    <main>
      <div className="faq-page-title">
        <h1>Frequently Asked Questions</h1>
      </div>
      <div className="faq-container">
        {faqItems.map((item) => (
          <div className="faq-item" key={item.id}>
            <div className="faq-question">{item.question}</div>
            <div className="faq-answer">{item.answer}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default FAQs;
