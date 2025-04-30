import { useState, useEffect, useCallback } from 'react' // useCallback 추가

// 조회 결과 데이터 타입을 정의
interface SearchResult {
  지역: string
  명령번호: string
  이름: string
  전화번호: string
  시작일시: string
  상태: string
}

function ContextApp() {
  const [commandNumber, setCommandNumber] = useState('')
  const [region, setRegion] = useState('관악')
  const [todayOnly, setTodayOnly] = useState(false)
  const [includeTomorrow, setIncludeTomorrow] = useState(false)
  const [refreshInterval, setRefreshInterval] = useState(60) // 초 단위, 기본값 60초
  const [data, setData] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  // 가상 데이터 조회 함수 (useCallback으로 감싸기)
  const fetchData = useCallback(async () => {
    setLoading(true)
    console.log('데이터 조회 시작:', {
      commandNumber,
      region,
      todayOnly,
      includeTomorrow,
    })

    // TODO: 실제 POST 요청 로직 구현
    // 현재는 가상 데이터 사용
    const dummyData = [
      {
        지역: region,
        명령번호: commandNumber || 'N/A',
        이름: '가상 이름',
        전화번호: '010-0000-0000',
        시작일시: new Date().toLocaleString(),
        상태: '진행중',
      },
    ]
    setData(dummyData)
    setLoading(false)
  }, [commandNumber, region, todayOnly, includeTomorrow]) // 의존성 배열 추가

  // 자동 갱신 useEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData()
    }, refreshInterval * 1000) // 초를 밀리초로 변환

    return () => clearInterval(intervalId) // 컴포넌트 언마운트 시 인터벌 정리
  }, [fetchData, refreshInterval]) // 의존성 배열에 fetchData와 refreshInterval 포함

  return (
    <div
      style={{
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '300px',
        position: 'fixed',
        top: '10px',
        right: '10px',
        backgroundColor: '#fff',
        zIndex: 1000,
      }}
    >
      <h3>데이터 조회</h3>

      {/* 입력 조건 */}
      <div style={{ marginBottom: '10px' }}>
        <label>명령번호:</label>
        <input
          type="text"
          value={commandNumber}
          onChange={(e) => setCommandNumber(e.target.value)}
          style={{ marginLeft: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>지역:</label>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          style={{ marginLeft: '5px' }}
        >
          <option value="관악">관악</option>
          <option value="서초">서초</option>
          <option value="구로">구로</option>
          <option value="과천">과천</option>
        </select>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          <input
            type="checkbox"
            checked={todayOnly}
            onChange={(e) => setTodayOnly(e.target.checked)}
          />
          오늘만
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input
            type="checkbox"
            checked={includeTomorrow}
            onChange={(e) => setIncludeTomorrow(e.target.checked)}
          />
          내일 포함
        </label>
      </div>

      {/* 조회 버튼 */}
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <button onClick={fetchData} disabled={loading}>
          {loading ? '조회 중...' : '조회'}
        </button>
      </div>

      {/* 자동 갱신 주기 입력 */}
      <div style={{ marginBottom: '10px' }}>
        <label>자동 갱신 주기 (초):</label>
        <input
          type="number"
          value={refreshInterval}
          onChange={(e) => setRefreshInterval(Number(e.target.value))}
          style={{ marginLeft: '5px', width: '60px' }}
          min="1"
        />
      </div>

      {/* 조회 결과 테이블 */}
      <div>
        <h4>조회 결과</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '5px' }}>지역</th>
              <th style={{ border: '1px solid #ccc', padding: '5px' }}>
                명령번호
              </th>
              <th style={{ border: '1px solid #ccc', padding: '5px' }}>이름</th>
              <th style={{ border: '1px solid #ccc', padding: '5px' }}>
                전화번호
              </th>
              <th style={{ border: '1px solid #ccc', padding: '5px' }}>
                시작일시
              </th>
              <th style={{ border: '1px solid #ccc', padding: '5px' }}>상태</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ccc', padding: '5px' }}>
                    {item.지역}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '5px' }}>
                    {item.명령번호}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '5px' }}>
                    {item.이름}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '5px' }}>
                    {item.전화번호}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '5px' }}>
                    {item.시작일시}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '5px' }}>
                    {item.상태}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    textAlign: 'center',
                    border: '1px solid #ccc',
                    padding: '5px',
                  }}
                >
                  조회 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ContextApp
