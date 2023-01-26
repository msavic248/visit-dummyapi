//style imports
import styles from '@/styles/Create.module.css';

//component imports
import Layout from "@/components/layouts/Layout";
import Button from '@/components/common/Button';

//library imports
import type { NextPage } from 'next';
import { useState, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';

//tags import,
//as tags had over 2000 tags with null and empty string,
//used Postman to download json file for easier debugging purposes
import tags from "@/js/tags.json";

//tags fetch displayed below

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

//create post function,
//as owner field is required by Dummy API,
//hard coded owner values are used
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

// NOTE: POST function is not functional, will not POST
const CreatePage: NextPage = () => {
  const [formImage, setFormImage] = useState("");
  const [formText, setFormText] = useState("");
  const [selectedTag, setSelectedTag] = useState<any>("");
  const [formTag, setFormTag] = useState<string[]>([]);

  //tags are filtered to remove empty items then cached with useMemo
  const mappedTags = useMemo(() => {
    const filteredTags = tags.data.filter(Boolean);

    return filteredTags.map((tag) => {
      return { value: `${tag}`, label: `${tag}`}
    })
  }, []);

  //random uuid is created
  const id = uuidv4();

  //current date is created then translated to JSON format
  const date = new Date();
  const jsonDate = date.toJSON();
  
  //mutationFn to use createPost function,
  //onSuccess will run once it's successfull posted
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

    setFormImage("");
    setFormText("");
    setFormTag([]);
    setSelectedTag("");
  }

  //Select library only works when format is {value: value, label: value},
  //currentTag will add the tags as a single value to our string[]
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
          {/* options need to show all available tags,
          with selected value being the selected tag,
          Select can be quite slow with many tags */}
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
    </Layout>
    
  )
}

export default CreatePage;