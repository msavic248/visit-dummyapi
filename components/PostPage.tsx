import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/PostPage.module.css'
import { formatDate, formatTitle } from '@/js/utils.js';
import Comments from "./Comments";

interface postData {
    post: {
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
}

export default function PostPage({post}: postData) {
    const {id, text, image, publishDate, likes, tags, owner} = post;

    return (
        <div className={styles.card}>
            <div className={styles.card__flex}>
                <Image
                    src={owner.picture}
                    alt={`${formatTitle(owner.title)} ${owner.firstName} ${owner.lastName}`}
                    width={64}
                    height={64}
                />
                <div>
                    <h4>{`${formatTitle(owner.title)} ${owner.firstName} ${owner.lastName}`}</h4>
                    <small>{formatDate(publishDate)}</small>
                    <p className={styles.id__mo}>{id}</p>
                </div>
                <small className={styles.id__pc}>{id}</small>
            </div>
            <div className={styles.card__grid}>
                <div className={styles.postImage}>
                    <Image
                        src={image}
                        alt={text}
                        fill
                        priority
                    />
                </div>
                <div className={styles.description}>
                    <div className={styles.description__flex}>
                        <p>{text}</p>
                        <Link href={`/${id}/edit`} className={styles.edit}><button className={styles.edit__button}>Edit Post</button></Link>
                    </div>
                    <div className={styles.tags}>
                        {tags.map((tag: string) => {
                            return <a href="" key={tag} className={styles.tag}>{tag}</a>
                        })}
                    </div>
                    <p>Likes: {likes}</p>
                    
                </div>
            </div>
            <Comments id={id} />
        </div>
    )
}