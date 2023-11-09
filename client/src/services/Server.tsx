export const apiUrl = "http://localhost:5000/api/"

export const PostRequest = async (url: string, body:any) :Promise<Response> => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
    return response;
}

export const GetRequest = async (url: string) :Promise<Response> => {
    const response = await fetch(url);
    return response;
}