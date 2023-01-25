import styles from '@/styles/Home.module.css'
import type { NextPage } from 'next';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import PostList from '@/components/PostList';
import Button from '@/components/Button';
import loader from "@/styles/Loader.module.css";
import { useRouter } from 'next/router'

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
      picture: string
    }
    publishDate: string
    tags: string[]
    text: string
  }[];
}

//First awaits for the data then awaits again when converted to JSON
const getPostsData = async () => await (
  await fetch(`https://dummyapi.io/data/v1/post?limit=20`, {
    headers: {
      "app-id": "63cada995bc52b0fecc614e9",
    }
  })
).json();

const getPostsbyTag = async (tag: string) => await (
  await fetch(`https://dummyapi.io/data/v1/tag/${tag}/post?limit=20`, {
    headers: {
      "app-id": "63cada995bc52b0fecc614e9",
    }
  })
).json();

const Home: NextPage = () => {
  const router = useRouter()

  const { 
    data, 
    isLoading,
    error,
    isError
  } = useQuery<PostsData, Error>({
    queryKey: ["posts"], 
    queryFn: getPostsData
  });

  const [tag, setTag] = useState("");

  const {
      data: tagData,
      isInitialLoading: tagLoading,
  } = useQuery({
      queryKey: ["postTag", tag],
      queryFn: () => getPostsbyTag(tag),
      enabled: !!tag
  })

  useEffect(() => {
    setTag(router.query.keyword as string)
  
  }, [router.query.keyword])
  

  const handleButtonClick = (tag: string) => {
    setTag(tag)
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  const handleClearClick = () => {
    setTag("")
  }

  //isLoading may not be necessary anymore as data is prefetched from cache
  if (isLoading) return <Layout><div className={loader.center}><div className={loader.lds__roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></Layout>

  if (isError) return <Layout><span>Error: {error.message}</span></Layout>

  if(!data) return <Layout><span>No data!</span></Layout>

  if(tagLoading) return <Layout><div className={loader.center}><div className={loader.lds__roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></Layout>

  return (
    <Layout>
        <h1 className={styles.h1}>Posts</h1>
        {tagData
          && <div className={styles.tag__info}>
                <h2>Tag: {tag}</h2>
                <Button onClick={handleClearClick} tag >Clear tag</Button>
              </div>}
        <div className={styles.grid}>
          {tagData == undefined
            ? data?.data.map((post: any) => {
                return (
                  <div key={post.id}>
                    <PostList post={post} onButtonClick={handleButtonClick}/>
                  </div>
                )
              })
            : tagData?.data.map((post: any) => {
                return (
                  <div key={post.id}>
                    <PostList post={post} onButtonClick={handleButtonClick}/>
                  </div>
                )
            })
          }
        </div>
    </Layout>
  )
}

export default Home;

//server-side fetching with NextJS (SSG)
export async function getStaticProps() {
  const queryClient = new QueryClient();

  //Prefetches the data that we requested to pass along to the props
  await queryClient.prefetchQuery<PostsData>({
    queryKey: ["posts"], 
    queryFn: getPostsData
  })

  //dehydratedState prop to dehydrate the data,
  //which is the prop taken by Hydrate to rehydrate the data to the Component
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}