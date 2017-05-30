// @flow

import { APP_CONTAINER_CLASS, STATIC_PATH, WDS_PORT } from '../shared/config'
import { isProd } from '../shared/util'

const linkStylesheet = isProd ? `<link rel="stylesheet" href="${STATIC_PATH}/css/main.bundle.css">` : ''

const renderApp = (title: string) =>
`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/manifest.json">
    <title>${title}</title>
    ${linkStylesheet}
  </head>
  <body>
    <div class="${APP_CONTAINER_CLASS}"></div>
    <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/js/bundle.js"></script>
  </body>
</html>
`

export default renderApp
