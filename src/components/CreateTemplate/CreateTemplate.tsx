import UploadForm from "../UploadForm/UploadForm";
import styles from "./CreateTemplate.module.css"

const handleFilesSelected = (files: FileList) => {
    Array.from(files).forEach(file => {
        console.log('Загружен файл:', file.name);
    });
};

function CreateTemplate() {
    return (
        <div className={styles.container}>
            <h2>Загрузите свой шаблон</h2>
            <p>
                Загрузите PPTX-файл, чтобы созлать шаблон, который можно использовать для создания AI-презентаций
            </p>
            <UploadForm
                onFilesSelected={handleFilesSelected}
                accept=".pptx"
                supportText=".pptx"
                multiple={false}
            />
        </div>
    );
}

export default CreateTemplate;