import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import styles from '@/styles/PostList.module.css'
import { formatDate, formatTitle } from '@/js/utils.js';
import Button from "./Button";
import Heart from "./Heart";

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

export default function PostList(props: any) {
    const [filled, setFilled] = useState(false);

    const handleButtonClick = () => {
        setFilled(!filled)
    }

    const {post}: postData = props;
    const {id, text, image, publishDate, likes, tags, owner} = post;

    const {onButtonClick} = props;


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
                    <h4>{`${formatTitle(owner.title)} ${owner.firstName} ${owner.lastName}`}</h4>
                    <small>{formatDate(publishDate)}</small>
                </div>
            </div>
            <div className={styles.card__grid}>
                <div className={styles.card__image}>
                    <Link href={`/${id}`}>
                        <Image
                            src={image}
                            alt={text}
                            sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 50vw,
                                33vw"
                            fill
                            priority
                        />
                    </Link>
                    <div className={styles.card__heart}>
                        <button onClick={handleButtonClick} className={styles.button}>
                            <Heart filled={filled} />
                        </button>
                    </div>
                </div>
                <div className={styles.description}>
                    <p>{text}</p>
                    <p className={styles.likes}>Likes: {filled ? likes + 1 : likes}</p>
                    <div className={styles.tags}>
                        {tags.map((tag: string) => {
                            return (
                            <Button
                            key={tag}
                            onClick={() => onButtonClick(tag)}
                            tag
                            >
                                {tag}
                            </Button>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
