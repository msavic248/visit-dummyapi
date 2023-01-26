//style imports
import styles from '@/styles/Edit.module.css';
import loader from "@/styles/Loader.module.css";

//component imports
import Layout from "@/components/layouts/Layout";
import Button from '@/components/common/Button';

//library imports
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Select from 'react-select';

//tags import,
//as tags had over 2000 tags with null and empty string,
//used Postman to download json file for easier debugging purposes
import tags from "@/js/tags.json";


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

const getPostById = async (id: string) => await (
  await fetch(`https://dummyapi.io/data/v1/post/${id}`, {
      headers: {
          "app-id": "63cada995bc52b0fecc614e9",
      }
  })
).json();

//edit post function to PATCH data to the id
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

// NOTE: PATCH function is not functional, will not PATCH
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
  const [imageValidation, setImageValidation] = useState("");
  const [textValidation, setTextValidation] = useState("");

  //tags are filtered to remove empty items then cached with useMemo
  const mappedTags = useMemo(() => {
    const filteredTags = tags.data.filter(Boolean);

    return filteredTags.map(tag => {
      return { value: `${tag}`, label: `${tag}`}
    })
  }, []);

  //mutationFn to use patchPost function,
  const mutation = useMutation({
    mutationFn: () => patchPost(id as string, formImage, formTag, formText)
  })

  //when data changes(fetched by id),
  //sets inputs on form to data that needs to be edited,
  //e.g original image / title of the post
  useEffect(() => {
    setFormImage(`${data?.image}`)
    setFormText(`${data?.text}`)

    //function to map tags to format that Select library uses
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

    if(!formImage) {
      setImageValidation("Please enter an image URL");
      return ;
    }

    if(!formText) {
      setTextValidation("Please enter post caption");
      return ;
    }

    //fetch POST here
    mutation.mutate()

    setFormImage("");
    setFormText("");
    setFormTag([]);
    setSelectedTag("");

    //when edit form is submitted, redirect to original post
    router.push(`/${id}`)
  }

  //Select library only works when format is {value: value, label: value},
  //currentTag will add the tags as a single value to our string[]
  const handleOnChange = (selectedTag: any) => {
    const currentTag = selectedTag.map((tag: any) => tag.value);

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
        <small className={styles.validation}>{imageValidation}</small>
        <div>
          <label htmlFor="text">Description:</label>
          <textarea name="text" id="text" className={styles.image} value={formText} onChange={event => setFormText(event.target.value)} placeholder="Add a description..." />
        </div>
        <small className={styles.validation}>{textValidation}</small>
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
          <Button type="submit">Submit edit</Button>
        </div>
      </form>
    </Layout>
  )
}

export default EditPage;
