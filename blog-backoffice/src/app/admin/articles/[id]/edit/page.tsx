
import { fetchArticleById } from "@/app/lib/data";
import Form from "@/app/ui/editArticleForm";


export default async function ArticlesEditPage (props : { params : Promise<{ id : string } > }) {
    const params = await props.params;
    const id = params.id;
    const article = await fetchArticleById(id);
    // .then(([article]) => {
    //     console.log(article);
    // });

    // Init methods, fetch the article to fill the form.

    return (
        <main>
            <h1>Edit an Article</h1>
            <div className="w-full ">
                <Form article={article} />
            </div>
        </main>
    );
}