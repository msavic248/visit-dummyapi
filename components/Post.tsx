import Image from "next/image";
import styles from '@/styles/Post.module.css'

export default function Post({post}: any) {
    const {id, text, image, publishDate, likes, tags, owner} = post;

    return (
        <div className={styles.card}>
            <div className={styles.card__flex}>
                <Image
                    className={styles.profile}
                    src={owner.picture}
                    alt={`${owner.title} ${owner.firstName} ${owner.lastName}`}
                    width={50}
                    height={50}
                />
                <div>
                    <p>{`${owner.title} ${owner.firstName} ${owner.lastName}`}</p>
                    <br/>
                    <small>{publishDate}</small>
                </div>
            </div>
            <div className={styles.card__grid}>
                <Image
                    className={styles.postImage}
                    src={image}
                    alt={text}
                    width={200}
                    height={200}
                    priority
                />
                <div >
                    <h4>{id}</h4>
                    <p>{text}</p>
                    <p>Likes: {likes}</p>
                    {tags.map((tag: string) => {
                        return <p key={tag}>{tag}</p>
                    })}
                </div>
            </div>
        </div>
    )
}
