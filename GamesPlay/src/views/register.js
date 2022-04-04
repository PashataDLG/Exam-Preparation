import { register } from '../api/data.js';
import { html } from '../lib.js'

const registerTemplate = (registerHandler) => html`
<section id="register-page" class="content auth">
    <form @submit=${registerHandler} id="register">
        <div class="container">
            <div class="brand-logo"></div>
            <h1>Register</h1>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="maria@email.com">

            <label for="pass">Password:</label>
            <input type="password" name="password" id="register-password">

            <label for="con-pass">Confirm Password:</label>
            <input type="password" name="confirm-password" id="confirm-password">

            <input class="btn submit" type="submit" value="Register">

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </div>
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
        const rePass = formData.get('confirm-password');
        
        try {
            if(email == '' || password == '' || rePass == ''){
                throw new Error('All fields are required');
            }
            await register(email, password);
            ctx.page.redirect('/');
            ctx.setUserNav();
        } catch (err) {
            alert(err.message);
            throw err;
        }
    }
}