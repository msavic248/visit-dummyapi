import styles from '@/styles/Footer.module.css';
import Link from 'next/link';

interface Props {
    fullName: string
    gitHubLink: string
    linkedInLink: string
}

export default function Footer({fullName, gitHubLink, linkedInLink}: Props) {

    return (
    <footer>
        <div className={styles.footer}>
            <small>Created by {fullName}</small>
            <ul>
                <Link href={gitHubLink} target="_blank">
                    GitHub
                </Link>
                <Link href={linkedInLink} target="_blank">
                    LinkedIn
                </Link>
            </ul>
        </div>
    </footer>
    )
}