import { AxiosError } from 'axios'
import axios from 'axios'

interface PydanticErrorDetail {
  loc: (string | number)[]
  msg: string
  type: string
}

interface PydanticErrorResponse {
  detail: PydanticErrorDetail[]
}

interface HttpExceptionResponse {
  detail: string
}

function isPydanticError(data: unknown): data is PydanticErrorResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'detail' in data &&
    Array.isArray((data as PydanticErrorResponse).detail) &&
    (data as PydanticErrorResponse).detail.length > 0 &&
    typeof (data as PydanticErrorResponse).detail[0] === 'object' &&
    'loc' in (data as PydanticErrorResponse).detail[0]
  )
}

function isHttpException(data: unknown): data is HttpExceptionResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'detail' in data &&
    typeof (data as HttpExceptionResponse).detail === 'string'
  )
}

// Converts a Pydantic loc array to a readable field name.
function locToField(loc: (string | number)[]): string {
  const field = loc
    .filter((s) => s !== 'body' && s !== 'query' && s !== 'path')
    .join(' → ')
  return field
    ? field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ')
    : ''
}

export function parseApiError(
  err: unknown,
  fallback = 'Something went wrong. Please try again.'
): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data
    const status = err.response?.status

    if (status === 422 && isPydanticError(data)) {
      const messages = data.detail.map((d) => {
        const field = locToField(d.loc)
        const msg = d.msg.replace(/^Value error,\s*/i, '')
        return field ? `${field}: ${msg}` : msg
      })
      return messages.join('\n')
    }

    if (isHttpException(data)) {
      return data.detail
    }

    if (!err.response) {
      return 'Network error. Please check your connection and try again.'
    }
  }

  if (err instanceof Error) {
    return err.message
  }

  return fallback
}
