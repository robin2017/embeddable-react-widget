import React from 'react'
import { storiesOf } from '@storybook/react'
import Widget from '../src/components/widget'

storiesOf(`Widget`)
  .add(`default`, () => <Widget headerText='调试助手' style={{width:300}} initBottom={30} initRight={30} >
    <div>hahah</div>
  </Widget>)
