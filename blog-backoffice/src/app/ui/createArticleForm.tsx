/**
 * This component will be rendered as a client component
 * the rendering of this component will be optimized
 */
"use client";

import { useActionState } from "react";
import { createArticle, State } from "../lib/articleActions";

export default function Form () {
    const initialState : State = { message: null, errors: {} };
    const [state, formAction] = useActionState(createArticle, initialState)

    return (
        <form className="bg-white shadow-md mx-5 px-5 py-4" action={formAction}>
            <div className="relative mb-4">
                <label htmlFor="title" className="block text-grey-700">Titre de l'article</label>
                <input type="text" name="title" id="title" className="w-full rounded border border-gray-400"/>
            </div>

            <div className="relative mb-4">
                <label htmlFor="content" className="block text-grey-700">Contenu de l'article</label>
                <textarea name="content" id="content" rows={10} className="w-full rounded border border-gray-400"></textarea>
            </div>

            <input type="hidden" name="author" value={"Djack"} />

            <button type="submit">submit</button>
        </form>
    )

}