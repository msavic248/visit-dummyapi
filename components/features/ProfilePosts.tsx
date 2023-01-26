//style imports
import styles from './ProfilePosts.module.css'
import loader from "@/styles/Loader.module.css";

//library imports
import Link from 'next/link'
import Image from 'next/image'


export default function ProfilePosts(props: any) {
    const {userData} = props;
    const {userLoading} = props;

    if(userLoading) return <div className={styles.user__posts}><div className={loader.center}><div className={loader.lds__roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div>

    if(!userData) return <span>No user posts!</span>

    return (
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
    )
}
