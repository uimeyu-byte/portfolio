window.PORTFOLIO_CONTENT = {
  /* ★ 마지막 페이지에서 받을 메일 주소를 여기만 수정하세요. */
  contactEmail: "YOUR_EMAIL_HERE@example.com",

  /* 표지 숫자 1~6 = 표지 다음 6페이지 */
  coverPages: [
    { title: "RESUME", description: "경력, 교육, 스킬과 수상 이력", target: "resume" },
    { title: "WEB", description: "반응형 웹 리디자인 프로젝트", target: "web" },
    { title: "POSTER", description: "다섯 개의 포스터 작품", target: "poster" },
    { title: "DETAILED PAGE", description: "아이폰 목업으로 상세페이지", target: "detailed-page" },
    { title: "VIDEO", description: "YouTube 영상 4개", target: "video" },
    { title: "GOAL", description: "메모와 연락을 위한 마지막 페이지", target: "goal" }
  ],

  posters: [
    { title: "seoul music festival", subtitle: "overview", image: "images/posters/poster-1.png", description: "본 프로젝트는 가상의 ‘서울 뮤직 페스티벌’을 위한포스터 디자인으로, 음악이 주는 해방감과 꿈같은 순간을 시각화하는 것을 목표로 했습니다. 축제의 분위기와 참가자들이 경험하게 될 감정의 파동을 초현실적인 스타일로 표현했습니다.", year: "2026", role: "Art Direction · Graphic Design" },
    { title: "ECHOES IN THE DEEP", subtitle: "overview", image: "images/posters/poster-2.png", description: "설명", year: "2026", role: "Graphic Design · Typography" },
    { title: "WIND REMEMBERS", subtitle: "overview", image: "images/posters/poster-3.png", description: "설명", year: "2026", role: "Graphic Design · Art Direction" },
    { title: "BETWEEN THE LIGHT", subtitle: "overview", image: "images/posters/poster-4.png", description: "설명", year: "2026", role: "Editorial · Graphic Design" },
    { title: "SILENCE IS ALSO A SONG", subtitle: "overview", image: "images/posters/poster-5.png", description: "설명", year: "2026", role: "Art Direction · Poster Design" }
  ],

  /*
    ★ YouTube 주소 수정 방법
    https://www.youtube.com/watch?v=8lazg_vlWJc
    → youtubeId: "8lazg_vlWJc"
  */
  videos: [
    { title: "DR 1 PHÚT", category: "MOTION GRAPHIC / CHARACTER", year: "2026", duration: "01:12", youtubeId: "RzkfAlV0fEI", thumbnail: "https://i.ytimg.com/vi/RzkfAlV0fEI/hqdefault.jpg", fallback: "images/video/fallback-1.png", description: "캐릭터의 감정과 리듬을 전달하는 모션 그래픽 프로젝트입니다.", role: "Concept · Editing · Motion · Sound" },
    { title: "COE MOOD FILM", category: "BRAND MOOD FILM", year: "2026", duration: "01:32", youtubeId: "8lazg_vlWJc", thumbnail: "https://i.ytimg.com/vi/8lazg_vlWJc/hqdefault.jpg", fallback: "images/video/fallback-2.png", description: "몽환적인 푸른 톤과 느린 호흡으로 브랜드 정서를 전달했습니다.", role: "Direction · Editing · Color" },
    { title: "BRAND TEASER", category: "TEASER / EDITING", year: "2026", duration: "00:45", youtubeId: "4A0Hd_ve_Dg", thumbnail: "https://i.ytimg.com/vi/4A0Hd_ve_Dg/hqdefault.jpg", fallback: "images/video/fallback-3.png", description: "핵심 장면을 압축해 호기심을 만드는 짧은 브랜드 티저입니다.", role: "Editing · Typography · Sound" },
    { title: "MOTION STUDY", category: "EXPERIMENTAL MOTION", year: "2026", duration: "00:30", youtubeId: "aqz-KE-bpKQ", thumbnail: "https://i.ytimg.com/vi/aqz-KE-bpKQ/hqdefault.jpg", fallback: "images/video/fallback-4.png", description: "질감, 빛, 반복 움직임을 실험한 짧은 모션 스터디입니다.", role: "Motion · Compositing · Color" }
  ]
};
