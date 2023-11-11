export const apiUrl = "http://localhost:5000/api"

export const PostRequest = async (url: string, body:any) :Promise<Response> => {
    console.log(url, body);
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
    return res;
}

export const GetRequest = async (url: string) :Promise<Response> => {
    const response = await fetch(url);
    return response;
}

export const ProtectedGetRequest = async (url: string,jwtToken:string) :Promise<Response> => {
    const response = await fetch(url,{
        headers: {
            Authorization: jwtToken,
        }
    });
    return response;
}