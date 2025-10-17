import React, { useState } from 'react';
import styles from './AdvancedSettings.module.css';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (settings: {
    tone: string;
    verbosity: string;
    imageType: string;
    includeTitleSlide: boolean;
    includeTOC: boolean;
    webSearch: boolean;
    instructions: string;
  }) => void;
};

const AdvancedSettings: React.FC<Props> = ({ visible, onClose, onSave }) => {
  const [tone, setTone] = useState('По умолчанию');
  const [verbosity, setVerbosity] = useState('Стандартно');
  const [imageType, setImageType] = useState('Стоковые');
  const [includeTitleSlide, setIncludeTitleSlide] = useState(true);
  const [includeTOC, setIncludeTOC] = useState(false);
  const [webSearch, setWebSearch] = useState(false);
  const [instructions, setInstructions] = useState('');

  if (!visible) return null;

  const handleSave = () => {
    onSave({
      tone,
      verbosity,
      imageType,
      includeTitleSlide,
      includeTOC,
      webSearch,
      instructions,
    });
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <h2 className={styles.title}>Дополнительные настройки</h2>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Тональность</label>
            <select value={tone} onChange={e => setTone(e.target.value)} className={styles.select}>
              <option>По умолчанию</option>
              <option>Повседневный</option>
              <option>Профессиональный</option>
              <option>Забавный</option>
            </select>
            <p className={styles.description}>Управляет стилем написания (например, повседневный, профессиональный, забавный).</p>
          </div>

          <div className={styles.field}>
            <label>Детализация</label>
            <select value={verbosity} onChange={e => setVerbosity(e.target.value)} className={styles.select}>
              <option>Стандартно</option>
              <option>Кратко</option>
              <option>Многословно</option>
            </select>
            <p className={styles.description}>Управляет детализацией описаний слайдов: кратко, стандартно, много текста.</p>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Тип изображений</label>
            <select value={imageType} onChange={e => setImageType(e.target.value)} className={styles.select}>
              <option>Стоковые</option>
              <option>AI-генерация</option>
            </select>
            <p className={styles.description}>Выбирайте между стоковыми и AI-сгенерированными изображениями.</p>
          </div>

          <div className={styles.fieldCheckbox}>
            <input
              type="checkbox"
              id="titleSlide"
              checked={includeTitleSlide}
              onChange={e => setIncludeTitleSlide(e.target.checked)}
            />
            <label htmlFor="titleSlide">Первый слайд с заголовком</label>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.fieldCheckbox}>
            <input
              type="checkbox"
              id="includeTOC"
              checked={includeTOC}
              onChange={e => setIncludeTOC(e.target.checked)}
            />
            <label htmlFor="includeTOC">Включить содержание</label>
          </div>

          <div className={styles.fieldCheckbox}>
            <input
              type="checkbox"
              id="webSearch"
              checked={webSearch}
              onChange={e => setWebSearch(e.target.checked)}
            />
            <label htmlFor="webSearch">Использовать поиск в интернете</label>
          </div>
        </div>

        <div className={styles.instructions}>
          <label>Инструкции</label>
          <textarea
            className={styles.textarea}
            placeholder="Напишите дополнительные инструкции для ИИ..."
            value={instructions}
            onChange={e => setInstructions(e.target.value)}
          />
        </div>

        <div className={styles.actions}>
          <button className={styles.buttonCancel} onClick={onClose}>Отмена</button>
          <button className={styles.buttonSave} onClick={handleSave}>Сохранить</button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;
