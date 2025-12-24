/**
 * This component will be rendered as a client component
 * the rendering of this component will be optimized
 */
"use client";

import { createArticle, State } from "@/app/lib/articleActions";
import Form from "@/app/ui/createArticleForm";
import { useActionState } from "react";

/**
 * async cause we'll certainely need informations we won't have immediately on loading 
 * this component
 */ 
export default async function ArticlesCreatePage () {
    /** 
     * The initial state of our form, we arrive here with no errors and no message
     * as the user has not interacted with the form yet
     */
    // const initialState : State = { message: null, errors: {} };
    // const [state, formAction] = useActionState(createArticle, initialState)

    return (
            // La il faudra que toutes mes pages aient un side menu a 1/4 et un contenu a 3/4
            <main>
                <h1>Create an Article</h1>
                <div className="w-full ">
                    <Form />
                </div>
            </main>
    )
}