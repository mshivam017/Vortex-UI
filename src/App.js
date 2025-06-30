import { useState, useEffect } from 'react';
import { Search, Heart, Play, User, Settings, Home, Music, Camera, MessageCircle, Clock, Battery, Wifi, Signal, ChevronRight, Share2, SkipForward, SkipBack} from 'lucide-react';

const FloatingIcon = ({ icon: Icon, color, delay = 0, position, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`absolute transition-all duration-1000 transform cursor-pointer ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
      style={position}
      onClick={onClick}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300 ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
  );
};

const MusicPlayer = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
    <div className="bg-gradient-to-b from-purple-900 to-pink-900 rounded-3xl p-6 w-80 max-w-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-semibold">Now Playing</h3>
        <button onClick={onClose} className="text-white/70 hover:text-white">✕</button>
      </div>
      <div className="bg-white/10 rounded-2xl h-40 mb-4 flex items-center justify-center">
        <Music size={40} className="text-white/50" />
      </div>
      <h4 className="text-white font-semibold mb-1">Indian Flute Music</h4>
      <p className="text-white/70 text-sm mb-4">Relaxing Music</p>
      <div className="flex items-center justify-center space-x-6 mb-4">
        <SkipBack size={20} className="text-white/70 hover:text-white cursor-pointer" />
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
          <Play size={20} className="text-white ml-1" />
        </div>
        <SkipForward size={20} className="text-white/70 hover:text-white cursor-pointer" />
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-white/70 text-xs">1:23</span>
        <div className="flex-1 bg-white/20 rounded-full h-1">
          <div className="bg-white rounded-full h-1 w-1/3"></div>
        </div>
        <span className="text-white/70 text-xs">3:45</span>
      </div>
    </div>
  </div>
);

export default function FunctionalMobileApp() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New message', text: 'You have 3 unread messages', time: '2m ago' },
    { id: 2, title: 'Update available', text: 'App update is ready to install', time: '1h ago' }
  ]);
  const [favorites, setFavorites] = useState([]);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(85);

  const apps = [
    { id: 1, name: 'Music', icon: Music, color: 'bg-gradient-to-r from-pink-500 to-purple-500', downloads: '2.1M' },
    { id: 2, name: 'Camera', icon: Camera, color: 'bg-gradient-to-r from-blue-500 to-cyan-500', downloads: '1.8M' },
    { id: 3, name: 'Messages', icon: MessageCircle, color: 'bg-gradient-to-r from-green-500 to-teal-500', downloads: '3.2M' },
    { id: 4, name: 'Gallery', icon: Heart, color: 'bg-gradient-to-r from-orange-500 to-red-500', downloads: '1.5M' }
  ];

  const toggleFavorite = (appId) => {
    setFavorites(prev => 
      prev.includes(appId) 
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    );
  };

  const AppCard = ({ app, delay = 0 }) => (
    <div 
      className={`${app.color} rounded-2xl p-4 transform transition-all duration-300 hover:scale-105 cursor-pointer`}
      onClick={() => {
        if (app.name === 'Music') {
          setShowMusicPlayer(true);
        }
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <app.icon size={18} className="text-white" />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(app.id);
          }}
          className="p-1"
        >
          <Heart 
            size={16} 
            className={`${favorites.includes(app.id) ? 'text-red-300 fill-current' : 'text-white/70'} hover:text-red-300 transition-colors`} 
          />
        </button>
      </div>
      <h3 className="text-white font-semibold text-sm mb-1">{app.name}</h3>
      <p className="text-white/70 text-xs mb-2">{app.downloads} downloads</p>
      <div className="flex space-x-2">
        <button className="flex-1 bg-white/20 rounded-lg py-2 text-white text-xs font-medium hover:bg-white/30 transition-colors">
          Open
        </button>
        <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
          <Share2 size={12} className="text-white" />
        </button>
      </div>
    </div>
  );

  const StatusBar = () => (
    <div className="flex justify-between items-center text-white text-xs font-medium py-2 px-4">
      <div className="flex items-center space-x-1">
        <Clock size={12} />
        <span>9:41</span>
      </div>
      <div className="flex items-center space-x-2">
        <Signal size={12} />
        <Wifi size={12} />
        <div className="flex items-center space-x-1">
          <Battery size={12} />
          <span>{batteryLevel}%</span>
        </div>
      </div>
    </div>
  );

  const SearchResults = () => (
    <div className="space-y-3">
      {apps
        .filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(app => (
          <div key={app.id} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-colors cursor-pointer">
            <div className={`w-10 h-10 ${app.color} rounded-xl flex items-center justify-center`}>
              <app.icon size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium text-sm">{app.name}</h4>
              <p className="text-gray-400 text-xs">{app.downloads} downloads</p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        ))}
    </div>
  );

  const NotificationScreen = () => (
    <div className="space-y-4">
      <h2 className="text-white text-xl font-bold">Notifications</h2>
      {notifications.map(notif => (
        <div key={notif.id} className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/30">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-white font-medium">{notif.title}</h4>
            <span className="text-gray-400 text-xs">{notif.time}</span>
          </div>
          <p className="text-gray-300 text-sm">{notif.text}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 font-sans">
      {/* Main App Container */}
      <div className="min-h-screen bg-gray-900/80 backdrop-blur-xl border border-gray-700/30 shadow-2xl">
          
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {currentScreen === 'home' && 'Dashboard'}
                  {currentScreen === 'search' && 'Search'}
                  {currentScreen === 'notifications' && 'Notifications'}
                  {currentScreen === 'favorites' && 'Favorites'}
                </h1>
                <p className="text-gray-400 text-sm">
                  {currentScreen === 'home' && 'Welcome back!'}
                  {currentScreen === 'search' && `${searchQuery ? 'Results for "' + searchQuery + '"' : 'Search for apps'}`}
                  {currentScreen === 'notifications' && `${notifications.length} new notifications`}
                  {currentScreen === 'favorites' && `${favorites.length} favorite apps`}
                </p>
              </div>
              <button 
                onClick={() => setCurrentScreen('notifications')}
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center relative"
              >
                <User size={18} className="text-white" />
                {notifications.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">{notifications.length}</span>
                  </div>
                )}
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search apps, games, content..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentScreen('search');
                }}
                onFocus={() => setCurrentScreen('search')}
                className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/70 transition-all duration-300"
              />
            </div>

            {/* Content Based on Current Screen */}
            <div className="mb-6">
              {currentScreen === 'home' && (
                <div className="grid grid-cols-2 gap-4">
                  {apps.map((app, index) => (
                    <AppCard key={app.id} app={app} delay={300 + index * 100} />
                  ))}
                </div>
              )}

              {currentScreen === 'search' && (
                <SearchResults />
              )}

              {currentScreen === 'notifications' && (
                <NotificationScreen />
              )}

              {currentScreen === 'favorites' && (
                <div className="space-y-4">
                  {favorites.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart size={48} className="text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">No favorites yet</p>
                      <p className="text-gray-500 text-sm">Tap the heart icon on apps to add them here</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {apps
                        .filter(app => favorites.includes(app.id))
                        .map(app => (
                          <AppCard key={app.id} app={app} />
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800/90 backdrop-blur-xl border border-gray-700/30 rounded-2xl px-6 py-3">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => setCurrentScreen('home')}
                  className={`p-2 rounded-xl transition-colors ${currentScreen === 'home' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Home size={20} />
                </button>
                <button
                  onClick={() => setCurrentScreen('search')}
                  className={`p-2 rounded-xl transition-colors ${currentScreen === 'search' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Search size={20} />
                </button>
                <button
                  onClick={() => setCurrentScreen('favorites')}
                  className={`p-2 rounded-xl transition-colors ${currentScreen === 'favorites' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Heart size={20} />
                </button>
                <button
                  onClick={() => alert('Settings opened!')}
                  className="p-2 rounded-xl text-gray-400 hover:text-white transition-colors"
                >
                  <Settings size={20} />
                </button>
              </div>
            </div>
        </div>
      </div>

      {/* Music Player Modal */}
      {showMusicPlayer && (
        <MusicPlayer onClose={() => setShowMusicPlayer(false)} />
      )}
    </div>
  );
}