// ========================================
// 카카오 초기화
// ========================================
Kakao.init('f9ef825d985a3cf00497e5da9ccd7ce4');

// ========================================
// Google Sheets 설정
// ========================================
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxBUtQM0oOA2oqQEiSH3mfX-uvSVUurIxF31UY3hMUSfU1ZSitA3h7Eac8W1fLg2qt8bw/exec';

// ========================================
// 갤러리 모달
// ========================================
let currentImageIndex = 0;
const totalImages = 6;

function openModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');

    modal.style.display = 'block';
    modalImg.src = `./images/gallery/photo${index + 1}.jpg`;

    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('galleryModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    currentImageIndex += direction;

    if (currentImageIndex >= totalImages) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = totalImages - 1;
    }

    const modalImg = document.getElementById('modalImage');
    modalImg.src = `./images/gallery/photo${currentImageIndex + 1}.jpg`;
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

document.getElementById('galleryModal')?.addEventListener('click', function(event) {
    if (event.target === this) {
        closeModal();
    }
});

// ========================================
// 캘린더
// ========================================
function generateCalendar() {
    const calendarDates = document.getElementById('calendarDates');
    const year = 2026;
    const month = 1;
    const weddingDay = 1;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    let html = '';

    for (let i = 0; i < firstDay; i++) {
        html += '<div class="calendar-date empty"></div>';
    }

    for (let date = 1; date <= lastDate; date++) {
        const isWeddingDay = date === weddingDay;
        html += `<div class="calendar-date ${isWeddingDay ? 'wedding-day' : ''}">${date}</div>`;
    }

    calendarDates.innerHTML = html;
}

function calculateDday() {
    const weddingDate = new Date('2026-02-01T15:10:00');
    const today = new Date();
    const diff = weddingDate - today;
    const dDay = Math.ceil(diff / (1000 * 60 * 60 * 24));

    const dDayElement = document.getElementById('dDay');
    if (dDay > 0) {
        dDayElement.textContent = `D-${dDay}`;
    } else if (dDay === 0) {
        dDayElement.textContent = 'D-Day';
    } else {
        dDayElement.textContent = `D+${Math.abs(dDay)}`;
    }
}

// ========================================
// 카카오맵 - 개선된 버전
// ========================================
function initMap() {
    console.log('initMap 함수 시작');

    // kakao 객체 확인
    if (typeof kakao === 'undefined') {
        console.error('❌ kakao 객체가 없습니다. 플랫폼 등록을 확인하세요!');
        showMapError();
        return;
    }

    console.log('✅ kakao 객체 존재');

    // kakao.maps 확인
    if (typeof kakao.maps === 'undefined') {
        console.error('❌ kakao.maps가 없습니다.');
        showMapError();
        return;
    }

    console.log('✅ kakao.maps 존재');

    // 맵 컨테이너 확인
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
        console.error('❌ map 엘리먼트를 찾을 수 없습니다.');
        return;
    }

    console.log('✅ map 엘리먼트 존재');

    try {
        // 지도 생성
        const mapOption = {
            center: new kakao.maps.LatLng(37.5673125, 126.8270077),
            level: 3
        };

        console.log('지도 옵션 생성 완료');

        const map = new kakao.maps.Map(mapContainer, mapOption);
        console.log('✅ 지도 생성 성공!');

        // 마커 생성
        const markerPosition = new kakao.maps.LatLng(37.5673125, 126.8270077);
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);
        console.log('✅ 마커 생성 성공!');

        // 인포윈도우
        const infowindow = new kakao.maps.InfoWindow({
            content: '<div style="padding:10px;font-size:12px;text-align:center;width:150px;">보타닉파크웨딩홀</div>'
        });
        infowindow.open(map, marker);
        console.log('✅ 인포윈도우 생성 성공!');

        console.log('🎉 카카오맵 초기화 완료!');

    } catch (error) {
        console.error('❌ 카카오맵 생성 중 에러:', error);
        showMapError();
    }
}

function showMapError() {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#999;font-size:12px;line-height:1.8;text-align:center;padding:20px;">
                <div>지도를 불러올 수 없습니다</div>
                <div style="font-size:11px;color:#bbb;margin-top:8px;">카카오 개발자 사이트에서<br>플랫폼 설정을 확인해주세요</div>
            </div>
        `;
    }
}

// ========================================
// 지도 앱 열기
// ========================================
function openNaverMap() {
    window.open('https://map.naver.com/v5/search/보타닉파크웨딩홀', '_blank');
}

function openKakaoMap() {
    window.open('https://map.kakao.com/link/map/보타닉파크웨딩홀,37.5673125,126.8270077', '_blank');
}

function openTmap() {
    window.open('https://m.tmap.co.kr', '_blank');
}

// ========================================
// 계좌번호 복사
// ========================================
function copyAccount(accountNumber) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(accountNumber).then(() => {
            alert('계좌번호가 복사되었습니다.');
        }).catch(() => {
            fallbackCopy(accountNumber);
        });
    } else {
        fallbackCopy(accountNumber);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        alert('계좌번호가 복사되었습니다.');
    } catch (err) {
        alert('복사에 실패했습니다.');
    }

    document.body.removeChild(textArea);
}

// ========================================
// 계좌번호 토글
// ========================================
function toggleAccount(type) {
    const accountList = document.getElementById(`${type}-accounts`);
    const toggleBtn = accountList.previousElementSibling;

    if (accountList.classList.contains('active')) {
        accountList.classList.remove('active');
        toggleBtn.classList.remove('active');
    } else {
        accountList.classList.add('active');
        toggleBtn.classList.add('active');
    }
}

// ========================================
// 방명록
// ========================================
let guestbookMessages = [];

document.getElementById('guestMessage')?.addEventListener('input', function() {
    const counter = document.querySelector('.char-counter');
    const length = this.value.length;
    counter.textContent = `${length}/200`;
});

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

    const newMessage = {
        name: name,
        message: message,
        date: new Date().toLocaleDateString('ko-KR')
    };

    saveToGoogleSheets(newMessage);
    guestbookMessages.unshift(newMessage);
    displayGuestbook();

    document.getElementById('guestName').value = '';
    document.getElementById('guestMessage').value = '';
    document.querySelector('.char-counter').textContent = '0/200';

    alert('메시지가 등록되었습니다.');
}

function saveToGoogleSheets(messageData) {
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData)
    })
        .then(() => {
            console.log('메시지가 Google Sheets에 저장되었습니다.');
        })
        .catch(error => {
            console.error('Google Sheets 저장 실패:', error);
        });
}

function loadFromGoogleSheets() {
    fetch(GOOGLE_SCRIPT_URL)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success' && data.data) {
                guestbookMessages = data.data.reverse();
                displayGuestbook();
            }
        })
        .catch(error => {
            console.error('Google Sheets 불러오기 실패:', error);
            displayGuestbook();
        });
}

function displayGuestbook() {
    const guestbookList = document.getElementById('guestbookList');

    if (guestbookMessages.length === 0) {
        guestbookList.innerHTML = '<p style="text-align:center;color:#aaa;font-size:12px;padding:40px 0;">첫 번째 축하 메시지를 남겨주세요 💕</p>';
        return;
    }

    let html = '';
    guestbookMessages.forEach(msg => {
        html += `
            <div class="guest-message">
                <div class="guest-header">
                    <span class="guest-name">${msg.name}</span>
                    <span class="guest-date">${msg.date}</span>
                </div>
                <p class="guest-text">${msg.message}</p>
            </div>
        `;
    });

    guestbookList.innerHTML = html;
}

// ========================================
// 카카오톡 공유
// ========================================
function shareKakao() {
    if (!Kakao.isInitialized()) {
        alert('카카오톡 공유 기능을 사용할 수 없습니다.');
        return;
    }

    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: '💐 현수 ❤️ 다영 결혼합니다',
            description: '2026년 02월 01일 일요일 오후 3시 10분\n보타닉파크웨딩홀',
            imageUrl: 'https://daayong.github.io/hyunsoo-dayoung-wedding-invitation/images/main.jpg',
            link: {
                mobileWebUrl: 'https://daayong.github.io/hyunsoo-dayoung-wedding-invitation/',
                webUrl: 'https://daayong.github.io/hyunsoo-dayoung-wedding-invitation/'
            }
        },
        buttons: [
            {
                title: '청첩장 보기',
                link: {
                    mobileWebUrl: 'https://daayong.github.io/hyunsoo-dayoung-wedding-invitation/',
                    webUrl: 'https://daayong.github.io/hyunsoo-dayoung-wedding-invitation/'
                }
            }
        ]
    });
}

// ========================================
// 링크 복사
// ========================================
function shareLink() {
    const url = window.location.href;

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
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        alert('링크가 복사되었습니다!\n원하는 곳에 붙여넣기 해주세요.');
    } catch (err) {
        alert('링크 복사에 실패했습니다.');
    }

    document.body.removeChild(textArea);
}

// ========================================
// 페이지 로드시 초기화
// ========================================
window.addEventListener('load', function() {
    console.log('=== 페이지 로드 시작 ===');

    generateCalendar();
    console.log('✅ 캘린더 생성 완료');

    calculateDday();
    console.log('✅ D-day 계산 완료');

    // 카카오맵 초기화를 약간 지연
    setTimeout(() => {
        console.log('카카오맵 초기화 시작...');
        initMap();
    }, 500);

    loadFromGoogleSheets();
    console.log('✅ 방명록 로드 시작');

    console.log('=== 초기화 완료 ===');
});