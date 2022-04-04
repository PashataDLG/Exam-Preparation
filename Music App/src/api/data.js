import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


const endpoints = {
    getAll: '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    create: '/data/albums',
    byId: '/data/albums/',
    edit: '/data/albums/',
    delete: '/data/albums/',
    search: (name) => `/data/albums?where=name%20LIKE%20%22${name}%22`
};

export async function getAllAlbums(){
    return api.get(endpoints.getAll);
}

export async function createAlbum(data){
    return api.post(endpoints.create, data);
}

export async function getAlbum(albumId){
    return api.get(endpoints.byId + albumId);
}

export async function editAlbum(albumId, data){
    return api.put(endpoints.edit + albumId, data);
}

export async function deleteAlbum(albumId){
    return api.del(endpoints.delete + albumId);
}

export async function searchAlbum(albumName){
    return api.get(endpoints.search(albumName));
}