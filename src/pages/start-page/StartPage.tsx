import React, {FC, useState} from 'react';
import logo from '../../assets/image/logo.svg'
import s from './StartPage.module.css'
import LaptopContainer from "./widgets/laptop-container/LaptopContainer.tsx";
import LibraryFeatures from "./widgets/library-features/LibraryFaetures.tsx";
import GuideContainer from "./widgets/guide-container/GuideContainer.tsx";


const StartPage:FC = () => {

    return (

          <div className={s.container}>
              <div className={s.nav_container}>
                  <img src={logo} className={s.logo}/>
              </div>
              <div className={s.header}>
                  USE 100 DEFAULT FILTERS<br/> OR CREATE YUR OWN & Edit Your Photos
              </div>
              <LaptopContainer>
                  <LibraryFeatures/>
              </LaptopContainer>
             <GuideContainer/>

          </div>
    );
};

export default StartPage;