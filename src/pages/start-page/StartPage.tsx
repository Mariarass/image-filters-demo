import React, {FC, useState} from 'react';
import s from './StartPage.module.css'
import LaptopContainer from "./widgets/laptop-container/LaptopContainer.tsx";
import LibraryFeatures from "./widgets/library-features/LibraryFaetures.tsx";
import GuideContainer from "./widgets/guide-container/GuideContainer.tsx";


const StartPage:FC = () => {

    return (

          <div className={s.container}>
              <div className={s.header}>
              Filters That Fit Your Vision for<br/>
              Choose from 100+ or Create Custom Looks 
              </div>
              <LaptopContainer>
                  <LibraryFeatures/>
              </LaptopContainer>
             <GuideContainer/>

          </div>
    );
};

export default StartPage;