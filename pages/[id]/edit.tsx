import styles from '@/styles/Edit.module.css';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Select from 'react-select';
import Layout from "@/components/layouts/Layout";
import tags from "@/js/tags.json";
import loader from "@/styles/Loader.module.css";
import Button from '@/components/common/Button';

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

interface Data {
  id: string
  formImage: string
  formText: string
  formTag: string[]
  jsonDate: string
}

const getPostById = async (id: string) => await (
  await fetch(`https://dummyapi.io/data/v1/post/${id}`, {
      headers: {
          "app-id": "63cada995bc52b0fecc614e9",
      }
  })
).json();

const patchPost = async (id: string, formImage: string, formTag: string[], formText: string) => await (
  await fetch(`https://dummyapi.io/data/v1/post/${id}`, {
    method: 'PATCH',
    headers: {
      "app-id": "63cada995bc52b0fecc614e9",
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      image: formImage,
      tags: formTag,
      text: formText
    })
  })
  ).json();

const EditPage: NextPage = () => {
  const router = useRouter();
  const {id} = router.query;

  const {
    data,
    isLoading
  } = useQuery<IdData>({
    queryKey: ["id", id],
    queryFn: () => getPostById(id as string)
  });

  const [formImage, setFormImage] = useState("");
  const [formText, setFormText] = useState("");
  const [selectedTag, setSelectedTag] = useState<any>(null);
  const [formTag, setFormTag] = useState([]);

  const mappedTags = useMemo(() => {
    const filteredTags = tags.data.filter(Boolean);

    return filteredTags.map(tag => {
      return { value: `${tag}`, label: `${tag}`}
    })
  }, []);

  const mutation = useMutation({
    mutationFn: () => patchPost(id as string, formImage, formTag, formText)
  })

  useEffect(() => {
    setFormImage(`${data?.image}`)
    setFormText(`${data?.text}`)

    const fetchedTags = data?.tags.map(tag => {
      return {value: tag, label: tag}
    })

    setSelectedTag(fetchedTags);
  }, [data])
  

  if (isLoading) {
    return <Layout><div className={loader.center}><div className={loader.lds__roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></Layout>
  }

  if(!data) return <Layout><span>No data!</span></Layout>


  const handleFormSubmit = (event: any) => {
    event.preventDefault();

    //fetch POST here
    mutation.mutate()

    console.log(mutation.data)
    console.log(id)

    setFormImage("");
    setFormText("");
    setFormTag([]);
    setSelectedTag("");

    router.push(`/${id}`)
  }

  const handleOnChange = (selectedTag: any) => {
    const currentTag = selectedTag.map((tag: any) => tag.value);

    console.log(selectedTag);
    setFormTag(currentTag);
    setSelectedTag(selectedTag);
  }

  return (
    <Layout title="Edit Post">
      <div className={styles.title}>
        <Link href={`/${id}`}>
          <Button>Go Back</Button>
        </Link>
        <h1>Edit Post</h1>
      </div>

      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input type="text" name="image" id="image" className={styles.image} value={formImage} onChange={event => setFormImage(event.target.value)} placeholder="Please enter new url..." />
        </div>
        <div>
          <label htmlFor="text">Description:</label>
          <textarea name="text" id="text" className={styles.image} value={formText} onChange={event => setFormText(event.target.value)} placeholder="Add a description..." />
        </div>
        <div>
          <label htmlFor="tags">Tags:</label>
          <Select
            id="tags"
            className={styles.tags}
            isMulti
            options={mappedTags}
            value={selectedTag}
            onChange={handleOnChange}
            placeholder="Choose tags..."
          />
        </div>
        <div className={styles.form__button}>
          <Button type="submit">Submit edit</Button>
        </div>
      </form>
    </Layout>
  )
}

export default EditPage;
