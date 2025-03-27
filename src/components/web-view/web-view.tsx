'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, RefreshCw, X } from 'lucide-react';

interface WebViewProps {
  url: string;
  title?: string;
  onClose?: () => void;
}

export function WebView({ url, title, onClose }: WebViewProps) {
  const [currentUrl, setCurrentUrl] = useState(url);
  const [isLoading, setIsLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setCurrentUrl(url);
  }, [url]);

  const handleLoad = () => {
    setIsLoading(false);
    // Atualizar estados de navegação
    if (iframeRef.current) {
      try {
        const history = iframeRef.current.contentWindow?.history;
        setCanGoBack(history?.length > 1);
        setCanGoForward(false); // Reset forward state
      } catch (error) {
        console.error('Erro ao acessar histórico:', error);
      }
    }
  };

  const handleNavigate = (direction: 'back' | 'forward') => {
    if (iframeRef.current) {
      try {
        const contentWindow = iframeRef.current.contentWindow;
        if (direction === 'back') {
          contentWindow?.history.back();
        } else {
          contentWindow?.history.forward();
        }
      } catch (error) {
        console.error('Erro na navegação:', error);
      }
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = currentUrl;
    }
  };

  return (
    <Card className="flex flex-col h-full w-full overflow-hidden">
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavigate('back')}
            disabled={!canGoBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavigate('forward')}
            disabled={!canGoForward}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            className={isLoading ? 'animate-spin' : ''}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          {title && <span className="font-medium">{title}</span>}
        </div>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="relative flex-grow">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={currentUrl}
          className="w-full h-full border-none"
          onLoad={handleLoad}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          title={title || 'WebView Content'}
        />
      </div>
    </Card>
  );
}