import React from 'react'

import satelliteStyles from '../styles/components/internet-satellite.scss'
import dividerStyles from '../styles/components/divider.scss'

const features = [
  {
    title: 'Feature 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis odio lectus, nec condimentum orci ultricies quis. Vivamus fermentum, libero non interdum dignissim, nulla diam aliquam enim, cursus interdum dolor felis quis arcu.'
  },
  {
    title: 'Feature 2',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis odio lectus, nec condimentum orci ultricies quis. Vivamus fermentum, libero non interdum dignissim, nulla diam aliquam enim, cursus interdum dolor felis quis arcu.'
  },
  {
    title: 'Feature 3',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis odio lectus, nec condimentum orci ultricies quis. Vivamus fermentum, libero non interdum dignissim, nulla diam aliquam enim, cursus interdum dolor felis quis arcu.'
  },
  {
    title: 'Feature 4',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis odio lectus, nec condimentum orci ultricies quis. Vivamus fermentum, libero non interdum dignissim, nulla diam aliquam enim, cursus interdum dolor felis quis arcu.'
  }
].map((feature) => ({...feature, key: feature.title}))

const InternetSatellite = () => (
  <div className={satelliteStyles.container}>
    <div className={satelliteStyles.titleContainer}>
      <h1 className={satelliteStyles.title}>¿Por qué elegir internet por satélite?</h1>
      <p className={satelliteStyles.subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis odio lectus, nec condimentum orci ultricies quis</p>
    </div>
    <div className={satelliteStyles.mainFeaturueContainer}>
      <div className={satelliteStyles.imageBig}></div>
      <p className={satelliteStyles.imageBigText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis odio lectus, nec condimentum orci ultricies quis. Vivamus fermentum, libero non interdum dignissim, nulla diam aliquam enim, cursus interdum dolor felis quis arcu. Maecenas nec magna commodo, facilisis turpis sit amet, maximus arcu. Vivamus at scelerisque eros. Vestibulum venenatis dui eu mauris tincidunt, sit amet egestas nibh porta. Fusce rutrum nibh eu eleifend accumsan. Aenean hendrerit mollis efficitur.</p>
    </div>
    <div className={`${dividerStyles.horizontalDivider} ${satelliteStyles.divider}`}></div>
    <div className={satelliteStyles.featuresContainer}>
      {features.map(({ title, content, key }) => (
          <div key={key} className={satelliteStyles.feature}>
            <div className={satelliteStyles.imageSmall}></div>
            <p className={satelliteStyles.featureTitleSmall}>{title}</p>
            <p className={satelliteStyles.imageSmallText}>{content}</p>
          </div>
        ))}
    </div>
  </div>
)

export default InternetSatellite
