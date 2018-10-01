import React from 'react'

import faqsStyles from '../styles/components/faqs.scss'
import Collapsible from 'react-collapsible'

const faqs = [
  {
    title: '¿Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
    content: 'Maecenas mollis odio lectus, nec condimentum orci ultricies quis. Vivamus fermentum, libero non interdum dignissim, nulla diam aliquam enim, cursus interdum dolor felis quis arcu. Maecenas nec magna commodo, facilisis turpis sit amet, maximus arcu. Vivamus at scelerisque eros.'
  },
  {
    title: '¿Nulla porttitor leo nulla, et facilisis tellus molestie a?',
    content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Vivamus vestibulum nec eros in efficitur.'
  },
  {
    title: '¿Duis pretium augue sed metus venenatis, non semper lorem malesuada?',
    content: 'Donec quis eros sit amet nibh tempus maximus ac vel purus. Curabitur vel erat fringilla, vehicula augue vel, interdum magna. Aliquam erat volutpat. Cras eget accumsan arcu.'
  },
  {
    title: '¿Proin et risus finibus, suscipit arcu sed, luctus odio?',
    content: 'Praesent gravida placerat odio, eu pellentesque nisi cursus sed. In fermentum, purus a finibus pulvinar, purus sem mollis massa, et egestas lorem massa ut turpis. Morbi dui metus, mollis ac leo sit amet, tincidunt sagittis dui. Integer ut purus ex.'
  },
  {
    title: '¿Cras faucibus egestas enim, tincidunt sagittis nisl dictum ut?',
    content: 'Praesent gravida placerat odio, eu pellentesque nisi cursus sed. In fermentum, purus a finibus pulvinar, purus sem mollis massa, et egestas lorem massa ut turpis. Morbi dui metus, mollis ac leo sit amet, tincidunt sagittis dui. Integer ut purus ex.'
  },
  {
    title: '¿Cras faucibus egestas enim, tincidunt sagittis nisl dictum ut. Proin et risus finibus??',
    content: 'Praesent gravida placerat odio, eu pellentesque nisi cursus sed. In fermentum, purus a finibus pulvinar, purus sem mollis massa, et egestas lorem massa ut turpis. Morbi dui metus, mollis ac leo sit amet, tincidunt sagittis dui. Integer ut purus ex.'
  }
].map((feature, index) => {
  feature.key = 'faq-' + index

  return feature
})

class Faqs extends React.Component {

  render () {
    return <div className={faqsStyles.container}>
      <div className={faqsStyles.titleContainer}>
        <h1 className={faqsStyles.title}>Preguntas frecuentes</h1>
        <p className={faqsStyles.subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis odio lectus, nec condimentum orci ultricies quis</p>
      </div>
      <div className={faqsStyles.faqsContainer}>
        {faqs.map((faq) => (
          <div className={faqsStyles.faqCard} key={faq.key}>
            <Collapsible trigger={this.renderFaqTitle(faq.title)} triggerClassName={faqsStyles.tab} triggerOpenedClassName={faqsStyles.tab}>
              <p>{faq.content}</p>
            </Collapsible>
          </div>
        ))
        }
      </div>
    </div>
  }

  renderFaqTitle (title) {
    return <div className={faqsStyles.tab}>
      {title}
    </div>
  }
}

export default Faqs
