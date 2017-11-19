/* @flow */

export const roundUpMaxSurfHeight = (maxSurfHeight: number) => Math.ceil(maxSurfHeight)

export const setCookie = (cname: string, cvalue: any, exdays: number = 365) => {
  const d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  const expires = `expires=${d.toUTCString()}`
  document.cookie = `${cname}=${cvalue};${expires};path=/`
}

export const getCookie = (cname: string) => {
  const name = `${cname}=`
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export const convertMetersToFeet = (meters: number) => meters * 3.28084

export const roundToNearestTenth = (decimal: number) => Math.round(decimal * 10) / 10

export const convertCompassDegreesToCardinal = (deg: number) => {
  if (deg > 11.25 && deg < 33.75) {
    return 'NNE'
  } else if (deg > 33.75 && deg < 56.25) {
    return 'ENE'
  } else if (deg > 56.25 && deg < 78.75) {
    return 'E'
  } else if (deg > 78.75 && deg < 101.25) {
    return 'ESE'
  } else if (deg > 101.25 && deg < 123.75) {
    return 'ESE'
  } else if (deg > 123.75 && deg < 146.25) {
    return 'SE'
  } else if (deg > 146.25 && deg < 168.75) {
    return 'SSE'
  } else if (deg > 168.75 && deg < 191.25) {
    return 'S'
  } else if (deg > 191.25 && deg < 213.75) {
    return 'SSW'
  } else if (deg > 213.75 && deg < 236.25) {
    return 'SW'
  } else if (deg > 236.25 && deg < 258.75) {
    return 'WSW'
  } else if (deg > 258.75 && deg < 281.25) {
    return 'W'
  } else if (deg > 281.25 && deg < 303.75) {
    return 'WNW'
  } else if (deg > 303.75 && deg < 326.25) {
    return 'NW'
  } else if (deg > 326.25 && deg < 348.75) {
    return 'NNW'
  }
  return 'N'
}

export const setVisitedCookie = () => {
  // Set a cookie if the user clicks the close button
  const hasVisited = getCookie('has-visited')
  if (hasVisited !== 'true') {
    setCookie('has-visited', 'true', 365)
  }
}

// Function for taking dimensions and return a path for border radius rectangles
export const roundedRect = (
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  tl: boolean,
  tr: boolean,
  bl: boolean,
  br: boolean
) => {
  let retval
  retval = `M${x + r},${y}`
  retval += `h${w - 2 * r}`
  if (tr) {
    retval += `a${r},${r} 0 0 1 ${r},${r}`
  } else {
    retval += `h${r}`
    retval += `v${r}`
  }
  retval += `v${h - 2 * r}`
  if (br) {
    retval += `a${r},${r} 0 0 1 ${-r},${r}`
  } else {
    retval += `v${r}`
    retval += `h${-r}`
  }
  retval += `h${2 * r - w}`
  if (bl) {
    retval += `a${r},${r} 0 0 1 ${-r},${-r}`
  } else {
    retval += `h${-r}`
    retval += `v${-r}`
  }
  retval += `v${2 * r - h}`
  if (tl) {
    retval += `a${r},${r} 0 0 1 ${r},${-r}`
  } else {
    retval += `v${-r}`
    retval += `h${r}`
  }
  retval += 'z'
  return retval
}
