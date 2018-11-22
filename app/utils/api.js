// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import { equals } from 'ramda'

const Config = {
  API_URL: "https://"
}

const authenticated = api => {
  api.setHeader('Authorization', 'Bearer ' + window.token)

  return api
}

const create = (baseURL = Config.API_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // 50 second timeout...
    timeout: 10000,
  })

  // Login API
  const loginByEmail = payload => api.post('auth/login', payload)

  return {
    loginByEmail,
  }
}

export default {
  create,
}
