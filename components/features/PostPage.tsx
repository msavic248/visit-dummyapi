//style imports
import styles from './PostPage.module.css'

//component imports
import Profile from "./Profile";
import Comments from "./Comments";
import Button from "../common/Button";
import Heart from "../misc/Heart";

//utils import
import { formatDate, formatTitle } from '@/js/utils.js';

//library imports
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";


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
    const router = useRouter();
    const [showProfile, setShowProfile] = useState(false);
    const [filled, setFilled] = useState(false);

    const handleProfileClick = () => {
        setShowProfile(!showProfile)
    }

    const handleButtonClick = () => {
        setFilled(!filled)
    }

    const {id, text, image, publishDate, likes, tags, owner} = post;

    return (
        <>
        {/* if showProfile is true, shows Profile pop-up */}
        {showProfile && <Profile owner={owner} showProfile={showProfile} onProfileClick={handleProfileClick}/>}

        <div className={styles.card}>
            <div className={styles.card__flex}>
                <button className={styles.profile__button} onClick={handleProfileClick}>
                    <Image
                        src={owner.picture}
                        alt={`${formatTitle(owner.title)} ${owner.firstName} ${owner.lastName}`}
                        width={64}
                        height={64}
                    />
                </button>
                <div className={styles.card__profile__info}>
                    <button className={styles.profile__button} onClick={handleProfileClick}>
                        <h4>{`${formatTitle(owner.title)} ${owner.firstName} ${owner.lastName}`}</h4>
                    </button>
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
                        sizes="(max-width: 768px) 100vw,
                            (max-width: 1200px) 50vw,
                            33vw"
                        priority
                    />
                    <div className={styles.card__heart}>
                        <button onClick={handleButtonClick} className={styles.button}>
                            <Heart filled={filled} />
                        </button>
                    </div>
                </div>
                <div className={styles.description}>
                    <div className={styles.description__flex}>
                        <p>{text}</p>
                        <Link href={`/${id}/edit`} className={styles.edit}>
                            <Button>Edit post</Button>
                        </Link>
                    </div>
                    <div className={styles.tags}>
                        {tags.map((tag: string) => {
                            return (
                                <Button
                                key={tag}
                                onClick={() => {
                                    router.push({
                                        pathname: '/',
                                        query: { keyword: tag}
                                    })
                                }}
                                tag
                                >
                                    {tag}
                                </Button>
                            )
                        })}
                    </div>
                    <p>Likes: {filled ? likes + 1 : likes}</p>
                </div>
            </div>
            <Comments id={id} />
        </div>
        </>
        
    )
}