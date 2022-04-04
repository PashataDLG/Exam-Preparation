import { editCar, getCarById, deleteCar } from '../api/data.js';
import { html } from '../lib.js';

const editTemplate = (editHandler, car) => html`
<section id="edit-listing">
    <div class="container">

        <form @submit=${editHandler} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" value=${car.brand}>

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" value=${car.model}>

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" value=${car.description}>

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" value=${car.year}>

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" value=${car.imageUrl}>

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" value=${car.price}>

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>
`;

export async function editPage(ctx) {
    const car = await getCarById(ctx.params.id);
    ctx.render(editTemplate(editHandler, car));

    async function editHandler(event){
        event.preventDefault();

        const formData = new FormData(event.target);

        const brand = formData.get('brand');
        const model = formData.get('model');
        const description = formData.get('description');
        const year = formData.get('year');
        const imageUrl = formData.get('imageUrl');
        const price = formData.get('price');

        if(brand == '' || model == '' || description == '' || year == '' || imageUrl == '' || price == ''){
            window.alert('All fields are required!');
            return;
        }

        if(Number(year) < 0 || Number(price) < 0){
            window.alert('The year and the price must be positive numbers');
            return;
        }

        editCar(ctx.params.id, brand, model, description, Number(year), imageUrl, Number(price));
        ctx.page.redirect(`/details/${car._id}`);
    }
}

