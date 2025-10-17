import { useState } from 'react';

import UploadForm from "../UploadForm/UploadForm";
import AdvancedSettings from '../AdvancedSettings/AdvancedSettings';
import styles from './CreatePresentation.module.css';

const DEFAULT_ADVANCED_SETTINGS: AdvancedSettingsType = {
  tone: 'По умолчанию',
  verbosity: 'Стандартно',
  imageType: 'Стоковые',
  includeTitleSlide: true,
  includeTOC: false,
  webSearch: false,
  instructions: '',
};

type AdvancedSettingsType = {
  tone: string;
  verbosity: string;
  imageType: string;
  includeTitleSlide: boolean;
  includeTOC: boolean;
  webSearch: boolean;
  instructions: string;
};

const handleFilesSelected = (files: FileList) => {
  Array.from(files).forEach(file => {
    console.log('Загружен файл:', file.name);
  });
};

function CreatePresentation() {
  const [prompt, setPrompt] = useState('');
  const [audience, setAudience] = useState('');
  const [slidesCount, setSlidesCount] = useState(5);
  const [language, setLanguage] = useState('ru');
  const [format, setFormat] = useState('pptx');

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedSettings, setAdvancedSettings] = useState<AdvancedSettingsType>(DEFAULT_ADVANCED_SETTINGS);

  // Открыть модалку
  const openAdvanced = () => setShowAdvanced(true);
  // Закрыть модалку
  const closeAdvanced = () => setShowAdvanced(false);
  // Получить значения от модалки
  const handleAdvancedSave = (settings: AdvancedSettingsType) => {
    setAdvancedSettings(settings);
    closeAdvanced();
  };

  const generateRequestBody = () => {
    const requestBody: any = {
      content: prompt,
      instructions: advancedSettings.instructions,
      tone: advancedSettings.tone,
      verbosity: advancedSettings.verbosity,
      web_search: advancedSettings.webSearch,
      n_slides: slidesCount,
      language: language,
      include_table_of_contents: advancedSettings.includeTOC,
      include_title_slide: advancedSettings.includeTitleSlide,
      audience: audience,
      image_type: advancedSettings.imageType,
      export_as: format,
      // template, slides_markdown, files
    };

    // Вывод в консоль
    console.log('Request body:', JSON.stringify(requestBody, null, 2));
  };

  return (
    <div className={styles.container}>

      <h2>Быстрое создание презентаций без лишних усилий</h2>

      <label className={styles.label}>
        Описание Вашей презентации
        <textarea
          className={styles.textarea}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Расскажите о своей презентации..."
          rows={4}
        />
      </label>

      <label className={styles.label}>
        Целевая аудитория презентации
        <textarea
          className={styles.textarea}
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          placeholder="Опишите кого Вы хотите заинтересовать..."
          rows={3}
        />
      </label>

      <div className={styles.container2}>

        <label className={styles.label}>
          Количество слайдов
          <input
            type="number"
            className={styles.input}
            min={1}
            max={20}
            value={slidesCount}
            onChange={(e) => {
              let value = Number(e.target.value);
              if (isNaN(value)) value = 1;
              else if (value < 1) value = 1;
              else if (value > 20) value = 20;
              setSlidesCount(value);
            }}
          />
        </label>

        <label className={styles.label}>
          Язык
          <select
            className={styles.select}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="de">Deutsch</option>
            <option value="fr">Français</option>
          </select>
        </label>

        <label className={styles.label}>
          Формат
          <select
            className={styles.select}
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="pptx">PPTX</option>
            <option value="pdf">PDF</option>
          </select>
        </label>

      </div>

      <UploadForm onFilesSelected={handleFilesSelected} />

      <button className={styles.button} onClick={openAdvanced}>
        Продвинутые настройки
      </button>

      <AdvancedSettings
        visible={showAdvanced}
        onClose={closeAdvanced}
        onSave={handleAdvancedSave}
      />

      <button className={styles.generateButton} onClick={generateRequestBody}>
        Сгенерировать
      </button>

    </div>
  );
}

export default CreatePresentation;
