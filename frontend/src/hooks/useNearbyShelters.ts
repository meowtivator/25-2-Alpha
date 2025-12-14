// src/hooks/useNearbyShelters.ts
import { useEffect, useState } from 'react';
import { fetchSheltersInBounds } from '@/api/shelterApi';
import type { ShelterGroup } from '@/types/shelter';
import { useSettingsStore } from '@/stores/settingsStore';

interface UseNearbySheltersParams {
  latitude: number;
  longitude: number;
  enabled: boolean; // 위치가 확정된 경우에만 호출
}

/**
 * 사용자 위치 주변의 쉼터를 가져오는 훅
 * 위도/경도 기준으로 약 1km 반경 내의 쉼터를 조회
 */
export function useNearbyShelters({
  latitude,
  longitude,
  enabled,
}: UseNearbySheltersParams) {
  const [shelters, setShelters] = useState<ShelterGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const showColdShelters = useSettingsStore((state) => state.showColdShelters);

  const seasonType = showColdShelters ? 'COLD' : 'HEAT';

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let isMounted = true;

    const loadShelters = async () => {
      try {
        setLoading(true);
        setError(null);

        // 약 1km 반경 (위도/경도 각각 ±0.01 정도)
        const latDelta = 0.01;
        const lonDelta = 0.01;

        const minLat = latitude - latDelta;
        const maxLat = latitude + latDelta;
        const minLon = longitude - lonDelta;
        const maxLon = longitude + lonDelta;

        const data = await fetchSheltersInBounds(
          minLat,
          maxLat,
          minLon,
          maxLon,
          seasonType
        );

        if (isMounted) {
          setShelters(data);
        }
      } catch (error) {
        if (isMounted) {
          setError(error instanceof Error ? error : new Error('Unknown error'));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadShelters();

    return () => {
      isMounted = false;
    };
  }, [latitude, longitude, enabled, seasonType]);

  return { shelters, loading, error };
}
