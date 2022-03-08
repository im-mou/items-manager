// base service
export default class BaseService {
    protected client = fetch.bind(window);
    protected apiBaseUrl = process.env.REACT_APP_API_URL;

    protected clientConfig = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // We define the request methods here to have the
    // possibility of swapping http client easily.

    // get request
    protected get = async <T>(url: string): Promise<T> => {
        const response = await this.client(url, { method: 'GET', ...this.clientConfig });
        return await response.json();
    };

    // We can define more methods below, but for this project we only need GET.
    // ...
}
