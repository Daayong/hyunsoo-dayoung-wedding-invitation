// 카카오 SDK 초기화 (본인의 JavaScript 키로 교체하세요)
Kakao.init('YOUR_JAVASCRIPT_KEY');

// 전역 변수
let currentImageIndex = 0;
const galleryImages = [
    './images/gallery/photo1.jpg',
    './images/gallery/photo2.jpg',
    './images/gallery/photo3.jpg',
    './images/gallery/photo4.jpg',
    './images/gallery/photo5.jpg',
    './images/gallery/photo6.jpg'
];

// 페이지 로드시 실행
document.addEventListener('DOMContentLoaded', function() {
    generateCalendar();
    calculateDday();
    initKakaoMap();
    loadGuestbook();
    setupMessageCounter();
});

// ========== 갤러리 기능 ==========
function openModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');

    modal.style.display = 'block';
    modalImg.src = galleryImages[index];

    // body 스크롤 방지
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('galleryModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }

    const modalImg = document.getElementById('modalImage');
    modalImg.src = galleryImages[currentImageIndex];
}

// 모달 외부 클릭시 닫기
window.onclick = function(event) {
    const modal = document.getElementById('galleryModal');
    if (event.target == modal) {
        closeModal();
    }
}

// 키보드 화살표로 이미지 넘기기
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('galleryModal');
    if (modal.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (event.key === 'ArrowRight') {
            changeImage(1);
        } else if (event.key === 'Escape') {
            closeModal();
        }
    }
});

// ========== 캘린더 기능 ==========
function generateCalendar() {
    const calendarDates = document.getElementById('calendarDates');
    const year = 2026;
    const month = 2; // 12월 (0부터 시작)
    const weddingDay = 1;

    // 해당 월의 첫날과 마지막 날
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // 빈 칸 추가
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'calendar-date empty';
        calendarDates.appendChild(emptyDiv);
    }

    // 날짜 추가
    for (let date = 1; date <= lastDate; date++) {
        const dateDiv = document.createElement('div');
        dateDiv.className = 'calendar-date';
        dateDiv.textContent = date;

        if (date === weddingDay) {
            dateDiv.classList.add('wedding-day');
        }

        calendarDates.appendChild(dateDiv);
    }
}

function calculateDday() {
    const weddingDate = new Date('2026-02-01T15:10:00');
    const today = new Date();

    const diffTime = weddingDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const dDayElement = document.getElementById('dDay');

    if (diffDays > 0) {
        dDayElement.innerHTML = `결혼식까지 <strong>D-${diffDays}</strong>`;
    } else if (diffDays === 0) {
        dDayElement.innerHTML = `오늘은 <strong>우리의 결혼식</strong> 💒`;
    } else {
        dDayElement.innerHTML = `결혼한 지 <strong>${Math.abs(diffDays)}일</strong> 💕`;
    }
}

// ========== 카카오맵 기능 ==========
function initKakaoMap() {
    // 카카오맵 API 키를 설정했는지 확인
    if (typeof kakao === 'undefined') {
        console.log('카카오맵 API 키를 설정해주세요');
        return;
    }

    const container = document.getElementById('map');
    const options = {
        center: new kakao.maps.LatLng(37.4979, 127.0276), // 강남역 좌표 (실제 주소로 변경하세요)
        level: 3
    };

    const map = new kakao.maps.Map(container, options);

    // 마커 표시
    const markerPosition = new kakao.maps.LatLng(37.4979, 127.0276);
    const marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(map);

    // 인포윈도우 표시
    const iwContent = '<div style="padding:5px;">더 웨딩홀</div>';
    const infowindow = new kakao.maps.InfoWindow({
        content: iwContent
    });
    infowindow.open(map, marker);
}

// 네이버 지도 열기
function openNaverMap() {
    const address = '서울특별시 강남구 테헤란로 123';
    const url = `https://map.naver.com/v5/search/${encodeURIComponent(address)}`;
    window.open(url, '_blank');
}

// 카카오맵 열기
function openKakaoMap() {
    const address = '서울특별시 강남구 테헤란로 123';
    const url = `https://map.kakao.com/link/search/${encodeURIComponent(address)}`;
    window.open(url, '_blank');
}

// 티맵 열기
function openTmap() {
    const address = '서울특별시 강남구 테헤란로 123';
    const url = `https://tmap.life/search?keyword=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
}

// ========== 계좌번호 복사 ==========
function copyAccount(accountNumber) {
    // 하이픈 제거한 계좌번호를 클립보드에 복사
    const tempInput = document.createElement('input');
    tempInput.value = accountNumber;
    document.body.appendChild(tempInput);
    tempInput.select();

    try {
        document.execCommand('copy');
        alert('계좌번호가 복사되었습니다.');
    } catch (err) {
        // Clipboard API 사용 (최신 브라우저)
        navigator.clipboard.writeText(accountNumber).then(() => {
            alert('계좌번호가 복사되었습니다.');
        }).catch(() => {
            alert('복사에 실패했습니다. 다시 시도해주세요.');
        });
    }

    document.body.removeChild(tempInput);
}

// ========== 방명록 기능 ==========
function setupMessageCounter() {
    const textarea = document.getElementById('guestMessage');
    const charCount = document.querySelector('.char-count');

    textarea.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = `${length}/200`;
    });
}

function submitMessage() {
    const name = document.getElementById('guestName').value.trim();
    const message = document.getElementById('guestMessage').value.trim();

    if (!name) {
        alert('이름을 입력해주세요.');
        return;
    }

    if (!message) {
        alert('메시지를 입력해주세요.');
        return;
    }

    // 메시지 객체 생성
    const guestMessage = {
        name: name,
        message: message,
        date: new Date().toISOString()
    };

    // localStorage에 저장
    let messages = JSON.parse(localStorage.getItem('guestbook')) || [];
    messages.unshift(guestMessage); // 최신 메시지를 앞에 추가
    localStorage.setItem('guestbook', JSON.stringify(messages));

    // 입력 필드 초기화
    document.getElementById('guestName').value = '';
    document.getElementById('guestMessage').value = '';
    document.querySelector('.char-count').textContent = '0/200';

    // 방명록 다시 로드
    loadGuestbook();

    alert('축하 메시지가 등록되었습니다! 💕');
}

function loadGuestbook() {
    const guestbookList = document.getElementById('guestbookList');
    const messages = JSON.parse(localStorage.getItem('guestbook')) || [];

    if (messages.length === 0) {
        guestbookList.innerHTML = '<p style="text-align: center; color: #999; padding: 40px 0;">첫 번째 축하 메시지를 남겨주세요!</p>';
        return;
    }

    guestbookList.innerHTML = '';

    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'guestbook-item';

        const date = new Date(msg.date);
        const formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;

        messageDiv.innerHTML = `
            <div class="guest-header">
                <span class="guest-name">${escapeHtml(msg.name)}</span>
                <span class="guest-date">${formattedDate}</span>
            </div>
            <div class="guest-message">${escapeHtml(msg.message)}</div>
        `;

        guestbookList.appendChild(messageDiv);
    });
}

// XSS 방지를 위한 HTML 이스케이프
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ========== 공유하기 기능 ==========
function shareKakao() {
    // 카카오 SDK가 초기화되었는지 확인
    if (!Kakao.isInitialized()) {
        alert('카카오톡 공유 기능을 사용하려면 JavaScript 키를 설정해주세요.');
        return;
    }

    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: '💐 현수 ❤️ 다영 결혼합니다',
            description: '2026년 02월 01일 일요일 오후 3시 10분\n서울 강서구 보타닉파크웨딩',
            imageUrl: window.location.origin + '/images/main.jpg', // 실제 이미지 URL로 변경
            link: {
                mobileWebUrl: window.location.href,
                webUrl: window.location.href
            }
        },
        buttons: [
            {
                title: '청첩장 보기',
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href
                }
            }
        ]
    });
}

function shareLink() {
    const url = window.location.href;

    // Clipboard API 사용
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            alert('링크가 복사되었습니다!\n원하는 곳에 붙여넣기 해주세요.');
        }).catch(() => {
            fallbackCopyLink(url);
        });
    } else {
        fallbackCopyLink(url);
    }
}

function fallbackCopyLink(url) {
    const tempInput = document.createElement('input');
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();

    try {
        document.execCommand('copy');
        alert('링크가 복사되었습니다!\n원하는 곳에 붙여넣기 해주세요.');
    } catch (err) {
        alert('링크 복사에 실패했습니다.\n수동으로 복사해주세요:\n' + url);
    }

    document.body.removeChild(tempInput);
}

// ========== 스무스 스크롤 ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});