import React, { memo } from 'react'
import { message, Row, Col, Spin } from 'antd'
import { getQueryParams } from 'agilite-utils'

import CoreMemoryStore from '../core/core-memory-store'
import Logo from '../core/resources/agilite-logo-full-web.png'
import Enums from './resources/enums'
import { processTransaction } from './utils/utilities'

const theme = CoreMemoryStore.theme
class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isProcessing: true,
      status: Enums.STATUS.PROCESSING,
      queryParams: null
    }
  }

  componentDidMount () {
    // Process URL Parameters
    const tmpThis = this
    const url = new URL(window.location.href)

    processTransaction(getQueryParams(url.search), (err) => {
      if (err) {
        message.error(err, 10)

        tmpThis.setState({
          isProcessing: false,
          status: Enums.STATUS.FAILED
        })
      } else {
        tmpThis.setState({
          isProcessing: false,
          status: Enums.STATUS.COMPLETED
        })
      }
    })
  }

  render () {
    return (
      <center style={{ marginTop: 100 }}>
        <Row gutter={24} type='flex' justify='center'>
          <Col xs={24} sm={24} md={24} lg={24}>
            <div>
              <img src={Logo} style={{ width: 300 }} alt='Agilit-e' />

              {this.state.status === Enums.STATUS.PROCESSING
                ? <h2>Processing Transaction</h2>
                : null}

              {this.state.status === Enums.STATUS.FAILED
                ? <h2 style={{ color: theme.dangerColor }}>Transaction Failed</h2>
                : null}

              {this.state.status === Enums.STATUS.COMPLETED
                ? <h2 style={{ color: theme.successColor }}>Transaction Complete</h2>
                : null}

              <Spin spinning={this.state.isProcessing} style={{ marginLeft: 10, marginTop: 50 }} delay={100} size='large' />
            </div>
          </Col>
        </Row>
      </center>
    )
  }
}

const RootContent = memo(App)
export default RootContent
