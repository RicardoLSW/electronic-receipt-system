import html2canvas from 'html2canvas'
import JSPDF from 'jspdf'

export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome() {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader(callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    (event) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE() {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

/**
 * 判断对象是否为空
 * @param {*} obj
 */
export function isEmpty(obj) {
  return (
    obj === undefined ||
    obj === null ||
    (typeof obj === 'string' && obj.trim().length === 0) ||
    JSON.stringify(obj) === '{}'
  )
}

/**
 * html转canvas
 * @param formEleId 父元素id
 * @param toEleId 要转换的子元素id
 * @param multiple 缩放倍数
 */
export function toCanvas(formEleId, toEleId, multiple) {
  const targetDom = document.querySelector(`#${formEleId}`)
  const copyDom = targetDom.cloneNode(true)
  copyDom.style.width = targetDom.scrollWidth + 'px'
  copyDom.style.height = targetDom.scrollHeight + 'px'
  document.body.appendChild(copyDom)
  html2canvas(targetDom, {
    allowTaint: false,
    useCORS: true,
    height: targetDom.scrollHeight,
    width: targetDom.scrollWidth,
  }).then((canvas) => {
    canvas.setAttribute('id', toEleId)
    copyDom.parentNode.removeChild(copyDom)
    canvas.style.width = parseFloat(canvas.style.width) * multiple + 'px'
    canvas.style.height = parseFloat(canvas.style.height) * multiple + 'px'
    document.querySelector(`#${formEleId}`).removeChild(document.querySelector(`#${toEleId}`))
    document.querySelector(`#${formEleId}`).appendChild(canvas)
  })
}

/**
 * canvas转pdf导出
 * @param eleId canvas元素id
 * @param pdfName pdf文件名字
 */
export function exportPDF(eleId, pdfName) {
  const canvas = document.querySelector(`#${eleId}`)
  // 另存为pdf格式
  const pageData = canvas.toDataURL('image/jpeg', 1.0)
  const contentWidth = canvas.width
  const contentHeight = canvas.height
  // 一页pdf显示html页面生成的canvas高度;
  const pageHeight = (contentWidth / 592.28) * 841.89
  // 未生成pdf的html页面高度
  let leftHeight = contentHeight
  // 页面偏移
  let position = 0
  // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
  const imgWidth = 595.28
  const imgHeight = (592.28 / contentWidth) * contentHeight
  const pdf = new JSPDF('', 'pt', 'a4')
  // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
  // 当内容未超过pdf一页显示的范围，无需分页
  if (leftHeight < pageHeight) {
    pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
  } else {
    while (leftHeight > 0) {
      pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
      leftHeight -= pageHeight
      position -= 841.89
      // 避免添加空白页
      if (leftHeight > 0) {
        pdf.addPage()
      }
    }
  }
  pdf.save(`${pdfName}.pdf`)
}
