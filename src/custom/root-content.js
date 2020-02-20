import React, { memo, useState, useEffect } from 'react'
import { message, Row, Col, Spin } from 'antd'
import { getQueryParams } from 'agilite-utils'

import CoreMemoryStore from '../core/core-memory-store'
import Logo from '../core/resources/agilite-logo-full-web.png'
import Enums from './resources/enums'
import { processTransaction } from './utils/utilities'

const theme = CoreMemoryStore.theme

const App = () => {
  const [isProcessing, setIsProcessing] = useState(true)
  const [status, setStatus] = useState(Enums.STATUS.PROCESSING)

  useEffect(() => {
    // Process URL Parameters
    const url = new URL(window.location.href)

    processTransaction(getQueryParams(url.search), (err) => {
      if (err) {
        message.error(err, 10)

        setIsProcessing(false)
        setStatus(Enums.STATUS.FAILED)
      } else {
        setIsProcessing(false)
        setStatus(Enums.STATUS.COMPLETED)
      }
    })
  }, [])

  return (
    <center style={{ marginTop: 100 }}>
      <Row gutter={24} type='flex' justify='center'>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div>
            <img src={Logo} style={{ width: 300 }} alt='Agilit-e' />

            {status === Enums.STATUS.PROCESSING
              ? <h2>Processing Transaction</h2>
              : null}

            {status === Enums.STATUS.FAILED
              ? <h2 style={{ color: theme.dangerColor }}>Transaction Failed</h2>
              : null}

            {status === Enums.STATUS.COMPLETED
              ? <h2 style={{ color: theme.successColor }}>Transaction Complete</h2>
              : null}

            <Spin spinning={isProcessing} style={{ marginLeft: 10, marginTop: 50 }} delay={100} size='large' />
          </div>
        </Col>
      </Row>
    </center>
  )
}

const RootContent = memo(App)
export default RootContent
