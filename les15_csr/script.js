async function incrementViews() {
    const url = "http://localhost:3000/views/increment"
    try {
        const response = await fetch(url, {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        console.log("Incremented");
    } catch (error) {
        console.error(error.message);
    }
}

async function displayViews() {
    let myViewsSpan = document.getElementById("views");
    const url = "http://localhost:3000/views";
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        myViewsSpan.textContent = data.totalViews;
        console.log("Displayed");
    } catch (error) {
        console.error(error.message);
    }
}

async function main() {
    await incrementViews();
    await displayViews();
}

main();
