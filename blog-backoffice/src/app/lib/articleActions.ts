/**
 * 
 */
"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { postFetchQuery } from "./helpers/requestHelpers";

const baseApiUrl = process.env.BASE_API_URL as string;

const FormSchema = z.object({
    id: z.string(),
    title : z.string().min(5, { message: "The title must be at least 5 characters long" }),
    textContent : z.string().min(20, { message: "The content must be at least 20 characters long" }),
    author : z.string({ message: "Author field cannot be empty"}),
    image : z.string(),
});

// Validator for the article creation action.
const CreateArticle = FormSchema.omit({ id: true, image: true });
const UpdateArticle = FormSchema.omit({ id: true, image: true });


/**
 * This article state will be use to communicate with the client
 * It will warn the user if a field is not filled correctly (ex : we forget to set title)
 * It will inform the user if the article has been created successfully
 */
export type State = {
    errors?: {
        title?: string[];
        textContent?: string[];
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
        textContent : formData.get("content"),
        author : formData.get("author"),
    });



    // If the data are not valid, we return the errors to the client
    if (!validatedDatas.success) {
        return {
            errors: validatedDatas.error.flatten().fieldErrors,
            message: "There are errors in the form, please correct them before submitting again."
        }
    }

    const { title, textContent, author } = validatedDatas.data;

    // TODO : Contact the Express API to create the article
    // console.log();
    const url = `${baseApiUrl}/article/create`;
    const headers = {
        "Content-Type": "application/json",
    };
    const body = {
            title,
            textContent,
            image: "",
            author,
    };

    // postFetchQuery(url, headers, body);

    await fetch (`${baseApiUrl}/article/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            textContent,
            image: "",
            author,
        })
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } 
        else {
            throw new Error('Une erreur est survenue', {cause: response});
        }
    })
    .then((data) => {
        console.log("API Response :", data);
    })
    .catch((error) => {
        console.error("The api responded with an error : ", error);
    });

    revalidatePath('/articles/create');
    redirect('/articles/create');
}   

export async function updateArticle(id: string, prevState: State, formData: FormData) {

    const validatedDatas = UpdateArticle.safeParse({
        title : formData.get("title"),
        textContent : formData.get("content"),
        author : formData.get("author"),
    });

    // If the data are not valid, we return the errors to the client
    if (!validatedDatas.success) {
        return {
            errors: validatedDatas.error.flatten().fieldErrors,
            message: "There are errors in the form, please correct them before submitting again."
        }
    }

    const { title, textContent, author } = validatedDatas.data;

    await fetch (`${baseApiUrl}/article/edit/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            textContent,
            image: "",
            author,
        })
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } 
        else {
            throw new Error('Une erreur est survenue', {cause: response});
        }
    })
    .then((data) => {
        console.log("API Response :", data);
    })
    .catch((error) => {
        console.error("The api responded with an error : ", error);
    }); 

    revalidatePath(`/articles/${id}/edit`);
    redirect(`/articles/${id}/edit`);
}