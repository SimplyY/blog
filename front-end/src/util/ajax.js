import fetch from 'isomorphic-fetch'

// return ajax promise
export function ajaxGet(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                resolve(data)
            })
            .catch(error => {
                if (error !== undefined) {
                    console.log('ajaxGet error', error)
                    reject(error)
                }
            })
    })
}

export function ajaxPut(url, changeInfo) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changeInfo)
        })
        .then(res => {
            resolve(res)
        })
        .catch(error => {
            if (error !== undefined) {
                console.log('ajaxPut error', error)
                reject(error)
            }
        })
    });
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}
function parseJSON(response) {
    return response.json()
}
