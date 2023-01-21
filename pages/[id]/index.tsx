import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useQuery } from 'react-query';
import Post from "@/components/Post";

const IdPage = () => {
    const router = useRouter();
    const {id} = router.query;

    const {isLoading, isError, data, error } = useQuery<any, Error>("id", async () => {
        const idData = await (
            await fetch(`https://dummyapi.io/data/v1/post/${id}`, {
              method: "GET",
              headers: {
                "app-id": "63cada995bc52b0fecc614e9",
              }
            })
          ).json();
      
          return idData;
    
      });
      
    
    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    console.log(data);

    return (
        <Layout title={data.id}>
            <h1>{id}</h1>
            <Post post={data} />
        </Layout>
    )
}

export default IdPage;