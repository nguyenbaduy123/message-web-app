import './App.css'
import Layout from './components/Layout/Layout'
import LeftBar from './components/LeftBar/LeftBar'
import MainChat from './components/MainChat/MainChat'

function App() {
  return (
    <Layout>
      <div className="container">
        <LeftBar />
        <MainChat />
      </div>
    </Layout>
  )
}

export default App
