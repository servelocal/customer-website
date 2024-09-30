import Button from '@/components/Button';
import styles from './page.module.css';
import { LuHome } from 'react-icons/lu';
import { MdClose } from 'react-icons/md';

export default function PlaygroundPage() {
  return (
    <main>
      <h1>Play with your components</h1>
      <div className={styles.buttonsContainer}>
        <Button variant="primary">primary</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="warning">Warning</Button>

        <Button variant="primary" icon={<LuHome />} iconPosition="left">
          Icon Left
        </Button>
        <Button variant="primary" icon={<LuHome />} iconPosition="right">
          Icon Right
        </Button>

        <Button variant="primary" icon={<MdClose />} ariaLabel="close"></Button>
      </div>
    </main>
  );
}
