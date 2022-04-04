import { editTheater, getTheater } from '../api/data.js';
import { html } from '../lib.js';

const editTemplate = (theater, editHandler) => html`
<section id="editPage">
    <form @submit=${editHandler} class="theater-form">
        <h1>Edit Theater</h1>
        <div>
            <label for="title">Title:</label>
            <input id="title" name="title" type="text" placeholder="Theater name" value=${theater.title}>
        </div>
        <div>
            <label for="date">Date:</label>
            <input id="date" name="date" type="text" placeholder="Month Day, Year" value=${theater.date}>
        </div>
        <div>
            <label for="author">Author:</label>
            <input id="author" name="author" type="text" placeholder="Author" value=${theater.author}>
        </div>
        <div>
            <label for="description">Theater Description:</label>
            <textarea id="description" name="description"
                placeholder="Description">${theater.description}</textarea>
        </div>
        <div>
            <label for="imageUrl">Image url:</label>
            <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                value=${theater.imageUrl}>
        </div>
        <button class="btn" type="submit">Submit</button>
    </form>
</section>
`;

export async function editView(ctx) {
    const theater = await getTheater(ctx.params.id);

    ctx.render(editTemplate(theater, editHandler));

    async function editHandler(event){
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

            await editTheater(ctx.params.id, {title: title, date: date, author: author, description: description, imageUrl: imageUrl});
            ctx.page.redirect(`/details/${ctx.params.id}`);
        } catch (err) {
            return alert(err.message);
        }
    }
}