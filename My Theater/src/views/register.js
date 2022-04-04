import { register } from '../api/data.js';
import { html } from '../lib.js';

const registerTemplate = (registerHandler) => html`
<section id="registerPage">
    <form @submit=${registerHandler} class="registerForm">
        <h2>Register</h2>
        <div class="on-dark">
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div class="on-dark">
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <div class="on-dark">
            <label for="repeatPassword">Repeat Password:</label>
            <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Register</button>

        <p class="field">
            <span>If you have profile click <a href="/login">here</a></span>
        </p>
    </form>
</section>
`;

export async function registerView(ctx) {
    ctx.render(registerTemplate(registerHandler));

    async function registerHandler(event){
        event.preventDefault();

        const formData = new FormData(event.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const rePass = formData.get('repeatPassword');

        try {
            if(!email || !password || !rePass){
                throw new Error('All fields are required!');
            }

            if(password !== rePass){
                throw new Error('Password does not match!');
            }

            await register(email, password);
            ctx.setUserNav();
            ctx.page.redirect('/')
        } catch (err) {
            return alert(err.message);
        }
    }
}