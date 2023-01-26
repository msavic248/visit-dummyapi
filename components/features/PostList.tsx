//style imports
import styles from './PostList.module.css'

//component imports
import Button from "../common/Button";
import Heart from "../misc/Heart";
import Profile from "./Profile";

//utils import
import { formatDate, formatTitle } from '@/js/utils.js';

//library imports
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';


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
    const [showProfile, setShowProfile] = useState(false);
    const [filled, setFilled] = useState(false);

    const {post}: postData = props;
    const {id, text, image, publishDate, likes, tags, owner} = post;

    const handleProfileClick = () => {
        setShowProfile(!showProfile)
    }

    const handleButtonClick = () => {
        setFilled(!filled)
    }

    const {onButtonClick} = props;

    return (
        <>
        {/* if showProfile is true, shows Profile pop-up */}
        {showProfile && <Profile owner={owner} showProfile={showProfile} onProfileClick={handleProfileClick}/>}
        
        <div className={styles.card}>
            <div className={styles.card__profile}>
                <button className={styles.profile__button} onClick={handleProfileClick}>
                    <Image
                        src={owner.picture}
                        alt={`${formatTitle(owner.title)} ${owner.firstName} ${owner.lastName}`}
                        width={50}
                        height={50}
                    />
                </button>
                <div className={styles.card__profile__info}>
                    <button className={styles.profile__button} onClick={handleProfileClick}>
                        <h4>{`${formatTitle(owner.title)} ${owner.firstName} ${owner.lastName}`}</h4>
                    </button>
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
        </>
    )
}
