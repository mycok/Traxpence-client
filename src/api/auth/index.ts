async function signin(data: any): Promise<any> {
    const resp = await fetch("/api/v1/auth/signin", {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    })

    return resp.json();
}

function signout(cb: () => void): void {
    if (window !== undefined) {
        localStorage.removeItem("auth");
        cb();
    }
}

function authenticate(authData: any, cb: () => void): void {
    if (window !== undefined) {
        localStorage.setItem("auth", JSON.stringify(authData));
        cb();
    }
}

function isAuthenticated() {
    if (typeof window === "undefined") return false;
    if (!localStorage.getItem("auth")) return false;

    return JSON.parse(localStorage.getItem("auth") as string);
}

export { signin, signout, authenticate, isAuthenticated }
