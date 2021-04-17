import { StatusCode as c } from "./codes"
import { ServiceError } from "./errors"

export default AppService => async (req, res) => {
  let response
  let statusCode
  let headers

  const Service = AppService.getCurrentService(req.url)

  if (Service) {
    // noinspection JSValidateTypes
    const service = new Service(req, res)

    response = await service.execute()

    statusCode = service.response.statusCode
    headers = service.response.headers
  } else {
    response = new ServiceError('Service not found')
    statusCode = c.NOT_FOUND
  }

  res.writeHead(statusCode, headers)
  res.end(response && JSON.stringify(response))
}