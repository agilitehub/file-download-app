import Axios from 'agilite-utils/axios'
import Agilite from 'agilite'
import { v1 as UUID } from 'agilite-utils/uuid'

import Enums from './enums'

export const processTransaction = (queryParams) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const config = {
          headers: {},
          method: null,
          url: null,
          data: {},
          responseType: Enums.VALUES.RESPONSE_TYPE_ARRAY_BUFFER
        }
        let response = null
        let errMsg = null

        // Validate queryParams for webhookurl
        if (!queryParams || !queryParams[Enums.VALUES.WEBHOOKURL]) {
          errMsg = `No Webhook URL found in the '${Enums.VALUES.WEBHOOKURL}' query param. Please revise`
          return reject(errMsg)
        }

        config.url = queryParams[Enums.VALUES.WEBHOOKURL]

        if (queryParams[Enums.VALUES.AGILITETYPE]) {
          if (!queryParams[Enums.VALUES.API_KEY]) {
            errMsg = `The '${Enums.VALUES.API_KEY}' query parameter is required when an '${Enums.VALUES.AGILITETYPE}' query parameter is present`
            return reject(errMsg)
          }

          const agilite = new Agilite({
            apiServerUrl: queryParams[Enums.VALUES.WEBHOOKURL],
            apiKey: queryParams[Enums.VALUES.API_KEY]
          })

          switch (queryParams[Enums.VALUES.AGILITETYPE]) {
            case Enums.VALUES.GETFILE.toLowerCase():
              // Get File
              if (!queryParams[Enums.VALUES.RECORD_ID]) {
                errMsg = `No Record Id found in the '${Enums.VALUES.RECORD_ID}' query param. Please revise`
                return reject(errMsg)
              }

              response = await agilite.Files.getFile(queryParams[Enums.VALUES.RECORD_ID], Enums.VALUES.RESPONSE_TYPE_ARRAY_BUFFER)
              setupBlob(queryParams, response)
              resolve()

              break
            case Enums.VALUES.EXECUTECONNECTOR.toLowerCase():
              // Execute Connector
              if (!queryParams[Enums.VALUES.PROFILE_KEY]) {
                errMsg = `No Profile Key found in the '${Enums.VALUES.PROFILE_KEY}' query param. Please revise`
              } else if (!queryParams[Enums.VALUES.ROUTE_KEY]) {
                errMsg = `No Route Key found in the '${Enums.VALUES.ROUTE_KEY}' query param. Please revise`
              }

              if (errMsg) return reject(errMsg)

              response = await agilite.Connectors.execute(queryParams[Enums.VALUES.PROFILE_KEY], queryParams[Enums.VALUES.ROUTE_KEY])
              setupBlob(queryParams, response)
              resolve()

              break
            default:
              errMsg = `'${Enums.VALUES.AGILITETYPE}' query parameter must have a value of '${Enums.VALUES.GETFILE}' or '${Enums.VALUES.EXECUTECONNECTOR}'`
              reject(errMsg)
          }
        } else {
          if (queryParams[Enums.VALUES.METHOD]) {
            config.method = queryParams[Enums.VALUES.METHOD]
          } else {
            config.method = Enums.VALUES.METHOD_GET
          }

          config.params = queryParams

          response = await Axios.request(config)
          setupBlob(queryParams, response)
          resolve()
        }
      } catch (e) {
        let errMsg = ''

        if (e.response?.data.errorMessage) {
          errMsg = e.response.data.errorMessage
        } else if (e.message) {
          errMsg = e.message
        } else {
          errMsg = Enums.MESSAGES.UNKNOWN_ERROR
        }

        reject(errMsg)
      }
    })()
  })
}

const setupBlob = (queryParams, response) => {
  try {
    // eslint-disable-next-line
    const blob = new Blob([response.data])
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')

    a.href = url
    a.download = queryParams[Enums.VALUES.FILE_NAME] ? queryParams[Enums.VALUES.FILE_NAME] : UUID()
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
  } catch (e) {
    throw new Error(e)
  }
}
