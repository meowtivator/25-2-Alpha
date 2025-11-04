// src/components/map/KakaoMap.tsx
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState } from 'react';

interface KakaoMapProps {
  width?: string;
  height?: string;
  latitude?: number;
  longitude?: number;
  level?: number;
}

export function KakaoMap({
  width = '100%',
  height = '400px',
  latitude = 37.5665, // 서울시청 기본 좌표
  longitude = 126.9780,
  level = 3,
}: KakaoMapProps) {
  const [center] = useState({
    lat: latitude,
    lng: longitude,
  });

  return (
    <Map
      center={center}
      style={{
        width,
        height,
        borderRadius: '0px',
      }}
      level={level}
    >
      <MapMarker position={center}>
        {/* <div style={{
          padding: '8px 12px',
          backgroundColor: 'white',
          border: '2px solid #4777e8',
          borderRadius: '8px',
          color: '#171717',
          fontSize: '14px',
          fontWeight: '600',
          whiteSpace: 'nowrap',
        }}>
          📍 현재 위치
        </div> */}
      </MapMarker>
    </Map>
  );
}
