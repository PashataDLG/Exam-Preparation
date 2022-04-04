import { editAlbum, getAlbum } from '../api/data.js';
import { html } from '../lib.js';

const editTemplate = (album, editHandler) => html`
<section class="editPage">
    <form @submit=${editHandler}>
        <fieldset>
            <legend>Edit Album</legend>

            <div class="container">
                <label for="name" class="vhide">Album name</label>
                <input id="name" name="name" class="name" type="text" value=${album.name}>

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value=${album.imgUrl}>

                <label for="price" class="vhide">Price</label>
                <input id="price" name="price" class="price" type="text" value=${album.price}>

                <label for="releaseDate" class="vhide">Release date</label>
                <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value=${album.releaseDate}>

                <label for="artist" class="vhide">Artist</label>
                <input id="artist" name="artist" class="artist" type="text" value=${album.artist}>

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" class="genre" type="text" value=${album.genre}>

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" rows="10"
                    cols="10">${album.description}</textarea>

                <button class="edit-album" type="submit">Edit Album</button>
            </div>
        </fieldset>
    </form>
</section>
`;

export async function editView(ctx) {
    const albumId = ctx.params.id;
    const album = await getAlbum(albumId);
    ctx.render(editTemplate(album, editHandler));

    async function editHandler(event){
        event.preventDefault();

        const formData = new FormData(event.target);

        const name = formData.get('name');
        const imgUrl = formData.get('imgUrl');
        const price = formData.get('price');
        const releaseDate = formData.get('releaseDate');
        const artist = formData.get('artist');
        const genre = formData.get('genre');
        const description = formData.get('description');

        try {
            if(!name || !imgUrl || !price || !releaseDate || !artist || !genre || !description){
                throw new Error('All fields are required!');
            }

            await editAlbum(albumId, {name, imgUrl, price, releaseDate, artist, genre, description});
            ctx.page.redirect(`/details/${albumId}`);
        } catch (err) {
            return alert(err.message);
        }
    }
}