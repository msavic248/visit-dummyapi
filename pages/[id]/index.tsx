import type { NextPage } from 'next';
import { useRouter } from "next/router";
import { useQuery } from 'react-query';
import Layout from "@/components/Layout";
import PostPage from "@/components/PostPage";

interface IdData {
    id: string
    image: string
    likes: number
    link?: string
    owner: {
        id: string
        title: string
        firstName: string
        lastName: string
        picture: string
    }
    publishDate: string
    tags: string[]
    text: string
}



const getPostById = async (id: string) => await (
    await fetch (`https://dummyapi.io/data/v1/post/${id}`, {
        headers: {
            "app-id": "63cada995bc52b0fecc614e9",
        }
    })
).json();

const IdPage: NextPage = () => {
    const router = useRouter();
    const {id} = router.query;

    const { data, isLoading } = useQuery<IdData>(["id", id], () => getPostById(id as string));
      
    
    if (isLoading) return <span>Loading...</span>

    if(!data) return <span>No data!</span>

    return (
        <Layout title={data.id}>
            <PostPage post={data} />
        </Layout>
    )
}

export default IdPage;