import styles from '@/styles/Home.module.css'
import type { NextPage } from 'next';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import Link from 'next/link';

interface PostsData {
  data: {
    id: string
    image: string
    likes: number
    owner: {
      id: string
      title: string
      firstName: string
      lastName: string
    }
    publishDate: string
    tags: string[]
    text: string
  }[];
}

//First awaits for the data then awaits again when converted to JSON
const getPostsData = async () => await (
  await fetch(`https://dummyapi.io/data/v1/post?limit=10`, {
    method: "GET",
    headers: {
      "app-id": "63cada995bc52b0fecc614e9",
    }
  })
).json();

const Home: NextPage = () => {
  const {data, isLoading, isFetching } = useQuery<PostsData>("posts", getPostsData);
  
  //isLoading may not be necessary anymore as data is prefetched from cache
  if (isLoading) return <span>Loading...</span>

  if(!data) return <span>No data!</span>

  return (
    <Layout>
        <h1 className={styles.h1}>Posts</h1>
        <div className={styles.grid}>
          {data?.data.map((post: any) => {
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

//server-side fetching with NextJS
export async function getStaticProps() {
  const queryClient = new QueryClient();

  //Prefetches the data that we requested to pass along to the props
  await queryClient.prefetchQuery<PostsData>("posts", getPostsData)

  //dehydratedState prop to dehydrate the data,
  //which is the prop taken by Hydrate to rehydrate the data to the Component
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}