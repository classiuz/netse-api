const paramsJsonParse = (params: object) => {
  return Object.assign({}, ...Object.entries(params).map(([key, value]) => ({
    [key]: typeof value === 'object' ? JSON.stringify(value) : value
  })))
}

export default paramsJsonParse
