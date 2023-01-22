import { useQuery } from "react-query";
import Image from "next/image";
import { formatDate, formatTitle } from '@/js/utils.js';
import loader from '@/styles/Loader.module.css';
import styles from '@/styles/Comments.module.css';
import { useState } from 'react';

interface CommentData {
    data: {
        id: string
        message: string
        owner: {
            id: string
            title: string
            firstName: string
            lastName: string
            picture: string
        }
        post: string
        publishDate: string
    }[];
}

const getCommentById = async (id: string) => await (
    await fetch(`https://dummyapi.io/data/v1/post/${id}/comment`, {
        headers: {
            "app-id": "63cada995bc52b0fecc614e9",
        }
    })
).json();



function Comments({id}: any) {
    const [comment, setComment] = useState("");
    const { data, isLoading } = useQuery<CommentData>(["comment", id], () => getCommentById(id as string));
      
    if (isLoading) return <div className={loader.center}><div className={loader.lds__roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>

    if(!data) return <span>No data!</span>

    const handleFormSubmit = (event: any) => {
        event.preventDefault();
    
        //fetch POST
    
        setComment("");
    }

    return (
        <>
            <h4>Comments</h4>
            <ul className={styles.list}>
                {data.data.map(comment => {
                    return (
                    <li key={comment.id}>
                        <div className={styles.comment__flex}>
                            <Image
                                src={comment.owner.picture}
                                alt={`${formatTitle(comment.owner.title)} ${comment.owner.firstName} ${comment.owner.lastName}`}
                                width={50}
                                height={50}
                            />
                            <div>
                                <h4>{`${formatTitle(comment.owner.title)} ${comment.owner.firstName} ${comment.owner.lastName}`}</h4>
                                <small className={styles.time__mo}>{formatDate(comment.publishDate)}</small>
                                <p>{comment.message}</p>
                                
                            </div>
                            <small className={styles.time__pc}>{formatDate(comment.publishDate)}</small>
                        </div>
                    </li>
                    )
                })}
            </ul>
            <form className={styles.form} onSubmit={handleFormSubmit}>
                <label htmlFor="comment"><h4>Add a comment:</h4></label>
                <textarea name="comment" id="comment" value={comment} onChange={event => setComment(event.target.value)} placeholder="Comment here..." />
                <div className={styles.form__button}>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        </>
    )
}

export default Comments;