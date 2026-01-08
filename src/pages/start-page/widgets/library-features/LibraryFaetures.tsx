import React, { useMemo, useRef, useState, useEffect } from 'react';
import ImageFilter from 'react-image-filters-tool';
import s from './LibraryFeatures.module.css';
import Slider from '../../../../shared/ui/input/Slider.tsx';
import ColorPicker from 'react-best-gradient-color-picker'
import { convertRgbaToHexAInGradient } from '../../../../shared/helpers/convertRgbToHex';

import filter1 from '../../../../assets/image/filter1.png'
import filter2 from '../../../../assets/image/filter2.png'
import filter3 from '../../../../assets/image/filter3.png'
import filter4 from '../../../../assets/image/filter4.png'
import filter5 from '../../../../assets/image/filter5.png'
import filter6 from '../../../../assets/image/filter6.png'
import filter7 from '../../../../assets/image/filter7.png'
import filter8 from '../../../../assets/image/filter8.png'
import filter9 from '../../../../assets/image/filter9.png'
import filter10 from '../../../../assets/image/filter10.png'
import filter11 from '../../../../assets/image/filter11.png'
import filter12 from '../../../../assets/image/filter12.png'
import filter13 from '../../../../assets/image/filter13.png'
import filter14 from '../../../../assets/image/filter14.png'
import filter15 from '../../../../assets/image/filter15.png'
import filter16 from '../../../../assets/image/filter16.png'
import filter17 from '../../../../assets/image/filter17.png'
import filter18 from '../../../../assets/image/filter18.png'
import filter19 from '../../../../assets/image/filter19.png'
import filter20 from '../../../../assets/image/filter20.png'
import filter21 from '../../../../assets/image/filter21.png'
import filter22 from '../../../../assets/image/filter22.png'
import filter23 from '../../../../assets/image/filter23.png'
import filter24 from '../../../../assets/image/filter24.png'
import filter25 from '../../../../assets/image/filter25.png'    
import filter26 from '../../../../assets/image/filter26.png'
import filter27 from '../../../../assets/image/filter27.png'
import filter28 from '../../../../assets/image/filter28.png'
import filter29 from '../../../../assets/image/filter29.png'
import filter30 from '../../../../assets/image/filter30.png'
import filter31 from '../../../../assets/image/filter31.png'
import filter32 from '../../../../assets/image/filter32.png'
import filter33 from '../../../../assets/image/filter33.png'
import filter34 from '../../../../assets/image/filter34.png'
import filter35 from '../../../../assets/image/filter35.png'
import filter36 from '../../../../assets/image/filter36.png'
import filter37 from '../../../../assets/image/filter37.png'
import filter38 from '../../../../assets/image/filter38.png'
import filter39 from '../../../../assets/image/filter39.png'
import filter40 from '../../../../assets/image/filter40.png'
import filter41 from '../../../../assets/image/filter41.png'
import filter42 from '../../../../assets/image/filter42.png'
import filter43 from '../../../../assets/image/filter43.png'
import filter44 from '../../../../assets/image/filter44.png'
import filter45 from '../../../../assets/image/filter45.png'
import filter46 from '../../../../assets/image/filter46.png'
import filter47 from '../../../../assets/image/filter47.png'
import filter48 from '../../../../assets/image/filter48.png'
import filter49 from '../../../../assets/image/filter49.png'
import filter50 from '../../../../assets/image/filter50.png'
    

const filterSettings: { key: string; label: string; min: number; max: number; step: number }[] = [
  { key: 'brightness', label: 'Brightness', min: -100, max: 100, step: 1 },
  { key: 'contrast', label: 'Contrast', min: -100, max: 100, step: 1 },
  { key: 'saturation', label: 'Saturation', min: -100, max: 100, step: 1 },
  { key: 'shadows', label: 'Shadows', min: -100, max: 100, step: 1 },
  {key: 'highlights', label: 'Highlights', min: -100, max: 100, step: 1 },
  { key: 'redChannel', label: 'Red', min: 0, max: 5, step: 0.1 },
  { key: 'greenChannel', label: 'Green', min: 0, max: 5, step: 0.1 },
  { key: 'blueChannel', label: 'Blue', min: 0, max: 5, step: 0.1 },
  { key: 'hueRotate', label: 'Hue Rotate', min: 0, max: 360, step: 1 },
  { key: 'grain', label: 'Grain', min: 0, max: 70, step: 1 },
  { key: 'vignette', label: 'Vignette', min: 0, max: 300, step: 10 },
];

const allFilters = [
  'none',



  // city / travel
  'tokyo',
  'malibu',
  'miami',
  'sahara',
  'rio',
  'phoenix',
  'jerusalem',


  // cold / nordic
  'arctic',
  'silberian',
  'oslo',
  'icelandic',
  'glacier',
  'alpine',
  'antarctic',

  // stylistic
  'vintage',
  'cool',
  'fancyEffect',
  'deep',
  'grove',

  // nature / mood
  'amazon',
  'hallow',
  'cedar',
  'safari',
  'shade',
  'desert',

  // cinematic / moods

  'moody',
  'goldenHour',
  'oceanBreeze',
  'noir',
  'rainforest',
  'nightVibes',
  'vintageFilm',

  // retro / signal
  'static',
  'frequency',
  'broadcast',
  'retro',
  'transistor',
  'jazz',
  'classic',
  'naight8',

  // color tints
  'goldenTint',
  'lavenderHaze',
  'emeraldGlow',
  'roseTint',
  'arcticInversion',
  'crimsonGlow',
  'rusticSunset',
  'sunsetDream',
  'blueLagoon',

];

const LibraryFeatures = () => {
  const [imageUrl, setImageUrl] = useState('https://raw.githubusercontent.com/Mariarass/image-filters-demo/main/public/image.jpg');
  const [activeFilter, setActiveFilter] = useState('none');
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);
  const [savedImage, setSavedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showAllFilters, setShowAllFilters] = useState(false);

  const initialSettings = {
    brightness: 1,
    contrast: 1,
    saturation: 1,
    shadows: 1,
    redChannel: 1,
    greenChannel: 1,
    blueChannel: 1,
    hueRotate: 0,
    grain: 0,
    vignette: 0,
    highlights: 0,
 
  };

  type Settings = typeof initialSettings;
  type SettingsKey = keyof Settings;

  const [settings, setSettings] = useState<Settings>(initialSettings);

  const [gradientsState, setGradientsState] = useState(
    'linear-gradient(90deg, rgba(96,93,93,0) 0%, rgba(255,255,255,0) 100%)'
  )
  const [solidColor, setSolidColor] = useState('rgba(96,93,93,1)')

  const [showGradientPicker, setShowGradientPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const colorButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!showGradientPicker) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node) &&
        colorButtonRef.current &&
        !colorButtonRef.current.contains(event.target as Node)
      ) {
        setShowGradientPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showGradientPicker]);


  const handleChange = (key: SettingsKey, value: number) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleDownload = () => {
    if (!savedImage) return;
    console.log(savedImage)
    const url = URL.createObjectURL(savedImage);
    console.log(url)
    const link = document.createElement('a');
    link.href = url;
    link.download = `filter${activeFilterIndex + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleClearSettings = () => {
    setSettings(initialSettings);
    setActiveFilter('none');
    setGradientsState('linear-gradient(90deg, rgba(96,93,93,0) 0%, rgba(255,255,255,0) 100%)')
  };

  const codeSnippet = useMemo(() => {
    const {
      brightness,
      contrast,
      saturation,
      shadows,
      highlights,
      hueRotate,
      grain,
      vignette,
      redChannel,
      greenChannel,
      blueChannel,
    } = settings;
  
    const lines = [
      `${activeFilter}: {`,
      `  brightness: ${(brightness / 100).toFixed(2)},`,
      `  contrast: ${(contrast / 100).toFixed(2)},`,
      `  highlights: ${(highlights / 100).toFixed(2)},`,
      `  hueRotate: ${hueRotate},`,
      `  saturate: ${(saturation / 100).toFixed(2)},`,
      `  shadows: ${(shadows / 100).toFixed(2)},`,
      `  grain: ${(grain / 100).toFixed(2)},`,
      `  vignette: ${(vignette / 100).toFixed(2)},`,
      `  colorMatrix: new Float32Array([`,
      `    ${redChannel.toFixed(2)}, 0,           0,           0,`,
      `    0,           ${greenChannel.toFixed(2)}, 0,           0,`,
      `    0,           0,           ${blueChannel.toFixed(2)}, 0,`,
      `    0,           0,           0,           1,`,
      `  ]),`,
      `},`,
    ];
  
    return lines.join('\n');
  }, [settings, activeFilter]);

  const filterImages = [
    filter1,
    filter2,
    filter3,
    filter4,
    filter5,
    filter6,
    filter7,
    filter8,
    filter9,
    filter10,
    filter11,
    filter12,
    filter13,
    filter14,
    filter15,
    filter16,
    filter17,
    filter18,
    filter19,
    filter20,
    filter21,
    filter22,
    filter23,
    filter24,
    filter25,
    filter26,
    filter27,
    filter28,
    filter29,
    filter30,
    filter31,
    filter32,
    filter33,
    filter34,
    filter35,
    filter36,
    filter37,
    filter38,
    filter39,
    filter40,
    filter41,
    filter42,
    filter43,
    filter44,
    filter45,
    filter46,
    filter47,
    filter48,
    filter49,
    filter50,
  ]

  const visibleFilters = showAllFilters ? allFilters : allFilters.slice(0, 10);
  const visibleFilterImages = showAllFilters ? filterImages : filterImages.slice(0, 10);


  return (
    <div className={s.container}>
      <div className={s.top_container}>
        <div className={s.settings}>
        
          {filterSettings.map(({ key, label, min, max, step }) => (
            <div key={key} className={s.filter_row}>
              <div className={s.filter_label}>{label}</div>
              <div className={s.filter_control}>
                <Slider
                  value={settings[key as keyof Settings]}
                  onChange={(val) => handleChange(key as keyof Settings, val)}
                  min={min}
                  max={max}
                  step={step}
                />
              </div>
            </div>
          ))}

        {/* <button
          ref={colorButtonRef}
          onClick={() => setShowGradientPicker((v) => !v)}
          className={s.color_button}
        >
        
        </button> */}
        {showGradientPicker && (
          <div className={s.color_picker_container} ref={colorPickerRef}>
           <ColorPicker
                value={gradientsState}
                onChange={setGradientsState}
                className={s.color_picker}
                hideColorGuide={true}
                hideAdvancedSliders={true}
                hidePresets={true}
                hideInputs={true}
                hideInputType={true}
                hideColorTypeBtns={true}
                hideEyeDrop={true}
/>
          </div>
        )}
        </div> 
    
      <div className={s.image_container}>
      <ImageFilter
                filter={activeFilter}
                imageUrl={imageUrl}
                {...settings}
             
                gradient={convertRgbaToHexAInGradient(gradientsState)}
                saveImage={(file) => setSavedImage(file)}
              />
              
      <div className={s.download_button}>
          <button onClick={handleDownload} className={s.button}>Download Image</button>
          <button onClick={handleUploadClick} className={s.button}>Upload New image</button>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button onClick={handleClearSettings} className={s.button}>Clear Settings</button>
        </div>
      </div>
        
      </div>
     
      {/* <CodeSnippet code={codeSnippet} /> */}
   

      <div className={s.bottom_container}>
        <div className={s.filter_list}>
          {visibleFilters.map((filter, index) => (
            <div
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setActiveFilterIndex(index);
              }}
              className={`${s.image_wrapper} ${activeFilter === filter ? s.active_border : ''}`}
            >
              <img src={visibleFilterImages[index]} alt={filter} className={s.filter_image} />
              <div className={s.filter_name}>{filter}</div>
            </div>
         
          ))}

        </div>
        {!showAllFilters && (
          <button
            className={s.link}
            onClick={() => setShowAllFilters(true)}
          >
            See all
          </button>
        )}
      </div>
    </div>
  );
};

export default LibraryFeatures;
