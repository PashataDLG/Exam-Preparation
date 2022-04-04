import { register } from '../api/data.js';
import { html } from '../lib.js';

const registerTemplate = (registerHandler) => html`
<section id="registerPage">
    <form @submit=${registerHandler}>
        <fieldset>
            <legend>Register</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <label for="conf-pass" class="vhide">Confirm Password:</label>
            <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

            <button type="submit" class="register">Register</button>

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </fieldset>
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
        const rePass = formData.get('conf-pass');

        try {
            if(password == '' || email == '' || rePass == ''){
                throw new Error('All fields are required!');
            }

            if (password !== rePass) {
                throw new Error('Passwords should match!');
            }

            await register(email, password);
            ctx.setUserNav();
            ctx.page.redirect('/')
        } catch (err) {
            return alert(err.message);
        }
    }
}