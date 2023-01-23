import styles from '@/styles/Create.module.css';
import type { NextPage } from 'next';
// import { v4 as uuidv4 } from 'uuid';
import { useState, useMemo } from 'react';
import { useMutation } from 'react-query';
import Select from 'react-select';
import Layout from "@/components/Layout";
import tags from "@/js/tags.json";

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

const createPost = async ({id, formImage, formText, formTag, jsonDate}: any) => await (
  await fetch(`https://dummyapi.io/data/v1/post/create`, {
    method: 'POST',
    headers: {
      "app-id": "63cada995bc52b0fecc614e9",
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      image: formImage,
      likes: 0,
      owner: {
        id: '60d0fe4f5311236168a109f4',
        title: 'mr',
        firstName: 'Benjamin',
        lastName: 'Holland',
        picture: 'https://randomuser.me/api/portraits/med/men/58.jpg'
      },
      publishDate: jsonDate,
      tags: formTag,
      text: formText
    })
  })
).json();

const CreatePage: NextPage = () => {
  const [formImage, setFormImage] = useState("");
  const [formText, setFormText] = useState("");
  const [selectedTag, setSelectedTag] = useState<any>("");
  const [formTag, setFormTag] = useState("");

  const mappedTags = useMemo(() => {
    const filteredTags = tags.data.filter(Boolean);

    return filteredTags.map((tag) => {
      return { value: `${tag}`, label: `${tag}`}
    })
  }, []);
  
  // const mutation = useMutation(createPost);

  const handleFormSubmit = (event: any) => {
    event.preventDefault();

    // const id = uuidv4();
    // const date = new Date();
    // const jsonDate = date.toJSON();

    //fetch POST here
    // mutation.mutate({id, formImage, formText, formTag, jsonDate})
    // console.log(mutation.data)

    setFormImage("");
    setFormText("");
    setFormTag("");
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
          <input type="submit" />
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