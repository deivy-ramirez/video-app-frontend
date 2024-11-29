import { useState } from 'react';
import { uploadVideo } from '../services/api';

const VideoUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile);
    } else {
      alert('Por favor selecciona un archivo de video válido');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      await uploadVideo(file);
      setFile(null);
      onUploadSuccess && onUploadSuccess();
      alert('Video subido exitosamente!');
    } catch (error) {
      console.error('Error al subir:', error);
      alert('Error al subir el video');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Subir Video</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
            id="video-input"
          />
          <label
            htmlFor="video-input"
            className="cursor-pointer text-blue-500 hover:text-blue-600"
          >
            {file ? file.name : 'Haz clic para seleccionar un video'}
          </label>
        </div>

        <button
          type="submit"
          disabled={!file || loading}
          className={`w-full py-2 px-4 rounded-md ${
            !file || loading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {loading ? 'Subiendo...' : 'Subir Video'}
        </button>
      </form>
    </div>
  );
};

export default VideoUpload;
