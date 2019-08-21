import React from 'react'
import { message, Row, Col, Spin } from 'antd'
import agiliteLogo from '../../images/agilite-logo-full-web.png'
import Enums from '../../utils/enums'
import Theme from '../../utils/agilite-theme'

class CoreApp extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isProcessing: true,
      status: Enums.STATUS.PROCESSING
    }

    this.processTransaction = this.processTransaction.bind(this)
  }

  componentDidMount () {
    this.processTransaction()
  }

  processTransaction () {
    let tmpThis = this

    tmpThis.props.processTransaction(tmpThis.props.coreState, function (err) {
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
              <img src={agiliteLogo} style={{ width: 300 }} alt='Agilit-e' />

              {this.state.status === Enums.STATUS.PROCESSING
                ? <h2>Processing Transaction</h2>
                : null}

              {this.state.status === Enums.STATUS.FAILED
                ? <h2 style={{ color: Theme.dangerColor }}>Transaction Failed</h2>
                : null}

              {this.state.status === Enums.STATUS.COMPLETED
                ? <h2 style={{ color: Theme.successColor }}>Transaction Complete</h2>
                : null}

              <Spin spinning={this.state.isProcessing} style={{ marginLeft: 10, marginTop: 50 }} delay={100} size='large' />
            </div>
          </Col>
        </Row>
      </center>
    )
  }
}

export default CoreApp
