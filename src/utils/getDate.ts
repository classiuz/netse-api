const getDate = () => {
  const rowDate = new Date().toJSON().split('T')[0].split('-')
  return `${rowDate[2]}/${rowDate[1]}/${rowDate[0]}`
}

export default getDate
