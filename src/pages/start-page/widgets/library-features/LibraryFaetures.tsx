import React, { useState } from 'react';
import ImageFilter from 'react-image-filters-tool';
import s from './LibraryFeatures.module.css';
import Slider from '../../../../shared/ui/input/Slider.tsx';

const LibraryFeatures = () => {
  const [imageUrl] = useState(
    'https://simpleecreate.com/images/rCfBiP7oGHVJOWMPHhY365ZGlWt3bjQGLXQq38bP.png'
  );
  const [activeFilter, setActiveFilter] = useState('none');

  const initialSettings = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    shadows: 100,
    redChannel: 1,
    greenChannel: 1,
    blueChannel: 1,
    hueRotate: 0,
    grain: 0,
    vignette: 0,
  };

  type Settings = typeof initialSettings;
  type SettingsKey = keyof Settings;

  const [settings, setSettings] = useState<Settings>(initialSettings);

  const filterSettings: { key: SettingsKey; label: string; min: number; max: number; step: number }[] = [
    { key: 'brightness', label: 'Brightness', min: 0, max: 200, step: 1 },
    { key: 'contrast', label: 'Contrast', min: 0, max: 200, step: 1 },
    { key: 'saturation', label: 'Saturation', min: 0, max: 200, step: 1 },
    { key: 'shadows', label: 'Shadows', min: 0, max: 300, step: 1 },
    { key: 'redChannel', label: 'Red', min: 0, max: 5, step: 0.1 },
    { key: 'greenChannel', label: 'Green', min: 0, max: 5, step: 0.1 },
    { key: 'blueChannel', label: 'Blue', min: 0, max: 5, step: 0.1 },
    { key: 'hueRotate', label: 'Hue Rotate', min: 0, max: 360, step: 1 },
    { key: 'grain', label: 'Grain', min: 0, max: 70, step: 1 },
    { key: 'vignette', label: 'Vignette', min: 0, max: 300, step: 10 },
  ];

  const categorizedFilters = {
    'Warm filters': ['none', 'roseTint', 'sunsetDream', 'rusticSunset', 'sunKissed', 'goldenHour', 'amberGlow'],
    'Cold filters': ['cozySnow', 'blueLagoon', 'arcticInversion', 'deepBlue', 'cool', 'oceanBreeze'],
    Other: ['retro', 'pastel', 'vintage', 'vintageFilm'],
    Mood: ['lavenderHaze', 'deep', 'moody', 'grayscale', 'noir', 'saturate', 'sepia', 'hue', 'fancyEffect', 'emeraldGlow'],
  };

  const handleChange = (key: SettingsKey, value: number) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={s.container}>
      <div className={s.top_container}>
        <div className={s.settings}>
          {filterSettings.map(({ key, label, min, max, step }) => (
            <div key={key} className={s.filter_row}>
              <div className={s.filter_label}>{label}</div>
              <div className={s.filter_control}>
                <Slider
                  value={settings[key]}
                  onChange={(val) => handleChange(key, val)}
                  min={min}
                  max={max}
                  step={step}
                />
              </div>
            </div>
          ))}
        </div>

        <ImageFilter
          filter={activeFilter}
          imageUrl={imageUrl}
          {...settings}
          styles={{ width: '60%', borderRadius: 5, position: 'relative' }}
        />
      </div>

      <div className={s.bottom_container}>
        {Object.entries(categorizedFilters).map(([category, filters]) => (
          <div key={category} className={s.filter_category}>
            <p className={s.category_title}>{category}</p>
            <div className={s.filter_list}>
              {filters.map((filter) => (
                <div
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`${s.image_wrapper} ${
                    activeFilter === filter ? s.active_border : ''
                  }`}
                >
                  <ImageFilter
                    imageUrl={imageUrl}
                    filter={filter}
                    preview
                    saveImage={() => 'saveImage'}
                    styles={{ borderRadius: 5, width: 60, height: 60 }}
                    
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryFeatures;
