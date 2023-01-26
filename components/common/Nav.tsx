import styles from './Nav.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {

    return (
    <nav>
        <div className={styles.navbar}>
            <Link href="/">
                <Image 
                    src="/favicon.ico"
                    alt="Vercel icon"
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