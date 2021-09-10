function jsonResult(status, body) {
  return function(res) {
    console.log('Status:', status)
    console.log('Response:', body)
    res.status(status).json(body)
  }
}

exports.ok = body => jsonResult(200, body)

exports.created = body => jsonResult(201, body)

exports.badRequest = error => jsonResult(400, { error })

exports.unauthorized = (error) => jsonResult(401, { error: error || 'User is not authenticated' })

exports.forbidden = (error) => jsonResult(403, { error: error || 'User is not authorized to perform this action' })

exports.notFound = error => jsonResult(404, { error })

exports.failedDependency = (error) => jsonResult(424, {error: error || "Unable to complete the request this request depended on"})

exports.internalServerError = error => jsonResult(500, { error })

exports.notImplemented = () => jsonResult(501, { error: 'Not implemented' })