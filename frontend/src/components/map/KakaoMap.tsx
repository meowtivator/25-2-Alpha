// src/components/map/KakaoMap.tsx
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MarkerIcon } from '@/assets/icons';

interface KakaoMapProps {
  width?: string;
  height?: string;
  latitude?: number;
  longitude?: number;
  level?: number;
  useCustomMarker?: boolean; // 커스텀 마커 사용 여부 (기본값: false)
}

export function KakaoMap({
  width = '100%',
  height = '400px',
  latitude = 37.5665, // 서울시청 기본 좌표
  longitude = 126.978,
  level = 3,
  useCustomMarker = false,
}: KakaoMapProps) {
  const [center, setCenter] = useState({
    lat: latitude,
    lng: longitude,
  });
  const { t } = useTranslation();
  const mapLabel = t('mapArea');
  const markerLabel = t('shelterMarker');

  // props가 변경되면 지도 중심을 업데이트
  useEffect(() => {
    setCenter({
      lat: latitude,
      lng: longitude,
    });
  }, [latitude, longitude]);

  return (
    <div role="region" aria-label={mapLabel}>
      <Map
        center={center}
        style={{
          width,
          height,
          borderRadius: '0px',
        }}
        level={level}
      >
      {useCustomMarker ? (
        // 커스텀 마커 (SVG 아이콘 사용)
        <CustomOverlayMap position={center} yAnchor={1}>
          <div className="flex flex-col items-center" role="img" aria-label={markerLabel}>
            {/* 커스텀 마커 아이콘 */}
            <MarkerIcon className="text-blue-900" size={25} />
          </div>
        </CustomOverlayMap>
      ) : (
        // 기본 카카오맵 마커
        <MapMarker position={center} title={markerLabel}>
        </MapMarker>
      )}
      </Map>
    </div>
  );
}
