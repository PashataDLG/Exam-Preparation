import { deleteTheater, getTheater, userLike, getLikes, addLike } from '../api/data.js';
import { html } from '../lib.js';

const detailsTemplate = (theater, onDelete, isAuthor, isLiked, theaterLikes, user, onLike) => html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${theater.title}</h1>
            <div>
                <img src=${theater.imageUrl} />
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${theater.description}</p>
            <h4>Date: ${theater.date}</h4>
            <h4>Author: ${theater.author}</h4>
            <div class="buttons">
                ${isAuthor ? html`<a 
                @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
                <a class="btn-edit" href="/edit/${theater._id}">Edit</a>` 
                : ''}
    
                ${user !== null && !isLiked && isAuthor === false 
                    ? html`<a class="btn-like" @click=${onLike} href="#">Like</a>` 
                    : ''}
                
            </div>
            <p class="likes">Likes: ${theaterLikes}</p>
        </div>
    </div>
</section>
`;

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const theater = await getTheater(id);
    const user = JSON.parse(sessionStorage.getItem('userData'));
    let isAuthor = false;
    let isLiked = false;

    if(user){
        isAuthor = theater._ownerId === user.id;
        isLiked = await userLike(user.id, id);
    }
    
    let theaterLikes = await getLikes(id);
    

    ctx.render(detailsTemplate(theater, onDelete, isAuthor, isLiked, theaterLikes, user, onLike));

    async function onLike(){
        await addLike(id);
        let theaterLikes = await getLikes(id);
        let isLiked = await userLike(user.id, id);
        ctx.render(detailsTemplate(theater, onDelete, isAuthor, isLiked, theaterLikes, user, onLike));
    }

    async function onDelete(){
        confirm('Are you sure you want to delete this?');

        if(confirm){
            await deleteTheater(id);
            ctx.page.redirect('/profile')
        } else {
            return
        }
    }
}