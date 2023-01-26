//style imports
import styles from './Profile.module.css'

//component imports
import Button from '../common/Button';

//utils import
import { formatTitle, getRandomInt } from '@/js/utils.js';

//library imports
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import ProfilePosts from './ProfilePosts';


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

    //enabled: false, means query won't run automatically
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

    //refetch to run the query, based on if condition
    if(showProfile === true) {
        refetch();
    }

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

                {/* Follower count randomized for aesthetic purposes */}
                <div className={styles.profile__info}>
                    <h3>{`${formatTitle(owner.title)} ${owner.firstName} ${owner.lastName}`}</h3>
                    <p>Followers: {getRandomInt(0, 100000)}</p>
                    <Button>Follow</Button>
                </div>

                {/* userData and userLoading passed down to ProfilePosts */}
                <div className={styles.profile__posts}>
                    <ProfilePosts userData={userData} userLoading={userLoading}/>
                </div>

                <div className={styles.profile__buttons}>
                    <Button onClick={onProfileClick}>Close</Button>
                </div>
            </div>
        </div>
    )
}