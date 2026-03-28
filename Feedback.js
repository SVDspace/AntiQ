window.onload = function () {

    const form = document.querySelector(".fb-form");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let firstErrorLabel = null;

        // reset
        document.querySelectorAll(".fb-label").forEach(label => {
            label.classList.remove("error", "shake");
        });

        // 🔥 PERFECT function
        function validate(name) {
            const selected = document.querySelector(`input[name="${name}"]:checked`);
            const input = document.querySelector(`input[name="${name}"]`);

            if (!selected && input) {
                const group = input.closest(".fb-options, .fb-rating");
                const label = group.previousElementSibling;

                if (label && label.classList.contains("fb-label")) {
                    label.classList.add("error", "shake");

                    setTimeout(() => {
                        label.classList.remove("shake");
                    }, 400);

                    if (!firstErrorLabel) {
                        firstErrorLabel = label;
                    }
                }

                return false;
            }

            return true;
        }

        // validations
        const v1 = validate("rating");
        const v2 = validate("wait");
        const v3 = validate("notify");
        const v4 = validate("recommend");

        if (!v1 || !v2 || !v3 || !v4) {
            if (firstErrorLabel) {
                firstErrorLabel.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
            return;
        }

        // success
        alert("Thank you for your feedback! 😊");
        form.reset();
    });

};