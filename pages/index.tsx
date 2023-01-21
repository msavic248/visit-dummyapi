import Link from 'next/link';
import styles from '@/styles/Home.module.css'
import Post from '@/components/Post';
import { useQuery } from 'react-query';
import Layout from '@/components/Layout';

const Home = () => {
  const {isLoading, isError, data, error } = useQuery<any, Error>("posts", async () => {
    const postsData = await (
        await fetch(`https://dummyapi.io/data/v1/post?limit=10`, {
          method: "GET",
          headers: {
            "app-id": "63cada995bc52b0fecc614e9",
          }
        })
      ).json();

      return postsData;

  });
  

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <Layout>
        <h1 className={styles.h1}>Posts</h1>
        <div className={styles.grid}>
          {data.data.map((post: any) => {
            return (
              <div key={post.id}>
                <Link href={`/${post.id}`}>
                  <Post post={post}/>
                </Link>
              </div>
            )
          })}
        </div>
    </Layout>
  )
}

export default Home;
