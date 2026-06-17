import React, { useState } from 'react';
import './App.css';
// ----------------------------------------------------
// 1. MusicCard 컴포넌트: 개별 음악의 정보를 화면에 표시합니다.
// ----------------------------------------------------
const MusicCard = ({ title, artist, genre, imageUrl, previewUrl }) => {
  return (
    <div className='card' style={styles.card}>
      {/* 앨범 커버가 들어갈 임시 영역 */}
      <img src={imageUrl} alt={`${title} 앨범 커버`} style={styles.albumImage} />
      <h3>{title}</h3>
      <p><strong>아티스트:</strong> {artist}</p>
      <p><strong>장르:</strong> {genre}</p>

      <button
        style={styles.button}
        onClick={() => {
          if (previewUrl) {
            new Audio(previewUrl).play();
          } else {
            alert('미리듣기를 지원하지 않는 곡입니다.');
          }
        }}
      >
        ▶ 미리듣기
      </button>
    </div>
  );
};

// ----------------------------------------------------
// 2. MusicList 컴포넌트: 추천받은 음악 배열을 맵핑하여 리스트로 보여줍니다.
// ----------------------------------------------------
const MusicList = ({ tracks }) => {
  if (tracks.length === 0) {
    return <p>추천할 음악이 없습니다. 취향을 검색해 보세요!</p>;
  }

  return (
    <div style={styles.list}>
      {tracks.map((track) => (
        // 각 곡마다 고유한 key 값을 부여해야 React가 효율적으로 렌더링합니다.
        <MusicCard
          key={track.id}
          title={track.title}
          artist={track.artist}
          genre={track.genre}
          imageUrl={track.imageUrl}
          previewUrl={track.previewUrl}
        />
      ))}
    </div>
  );
};

// ----------------------------------------------------
// 3. 메인 App 컴포넌트: 전체 상태(State)를 관리하고 UI를 조합합니다.
// ----------------------------------------------------
export default function App() {
  // 사용자의 입력값을 저장하는 state
  const [keyword, setKeyword] = useState('');

  // 추천된 음악 목록을 저장하는 state (초기값은 빈 배열)
  const [recommendations, setRecommendations] = useState([]);

  // 검색 버튼 클릭 시 실행되는 함수
  const handleSearch = () => {
    if (!keyword.trim()) {
      alert('검색어를 입력해주세요!');
      return;
    }

    // 1. 애플 아이튠즈 음악 검색 API URL (입력한 keyword를 주소에 포함)
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(keyword)}&entity=musicTrack&limit=6`;

    // 2. fetch를 이용해 API 서버에 데이터 요청하기
    fetch(url)
      .then((response) => {
        // 서버가 응답을 주면 JSON 형태로 변환합니다.
        return response.json();
      })
      .then((data) => {
        // 3. 받아온 raw 데이터를 우리가 만든 MusicCard 형식에 맞게 가공(Mapping)합니다.
        const formattedData = data.results.map((track) => ({
          id: track.trackId,               // 고유 ID
          title: track.trackName,           // 곡 제목
          artist: track.artistName,         // 아티스트명
          genre: track.primaryGenreName,    // 장르
          previewUrl: track.previewUrl,     // 30초 미리듣기 음원 주소 (보너스!)
          imageUrl: track.artworkUrl100
            ? track.artworkUrl100.replace('100x100bb', '1400x1400bb')
            : 'https://via.placeholder.com/300?text=No+Image',
        }));

        // 4. 가공된 데이터를 State에 넣어 화면을 업데이트합니다.
        setRecommendations(formattedData);
      })
      .catch((error) => {
        // 에러가 발생했을 때 예외 처리
        console.error('데이터를 가져오는 중 오류 발생:', error);
        alert('음악을 불러오지 못했습니다.');
      });
  };

  return (<>

    <div className='container' style={styles.container}>
      <p className='changeLang'>language</p>
      <h1>blue Ocean</h1>
      <p>blue Ocean에서 취향에 맞는 음악을 찾으세요.</p>
      {/* 검색 영역 */}
      <div className='searchSection' style={styles.searchSection}>
        <input
          type="text"
          placeholder="좋아하는 장르나 아티스트를 입력하세요."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={styles.input}
        />
        <button className='searchButton' onClick={handleSearch}>추천받기</button>
      </div>

      <hr className='divider' style={styles.divider} />

      {/* 결과 영역 */}
      <h2>추천 결과</h2>
      <MusicList tracks={recommendations} />
    </div>
  </>
  );
}



















// ----------------------------------------------------
// 임시 인라인 스타일 (추후 CSS 파일이나 Tailwind, Styled-components로 교체 권장)
// ----------------------------------------------------

const styles = {
  albumImage: { width: '80%', height: 'auto', aspectRatio: '1 / 1', display: 'block', margin: '0 auto 10px auto', objectFit: 'cover', borderRadius: '8px', },
  container: { maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' },
  searchSection: { display: 'flex', gap: '10px', marginBottom: '20px' },
  input: { flex: 1, padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' },
  divider: { margin: '20px 0', border: '0.5px solid #eee' },
  list: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' },
  card: { border: '1px solid #ddd', padding: '15px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  imagePlaceholder: { width: '100%', height: '150px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', borderRadius: '4px', marginBottom: '10px' },
  button: { marginTop: '10px', padding: '8px 16px', cursor: 'pointer', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }
};