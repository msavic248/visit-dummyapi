import Head from 'next/head'
import Link from 'next/link';
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Nav from '@/components/Nav';
import Post from '@/components/Post';
import { useQuery } from 'react-query';
import {useEffect} from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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

  console.log(data.data);

  return (
    <>
      <Head>
        <title>Home - Milos Savic</title>
        <meta name="description" content="Visit - Dummy API application created by Milos Savic" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className={styles.main}>
        <h1 className={`${inter.className} ${styles.h1}`}>Posts</h1>
        <div className={styles.grid}>
          {data.data.map((post: any) => {
            return (
              <div key={post.id}>
                <Link  href={`/${post.id}`}>
                  <Post post={post}/>
                </Link>
              </div>
            )
          })}
        </div>
      </main>
    </>
  )
}
