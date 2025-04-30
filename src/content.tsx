import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App' // App 컴포넌트는 다음 단계에서 작성
import ContextApp from './contextApp' // ContextApp 컴포넌트는 다음 단계에서 작성

// 확장 프로그램 UI를 삽입할 컨테이너 요소 생성\
const container = document.createElement('div')
container.id = 'chrome-extension-container'
document.body.appendChild(container)

// React 애플리케이션 렌더링
const root = ReactDOM.createRoot(container)
root.render(
  <React.StrictMode>
    <ContextApp />
  </React.StrictMode>
)
