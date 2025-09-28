import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, Radio, Loader2 } from 'lucide-react';
import { tunisianRadioStations, RadioStation } from '@/lib/newsData';

interface RadioPlayerProps {
  language: 'ar' | 'fr';
}

export default function RadioPlayer({ language }: RadioPlayerProps) {
  const [selectedStation, setSelectedStation] = useState<RadioStation | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  const handleStationChange = (stationId: string) => {
    const station = tunisianRadioStations.find(s => s.id === stationId);
    if (station) {
      setSelectedStation(station);
      setIsPlaying(false);
      setError(null);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = station.streamUrl;
        audioRef.current.load(); // Force reload of the audio element
      }
    }
  };

  const togglePlayPause = async () => {
    if (!selectedStation || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsLoading(false);
    } else {
      try {
        setIsLoading(true);
        setError(null);
        
        // Set audio properties for better streaming
        audioRef.current.preload = 'none';
        audioRef.current.crossOrigin = 'anonymous';
        
        // Try to play with autoplay
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error playing audio:', error);
        setError(language === 'ar' ? 'خطأ في تشغيل المحطة - تأكد من الاتصال بالإنترنت' : 'Erreur de lecture - vérifiez votre connexion');
        setIsLoading(false);
        setIsPlaying(false);
      }
    }
  };

  const handleAudioError = (e: any) => {
    console.error('Audio error:', e);
    setError(language === 'ar' ? 'المحطة غير متاحة حالياً' : 'Station non disponible actuellement');
    setIsLoading(false);
    setIsPlaying(false);
  };

  const handleAudioLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    setError(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center">
          <Radio className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'الراديو التونسي' : 'Radio Tunisienne'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select onValueChange={handleStationChange}>
            <SelectTrigger>
              <SelectValue placeholder={language === 'ar' ? 'اختر محطة راديو' : 'Choisir une station'} />
            </SelectTrigger>
            <SelectContent>
              {tunisianRadioStations.map((station) => (
                <SelectItem key={station.id} value={station.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{station.name}</span>
                    <span className="text-xs text-muted-foreground">{station.frequency}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedStation && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{selectedStation.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedStation.frequency} • {selectedStation.country}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={togglePlayPause}
                  disabled={isLoading}
                  className="w-10 h-10 rounded-full p-0"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4" />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-8">{volume[0]}%</span>
              </div>

              {/* Status */}
              <div className="flex items-center text-xs">
                {error ? (
                  <span className="text-red-500">{error}</span>
                ) : isLoading ? (
                  <span className="text-blue-500">
                    {language === 'ar' ? 'جاري التحميل...' : 'Chargement...'}
                  </span>
                ) : isPlaying ? (
                  <span className="text-green-500">
                    {language === 'ar' ? '🔴 مباشر' : '🔴 En direct'}
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    {language === 'ar' ? 'متوقف' : 'Arrêté'}
                  </span>
                )}
              </div>

              <audio
                ref={audioRef}
                onPlay={() => {
                  setIsPlaying(true);
                  setIsLoading(false);
                }}
                onPause={() => setIsPlaying(false)}
                onError={handleAudioError}
                onLoadStart={() => setIsLoading(true)}
                onCanPlay={handleCanPlay}
                onLoadedData={handleAudioLoad}
                preload="none"
                crossOrigin="anonymous"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
