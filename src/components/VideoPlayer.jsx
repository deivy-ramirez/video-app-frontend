import { useState, useEffect } from 'react';
import { getVideos, deleteVideo } from '../services/api';

const VideoPlayer = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideos = async () => {
    try {
      const data = await getVideos();
      setVideos(data);
    } catch (err) {
      setError('Error al cargar los videos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este video?')) {
      try {
        await deleteVideo(id);
        setVideos(videos.filter(video => video._id !== id));
      } catch (error) {
        alert('Error al eliminar el video');
      }
    }
  };

  if (loading) return <div className="text-center py-4">Cargando videos...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {videos.map((video) => (
        <div key={video._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <video controls className="w-full h-48 object-cover">
            <source src={video.url} type="video/mp4" />
            Tu navegador no soporta el tag de video.
          </video>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {new Date(video.createdAt).toLocaleDateString()}
              </span>
              <button
                onClick={() => handleDelete(video._id)}
                className="text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoPlayer;