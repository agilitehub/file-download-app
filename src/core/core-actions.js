import Axios from 'axios'
import Agilite from 'agilite'
import Config from '../utils/config'
import Enums from '../utils/enums'

export const actions = {
  SET_PARAMS: 'SET_PARAMS'
}

export const processTransaction = (dispatch, state, callback) => {
  let config = {}
  let errorMsg = null

  // Validate File Name and Profile Key
  if (!state.urlParams[Enums.VALUES.AGILITE_PROFILE_KEY] && state.urlParams[Enums.VALUES.AGILITE_PROFILE_KEY] !== '') {
    errorMsg = `No Keywords Profile Key found in the '${Enums.VALUES.AGILITE_PROFILE_KEY}' header param. Please revise`
  } else if (!state.urlParams[Enums.VALUES.FILE_NAME] && state.urlParams[Enums.VALUES.FILE_NAME] !== '') {
    errorMsg = `No File Name found in the '${Enums.VALUES.FILE_NAME}' header param. Please revise`
  }

  if (errorMsg) {
    return callback(errorMsg)
  }

  // Get Keyword Profile
  _getKeywordProfile(state, function (resultErr, result) {
    if (resultErr) {
      return callback(resultErr)
    }

    // Setup config
    config = {
      headers: {},
      method: result.method,
      url: result.url,
      responseType: Enums.VALUES.RESPONSE_TYPE_ARRAY_BUFFER
    }

    // Add custom headers
    // eslint-disable-next-line
    for (let x in state.urlParams) {
      config.headers[x] = state.urlParams[x]
    }

    Axios.request(config)
      .then(function (response) {
        // eslint-disable-next-line
        let blob = new Blob([response.data])
        let url = URL.createObjectURL(blob)
        let a = document.createElement('a')

        a.href = url
        a.download = state.urlParams[Enums.VALUES.FILE_NAME]
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()

        return callback(null)
      })
      .catch(function (err) {
        if (err.response) {
          err = JSON.stringify(err.response)
        } else if (err.message) {
          err = err.message
        } else {
          err = JSON.stringify(err)
        }

        callback(err)
      })
  })
}

// PRIVATE FUNCTIONS
const _getKeywordProfile = (state, callback) => {
  let errorMsg = null
  let tmpValues = {}

  const agilite = new Agilite({
    apiServerUrl: Config.apiServerUrl,
    apiKey: Config.apiKey
  })

  agilite.Keywords.getByProfileKey(state.urlParams[Enums.VALUES.AGILITE_PROFILE_KEY], null, Enums.VALUES.JSON)
    .then((response) => {
      if (response.data.data && response.data.data.data) {
        // It's old Keywords APIs. Rebuild values
        // eslint-disable-next-line
        for (let x in response.data.data.data) {
          tmpValues[response.data.data.data[x].label] = response.data.data.data[x].value
        }

        response.data = tmpValues
      }

      errorMsg = _validateKeywordProfile(response.data)
      callback(errorMsg, response.data)
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.data.errorMessage) {
          err = err.response.data.errorMessage
        } else {
          err = err.response.data.messages[0]
        }
      } else if (err.message) {
        err = err.message
      } else {
        err = JSON.stringify(err)
      }

      callback(err)
    })
}

const _validateKeywordProfile = (values) => {
  let result = null

  // Now we can validate
  if (!values[Enums.VALUES.METHOD]) {
    result = `No '${Enums.VALUES.METHOD}' key found in Keyword profile`
  } else if (!values[Enums.VALUES.URL]) {
    result = `No '${Enums.VALUES.URL}' key found in Keyword profile`
  } else if (values[Enums.VALUES.METHOD] === '') {
    result = `No value found for key '${Enums.VALUES.METHOD}' in Keyword profile`
  } else if (values[Enums.VALUES.URL] === '') {
    result = `No value found for key '${Enums.VALUES.URL}' in Keyword profile`
  }

  return result
}
