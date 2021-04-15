import request from './Request';

let test = () => {
    return request('post', 'records/test')
}

let uploadImages = files => {
    let Data = new FormData();
    for (let k in files) {
        // console.log(files[k])
        Data.append('images', files[k].image);
    }
    // for (var key of Data.entries()) {
    //     console.log(key[0] + ', ' + key[1])
    // }
    return request('post', 'records/upload', Data)
}

let fetchCategories = () => {
    return request('get', 'records/categories')
}

let fetchRecordsByCategories = (category) => {
    return request('get', 'records/by-category', category)
}

let matchRecordsByInfo = (info) => {
    return request('get', 'records/by-info', info)
}

const RecordsService = {
    uploadImages,
    fetchCategories,
    fetchRecordsByCategories,
    matchRecordsByInfo,
    test,
}

export default RecordsService;