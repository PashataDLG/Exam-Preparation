import * as api from './api/data.js';
import page from '../node_modules/page/page.mjs';
import { render } from './lib.js';
import { homeView } from './views/home.js';
import { createView } from './views/create.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { myBooksView } from './views/my-books.js';
import { editView } from './views/edit.js';
import { detailsView } from './views/details.js';

window.api = api;

const root = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homeView);
page('/create', createView);
page('/login', loginView);
page('/register', registerView);
page('/my-books', myBooksView);
page('/edit/:id', editView);
page('/details/:id', detailsView);
page('/delete/:id', onDelete);

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
        document.querySelector('#user').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#emailElement').textContent = `Welcome, ${user.email}`;
    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
        document.querySelector('#emailElement').textContent = `Welcome, guest`;
    }
}

async function onLogout() {
    await api.logout();
    setUserNav();
    page.redirect('/');
}

async function onDelete(ctx) {
    const id = ctx.params.id;
    confirm('Are you sure you want to delete this book?');

    if (confirm) {
        await api.deleteBook(id);
        page.redirect('/');
    }
}