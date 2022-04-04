import { searchAlbum } from '../api/data.js';
import { html } from '../lib.js';

const searchTemplate = (searchHandler, albums) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${searchHandler} class="button-list">Search</button>
    </div>
    <h2>Results:</h2>
    <div class="search-result">
        ${albums 
        ? albums.length > 0 
        ? albums.map(albumTemplate) : html`<p class="no-result">No result.</p>` : null}
        <!--If there are no matches-->
    </div>
</section>
`;

const albumTemplate = (album) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${(JSON.parse(sessionStorage.getItem('userData'))) !== null ? html`<div class="btn-group">
            <a href="/details/${album._id}" id="details">Details</a>
        </div>` : ''}
    </div>
</div>
`;

export async function searchView(ctx) {
    ctx.render(searchTemplate(searchHandler));

    async function searchHandler(event) {
        const albumName = document.getElementById('search-input')

        try {
            if (albumName.value === '') {
                throw new Error('You have to enter an album name!');
            }

            const albums = await searchAlbum(albumName.value);

            ctx.render(searchTemplate(searchHandler, albums));
            albumName.value = '';
        } catch (err) {
            ctx.render(searchTemplate(searchHandler));
            albumName.value = '';

            return alert(err.message);
        }
    }
}