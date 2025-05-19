import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
    console.error('Invalid color') // 유효하지 않은 Hex 코드
    return '#ffffff' // 기본적으로 흰색 반환
  }

  const [h, s, l] = rgbToHsl(...rgbBase)
  const newL = Math.max(0, Math.min(100, l + amount)) // 명도 조절 (0 ~ 100 범위 유지)
  const [newRgbR, newRgbG, newRgbB] = hslToRgb(h, s, newL)

  return rgbToHex(newRgbR, newRgbG, newRgbB)
}

export function getRandomContrastingColor(fontHex: string): string {
  // Hex 코드를 RGB 값으로 변환하는 함수
  function hexToRgb(hex: string): [number, number, number] | null {
    const hexValue = hex.startsWith('#') ? hex.slice(1) : hex
    if (!/^[0-9a-fA-F]{6}$/.test(hexValue)) {
      return null
    }
    const r = parseInt(hexValue.substring(0, 2), 16)
    const g = parseInt(hexValue.substring(2, 4), 16)
    const b = parseInt(hexValue.substring(4, 6), 16)
    return [r, g, b]
  }

  // RGB 값에서 밝기를 계산하는 함수 (YIQ 공식 사용)
  function getBrightness(rgb: [number, number, number]): number {
    return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
  }

  // 랜덤 Hex 코드를 생성하는 함수
  function getRandomHex(): string {
    return (
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    )
  }

  const rgb = hexToRgb(fontHex)
  if (!rgb) {
    console.error('Invalid color') // 유효하지 않은 Hex 코드
    return '#ffffff' // 기본적으로 흰색 반환
  }

  const brightness = getBrightness(rgb)
  let backgroundHex: string

  // 폰트 색상이 밝으면 어두운 배경색을, 어두우면 밝은 배경색을 생성
  if (brightness > 128) {
    // 밝은 폰트색 - 어두운 배경색 생성 (채도가 높은 색 위주)
    const baseColor = Math.floor(Math.random() * 128) // 0 ~ 127 사이의 값
    const r = Math.floor(Math.random() * (256 - baseColor))
    const g = Math.floor(Math.random() * (256 - baseColor))
    const b = Math.floor(Math.random() * (256 - baseColor))
    backgroundHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  } else {
    // 어두운 폰트색 - 밝은 배경색 생성 (채도가 높은 색 위주)
    const baseColor = 128 + Math.floor(Math.random() * 128) // 128 ~ 255 사이의 값
    const r = baseColor + Math.floor(Math.random() * (256 - baseColor))
    const g = baseColor + Math.floor(Math.random() * (256 - baseColor))
    const b = baseColor + Math.floor(Math.random() * (256 - baseColor))
    backgroundHex = `#${Math.min(r, 255).toString(16).padStart(2, '0')}${Math.min(g, 255).toString(16).padStart(2, '0')}${Math.min(b, 255).toString(16).padStart(2, '0')}`
  }

  return backgroundHex
}
