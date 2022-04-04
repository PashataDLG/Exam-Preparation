import { html, render } from '../lib.js';

const homeTemplate = () => html`<section id="main">
    <div id="welcome-container">
        <h1>Welcome To Car Tube</h1>
        <img class="hero" src="/images/car-png.webp" alt="carIntro">
        <h2>To see all the listings click the link below:</h2>
        <div>
            <a href="/all-listings" class="button">Listings</a>
        </div>
    </div>
</section>
`;

const root = document.getElementById('site-content');

export async function homePage(ctx) {
    ctx.render(homeTemplate());
} 