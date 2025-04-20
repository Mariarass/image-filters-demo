import React from 'react';
import s from './GuideContainer.module.css';
import CodeSnippet from '../code-snippet/CodeSnippet.tsx';
import ImageFilter from 'react-image-filters-tool';

const filterList: string[] = [
    'cozySnow',
    'retro',
    'pastel',
    'vintage',
    'vintageFilm',
    'arcticInversion',
    'moody',
    'grayscale',
];

const GuideContainer = () => {
    const defaultExample = `
<ImageFilter 
  imageUrl="https://simpleecreate.com/images/rCfBiP7oGHVJOWMPHhY365ZGlWt3bjQGLXQq38bP.png"
  filter="vintageFilm" 
/>`;

    const advancedExample = `
<ImageFilter
  imageUrl="https://simpleecreate.com/images/rCfBiP7oGHVJOWMPHhY365ZGlWt3bjQGLXQq38bP.png"
  styles={{ borderRadius: '5px' }}
  filter="vintageFilm"
  contrast={100}
  brightness={100}
  saturation={100}
  hueRotate={0}
  redChannel={1}
  greenChannel={1}
  blueChannel={1}
  grain={0}
  vignette={0}
  shadows={0}
/>`;

    const previewExample = `
const filterOptions = [
  'cozySnow',
  'retro',
  'pastel',
  'vintage',
  'vintageFilm',
  'goldenTint',
  'lavenderHaze',
];

{filterOptions.map((filter) => (
  <ImageFilter 
    key={filter}
    imageUrl="https://simpleecreate.com/images/rCfBiP7oGHVJOWMPHhY365ZGlWt3bjQGLXQq38bP.png"
    filter={filter}
    styles={{ borderRadius: '5px', width: '100px', height: '100px' }}
    preview={true}
  />
))}`;

    return (
        <div className={s.container}>
            <div className={s.block_container}>
                <p className={s.header}>INSTALL</p>
                <CodeSnippet code={'npm install react-filter-tool'} />
            </div>

            <div className={s.block_container}>
                <p className={s.header}>USE DEFAULT FILTER <span>(over 100 available)</span></p>
                <CodeSnippet code={defaultExample} />
            </div>

            <div className={s.block_container}>
                <p className={s.header}>ADVANCED SETTINGS</p>
                <p className={s.text}>
                    You can customize the filter with additional parameters or even use the editor without a predefined filter.
                </p>
                <CodeSnippet code={advancedExample} />
            </div>

            <div className={s.block_container}>
                <p className={s.header}>FILTER PREVIEWS <span>(default filters only)</span></p>
                <p className={s.text}>
                    You can preview default filters in small thumbnails. This helps users choose the best one.
                </p>
                <div className={s.list}>
                    {filterList.map((filter) => (
                        <ImageFilter
                            key={filter}
                            imageUrl="https://simpleecreate.com/images/rCfBiP7oGHVJOWMPHhY365ZGlWt3bjQGLXQq38bP.png"
                            filter={filter}
                            styles={{ borderRadius: '5px', width: '100px', height: '100px' }}
                            preview={true}
                        />
                    ))}
                </div>
                <CodeSnippet code={previewExample} />
            </div>
        </div>
    );
};

export default GuideContainer;
