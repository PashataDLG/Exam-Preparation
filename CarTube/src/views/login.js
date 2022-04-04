import { login } from '../api/data.js';
import { html, render } from '../lib.js';

const loginTemplate = (loginHandler) => html`
<section id="login">
    <div class="container">
        <form @submit=${loginHandler} id="login-form" action="" method="post">
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Don't have an account?
                <a href="/register">Sign up</a>.
            </p>
        </div>
    </div>
</section>
`;

export async function loginPage(ctx) {
    ctx.render(loginTemplate(loginHandler));

    async function loginHandler(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const username = formData.get('username');
        const password = formData.get('password');

        try {
            if (!username || !password) {
                throw new Error('All fields are required!');
            }

            await login(username, password);
            ctx.page.redirect('/all-listings');
            ctx.setUserNav(); 

        } catch (err) {
            alert(err.message)
        }
    }
}

