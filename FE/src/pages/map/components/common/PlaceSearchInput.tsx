import { useState, useRef, useEffect } from 'react';
import * as S from './PlaceSearchInputStyle';

interface PlaceSearchInputProps {
  onSelectPlace?: (lat: number, lng: number) => void;
}

interface SearchResult {
  title: string;
  address: string;
  roadAddress?: string;
  jibunAddress?: string;
  x: string;
  y: string;
}

const PlaceSearchInput = ({ onSelectPlace }: PlaceSearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkApiLoaded = () => {
      if (window.naver && window.naver.maps && window.naver.maps.Service) {
        setIsApiLoaded(true);
      } else {
        setTimeout(checkApiLoaded, 100);
      }
    };
    checkApiLoaded();
  }, []);

  // 주소 검색 (Geocoding API)
  const searchAddress = async (query: string): Promise<SearchResult[]> => {
    return new Promise((resolve) => {
      window.naver.maps.Service.geocode(
        {
          query: query,
        },
        (status: string, response: any) => {
          if (status === window.naver.maps.Service.Status.ERROR) {
            resolve([]);
            return;
          }

          if (response.v2 && response.v2.meta.totalCount > 0) {
            const results = response.v2.addresses.slice(0, 5).map((item: any) => ({
              title: item.roadAddress || item.jibunAddress,
              address: item.jibunAddress,
              roadAddress: item.roadAddress,
              jibunAddress: item.jibunAddress,
              x: item.x,
              y: item.y,
            }));
            resolve(results);
          } else {
            resolve([]);
          }
        }
      );
    });
  };

  useEffect(() => {
    if (!isApiLoaded) {
      return;
    }

    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        setIsLoading(true);
        searchAddress(searchTerm)
          .then((results) => {
            setSearchResults(results);
          })
          .catch((error) => {
            setSearchResults([]);
            throw error;
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, isApiLoaded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectPlace = (place: SearchResult) => {
    setSearchTerm(place.title);
    setSearchResults([]);
    if (onSelectPlace) {
      onSelectPlace(parseFloat(place.y), parseFloat(place.x));
    }
  };

  return (
    <S.MapSearchContainer ref={searchContainerRef}>
      <S.MapSearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="주소 검색"
      />
      {searchResults.length > 0 && (
        <S.SearchResultsContainer>
          {isLoading ? (
            <S.LoadingText>검색 중...</S.LoadingText>
          ) : (
            searchResults.map((result, index) => (
              <S.SearchResultItem key={index} onClick={() => handleSelectPlace(result)}>
                <S.ResultTitle>{result.title}</S.ResultTitle>
                <S.ResultAddress>{result.roadAddress || result.jibunAddress}</S.ResultAddress>
              </S.SearchResultItem>
            ))
          )}
        </S.SearchResultsContainer>
      )}
    </S.MapSearchContainer>
  );
};

export default PlaceSearchInput;
