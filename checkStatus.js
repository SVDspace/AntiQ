// Demo booking database (temporary)
const bookings = {
    "AQ101": {
        name: "Rahul",
        status: "Waiting",
        position: 5,
        counter: "Counter 2"
    },

    "AQ102": {
        name: "Amit",
        status: "Processing",
        position: 0,
        counter: "Counter 1"
    },

    "AQ103": {
        name: "Priya",
        status: "Completed",
        position: 0,
        counter: "Done"
    }
};


document.getElementById("checkBtn").addEventListener("click", function () {

    let id = document.getElementById("bookingId").value.trim().toUpperCase();

    let resultBox = document.getElementById("result");

    // Empty check
    if(id === "")
    {
        resultBox.innerHTML = "⚠ Please enter Booking ID";
        resultBox.style.color = "red";
        return;
    }

    // Booking exists
    if(bookings[id])
    {
        let data = bookings[id];

        resultBox.innerHTML =
        `
        ✅ Status Found <br><br>

        Booking ID : ${id} <br>
        Name : ${data.name} <br>
        Status : ${data.status} <br>
        Queue Position : ${data.position} <br>
        Service Desk : ${data.counter}
        `;

        resultBox.style.color = "green";
    }

    // Not found
    else
    {
        resultBox.innerHTML = "❌ Invalid Booking ID";
        resultBox.style.color = "red";
    }

});