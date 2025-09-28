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
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error playing audio:', error);
        setError(language === 'ar' ? 'خطأ في تشغيل المحطة' : 'Erreur de lecture de la station');
        setIsLoading(false);
        setIsPlaying(false);
      }
    }
  };

  const handleAudioError = () => {
    setError(language === 'ar' ? 'المحطة غير متاحة حالياً' : 'Station non disponible actuellement');
    setIsLoading(false);
    setIsPlaying(false);
  };

  const handleAudioLoad = () => {
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
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={handleAudioError}
                onLoadStart={() => setIsLoading(true)}
                onCanPlay={handleAudioLoad}
                preload="none"
              />
            </div>
          )}

          {/* Test Stream Button */}
          <div className="pt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => {
                // Set a test stream that definitely works
                const testStation: RadioStation = {
                  id: 'test',
                  name: 'Test Stream',
                  frequency: 'Test',
                  country: 'Test',
                  streamUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
                };
                setSelectedStation(testStation);
                setError(null);
                if (audioRef.current) {
                  audioRef.current.src = testStation.streamUrl;
                }
              }}
            >
              {language === 'ar' ? 'تجربة التشغيل' : 'Test de lecture'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
