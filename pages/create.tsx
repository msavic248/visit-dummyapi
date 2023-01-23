import styles from '@/styles/Create.module.css';
import type { NextPage } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { useState, useMemo } from 'react';
import Select from 'react-select';
import { useQuery } from 'react-query';
import Layout from "@/components/Layout";
import tags from "@/js/tags.json";

// const filteredTags = tags.data.filter(Boolean);

// const mappedTags = filteredTags.map(tag => {
//   return { value: `${tag}`, label: `${tag}`}
// })

const getTags = async () => await (
  await fetch(`https://dummyapi.io/data/v1/tag`, {
      headers: {
          "app-id": "63cada995bc52b0fecc614e9",
      }
  })
).json();

const CreatePage: NextPage = () => {
  const [formImage, setFormImage] = useState("");
  const [formText, setFormText] = useState("");
  const [formTag, setFormTag] = useState("");
  const mappedTags = useMemo(() => {
    const filteredTags = tags.data.filter(Boolean);

    return filteredTags.map(tag => {
      return { value: `${tag}`, label: `${tag}`}
    })
  }, []);
  

  const handleFormSubmit = (event: any) => {
    event.preventDefault();

    const id = uuidv4();

    //fetch POST here

    setFormText("");
    setFormTag("");
  }

  const handleOnChange = (selectedTag: any) => {
    const currentTag = selectedTag.map((tag: any) => tag.value);

    setFormTag(currentTag);
    console.log(currentTag)
  }

  return (
    <Layout title="Create Post">
      <h1>Create Post</h1>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div>
          <label htmlFor="image">Imgur URL:</label>
          <input type="text" name="image" id="image" className={styles.image} value={formImage} onChange={event => setFormImage(event.target.value)} placeholder="Add an imgur url..." />
        </div>
        <div>
          <label htmlFor="text">Description:</label>
          <input type="text" name="text" id="text" className={styles.image} value={formText} onChange={event => setFormText(event.target.value)} placeholder="Add a description..." />
        </div>
        <div>
          <label htmlFor="tags">Tags:</label>
          <Select
            id="tags"
            className={styles.tags}
            isMulti
            options={mappedTags}
            onChange={handleOnChange}
            placeholder="Choose tags..."
          />
        </div>
        <div className={styles.form__button}>
          <input type="submit" />
        </div>
      </form>
      <div className={styles.note}>
        <h4>Note:</h4>
        <p>For testing purposes, the app will create a post as Benjamin Holland</p>
      </div>
      
    </Layout>
    
  )
}

export default CreatePage;