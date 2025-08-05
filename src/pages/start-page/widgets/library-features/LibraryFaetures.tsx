import React, { useMemo, useRef, useState, useEffect } from 'react';
import ImageFilter from 'react-image-filters-tool';
import s from './LibraryFeatures.module.css';
import Slider from '../../../../shared/ui/input/Slider.tsx';
import ColorPicker from 'react-best-gradient-color-picker'
import { convertRgbaToHexAInGradient } from '../../../../shared/helpers/convertRgbToHex';

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
  'none','tokyo','malibu', 'alpine', 'grave','amazon','roseTint', 'sunsetDream', 

];
const LibraryFeatures = () => {
  const [imageUrl, setImageUrl] = useState('https://raw.githubusercontent.com/Mariarass/image-filters-demo/main/public/image.jpg');
  const [activeFilter, setActiveFilter] = useState('none');
  const [savedImage, setSavedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    link.download = savedImage.name || 'filtered-image.png';
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

        <button
          ref={colorButtonRef}
          onClick={() => setShowGradientPicker((v) => !v)}
          className={s.color_button}
        >
        
        </button>
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
          {allFilters.map((filter) => (
            <div
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`${s.image_wrapper} ${activeFilter === filter ? s.active_border : ''}`}
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
             <button  className={s.link}>See More</button>
        </div>
      </div>
    </div>
  );
};

export default LibraryFeatures;
