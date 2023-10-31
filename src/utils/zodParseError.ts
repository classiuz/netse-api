import type { ParseOptions, ParseReturn } from '@/types/error'

const zodParseError = <Scheme>({ errors }: ParseOptions<Scheme>): ParseReturn[] => {
  const { issues } = errors
  return issues.map((current) => {
    const type = current.code.toUpperCase()
    const fields = current.path.join(', ')

    if (current.code === 'invalid_type') {
      return {
        type,
        fields,
        message: `Expected ${current.expected} and received ${current.received}.`
      }
    }

    return {
      type,
      fields,
      message: current.message
    }
  })
}

export default zodParseError
