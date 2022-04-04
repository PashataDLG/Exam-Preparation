import { deleteAlbum, getAlbum } from '../api/data.js';
import { html } from '../lib.js';

const detailsTemplate = (album, isAuthor, deleteHandler) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${album.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${album.name}</h1>
                <h3>Artist: ${album.artist}</h3>
                <h4>Genre: ${album.genre}</h4>
                <h4>Price: ${album.price}</h4>
                <h4>Date: ${album.releaseDate}</h4>
                <p>Description: ${album.description}</p>
            </div>

            ${isAuthor === true ? 
                html`<div class="actionBtn">
                <a href="/edit/${album._id}" class="edit">Edit</a>
                <a @click=${deleteHandler} href="javascript:void(0)" class="remove">Delete</a>
            </div>` : 
            ''}
            
        </div>
    </div>
</section>
`;

export async function detailsView(ctx) {
    const albumId = ctx.params.id;
    const album = await getAlbum(albumId);
    const user = JSON.parse(sessionStorage.getItem('userData'));
    let isAuthor = false;
    if(user){
        isAuthor = user.id === album._ownerId;
    }
    ctx.render(detailsTemplate(album, isAuthor, deleteHandler));

    async function deleteHandler(){
        confirm('Are you sure you want to delete this album?')
        if(confirm){
            await deleteAlbum(albumId);
            ctx.page.redirect('/catalog');
        }
    }
}