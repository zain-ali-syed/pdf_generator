import React from 'react'
const download = require('downloadjs')
const { b64 } = require('./blob.js')
const printJS = require('print-js')

const data = 'data:application/pdf;base64,' + b64
const strFileName = 'contract.pdf'
const strMimeType = 'application/pdf'

// from https://codepen.io/gapcode/pen/vEJNZN
const isIEorEdge = () => {
  var ua = window.navigator.userAgent

  var msie = ua.indexOf('MSIE ')
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
  }

  var trident = ua.indexOf('Trident/')
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:')
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
  }

  var edge = ua.indexOf('Edge/')
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
  }

  // other browser
  return false
}

// http://printjs.crabbly.com/
const printPDF = blob => {
  try {
    printJS({ printable: blob, type: 'pdf', base64: true })
  } catch (e) {
    throw new Error('Ouch')
  }
}

const handleDownload = () => {
  download(data, strFileName, strMimeType)
}

function App () {
  return (
    <div className='App'>
      <button onClick={handleDownload}>
        Download {isIEorEdge() && '/ Print'}
      </button>
      {!isIEorEdge() && <button onClick={() => printPDF(b64)}>Print</button>}
    </div>
  )
}

export default App
