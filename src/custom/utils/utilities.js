import Axios from 'agilite-utils/axios'
import { v1 as UUID } from 'agilite-utils/uuid'
import Agilite from 'agilite'
import Enums from '../resources/enums'

export const processTransaction = (queryParams, callback) => {
  const config = {
    headers: {},
    method: null,
    url: null,
    data: {},
    responseType: Enums.VALUES.RESPONSE_TYPE_ARRAY_BUFFER
  }

  let errorMsg = null

  // Validate queryParams for webhookurl
  if (!queryParams || !queryParams[Enums.VALUES.WEBHOOKURL]) {
    errorMsg = `No Webhook URL found in the '${Enums.VALUES.WEBHOOKURL}' query param. Please revise`
    return callback(errorMsg)
  }

  config.url = queryParams[Enums.VALUES.WEBHOOKURL]

  if (queryParams[Enums.VALUES.AGILITETYPE]) {
    if (!queryParams[Enums.VALUES.API_KEY]) {
      errorMsg = `The '${Enums.VALUES.API_KEY}' query parameter is required when an '${Enums.VALUES.AGILITETYPE}' query parameter is present`
      return callback(errorMsg)
    }

    const agilite = new Agilite({
      apiServerUrl: queryParams[Enums.VALUES.WEBHOOKURL],
      apiKey: queryParams[Enums.VALUES.API_KEY]
    })

    switch (queryParams[Enums.VALUES.AGILITETYPE]) {
      case Enums.VALUES.GETFILE.toLowerCase():
        // Get File
        if (!queryParams[Enums.VALUES.RECORD_ID]) {
          errorMsg = `No Record Id found in the '${Enums.VALUES.RECORD_ID}' query param. Please revise`
          return callback(errorMsg)
        }

        agilite.Files.getFile(queryParams[Enums.VALUES.RECORD_ID], Enums.VALUES.RESPONSE_TYPE_ARRAY_BUFFER)
          .then(response => {
            // eslint-disable-next-line
            const blob = new Blob([response.data])
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')

            a.href = url
            a.download = queryParams[Enums.VALUES.FILE_NAME] ? queryParams[Enums.VALUES.FILE_NAME] : UUID()
            a.style.display = 'none'
            document.body.appendChild(a)
            a.click()

            callback()
          })
          .catch(err => {
            if (err.response) {
              err = err.response.data.errorMessage
            } else {
              err = err.message || err.stack || err
            }

            callback(err)
          })

        break
      case Enums.VALUES.EXECUTECONNECTOR.toLowerCase():
        // Execute Connector
        if (!queryParams[Enums.VALUES.PROFILE_KEY]) {
          errorMsg = `No Profile Key found in the '${Enums.VALUES.PROFILE_KEY}' query param. Please revise`
        } else if (!queryParams[Enums.VALUES.ROUTE_KEY]) {
          errorMsg = `No Route Key found in the '${Enums.VALUES.ROUTE_KEY}' query param. Please revise`
        }

        if (errorMsg) return callback(errorMsg)

        agilite.Connectors.execute(queryParams[Enums.VALUES.PROFILE_KEY], queryParams[Enums.VALUES.ROUTE_KEY])
          .then(response => {
            // eslint-disable-next-line
            const blob = new Blob([response.data])
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')

            a.href = url
            a.download = queryParams[Enums.VALUES.FILE_NAME] ? queryParams[Enums.VALUES.FILE_NAME] : UUID()
            a.style.display = 'none'
            document.body.appendChild(a)
            a.click()

            callback()
          })
          .catch(err => {
            if (err.response) {
              err = err.response.data.errorMessage
            } else {
              err = err.message || err.stack || err
            }

            callback(err)
          })

        break
      default:
        errorMsg = `'${Enums.VALUES.AGILITETYPE}' query parameter must have a value of '${Enums.VALUES.GETFILE}' or '${Enums.VALUES.EXECUTECONNECTOR}'`
        callback(errorMsg)
    }
  } else {
    if (queryParams[Enums.VALUES.METHOD]) {
      config.method = queryParams[Enums.VALUES.METHOD]
    } else {
      config.method = Enums.VALUES.METHOD_GET
    }

    Axios.request(config)
      .then((response) => {
        // eslint-disable-next-line
        const blob = new Blob([response.data])
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')

        a.href = url
        a.download = queryParams[Enums.VALUES.FILE_NAME] ? queryParams[Enums.VALUES.FILE_NAME] : UUID()
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()

        callback()
      })
      .catch((err) => {
        if (err.response) {
          err = err.response.data
        } else {
          err = err.message || JSON.stringify(err)
        }

        callback(err)
      })
  }
}
