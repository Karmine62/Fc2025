import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { io } from 'socket.io-client';

const SOCKET_URL = 'https://fc2025.onrender.com';

const videoConstraints = {
  facingMode: 'user',
  width: { ideal: 1280 },
  height: { ideal: 720 },
};

const overlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 220,
  height: 220,
  border: '3px solid rgba(255,255,255,0.8)',
  borderRadius: '50%',
  pointerEvents: 'none',
  boxShadow: '0 0 0 8px rgba(255,255,255,0.2)',
};

const MobileCamera: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [captured, setCaptured] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<any>(null);

  React.useEffect(() => {
    // Connect to backend via Socket.IO
    const socket = io(SOCKET_URL, { transports: ['websocket'] });
    socket.emit('mobile-connect', {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
    });
    socketRef.current = socket;
    return () => {
      socket.disconnect();
    };
  }, []);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCaptured(imageSrc);
    }
  }, [webcamRef]);

  const retake = () => {
    setCaptured(null);
    setError(null);
  };

  const sendImage = () => {
    if (!captured) return;
    setSending(true);
    setError(null);
    socketRef.current.emit(
      'selfie-captured',
      {
        imageData: captured,
        timestamp: new Date().toISOString(),
      },
      (ack: any) => {
        setSending(false);
        if (ack && ack.error) {
          setError('Failed to send image.');
        } else {
          setCaptured(null);
        }
      }
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 400, background: 'rgba(255,255,255,0.95)', borderRadius: 20, padding: 20, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', backdropFilter: 'blur(10px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <h1 style={{ color: '#333', fontSize: 24, fontWeight: 600, marginBottom: 5 }}>📸 FinstaCam</h1>
          <p style={{ color: '#666', fontSize: 14 }}>Take your perfect selfie</p>
        </div>
        {error && <div style={{ background: '#f8d7da', color: '#721c24', padding: 10, borderRadius: 10, marginBottom: 15 }}>{error}</div>}
        {!captured ? (
          <div style={{ position: 'relative', width: '100%', height: 300, borderRadius: 15, overflow: 'hidden', marginBottom: 20, background: '#000' }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={overlayStyle}></div>
          </div>
        ) : (
          <div style={{ marginBottom: 20 }}>
            <img src={captured} alt="Preview" style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 15 }} />
          </div>
        )}
        <div style={{ display: 'flex', gap: 15, justifyContent: 'center', marginBottom: 20 }}>
          {!captured ? (
            <button onClick={capture} style={{ padding: '12px 24px', border: 'none', borderRadius: 25, fontSize: 16, fontWeight: 600, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', cursor: 'pointer' }}>Capture</button>
          ) : (
            <>
              <button onClick={retake} style={{ padding: '12px 24px', border: 'none', borderRadius: 25, fontSize: 16, fontWeight: 600, background: '#f8f9fa', color: '#333', border: '2px solid #e9ecef', cursor: 'pointer' }}>Retake</button>
              <button onClick={sendImage} disabled={sending} style={{ padding: '12px 24px', border: 'none', borderRadius: 25, fontSize: 16, fontWeight: 600, background: sending ? '#aaa' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', cursor: sending ? 'not-allowed' : 'pointer' }}>Use this one</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileCamera; 