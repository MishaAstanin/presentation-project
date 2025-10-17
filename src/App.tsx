import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import MainPage from './components/MainPage/MainPage'
import CreatePresentation from './components/CreatePresentation/CreatePresentation'
import CreateTemplate from './components/CreateTemplate/CreateTemplate'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/create-presentation" element={<CreatePresentation />} />
          <Route path="/create-template" element={<CreateTemplate />} />
        </Routes>
      </main>
    </>
  )
}

export default App
