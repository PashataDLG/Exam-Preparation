import page from '../node_modules/page/page.mjs';
import { render } from './lib.js'
import { allGamesPage } from './views/all-games.js';
import { createView } from './views/create.js';
import { detailsView, onDelete } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';

import * as api from './api/data.js';


window.api = api;

const root = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/edit/:id', editView);
page('/all-games', allGamesPage);
page('/details/:id', detailsView);
page('/delete/:id', onDelete);

setUserNav();
page.start();

function decorateContext(ctx, next){
    ctx.setUserNav = setUserNav;
    ctx.render = (content) => render(content, root);

    next();
}

function setUserNav(){
    const user = JSON.parse(sessionStorage.getItem('userData'));
    if(user){
        document.querySelector('#user').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }
}

async function onLogout(){
    await api.logout();
    setUserNav();
    page.redirect('/');
}