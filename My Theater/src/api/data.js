import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    getAll: '/data/theaters?sortBy=_createdOn%20desc&distinct=title',
    create: '/data/theaters',
    byId: '/data/theaters/',
    edit: '/data/theaters/',
    delete: '/data/theaters/',
    myTheaters: (userId) => `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    like: '/data/likes',
    getLike: (theaterId) => `/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
    liked: (userId, theaterId) => `/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function getAllTheaters(){
    return api.get(endpoints.getAll);
}

export async function createTheater(data){
    return api.post(endpoints.create, data)
}

export async function getTheater(id){
    return api.get(endpoints.byId + id);
}

export async function editTheater(id, data){
    return api.put(endpoints.edit + id, data);
}

export async function deleteTheater(id){
    return api.del(endpoints.delete + id);
}

export async function getMyTheaters(userId){
    return api.get(endpoints.myTheaters(userId));
}

export async function addLike(id){
    return api.post(endpoints.like, { theaterId: id });
}

export async function getLikes(id){
    return api.get(endpoints.getLike(id));
}

export async function userLike(userId, theaterId){
    return api.get(endpoints.liked(userId, theaterId))
}
