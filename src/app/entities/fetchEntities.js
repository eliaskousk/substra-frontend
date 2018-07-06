/* globals API_URL fetch  */

import queryString from 'query-string';
import {isEmpty} from 'lodash';

export const getHeaders = jwt => ({
    Accept: 'application/json;version=0.0',
    'Content-Type': 'application/json;',
    ...(jwt ? {Authorization: `JWT ${jwt}`} : {}),
});

export const handleResponse = (response) => {
    if (!response.ok) {
        return response.text().then(result => Promise.reject(new Error(result)));
    }

    return response.json();
};

export const fetchList = (url, jwt) => {
    const headers = getHeaders(jwt);

    let status;

    return fetch(url, {
        headers,
        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        // credentials: 'include',
        mode: 'cors',
    })
        .then((response) => {
            status = response.status;
            return handleResponse(response);
        })
        .then(json => ({list: json}), error => ({error, status}));
};

export const fetchByUrl = (urlToFetch, jwt) => fetchList(urlToFetch, jwt);

export const fetchEntitiesFactory = path => (get_parameters, jwt) => {
    const url = `${API_URL}/${path}/${!isEmpty(get_parameters) ? `?${queryString.stringify(get_parameters)}` : ''}`;
    return fetchList(url, jwt);
};

export const fetchEntitiesByPathFactory = (path, view) => (get_parameters, jwt, id) => {
    const url = `${API_URL}/${path}/${id ? `${id}/` : ''}${view}/${!isEmpty(get_parameters)
        ? `?${queryString.stringify(get_parameters)}`
        : ''}`;
    return fetchList(url, jwt);
};

export const fetchEntityFactory = path => (get_parameters, id, jwt) => {
    const headers = getHeaders(jwt);
    const url = `${API_URL}/${path}/${id}/${!isEmpty(get_parameters)
        ? `?${queryString.stringify(get_parameters)}`
        : ''}`;

    return fetch(url, {
        headers,
        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        // credentials: 'include',
        mode: 'cors',
    })
        .then(response => handleResponse(response))
        .then(json => ({item: json}), error => ({error}));
};

export const deleteEntityFactory = path => (id, jwt) => {
    const headers = getHeaders(jwt);
    const url = `${API_URL}/${path}/${id}/`;

    let status;

    return fetch(url, {
        method: 'DELETE',
        headers,
        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        // credentials: 'include',
        mode: 'cors',
    })
        .then((response) => {
            status = response.status;
            if (status !== 204) {
                return response.text().then(result => Promise.reject(new Error(result)));
            }

            return response;
        }).then(() => true, error => ({error, status}));
};

export const updateEntityFactory = path => (id, jwt, payload) => {
    const headers = getHeaders(jwt);
    const url = `${API_URL}/${path}/${id}/`;

    return fetch(url, {
        method: 'PATCH',
        headers,
        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        // credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(payload),
    })
        .then(response => handleResponse(response))
        .then(json => ({item: json}), error => ({error}));
};

export const updateFormEntityFactory = path => (id, jwt, payload) => {
    const headers = {};

    if (jwt) {
        headers.Authorization = `JWT ${jwt}`;
    }

    const url = `${API_URL}/${path}/${id}/`;

    return fetch(url, {
        method: 'PATCH',
        headers,
        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        // credentials: 'include',
        mode: 'cors',
        body: payload,
    })
        .then(response => handleResponse(response))
        .then(json => ({item: json}), error => ({error}));
};

export const createEntityFactory = path => (jwt, payload) => {
    const headers = getHeaders(jwt);
    const url = `${API_URL}/${path}/`;

    let status;

    return fetch(url, {
        method: 'POST',
        headers,
        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        // credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(payload),
    })
        .then((response) => {
            status = response.status;
            if (status !== 201) {
                return response.text().then(result => Promise.reject(new Error(result)));
            }

            return response.json();
        })
        .then(json => ({item: json}), error => ({error, status}));
};

export const createFormEntityFactory = path => (jwt, payload) => {
    const headers = {};

    if (jwt) {
        headers.Authorization = `JWT ${jwt}`;
    }

    const url = `${API_URL}/${path}/`;

    let status;

    return fetch(url, {
        method: 'POST',
        headers,
        // Allows API to set http-only cookies with AJAX calls
        // @see http://www.redotheweb.com/2015/11/09/api-security.html
        // credentials: 'include',
        mode: 'cors',
        body: payload,
    })
        .then((response) => {
            status = response.status;
            if (status !== 201) {
                return response.text().then(result => Promise.reject(new Error(result)));
            }

            return response.json();
        })
        .then(json => ({item: json}), error => ({error, status}));
};
