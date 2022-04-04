import { createTheater } from '../api/data.js';
import { html } from '../lib.js';

const createTemplate = (createHandler) => html`
<section id="createPage">
    <form @submit=${createHandler} class="create-form">
        <h1>Create Theater</h1>
        <div>
            <label for="title">Title:</label>
            <input id="title" name="title" type="text" placeholder="Theater name" value="">
        </div>
        <div>
            <label for="date">Date:</label>
            <input id="date" name="date" type="text" placeholder="Month Day, Year">
        </div>
        <div>
            <label for="author">Author:</label>
            <input id="author" name="author" type="text" placeholder="Author">
        </div>
        <div>
            <label for="description">Description:</label>
            <textarea id="description" name="description" placeholder="Description"></textarea>
        </div>
        <div>
            <label for="imageUrl">Image url:</label>
            <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value="">
        </div>
        <button class="btn" type="submit">Submit</button>
    </form>
</section>
`;

export async function createView(ctx) {
    ctx.render(createTemplate(createHandler));

    async function createHandler(event){
        event.preventDefault();

        const formData = new FormData(event.target);

        const title = formData.get('title');
        const date = formData.get('date');
        const author = formData.get('author');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');
        

        try {
            if(!title || !date || !author || !description || !imageUrl){
                throw new Error('All fields are required in order to create a theater!');
            }

            await createTheater({title: title, date: date, author: author, description: description, imageUrl: imageUrl});
            ctx.page.redirect('/');
        } catch (err) {
            return alert(err.message);
        }
    }
}