import { deleteGame, getAllComments, getSingleGame, postComment } from '../api/data.js';
import { html } from '../lib.js';

const user = JSON.parse(sessionStorage.getItem('userData'));

const detailsTemplate = (game, isAuthor, isGuest, comments, onComment) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">${game.summary}</p>

        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">
            <h2>Comments:</h2>
            <ul>
                ${comments.length > 0 ? 
                comments.map(commentTemplate) : 
                html`<p class="no-comment">No comments.</p>`}
            </ul>
            <!-- Display paragraph: If there are no games in the database -->
            <!-- <p class="no-comment">No comments.</p> -->
        </div>

        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        ${!isGuest && isAuthor ? html`<div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a href="/delete/${game._id}" class="button">Delete</a>
        </div>` : ''}
        
    </div>

    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    ${isAuthor || isGuest ? '' : commentField(onComment)}

</section>
`;

const commentTemplate = (comment) => html`
<li class="comment">
    <p>${comment.comment}</p>
</li>
`;

const commentField = (onComment) => html`
<article class="create-comment">
    <label>Add new comment:</label>
    <form @submit=${onComment} class="form">
        <textarea name="comment" placeholder="Comment......"></textarea>
        <input class="btn submit" type="submit" value="Add Comment">
    </form>
</article>
`;

export async function detailsView(ctx) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const gameId = ctx.params.id;
    const game = await getSingleGame(gameId);
    const comments = await getAllComments(gameId);
    let isGuest = false;
    let isAuthor = false;


    if(userData){
        isAuthor = game._ownerId === userData.id;
    } else {
        isGuest = true;
    }
    ctx.render(detailsTemplate(game, isAuthor, isGuest, comments, onComment));

    async function onComment(event){
        event.preventDefault();
        const formData = new FormData(event.target);

        const comment = formData.get('comment');
        try {
            if(comment == ''){
                throw new Error('Cannot submit empty comment field!');
            }

            await postComment({gameId: ctx.params.id, comment: comment});
            event.target.reset();
            ctx.page.redirect(`/details/${ctx.params.id}`);
        } catch (err) {
            alert(err.message);
        }        
    }
    
}

export async function onDelete(ctx) {
    confirm('Are you sure you want to delete this game?');
    if (confirm) {
        await deleteGame(ctx.params.id);
        ctx.page.redirect('/');
    }
}