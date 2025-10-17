import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.css';
import HeroImage from '../../assets/hero.png'

function MainPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/create-presentation');
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <img src={HeroImage} alt="Приветственное изображение" className={styles.image} />
        <div className={styles.content}>
          <h1 className={styles.title}>Создавайте презентации за секунды</h1>
          <p className={styles.subtitle}>
            Инновационный веб-сервис для быстрой генерации стильных презентаций на любую тему.
          </p>
          <button className={styles.button} onClick={handleClick}>Попробовать</button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
