export const getQueryParams = (qs) => {
  qs = qs.split('+').join(' ')

  let params = {}
  let tokens = null
  let re = /[?&]?([^=]+)=([^&]*)/g

  // eslint-disable-next-line
  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2])
  }

  return params
}
