import styles from './Profile.module.css'
import loader from "@/styles/Loader.module.css";
import Image from 'next/image';
import { formatTitle, getRandomInt } from '@/js/utils.js';
import { useQuery } from '@tanstack/react-query';
import Button from '../common/Button';
import Link from 'next/link';

interface ownerData {
    owner: {
        id: string
        title: string
        firstName: string
        lastName: string
        picture: string
    }
}

const getPostsbyUser = async (id: string) => await (
    await fetch(`https://dummyapi.io/data/v1/user/${id}/post`, {
      headers: {
        "app-id": "63cada995bc52b0fecc614e9",
      }
    })
  ).json();

export default function Profile(props: any) {
    const {owner}: ownerData = props;

    const {
        data: userData,
        isInitialLoading: userLoading,
        refetch
    } = useQuery({
        queryKey: ["postTag", owner.id],
        queryFn: () => getPostsbyUser(owner.id),
        enabled: false
    })

    const {showProfile, onProfileClick} = props;

    if(showProfile === true) {
        refetch();
    }

    if(userLoading) return <div className={loader.center}><div className={loader.lds__roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>

    if(!userData) return <span>No user posts!</span>

    return (
        <div className={styles.profile}>
            <div className={styles.profile__card}>
                <div className={styles.profile__image}>
                    <Image
                        src={owner.picture}
                        alt={`${formatTitle(owner.title)} ${owner.firstName} ${owner.lastName}`}
                        width={128}
                        height={128}
                    />
                </div>
                <div className={styles.profile__info}>
                    <h3>{`${formatTitle(owner.title)} ${owner.firstName} ${owner.lastName}`}</h3>
                    <p>Followers: {getRandomInt(0, 100000)}</p>
                    <Button>Follow</Button>
                </div>
                <div className={styles.profile__posts}>
                    <div className={styles.user__posts}>
                        {userData.data.map((post: any) => {
                            return (
                                <Link key={post.id} href={`/${post.id}`}>
                                    <Image 
                                        src={post.image}
                                        alt={post.text}
                                        width={200}
                                        height={200}
                                    />
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <div className={styles.profile__buttons}>
                    <Button onClick={onProfileClick}>Close</Button>
                </div>
            </div>
        </div>
    )
}