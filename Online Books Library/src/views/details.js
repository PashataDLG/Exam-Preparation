import { getById, getOwnLikes, getLikes, addLike } from '../api/data.js';
import { html } from '../lib.js';

const userData = JSON.parse(sessionStorage.getItem('userData'));

const detailsTemplate = (user, book, isOwner, bookLikes, onLike, isLiked) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            ${isOwner ? html`<a class="button" href="/edit/${book._id}">Edit</a>
            <a class="button" href="/delete/${book._id}">Delete</a>` 
            : ''}
           
            ${user !== null && isOwner == false && isLiked == false ? html`<a class="button" @click=${onLike} href="#">Like</a>` : ''}
                        
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${bookLikes}</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>
`;

export async function detailsView(ctx) {
    const user = JSON.parse(sessionStorage.getItem('userData'));
    const book = await getById(ctx.params.id);
    let isOwner = false;
    let isLiked = false;
    let bookLikes = await getLikes(ctx.params.id);

    debugger;


    if(user){
        isOwner = user.id === book._ownerId;
        isLiked = await getOwnLikes(ctx.params.id, user.id)
    }
    
    ctx.render(detailsTemplate(user, book, isOwner, bookLikes, onLike, isLiked));

    async function onLike(){
        await addLike(ctx.params.id);
        let bookLikes = await getLikes(ctx.params.id)
        let isLiked = await getOwnLikes(ctx.params.id, user.id);

        ctx.render(detailsTemplate(book, isOwner, bookLikes, onLike, isLiked));
    }
}