import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


const endpoints = {
    add: '/data/books',
    allBooks: '/data/books?sortBy=_createdOn%20desc',
    byId: '/data/books/',
    delete: '/data/books/',
    edit: '/data/books/',
    ownBooks: (userId) => `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    likes: (bookId) => `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
    addLike: '/data/likes',
    ownLikes: (bookId, userId) => `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function addBook(data) {
    return api.post(endpoints.add, data);
}

export async function getBooks(){
    return api.get(endpoints.allBooks);
}

export async function getById(bookId){
    return api.get(endpoints.byId + bookId);
}

export async function deleteBook(bookId){
    return api.del(endpoints.delete + bookId);
}

export async function myBooks(userId){
    return api.get(endpoints.ownBooks(userId));
}

export async function editBook(bookId, data){
    return api.put(endpoints.edit + bookId, data);
}

export async function getLikes(bookId){
    return api.get(endpoints.likes(bookId))
}

export async function addLike(bookId){
    return api.post(endpoints.addLike, { bookId })
}

export async function getOwnLikes(bookId, userId){
    return api.get(endpoints.ownLikes(bookId, userId));
}