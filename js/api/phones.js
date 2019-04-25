const API_URL = 'https://mgrinko.github.io/js-20190221/api';

export const getAll = async ( query, order)  => {
    try {
        const response = await fetch(`${API_URL}/phones.json`);
        const arr = await response.json();
        let phones = sorter(arr, query);

        if(order === 'Alphabetical'){
            phones.sort(compareId);
        }
        if(order === 'Newest'){
            phones.sort(function(a, b){
                return a.age-b.age
            });
        }

        return phones;
    } catch (e) {
        return [];
    }
};
function sorter(arr,query) {
    return arr.filter(elm=> {
        return elm.id.indexOf(query.toLowerCase())>=0;
    });
}

function compareId(a,b) {
    if (a.id < b.id)
        return -1;
    if (a.id> b.id)
        return 1;
    return 0;
}
export const getById = (phoneId) => (
    fetch(`${API_URL}/phones/${phoneId}.json`)
        .then(response => response.json())
        .catch(() => 0)
);
