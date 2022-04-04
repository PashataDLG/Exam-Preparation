import { createCar } from '../api/data.js';
import { html } from '../lib.js';

const createTemplate = (createHandler) => html`
<section id="create-listing">
    <div class="container">
        <form @submit=${createHandler} id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>
`

export async function createPage(ctx) {
    ctx.render(createTemplate(createHandler));

    async function createHandler(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const brand = formData.get('brand');
        const model = formData.get('model');
        const description = formData.get('description');
        const year = formData.get('year');
        const imageUrl = formData.get('imageUrl');
        const price = formData.get('price');

        debugger;

        try {
            if (brand == '' || model == '' || description == '' || year == '' || imageUrl == '' || price == '') {
                throw new Error('All fields are required!')
            }

            if (Number(year) < 0 || Number(price) < 0) {
                throw new Error('The year and the price must be positive numbers');
            }
        } catch (err) {
            alert(err.message)
            throw err;
        }

        await createCar(brand, model, description, Number(year), imageUrl, Number(price));
        ctx.page.redirect('/all-listings');
    }
}