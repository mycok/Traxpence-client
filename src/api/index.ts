const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

async function create(url: string, data: any, token?: string): Promise<any> {
    try {
        const resp = await fetch(`${url}`, {
            method: 'POST',
            headers: { ...headers, 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(data)
        })

        return resp.json();
    } catch (err) {
        console.log(err);
    }
}

async function update(url: string, resourceId: string, data: any, token: string) {
    try {
        const resp = await fetch(`${url}/${resourceId}`, {
            method: 'PATCH',
            headers: { ...headers, 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(data)
        })

        return resp.json();
    } catch (err) {
        console.log(err);
    }
}

async function list(url: string, token?: string) {
    try {
        const resp = await fetch(`${url}`, {
            method: 'GET',
            signal: signal,
            headers: { ...headers, 'Authorization': `Bearer ${token}` },
        })

        return resp.json();
    } catch (err) {
        console.log(err);
    }
}

async function read(url: string, resourceId: string, token: string) {
    try {
        const resp = await fetch(`${url}/${resourceId}`, {
            method: 'GET',
            headers: { ...headers, 'Authorization': `Bearer ${token}` },
        })

        return resp.json();
    } catch (err) {
        console.log(err);
    }
}

async function remove(url: string, resourceId: string, token: string) {
    try {
        const resp = await fetch(`${url}/${resourceId}`, {
            method: 'DELETE',
            headers: { ...headers, 'Authorization': `Bearer ${token}` },
        })

        return resp.json();
    } catch (err) {
        console.log(err);
    }
}


export { create, read, update, remove, list }


