import request from "./Request";

let createBoard = (board) => {
    return request("post", "boards/", { images: board });
}

let getBoardsByUser = (user) => {
    return request("get", `boards/user/${user}`);
}

let getBoardByID = (id) => {
    return request("get", `boards/${id}`);
}

let getResources = () => {
    return request('get', 'boards/resources')
}

let deleteBoardByID = (id) => {
    return request("delete", `boards/${id}`);
}

let setAsHome = (id) => {
    return request("post", "users/set-home", { id })
}

let addToFavorites = (id) => {
    return request("post", "users/favourites", { id })
}

let getFavorites = () => {
    return request("get", "users/favourites/objects")
}

let removeFromFavorites = (id) => {
    return request("delete", `users/favourites/${id}`)
}


//EXPORTING SERVICE FUNCTIONS
const BoardService = {
    getResources,
    createBoard,
    getBoardsByUser,
    getBoardByID,
    deleteBoardByID,
    setAsHome,
    addToFavorites,
    getFavorites,
    removeFromFavorites,
};

export default BoardService;