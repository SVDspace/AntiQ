import { useState } from 'react';

function HelpCenter() {
  const sections = [
    {
      title: '🚀Getting Started',
      items: [
        { question: 'What is AntiQ?', answer: 'AntiQ is a smart digital queue system that lets you join lines online and avoid waiting physically.' },
        { question: 'How do I create an account?', answer: 'Click Sign Up, enter your details, and verify your phone or email to start using AntiQ.' },
        { question: 'How do I join a queue?', answer: 'Choose a service location, select a queue, and tap “Join” to receive your queue number instantly.' },
      ],
    },
    {
      title: '📱Using AntiQ',
      items: [
        { question: 'How does the virtual queue work?', answer: 'You get live updates about your position and alerts when your turn is close.' },
        { question: 'What happens if I miss my turn?', answer: 'You may need to rejoin the queue depending on the service provider’s policy.' },
        { question: 'Can I cancel my queue booking?', answer: 'Yes, open your active queue and select Cancel to leave the line.' },
      ],
    },
    {
      title: '👤Account Help',
      items: [
        { question: 'How do I reset my password?', answer: 'Click “Forgot Password” on the login page and follow the instructions sent to you.' },
        { question: 'How do I update my profile?', answer: 'Go to account settings and edit your personal information anytime.' },
      ],
    },
    {
      title: '🔔 Notifications',
      items: [
        { question: 'Why are notifications important?', answer: 'Notifications alert you when your turn is getting close, so you can arrive on time and avoid missing your slot.' },
        { question: 'How do I enable notifications?', answer: 'Go to your phone settings, open AntiQ app permissions, and make sure notifications are turned on.' },
        { question: 'I am not receiving alerts. What should I do?', answer: 'Check your internet connection and ensure notifications are not blocked for the AntiQ app.' },
      ],
    },
    {
      title: '❗Common Issues',
      items: [
        { question: 'I am not receiving notifications', answer: 'Check your notification settings and ensure your internet connection is active.' },
        { question: 'My queue position is not updating', answer: 'Try refreshing the app. If the issue continues, contact support.' },
      ],
    },
    {
      title: '🔒 Privacy & Security',
      items: [
        { question: 'Is my personal information safe?', answer: 'Yes, AntiQ uses secure systems to protect your personal data and prevent unauthorized access.' },
        { question: 'Why does AntiQ need my phone number or email?', answer: 'Your contact details are used to send queue updates, notifications, and important account information.' },
        { question: 'Who can see my queue details?', answer: 'Only the service provider and you can view your queue information. It is not shared publicly.' },
      ],
    },
    {
      title: '📞Contact Support',
      items: [
        { question: 'How can I contact AntiQ support?', answer: 'Email us at support@antiq.com or use the in-app “Report a Problem” option.' },
      ],
    },
  ];

  const [openItems, setOpenItems] = useState({});

  const toggleItem = (sectionTitle, itemQuestion) => {
    const key = `${sectionTitle}-${itemQuestion}`;
    setOpenItems((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <main>
      <section className="hc-hero">
        <h1>Need help with AntiQ?</h1>
        <p>We’re here to make your queue experience smooth and stress-free</p>
      </section>
      <section className="hc-container">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="hc-section-title">{section.title}</h2>
            <div className="hc-faq">
              {section.items.map((item, index) => {
                const key = `${section.title}-${item.question}`;
                const isOpen = !!openItems[key];

                return (
                  <div key={`${section.title}-${index}`} className={`hc-item ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="hc-question"
                      onClick={() => toggleItem(section.title, item.question)}
                      aria-expanded={isOpen}
                    >
                      {item.question}
                    </button>
                    <div className={`hc-answer ${isOpen ? 'open' : ''}`}>{item.answer}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default HelpCenter;
