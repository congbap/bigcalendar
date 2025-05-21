export function adjustShade(hex: string, shade: number): string {
  // 입력값 유효성 검사
  if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex) || shade < 0 || shade > 1000) {
    // console.error('Invalid color') // 유효하지 않은 Hex 코드
    return '#ffffff' // 기본적으로 흰색 반환
  }

  // 헥스 코드를 RGB로 변환
  const hexToRgb = (hex: string): [number, number, number] => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0, 0]
  }

  const [r, g, b] = hexToRgb(hex)

  // RGB를 HSL로 변환
  const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h: number = 0
    let s: number = 0
    const l = (max + min) / 2

    if (max === min) {
      h = s = 0 // achromatic
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return [h * 360, s * 100, l * 100]
  }

  const [h, s, l] = rgbToHsl(r, g, b)

  // shade 값에 따라 Lightness 조절
  let newL: number
  if (shade <= 500) {
    newL = l + ((100 - l) * (500 - shade)) / 500
  } else {
    newL = (l * (500 - (shade - 500))) / 500
  }
  newL = Math.max(0, Math.min(100, newL)) // Lightness 값 범위 제한

  // HSL을 RGB로 변환
  const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
    s /= 100
    l /= 100
    const k = (n: number) => (n + h / 30) % 12
    const a = s * Math.min(l, 1 - l)
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
    return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))]
  }

  const [newR, newG, newB] = hslToRgb(h, s, newL)

  // RGB를 헥스 코드로 변환
  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
  }

  return rgbToHex(newR, newG, newB)
}

export function adjustShade3(baseColor: string, shade: number): string | null {
  const r = parseInt(baseColor.slice(1, 3), 16)
  const g = parseInt(baseColor.slice(3, 5), 16)
  const b = parseInt(baseColor.slice(5, 7), 16)

  const normalizedShade = shade / 1000

  let adjustedR: number, adjustedG: number, adjustedB: number

  if (normalizedShade === 0.5) {
    adjustedR = r
    adjustedG = g
    adjustedB = b
  } else if (normalizedShade < 0.5) {
    const whiteRatio = normalizedShade * 2
    adjustedR = Math.round(r + (255 - r) * whiteRatio)
    adjustedG = Math.round(g + (255 - g) * whiteRatio)
    adjustedB = Math.round(b + (255 - b) * whiteRatio)
  } else {
    const blackRatio = (normalizedShade - 0.5) * 2
    adjustedR = Math.round(r * (1 - blackRatio))
    adjustedG = Math.round(g * (1 - blackRatio))
    adjustedB = Math.round(b * (1 - blackRatio))
  }

  const toHex = (c: number): string => {
    const hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(adjustedR)}${toHex(adjustedG)}${toHex(adjustedB)}`
}

export function adjustShade2(baseColor: string, shade: number): string | null {
  const normalizedOpacity = shade / 1000
  const baseR = parseInt(baseColor.slice(1, 3), 16)
  const baseG = parseInt(baseColor.slice(3, 5), 16)
  const baseB = parseInt(baseColor.slice(5, 7), 16)

  let r: number, g: number, b: number

  if (normalizedOpacity === 0.5) {
    r = baseR
    g = baseG
    b = baseB
  } else if (normalizedOpacity < 0.5) {
    const whiteRatio = normalizedOpacity * 2
    r = Math.round(baseR + (255 - baseR) * whiteRatio)
    g = Math.round(baseG + (255 - baseG) * whiteRatio)
    b = Math.round(baseB + (255 - baseB) * whiteRatio)
  } else {
    const blackRatio = (normalizedOpacity - 0.5) * 2
    r = Math.round(baseR * (1 - blackRatio))
    g = Math.round(baseG * (1 - blackRatio))
    b = Math.round(baseB * (1 - blackRatio))
  }

  const toHex = (c: number): string => {
    const hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function adjustBrightness(baseColor: string, amount: number): string {
  // Hex 코드를 RGB로 변환하는 함수
  function hexToRgb(hex: string): [number, number, number] | null {
    const hexValue = hex.replace(/^#/, '')
    if (!/^[0-9A-Fa-f]{6}$/.test(hexValue)) {
      return null
    }
    const r = parseInt(hexValue.substring(0, 2), 16)
    const g = parseInt(hexValue.substring(2, 4), 16)
    const b = parseInt(hexValue.substring(4, 6), 16)
    return [r, g, b]
  }

  // RGB를 HSL로 변환하는 함수
  function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h: number = 0
    let s: number = 0
    const l = (max + min) / 2

    if (max === min) {
      h = s = 0 // achromatic
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return [h * 360, s * 100, l * 100]
  }

  // HSL을 RGB로 변환하는 함수
  function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    s /= 100
    l /= 100

    const k = (n: number) => (n + h / 30) % 12
    const a = s * Math.min(l, 1 - l)
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))

    return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)]
  }

  // RGB를 Hex 코드로 변환하는 함수
  function rgbToHex(r: number, g: number, b: number): string {
    return `#${[r, g, b]
      .map((x) => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
      })
      .join('')}`
  }

  const rgbBase = hexToRgb(baseColor)
  if (!rgbBase) {
    // console.error('Invalid color') // 유효하지 않은 Hex 코드
    return '#ffffff' // 기본적으로 흰색 반환
  }

  const [h, s, l] = rgbToHsl(...rgbBase)
  const newL = Math.max(0, Math.min(100, l + amount)) // 명도 조절 (0 ~ 100 범위 유지)
  const [newRgbR, newRgbG, newRgbB] = hslToRgb(h, s, newL)

  return rgbToHex(newRgbR, newRgbG, newRgbB)
}
