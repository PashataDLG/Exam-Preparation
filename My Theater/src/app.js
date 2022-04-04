import * as api from './api/data.js';
import page from '../node_modules/page/page.mjs';
import { render } from './lib.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { createView } from './views/create.js';
import { editView } from './views/edit.js';
import { detailsView } from './views/details.js';
import { profileView } from './views/profile.js';


window.api = api;


const root = document.getElementById('content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/edit/:id', editView);
page('/details/:id', detailsView)
page('/profile', profileView);
setUserNav();
page.start();
page.redirect('/');


function decorateContext(ctx, next) {
    ctx.setUserNav = setUserNav;
    ctx.render = (content) => render(content, root);

    next();
}

function setUserNav() {
    const user = JSON.parse(sessionStorage.getItem('userData'));
    if (user) {
        [...document.querySelectorAll('.user')].forEach(el => el.style.display = 'inline');
        [...document.querySelectorAll('.guest')].forEach(el => el.style.display = 'none');
    } else {
        [...document.querySelectorAll('.user')].forEach(el => el.style.display = 'none');
        [...document.querySelectorAll('.guest')].forEach(el => el.style.display = 'inline');
    }
}

async function onLogout() {
    await api.logout();
    setUserNav();
    page.redirect('/');
}

// async function onDelete(ctx) {
//     const id = ctx.params.id;
//     confirm('Are you sure you want to delete this book?');

//     if (confirm) {
//         await api.deleteBook(id);
//         page.redirect('/');
//     }
// }