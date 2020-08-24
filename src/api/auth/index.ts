async function signin(data: any): Promise<any> {
    try {
        const resp = await fetch('/api/v1/auth/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return resp.json();
    } catch (err) {
        console.log(err);
    }
}

function signout(): void {
    localStorage.removeItem('auth');
}

export { signin, signout }