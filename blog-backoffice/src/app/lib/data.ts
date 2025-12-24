
const baseApiUrl = process.env.BASE_API_URL as string;

export async function fetchArticleById (id : string) {
    // No need much parameters, it's a simple GET request !
    const article = await fetch (`${baseApiUrl}/article/${id}`);

    if (!article.ok) {
        throw new Error("Failed to fetch article with id " + id);
    }

    return await article.json();
}