'use client';

import { useActionState } from "react";
import { State, updateArticle } from "../lib/articleActions";
import { articleForm } from "../lib/definitions";

export default function EditArticleForm ({
    article
} : {
    article: articleForm
}) {
    const initialState : State = { message : null, errors : {} };
    const updateArticleById = updateArticle.bind(null, article._id);
    const [state, formAction] = useActionState(updateArticleById, initialState);

    return (
        <form className="bg-white shadow-md mx-5 px-5 py-4" action={formAction}>
            <div className="relative mb-4">
                <label htmlFor="title" className="block text-grey-700">Titre de l'article</label>
                <input 
                    type="text"
                    name="title"
                    id="title"
                    className="w-full rounded border border-gray-400"
                    defaultValue={article.title}/>
            </div>

            <div className="relative mb-4">
                <label htmlFor="content" className="block text-grey-700">Contenu de l'article</label>
                <textarea 
                    name="content" 
                    id="content" 
                    rows={10} 
                    className="w-full rounded border border-gray-400"
                    defaultValue={article.textContent}
                >
                </textarea>
            </div>

            <input type="hidden" name="author" value={"Djack"} />

            <button type="submit">submit</button>
        </form>
    );
}