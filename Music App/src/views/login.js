import { login } from '../api/data.js';
import { html } from '../lib.js';

const loginTemplate = (loginHandler) => html`
<section id="loginPage">
    <form @submit=${loginHandler}>
        <fieldset>
            <legend>Login</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <button type="submit" class="login">Login</button>

            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </fieldset>
    </form>
</section>
`;

export async function loginView(ctx) {
    ctx.render(loginTemplate(loginHandler));

    async function loginHandler(event){
        event.preventDefault();

        const formData = new FormData(event.target);

        const email = formData.get('email');
        const password = formData.get('password');

        try {
            if(password == '' || email == ''){
                throw new Error('All fields are required!');
            }

            await login(email, password);
            ctx.setUserNav();
            ctx.page.redirect('/');
        } catch (err) {
            return alert(err.message);
        }
    }
}