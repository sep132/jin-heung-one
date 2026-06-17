import { useState } from 'react';
import './App.css';

function App() {
  // 1. 상태 정의
  const [name, setName] = useState(null);
  const [deposit, setDeposit] = useState(0);
  const [withdrawal, setWithdrawal] = useState(0);

  // 2. 이름 설정 핸들러
  const handleSetName = () => {
    setName('고길동');
  };

  return (
    <div className='App'>
      <h1>은행 시스템</h1>

      {/* 삼항 연산자를 이용한 조건부 렌더링 */}
      {name === null ? (
        // [로그인 전 화면] 이름이 없을 때
        <div>
          <p>고객 등록이 필요합니다.</p>
          {/* 태그 안의 style 속성을 완전히 지웠습니다 */}
          <div className="btn" onClick={handleSetName}>
            이름 정하기
          </div>
        </div>
      ) : (
        // [로그인 후 화면] 이름이 있을 때
        <div>
          <h2>{name}님, 안녕하세요.</h2>
          <p>현재 입금액: {deposit}원</p>
          <p>현재 출금액: {withdrawal}원</p>

          {/* 버튼에도 클래스명을 부여해 CSS가 먹히도록 했습니다 */}
          <button className="bank-btn" onClick={() => setDeposit(deposit + 10000)}>1만 원 입금</button>
          <button className="bank-btn" onClick={() => setWithdrawal(withdrawal + 5000)}>5천 원 출금</button>
        </div>
      )}
    </div>
  );
}

export default App;