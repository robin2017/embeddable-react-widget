import React from 'react'
import { storiesOf } from '@storybook/react'
import Widget from '../src/components/widget'

storiesOf(`Widget`)
  .add(`default`, () => <Widget headerText='调试助手' style={{width:300}} >
    <div>hahah</div>
  </Widget>)
