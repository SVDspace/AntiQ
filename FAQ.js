document.querySelectorAll(".faq-item").forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

        const isOpen = answer.classList.contains("open");

        // Close all
        document.querySelectorAll(".faq-answer").forEach(a => {
            a.style.height = "0px";
            a.classList.remove("open");
        });

        // Open clicked
        if (!isOpen) {
            answer.classList.add("open");
            answer.style.height = answer.scrollHeight + "px";
        }
    });
});