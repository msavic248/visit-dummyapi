import Image from "next/image";
import styles from '@/styles/Post.module.css'
import { formatDate, formatTitle } from '@/js/utils.js';

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

export default function Post({post}: postData) {
    const {text, image, publishDate, likes, tags, owner} = post;

    return (
        <div className={styles.card}>
            <div className={styles.card__flex}>
                <Image
                    src={owner.picture}
                    alt={`${formatTitle(owner.title)} ${owner.firstName} ${owner.lastName}`}
                    width={50}
                    height={50}
                />
                <div>
                    <p>{`${formatTitle(owner.title)} ${owner.firstName} ${owner.lastName}`}</p>
                    <small>{formatDate(publishDate)}</small>
                </div>
            </div>
            <div className={styles.card__grid}>
                <Image
                    src={image}
                    alt={text}
                    width={200}
                    height={200}
                    priority
                />
                <div className={styles.description}>
                    <p>{text}</p>
                    <p className={styles.likes}>Likes: {likes}</p>
                    <div className={styles.tags}>
                        {tags.map((tag: string) => {
                            return <p key={tag} className={styles.tag}>{tag}</p>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
