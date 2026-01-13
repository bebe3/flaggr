import { useRef, useCallback, useEffect, useState } from 'react';
import Map, { Source, Layer, type MapRef, type MapLayerMouseEvent } from 'react-map-gl/maplibre';
import type { Country } from '@/types/country';
import { MAP_CONFIG } from '@/config/constants';
import bbox from '@turf/bbox';
import centroid from '@turf/centroid';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapViewProps {
  filterCodes: string[];
  hoveredCountryCode: string | null;
  hoverSource: 'map' | 'list' | null;
  selectedCountry: Country | null;
  selectSource: 'map' | 'list' | null;
  theme: 'light' | 'dark';
  minZoom?: number;
  onCountryHover: (code: string | null) => void;
  onCountryClick: (code: string, position: { x: number; y: number }) => void;
  onEmptyClick?: () => void;
}

// GeoJSON property key for ISO alpha-3 code
const ISO_A3_KEY = 'ISO_A3';
const SOURCE_ID = 'countries';

export default function MapView({
  filterCodes,
  hoveredCountryCode,
  hoverSource,
  selectedCountry,
  selectSource,
  theme,
  minZoom,
  onCountryHover,
  onCountryClick,
  onEmptyClick,
}: MapViewProps) {
  const mapRef = useRef<MapRef>(null);
  const [geojsonData, setGeojsonData] = useState<GeoJSON.FeatureCollection | null>(null);
  // Track map-hover state locally for instant visual feedback
  const hoveredIdRef = useRef<string | null>(null);
  // Track list-hover state separately
  const listHoveredIdRef = useRef<string | null>(null);

  // Load GeoJSON data
  useEffect(() => {
    fetch('/data/countries.geojson')
      .then((res) => res.json())
      .then((data) => setGeojsonData(data))
      .catch((err) => console.error('Failed to load GeoJSON:', err));
  }, []);

  // Navigate to selected country
  useEffect(() => {
    if (!selectedCountry || !mapRef.current || !geojsonData) return;

    const feature = geojsonData.features.find(
      (f) => f.properties?.[ISO_A3_KEY] === selectedCountry.code
    );

    if (feature) {
      if (selectSource === 'list') {
        // List click: center on country at overview zoom level
        const center = centroid(feature);
        mapRef.current.easeTo({
          center: center.geometry.coordinates as [number, number],
          zoom: MAP_CONFIG.listClickZoom,
          duration: MAP_CONFIG.animationDuration,
        });
      } else {
        // Map click: zoom to fit country bounds
        const bounds = bbox(feature) as [number, number, number, number];
        const currentZoom = mapRef.current.getZoom();
        mapRef.current.fitBounds(bounds, {
          padding: MAP_CONFIG.fitBoundsPadding,
          duration: MAP_CONFIG.animationDuration,
          maxZoom: MAP_CONFIG.fitBoundsMaxZoom,
          minZoom: Math.min(currentZoom, MAP_CONFIG.fitBoundsMaxZoom),
          linear: true,
        });
      }
    }
  }, [selectedCountry, selectSource, geojsonData]);

  // Helper to set feature state for instant hover effect
  const setHoverState = useCallback((code: string | null, hover: boolean) => {
    const map = mapRef.current?.getMap();
    if (!map || !code) return;
    map.setFeatureState({ source: SOURCE_ID, id: code }, { hover });
  }, []);

  // Handle list hover using feature-state for instant feedback
  useEffect(() => {
    if (hoverSource !== 'list') {
      // Clear list hover state when not hovering from list
      if (listHoveredIdRef.current) {
        setHoverState(listHoveredIdRef.current, false);
        listHoveredIdRef.current = null;
      }
      return;
    }

    // Clear previous list hover
    if (listHoveredIdRef.current && listHoveredIdRef.current !== hoveredCountryCode) {
      setHoverState(listHoveredIdRef.current, false);
    }

    // Set new list hover
    if (hoveredCountryCode) {
      setHoverState(hoveredCountryCode, true);
      listHoveredIdRef.current = hoveredCountryCode;
    } else {
      listHoveredIdRef.current = null;
    }
  }, [hoveredCountryCode, hoverSource, setHoverState]);

  const handleMouseMove = useCallback(
    (e: MapLayerMouseEvent) => {
      const code = e.features?.[0]?.properties?.[ISO_A3_KEY] as string | undefined;
      const map = mapRef.current;

      if (code) {
        // Clear previous hover state instantly
        if (hoveredIdRef.current && hoveredIdRef.current !== code) {
          setHoverState(hoveredIdRef.current, false);
        }
        // Set new hover state instantly
        if (hoveredIdRef.current !== code) {
          setHoverState(code, true);
          hoveredIdRef.current = code;
        }
        // Notify parent (for label, list scroll, etc.)
        onCountryHover(code);
        if (map) {
          map.getCanvas().style.cursor = 'pointer';
        }
      } else {
        if (hoveredIdRef.current) {
          setHoverState(hoveredIdRef.current, false);
          hoveredIdRef.current = null;
        }
        onCountryHover(null);
        if (map) {
          map.getCanvas().style.cursor = '';
        }
      }
    },
    [onCountryHover, setHoverState]
  );

  const handleMouseLeave = useCallback(() => {
    if (hoveredIdRef.current) {
      setHoverState(hoveredIdRef.current, false);
      hoveredIdRef.current = null;
    }
    onCountryHover(null);
    if (mapRef.current) {
      mapRef.current.getCanvas().style.cursor = '';
    }
  }, [onCountryHover, setHoverState]);

  const handleClick = useCallback(
    (e: MapLayerMouseEvent) => {
      const code = e.features?.[0]?.properties?.[ISO_A3_KEY];
      if (code) {
        onCountryClick(code, { x: e.point.x, y: e.point.y });
      } else {
        onEmptyClick?.();
      }
    },
    [onCountryClick, onEmptyClick]
  );

  // Create filter expression for highlighted countries
  // When hovering from list, exclude the hovered country from highlight layer
  const isListHover = hoverSource === 'list' && hoveredCountryCode;
  const highlightFilter = isListHover
    ? [
        'all',
        ['in', ['get', ISO_A3_KEY], ['literal', filterCodes]],
        ['!=', ['get', ISO_A3_KEY], hoveredCountryCode],
      ]
    : ['in', ['get', ISO_A3_KEY], ['literal', filterCodes]];

  // Reduce opacity of other countries when hovering from list
  const highlightOpacity = isListHover ? 0.25 : 0.6;

  // Colors for hover effect
  const hoverFillColor = theme === 'dark' ? '#00ffff' : '#3b82f6';
  const hoverLineColor = theme === 'dark' ? '#00ffff' : '#3b82f6';
  const hoverBorderColor = theme === 'dark' ? '#00ffff' : '#1d4ed8';

  const mapStyle = theme === 'dark' ? '/styles/dark.json' : '/styles/light.json';

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: MAP_CONFIG.initialCenter.longitude,
        latitude: MAP_CONFIG.initialCenter.latitude,
        zoom: MAP_CONFIG.initialZoom,
      }}
      minZoom={minZoom ?? MAP_CONFIG.minZoom}
      maxZoom={MAP_CONFIG.maxZoom}
      maxPitch={0}
      dragRotate={false}
      touchPitch={false}
      style={{ width: '100%', height: '100%' }}
      mapStyle={mapStyle}
      interactiveLayerIds={['countries-base', 'countries-highlight']}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      attributionControl={{ compact: true, customAttribution: 'Boundaries: Natural Earth' }}
    >
      {geojsonData && (
        <Source id={SOURCE_ID} type="geojson" data={geojsonData} promoteId={ISO_A3_KEY}>
          {/* Base layer - all countries (gray) */}
          <Layer
            id="countries-base"
            type="fill"
            paint={{
              'fill-color': theme === 'dark' ? '#374151' : '#e5e7eb',
              'fill-opacity': 0.5,
            }}
          />

          {/* Highlight layer - filtered countries */}
          <Layer
            id="countries-highlight"
            type="fill"
            filter={highlightFilter as any}
            paint={{
              'fill-color': '#3b82f6',
              'fill-opacity': highlightOpacity,
            }}
          />

          {/* Hover fill layer - uses feature-state for instant feedback */}
          <Layer
            id="countries-hover-fill"
            type="fill"
            paint={{
              'fill-color': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                hoverFillColor,
                'transparent',
              ] as any,
              'fill-opacity': theme === 'dark' ? 0.5 : 0.6,
            }}
          />

          {/* Hover outer glow layer */}
          <Layer
            id="countries-hover-glow-outer"
            type="line"
            paint={{
              'line-color': hoverLineColor,
              'line-width': ['case', ['boolean', ['feature-state', 'hover'], false], 8, 0] as any,
              'line-blur': 4,
              'line-opacity': 0.6,
            }}
          />

          {/* Hover inner border layer */}
          <Layer
            id="countries-hover-border"
            type="line"
            paint={{
              'line-color': hoverBorderColor,
              'line-width': ['case', ['boolean', ['feature-state', 'hover'], false], 2, 0] as any,
            }}
          />

          {/* Border layer */}
          <Layer
            id="countries-border"
            type="line"
            paint={{
              'line-color': theme === 'dark' ? '#4b5563' : '#9ca3af',
              'line-width': 0.5,
            }}
          />
        </Source>
      )}
    </Map>
  );
}
