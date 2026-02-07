import Link from "next/link";
import { Article } from "../Types/Article";


async function getArticles() {
    const baseApiUrl = process.env.BASE_API_URL as string;
    const response = await fetch(`${baseApiUrl}/article/`);

    const data = await response.json();
    return data;    
}

export default async function ArticlesList () {

    const articles = await getArticles();

    return (
        <div className="">
            <h1>Articles List</h1>
            
            <div id="container">

                <h2>Articles existants</h2>

                <div id="articles-list-container">
                    <table className="mx-auto">
                        <thead className="border-b">
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Content</th>
                                <th></th>
                            </tr>
                        </thead>
        
                        <tbody>
                            {/* Liste des articles fetch depuis l'api */}
                            {articles.map((article: Article, key: number) => {
                                return (
                                    <tr key={key} className="border-b">
                                        <td>{article.title}</td>
                                        <td>{article.author}</td>
                                        <td>{article.textContent}</td>
                                        <td>
                                            <Link
                                                href={`/articles/${article._id}/edit`}
                                            >
                                                editer
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div> 
            </div>

        </div>
    )
}