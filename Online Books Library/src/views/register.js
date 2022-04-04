import { register } from '../api/data.js';
import { html } from '../lib.js';

const registerTemplate = (onRegister) => html`
<section id="register-page" class="register">
    <form @submit=${onRegister} id="register-form" action="" method="">
        <fieldset>
            <legend>Register Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
    </form>
</section>
`;

export async function registerView(ctx) {
    ctx.render(registerTemplate(onRegister));

    async function onRegister(event){
        event.preventDefault();
    
        const formData = new FormData(event.target);
    
        const email = formData.get('email');
        const password = formData.get('password');
        const rePass = formData.get('confirm-pass');
    
        try {
            if(email == '' || password == '' || rePass == ''){
                throw new Error('All fields are required!');
            }
    
            if(password !== rePass){
                throw new Error('Password should match!')
            }
    
            await register(email, password);
            ctx.setUserNav();
            ctx.page.redirect('/');
        } catch (err) {
            return alert(err.message);
        }
    }
}

