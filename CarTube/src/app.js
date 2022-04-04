import page from '../node_modules/page/page.mjs';
import { byYearPage } from './views/by-year.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { listingsPage } from './views/listings.js';
import { loginPage } from './views/login.js';
import { myListingsPage } from './views/my-listings.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';
import { html, render } from './lib.js';

import * as api from './api/data.js';


const main = document.querySelector("#site-content")
document.getElementById('logoutBtn').addEventListener('click', onLogout);

window.api = api;

page(decorateContext);
page('/', homePage);
page('/create', createPage);
page('/all-listings', listingsPage);
page('/by-year', byYearPage);
page('/login', loginPage);
page('/register', registerPage);
page('/my-listings', myListingsPage);
page('/logout', onLogout);
page('/edit/:id', editPage);
page('/details/:id', detailsPage);
page('/by-year', byYearPage);

setUserNav()
page.start();

function decorateContext(ctx, next) {
    ctx.setUserNav = setUserNav;
    ctx.render = (content) => render(content, main);

    next();
}


function setUserNav() {
    const userId = sessionStorage.getItem('userId');
    if (userId != null) {
        document.getElementById('profile').style.display = 'block'
        document.getElementById('guest').style.display = 'none'
        document.querySelector("div#profile > a").textContent=`Welcome ${sessionStorage.getItem("username")}`
    } else {
        document.getElementById('profile').style.display = 'none'
        document.getElementById('guest').style.display = 'block'
    }
}


async function onLogout() {
    await api.logout()
    setUserNav();
    page.redirect('/');
}