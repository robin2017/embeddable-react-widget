import React from 'react'
import { storiesOf } from '@storybook/react'
import Widget from '../src/components/widget'

storiesOf(`Widget`)
  .add(`default`, () => <Widget style={{width:300,height:500}}  title="调试助手" >
    <div>hahahhah</div>
  </Widget>)
