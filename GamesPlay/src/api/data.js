import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

const endpoints = {
    allGames: '/data/games?sortBy=_createdOn%20desc',
    recentGames: '/data/games?sortBy=_createdOn%20desc&distinct=category',
    createGame: '/data/games',
    details: '/data/games/',
    edit: '/data/games/',
    delete: '/data/games/',
    getComments: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
    createComment: '/data/comments',
}

export async function getAllGames(){
    return api.get(endpoints.allGames);
}

export async function getRecentGames(){
    return api.get(endpoints.recentGames);
}

export async function createGame(data){
    return api.post(endpoints.allGames, data);
}

export async function getSingleGame(gameId){
    return api.get(endpoints.details + gameId);
}

export async function editGame(gameId, data){
    return api.put(endpoints.edit + gameId, data);
}

export async function deleteGame(gameId){
    return api.del(endpoints.delete + gameId);
}

export async function getAllComments(gameId){
    return api.get(endpoints.getComments(gameId));
}

export async function postComment(data){
    return api.post(endpoints.createComment, data)
}