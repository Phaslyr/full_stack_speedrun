const form = document.getElementById("register-form");
form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nameValue = document.getElementById("name").value;
    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;

    try {
        const response = await fetch("/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: nameValue, 
                email: emailValue, 
                password: passwordValue, 
            })
        });

        if (response.ok) { 
            console.log("Success!"); 
            document.getElementById("verify").innerHTML = "Success!";
        } else { 
            console.error("Failed.")
            document.getElementById("verify").innerHTML = "Failed.";
        }
    } catch (error) { console.error("Network error: ", error); }
});