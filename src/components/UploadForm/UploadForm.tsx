import React, { useRef, useState } from 'react';
import styles from './UploadForm.module.css';

type UploadFormProps = {
  onFilesSelected: (files: FileList) => void;
};

const UploadForm: React.FC<UploadFormProps> = ({ onFilesSelected }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const updateFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    setSelectedFiles(prevFiles => {
      const combined = [...prevFiles];
      fileArray.forEach(newFile => {
        if (!combined.find(f => f.name === newFile.name)) {
          combined.push(newFile);
        }
      });
      return combined;
    });
    onFilesSelected(files);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      updateFiles(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      updateFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className={styles.dropzone}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4m-6 8h4m-4 0v2h4v-2" />
      </svg>

      <p className={styles.text}>Перетащите файл или нажмите кнопку ниже</p>
      <p className={styles.subtext}>Поддерживается: .pdf, .txt, .pptx, .docx</p>
      <button type="button" className={styles.button} onClick={handleButtonClick}>
        Выбрать файлы
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        className={styles.hiddenInput}
        onChange={handleFilesChange}
        accept=".pdf,.txt,.pptx,.docx"
      />

      {selectedFiles.length > 0 && (
        <div className={styles.fileList}>
          <h4>Выбранные файлы:</h4>
          <ul>
            {selectedFiles.map(file => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
