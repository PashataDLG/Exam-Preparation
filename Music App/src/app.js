import * as api from './api/data.js';
import page from '../node_modules/page/page.mjs';
import { render } from './lib.js';
import { homeView } from './views/home.js';
import { createView } from './views/create.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { catalogView } from './views/catalog.js';
import { editView } from './views/edit.js';
import { detailsView } from './views/details.js';
import { searchView } from './views/search.js';

window.api = api;

const root = document.getElementById('main-content');
document.querySelector('.user1').addEventListener('click', onLogout);

page(decorateContext);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/catalog', catalogView);
page('/create', createView);
page('/search', searchView);
page('/edit/:id', editView);
page('/details/:id', detailsView);

setUserNav();
page.start();


function decorateContext(ctx, next) {
    ctx.setUserNav = setUserNav;
    ctx.render = (content) => render(content, root);

    next();
}

function setUserNav() {
    const user = JSON.parse(sessionStorage.getItem('userData'));
    if (user) {
        document.querySelector('.user').style.display = 'inline';
        document.querySelector('.user1').style.display = 'inline';
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.guest1').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.user1').style.display = 'none';
        document.querySelector('.guest').style.display = 'inline';
        document.querySelector('.guest1').style.display = 'inline';
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