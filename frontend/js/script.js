async function signup() {
    const username = document.getElementById("username").value;
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, firstname, lastname, password })
    });

    const data = await res.json();
    alert(data.msg);
}

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (data.msg === "Login successful") {
        localStorage.setItem("username", username);
        window.location.href = "chat.html";
    } else {
        alert("Invalid login");
    }
}

function logout() {
    localStorage.removeItem("username");
    window.location.href = "index.html";
}
