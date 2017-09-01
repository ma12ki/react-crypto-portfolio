import { Observable } from 'rxjs/Observable';
import curry from 'lodash/fp/curry';

const create = (baseUrl) => ({
    get$: get$(baseUrl),
});

const get$ = curry((baseUrl, path) => apiFetch$(baseUrl + path, 'GET'));

const apiFetch$ = (path, method = 'GET') => {
    const promise = apiFetch(path, method);
    return Observable.fromPromise(promise);
};

const apiFetch = (path, method = 'GET') => {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    const config = {
        method,
        headers,
        mode: 'cors',
        cache: 'no-store',
    };
    return fetch(`${path}`, config).then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response);
    });
};

export default create;
