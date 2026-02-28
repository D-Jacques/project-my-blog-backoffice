import { deleteArticle } from "../lib/articleActions"

export default function DeleteArticle ({ id }: { id: string }) {

    const deleteArticleById = deleteArticle.bind(null, id);


    return (
        <form action={deleteArticleById}>
            <button type="submit">
                <span>Supprimer</span>
            </button>
        </form>
    )
}