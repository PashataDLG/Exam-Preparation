import { getMyTheaters } from '../api/data.js';
import { html } from '../lib.js';

const profileTemplate = (events) => html`
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${JSON.parse(sessionStorage.getItem('userData')).email}</h2>
    </div>
    <div class="board">
        <!--If there are event-->
        ${events.length > 0 ? events.map(itemTemplate) : html`<div class="no-events">
            <p>This user has no events yet!</p>
        </div>`}
        
    </div>
</section>
`;

const itemTemplate = (item) => html`
<div class="eventBoard">
            <div class="event-info">
                <img src=${item.imageUrl}>
                <h2>${item.title}</h2>
                <h6>${item.date}</h6>
                <a href="/details/${item._id}" class="details-button">Details</a>
            </div>
</div>
`;

export async function profileView(ctx) {
    const user = JSON.parse(sessionStorage.getItem('userData'));
    const events = await getMyTheaters(user.id);
    ctx.render(profileTemplate(events));
}