/**
 * This component will be rendered as a client component
 * the rendering of this component will be optimized
 */
"use client";

import { createArticle, State } from "@/app/lib/articleActions";
import { useActionState } from "react";

export default function ArticlesCreatePage () {
    /** 
     * The initial state of our form, we arrive here with no errors and no message
     * as the user has not interacted with the form yet
     */
    const initialState : State = { message: null, errors: {} };
    const [state, formAction] = useActionState(createArticle, initialState)

    return (
        <div>

            <div className="">
                <h1>Create an Article</h1>
                <div className="w-full ">
                    {/* Place this code into a component later => create-form.tsx */}
                    <form className="bg-white shadow-md mx-5 px-5 py-4" action={formAction}>
                        <div className="relative mb-4">
                            <label htmlFor="title" className="block text-grey-700">Titre de l'article</label>
                            <input type="text" name="title" id="title" className="w-full rounded border border-gray-400"/>
                        </div>

                        <div className="relative mb-4">
                            <label htmlFor="content" className="block text-grey-700">Contenu de l'article</label>
                            <textarea name="content" id="content" rows={10} className="w-full rounded border border-gray-400"></textarea>
                        </div>

                        {/* Later this value will be associated with the current user */}
                        <input type="hidden" name="author" value={"Djack"} />

{/* Problème de validation de formulaire, les données ne sont pas bien transmises ? */}
                        <button type="submit">submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}