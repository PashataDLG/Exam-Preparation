import { deleteCar, getCarById } from '../api/data.js';
import { html } from '../lib.js';

const detailsTemplate = (car, id, onDelete) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${car.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>

        <p class="description-para">${car.description}</p>

        <div class="listings-buttons">
            <a href="/edit/${car._id}" class="button-list" style=${car._ownerId == id ? '' : 'display: none'}>Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button-list" style=${car._ownerId == id ? '' : 'display: none'}>Delete</a>
        </div>
    </div>
</section>
`;

export async function detailsPage(ctx) {
    const car = await getCarById(ctx.params.id);

    const userId = sessionStorage.getItem('userId');


    ctx.render(detailsTemplate(car, userId, onDelete));

    async function onDelete(){
        deleteCar(ctx.params.id);
        ctx.page.redirect('/all-listings');
    }
} 