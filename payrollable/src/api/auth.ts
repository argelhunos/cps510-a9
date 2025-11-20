const BASEURL = "http://localhost:3000"

// Function to call the login endpoint from the backend, to verify that the 
// Username and password given belongs to a legitimate user for the TMU Oracle 12c server.
// Used within AuthContext.tsx

export async function login(username: string, password: string) {
    const res = await fetch(`${BASEURL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username, password}),
    });

    if (!res.ok) {
        throw new Error("Login failed!");
    }

    return res.json();
}