import styles from '@/styles/Create.module.css';
import type { NextPage } from 'next';
import { useState, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import Select from 'react-select';
import Layout from "@/components/layouts/Layout";
import tags from "@/js/tags.json";
import Button from '@/components/common/Button';
import { v4 as uuidv4 } from 'uuid';

// const filteredTags = tags.data.filter(Boolean);

// const mappedTags = filteredTags.map(tag => {
//   return { value: `${tag}`, label: `${tag}`}
// })

// const getTags = async () => await (
//   await fetch(`https://dummyapi.io/data/v1/tag`, {
//       headers: {
//           "app-id": "63cada995bc52b0fecc614e9",
//       }
//   })
// ).json();

interface Data {
    id: string
    formImage: string
    formText: string
    formTag: string[]
    jsonDate: string
}

const createPost = async (data: Data) => await (
  await fetch(`https://dummyapi.io/data/v1/post/create`, {
    method: 'POST',
    headers: {
      "app-id": "63cada995bc52b0fecc614e9",
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      id: data.id,
      image: data.formImage,
      likes: 0,
      owner: {
        id: '60d0fe4f5311236168a109f4',
        title: 'mr',
        firstName: 'Benjamin',
        lastName: 'Holland',
        picture: 'https://randomuser.me/api/portraits/med/men/58.jpg'
      },
      publishDate: data.jsonDate,
      tags: data.formTag,
      text: data.formText
    })
  })
).json();

const CreatePage: NextPage = () => {
  const [formImage, setFormImage] = useState("");
  const [formText, setFormText] = useState("");
  const [selectedTag, setSelectedTag] = useState<any>("");
  const [formTag, setFormTag] = useState<string[]>([]);

  const mappedTags = useMemo(() => {
    const filteredTags = tags.data.filter(Boolean);

    return filteredTags.map((tag) => {
      return { value: `${tag}`, label: `${tag}`}
    })
  }, []);

  const id = uuidv4();
  const date = new Date();
  const jsonDate = date.toJSON();
  
  const mutation = useMutation({
    mutationFn: () => createPost({id: id, formImage: formImage, formText: formText, formTag: formTag, jsonDate: jsonDate}),
    onSuccess: () => {
      alert("Successfully posted")
    }
  });

  const handleFormSubmit = (event: any) => {
    event.preventDefault();

    //fetch POST here
    mutation.mutate()

    console.log(id);
    console.log(mutation.data)

    setFormImage("");
    setFormText("");
    setFormTag([]);
    setSelectedTag("");
  }

  const handleOnChange = (selectedTag: any) => {
    const currentTag = selectedTag.map((tag: any) => tag.value);

    setFormTag(currentTag);
    setSelectedTag(selectedTag);
  }

  return (
    <Layout title="Create Post">
      <h1>Create Post</h1>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input type="text" name="image" id="image" className={styles.image} value={formImage} onChange={event => setFormImage(event.target.value)} placeholder="Add an imgur url..." />
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
          <Button type="submit" >Submit post</Button>
        </div>
      </form>
      {/* <div className={styles.note}>
        <h4>Note:</h4>
        <p>For testing purposes, the app will create a post as Benjamin Holland</p>
      </div> */}
      
    </Layout>
    
  )
}

export default CreatePage;