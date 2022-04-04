import { login } from '../api/api.js';
import { html } from '../lib.js'

const loginTemplate = (loginHandler) => html`
<section id="login-page" class="auth">
    <form @submit=${loginHandler} id="login">

        <div class="container">
            <div class="brand-logo"></div>
            <h1>Login</h1>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

            <label for="login-pass">Password:</label>
            <input type="password" id="login-password" name="password">
            <input type="submit" class="btn submit" value="Login">
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </div>
    </form>
</section>
`;

export async function loginView(ctx) {
    ctx.render(loginTemplate(loginHandler));

    async function loginHandler(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const email = formData.get('email');
        const password = formData.get('password');

        try {
            await login(email, password);
            ctx.page.redirect('/');
            ctx.setUserNav();
        } catch (err) {
            alert(err.message);
        }
    }
}