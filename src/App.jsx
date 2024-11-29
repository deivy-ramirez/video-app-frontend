import { useState } from 'react'
import VideoUpload from './components/VideoUpload'
import VideoPlayer from './components/VideoPlayer'

function App() {
  const [refresh, setRefresh] = useState(0);

  const handleUploadSuccess = () => {
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Plataforma de Videos
        </h1>
        <VideoUpload onUploadSuccess={handleUploadSuccess} />
        <div className="mt-8">
          <VideoPlayer key={refresh} />
        </div>
      </div>
    </div>
  );
}

export default App;