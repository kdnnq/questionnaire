const HOST = 'http://localhost:3005' // nest 服务器

export async function get(url: string) {
    const res = await fetch(`${HOST}${url}`, { cache: 'no-store' })
    const data = await res.json()
    return data
}

export async function post(url: string, body: unknown) {
    const res = await fetch(`${HOST}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
    const data = await res.json()
    return data
}
