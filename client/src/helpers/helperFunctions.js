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
