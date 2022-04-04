import { login } from '../api/data.js';
import { html } from '../lib.js';

const loginTemplate = (loginHandler) => html`<section id="loginaPage">
    <form @submit=${loginHandler} class="loginForm">
        <h2>Login</h2>
        <div>
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>
        <div>
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Login</button>

        <p class="field">
            <span>If you don't have profile click <a href="/register">here</a></span>
        </p>
    </form>
</section>`;

export async function loginView(ctx) {
    ctx.render(loginTemplate(loginHandler));

    async function loginHandler(event){
        event.preventDefault();

        const formData = new FormData(event.target);

        const email = formData.get('email');
        const password = formData.get('password');

        try {
            if(!email || !password){
                throw new Error('All fields are required!');
            }

            await login(email, password);
            ctx.setUserNav();
            ctx.page.redirect('/')
        } catch (err) {
            return alert(err.message);
        }
    }
}