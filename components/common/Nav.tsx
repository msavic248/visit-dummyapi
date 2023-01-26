//styles imports
import styles from './Nav.module.css';

//library imports
import Link from 'next/link';
import Image from 'next/image';

//Home text moved next to Icon on mobile,
//as it isn't explicit that it can be used as Home link for PC and MO
export default function Nav() {

    return (
        <nav>
            <div className={styles.navbar}>
                <Link href="/">
                    <Image 
                        src="/favicon.ico"
                        alt="Home icon"
                        width={32}
                        height={32}    
                    />
                    <p>Home</p>
                </Link>
                <ul>
                    <span>
                        <Link href="/">
                            Home
                        </Link>
                    </span>
                    <Link href="/create">
                        Create Post
                    </Link>
                </ul>
            </div>
        </nav>
    )
}