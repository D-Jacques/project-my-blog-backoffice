/**
 * 
 */
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
    id: z.string(),
    title : z.string().min(5, { message: "The title must be at least 5 characters long" }),
    content : z.string().min(20, { message: "The content must be at least 20 characters long" }),
    author : z.string({ message: "Author field cannot be empty"}),
    image : z.string(),
});

// Validator for the article creation action.
const CreateArticle = FormSchema.omit({ id: true, image: true });


/**
 * This article state will be use to communicate with the client
 * It will warn the user if a field is not filled correctly (ex : we forget to set title)
 * It will inform the user if the article has been created successfully
 */
export type State = {
    errors?: {
        title?: string[];
        content?: string[];
        author?: string[];
    };
    message?: string | null;
};

export async function createArticle(prevState: State, formData: FormData) {
    /**
     * Creation of an article
     * 1 . We need to extract the data from the form
     * 2 . Use Zod to validate the datas
     * 3 . If the data are valid, we need to contact the Express API to create an arcticle
     * 4 . We won't redirect the user yet, though when the main articles list page will be
     * ready we'll redirect the user.
     */

    const validatedDatas = CreateArticle.safeParse({
        title : formData.get("title"),
        content : formData.get("content"),
        author : formData.get("author"),
    });



    // If the data are not valid, we return the errors to the client
    if (!validatedDatas.success) {
        return {
            errors: validatedDatas.error.flatten().fieldErrors,
            message: "There are errors in the form, please correct them before submitting again."
        }
    }

    const { title, content, author } = validatedDatas.data;

    console.log(title);
    console.log(content);
    console.log(author);

    // TODO : Contact the Express API to create the article

    revalidatePath('/articles/create');
    redirect('/articles/create');
}   