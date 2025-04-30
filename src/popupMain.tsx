import React from 'react'
import ReactDOM from 'react-dom/client'
import PopupContent from './popupContent'
import './index.css' // 필요에 따라 스타일 파일을 import 합니다.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PopupContent />
  </React.StrictMode>
)
