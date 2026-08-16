const benefits = [
  {
    title: "2026 생계급여 조건과 금액 1인 가구 최대 82만 556원",
    summary: "가구 소득인정액이 기준 중위소득 32% 이하이면, 가구원별 선정기준액에서 소득인정액을 뺀 차액을 매달 지급받습니다.",
    target: "가구 소득인정액이 2026년 기준 중위소득 32% 이하인 가구(1인 가구 82만 556원, 4인 가구 207만 8,316원 이하)",
    category: "금융·생활비",
    status: "현재 확인 가능",
    keywords: "생계급여 기초생활보장 저소득 소득인정액 중위소득",
    blogUrl: "https://300md72.com/entry/2026-생계급여-조건과-금액-1인-가구-최대-82만-556원",
    officialUrl: "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001132"
  },
  {
    title: "월세 내는 저소득 가구를 위한 주거급여",
    summary: "소득과 주거 형태 등을 살펴 임차료 또는 집 수리 비용을 지원하는 제도입니다.",
    target: "저소득 가구",
    category: "주거",
    status: "현재 확인 가능",
    keywords: "월세 임차료 집수리 저소득 가구 주거급여",
    blogUrl: "https://300md72.com/entry/월세-내는-저소득-가구를-위한-주거급여-대상·금액-확인",
    officialUrl: "https://www.bokjiro.go.kr/ssis-tbu/index.do"
  },
  {
    title: "숨은 보험금 찾기",
    summary: "가입한 보험과 찾아가지 않은 보험금이 있는지 확인할 수 있습니다.",
    target: "보험 가입 이력이 있는 사람",
    category: "금융·생활비",
    status: "블로그 글 준비 중",
    keywords: "숨은 보험금 내보험찾아줌 금융",
    blogUrl: "",
    officialUrl: "https://cont.insure.or.kr"
  },
  {
    title: "전세사기 피해자 지원",
    summary: "피해자로 결정된 경우 이용할 수 있는 주거·금융·법률 지원을 안내합니다.",
    target: "전세사기 피해자",
    category: "주거",
    status: "블로그 글 준비 중",
    keywords: "전세사기 피해 주거 금융 법률",
    blogUrl: "",
    officialUrl: "https://www.khug.or.kr/jeonse/"
  },
  {
    title: "문화가 있는 날",
    summary: "매주 수요일 전국 참여 문화시설의 할인·무료입장·특별 프로그램을 확인할 수 있습니다.",
    target: "누구나",
    category: "문화·여가",
    status: "블로그 글 준비 중",
    keywords: "문화 영화 공연 박물관 미술관 수요일 할인",
    blogUrl: "",
    officialUrl: "https://www.culture.go.kr/local/wday/cltrBnefList.do"
  },
  {
    title: "2차 '모두의 창업 프로젝트' 지원",
    summary: "예비창업자를 대상으로 참가자를 모집해, 합격자에게 전문 보육기관 멘토링을 지원하는 창업 프로그램입니다.",
    target: "예비창업자·창업 관심자",
    category: "창업·취업",
    status: "현재 확인 가능",
    keywords: "창업 예비창업자 모두의창업프로젝트 정부지원 청년창업",
    blogUrl: "https://300md72.com/entry/%EB%AA%A8%EB%91%90%EC%9D%98-%EC%B0%BD%EC%97%85-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-2%EC%B0%A8-%EB%AA%A8%EC%A7%91-%EC%8B%A0%EC%B2%AD-%EB%8C%80%EC%83%81%EA%B3%BC-%EB%B0%A9%EB%B2%95-%EC%A0%95%EB%A6%AC",
    officialUrl: "https://www.korea.kr/news/policyNewsView.do?newsId=148970017"
  },
  {
    title: "전세사기피해자로 인정되면 받는 지원 총정리",
    summary: "전세사기피해자로 결정되면 LH 공공임대 거주, 긴급 저금리 대출, 법률 지원 등을 받을 수 있습니다.",
    target: "2025년 5월 31일 이전 임대차계약을 체결한 전세사기 피해 임차인",
    category: "주거",
    status: "현재 확인 가능",
    keywords: "전세사기 피해자 LH 공공임대 긴급대출 법률지원",
    blogUrl: "https://300md72.com/entry/%EC%A0%84%EC%84%B8%EC%82%AC%EA%B8%B0%ED%94%BC%ED%95%B4%EC%9E%90%EB%A1%9C-%EC%9D%B8%EC%A0%95%EB%90%98%EB%A9%B4-%EB%B0%9B%EB%8A%94-%EC%A7%80%EC%9B%90-%EC%B4%9D%EC%A0%95%EB%A6%AC",
    officialUrl: "https://www.khug.or.kr/jeonse/web/s01/s010001.jsp"
  },
  {
    title: "주거안정 월세대출",
    summary: "매달 내는 월세를 낮은 금리로 빌려주는 대출로, 최장 10년까지 연장할 수 있습니다.",
    target: "우대형(취약계층 무주택 세대주), 일반형(부부합산 소득 기준 이내 무주택 세대주)",
    category: "주거",
    status: "현재 확인 가능",
    keywords: "주거안정 월세대출 무주택 세대주 저금리",
    blogUrl: "https://300md72.com/entry/%EC%9B%94%EC%84%B8%EA%B0%80-%EB%B6%80%EC%A1%B1%ED%95%A0-%EB%95%8C-%ED%99%95%EC%9D%B8%ED%95%98%EB%8A%94-%EC%A3%BC%EA%B1%B0%EC%95%88%EC%A0%95-%EC%9B%94%EC%84%B8%EB%8C%80%EC%B6%9C",
    officialUrl: "https://www.myhome.go.kr/hws/portal/cont/selectResidentialMonthlyRentLoanView.do"
  },
  {
    title: "청년전용 버팀목전세자금대출",
    summary: "시중은행보다 낮은 금리로 전세보증금 일부를 빌려주는 청년 전용 대출입니다.",
    target: "만 19~34세 무주택 단독 세대주(예비 세대주 포함)",
    category: "주거",
    status: "현재 확인 가능",
    keywords: "청년 버팀목전세자금대출 무주택 세대주",
    blogUrl: "https://300md72.com/entry/%EC%B2%AD%EB%85%84%EC%A0%84%EC%9A%A9-%EB%B2%84%ED%8C%80%EB%AA%A9%EC%A0%84%EC%84%B8%EC%9E%90%EA%B8%88%EB%8C%80%EC%B6%9C-%EB%82%98%EC%9D%B4%C2%B7%EC%86%8C%EB%93%9D%C2%B7%ED%95%9C%EB%8F%84-%ED%99%95%EC%9D%B8",
    officialUrl: "https://www.myhome.go.kr/hws/portal/cont/selectYouthPolicyYouthOnlyCrutchLoanView.do"
  },
  {
    title: "신혼부부 버팀목전세자금대출",
    summary: "낮은 금리로 전세보증금 일부를 대출해주는 신혼부부 전용 상품입니다.",
    target: "혼인 기간 7년 이내이거나 소득 요건을 충족하는 무주택 신혼부부",
    category: "주거",
    status: "현재 확인 가능",
    keywords: "신혼부부 버팀목전세자금대출 전세보증금",
    blogUrl: "https://300md72.com/entry/%EC%8B%A0%ED%98%BC%EB%B6%80%EB%B6%80-%EB%B2%84%ED%8C%80%EB%AA%A9%EC%A0%84%EC%84%B8%EC%9E%90%EA%B8%88%EB%8C%80%EC%B6%9C-%EC%A1%B0%EA%B1%B4%EA%B3%BC-%EB%8C%80%EC%B6%9C-%ED%95%9C%EB%8F%84",
    officialUrl: "https://nhuf.molit.go.kr/FP/FP05/FP0501/FP0501.jsp"
  },
  {
    title: "LH 전세임대주택",
    summary: "LH가 전세보증금 대부분을 지원하고, 입주자는 지원한도 내 약 5%만 부담합니다.",
    target: "청년·신혼부부·기존주택 전세임대 등 유형별 무주택 요건 충족자",
    category: "주거",
    status: "현재 확인 가능",
    keywords: "LH 전세임대주택 무주택 청년 신혼부부",
    blogUrl: "https://300md72.com/entry/LH-%EC%A0%84%EC%84%B8%EC%9E%84%EB%8C%80%EC%A3%BC%ED%83%9D%EC%9D%B4%EB%9E%80-%EB%8C%80%EC%83%81%EB%B3%84-%EC%9C%A0%ED%98%95%EA%B3%BC-%EC%8B%A0%EC%B2%AD-%EC%A0%88%EC%B0%A8",
    officialUrl: "https://apply.lh.or.kr/lhapply/cm/cntnts/cntntsView.do?mi=1201583&cntntsId=1201331"
  },
  {
    title: "국민임대주택",
    summary: "주변 시세보다 낮은 임대료로 장기간 거주할 수 있는 임대주택입니다.",
    target: "무주택세대구성원, 전년도 도시근로자 가구당 월평균소득 기준 이하",
    category: "주거",
    status: "현재 확인 가능",
    keywords: "국민임대주택 무주택 소득기준",
    blogUrl: "https://300md72.com/entry/%EA%B5%AD%EB%AF%BC%EC%9E%84%EB%8C%80%EC%A3%BC%ED%83%9D-%EC%9E%85%EC%A3%BC%EC%9E%90%EA%B2%A9-%EC%86%8C%EB%93%9D%C2%B7%EC%9E%90%EC%82%B0-%EA%B8%B0%EC%A4%80-%ED%99%95%EC%9D%B8%ED%95%98%EA%B8%B0",
    officialUrl: "https://www.myhome.go.kr/hws/portal/cont/selectNationalRentalHouseView.do"
  },
  {
    title: "청년·신혼부부 행복주택",
    summary: "주변 시세보다 낮은 임대료로 최장 6~20년(계층별 상이) 거주할 수 있습니다.",
    target: "대학생·청년·신혼부부(80%), 고령자·주거급여수급자 등 취약계층(20%)",
    category: "주거",
    status: "현재 확인 가능",
    keywords: "행복주택 청년 신혼부부 임대주택",
    blogUrl: "https://300md72.com/entry/%EC%B2%AD%EB%85%84%C2%B7%EC%8B%A0%ED%98%BC%EB%B6%80%EB%B6%80-%ED%96%89%EB%B3%B5%EC%A3%BC%ED%83%9D-%EC%9E%85%EC%A3%BC%EC%9E%90%EA%B2%A9%EA%B3%BC-%EC%86%8C%EB%93%9D%EA%B8%B0%EC%A4%80-%ED%99%95%EC%9D%B8",
    officialUrl: "https://www.myhome.go.kr/hws/portal/cont/selectHappyHouseView.do"
  },
  {
    title: "부모와 따로 사는 청년의 주거급여 분리지급",
    summary: "부모와 따로 사는 청년 자녀에게 거주지 기준임대료 범위 내 임차료를 별도로 지급합니다.",
    target: "부모가 주거급여 수급자이고, 만 19~30세 미만 미혼으로 타 시·군에 거주하는 자녀",
    category: "주거",
    status: "현재 확인 가능",
    keywords: "주거급여 분리지급 청년 부모",
    blogUrl: "https://300md72.com/entry/%EB%B6%80%EB%AA%A8%EC%99%80-%EB%94%B0%EB%A1%9C-%EC%82%AC%EB%8A%94-%EC%B2%AD%EB%85%84%EC%9D%98-%EC%A3%BC%EA%B1%B0%EA%B8%89%EC%97%AC-%EB%B6%84%EB%A6%AC%EC%A7%80%EA%B8%89-%EC%A1%B0%EA%B1%B4",
    officialUrl: "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003201"
  },
  {
    title: "청년월세 지원사업 2026",
    summary: "실제 월세 범위 내 월 최대 20만 원을 최장 24개월(생애 최대 480만 원) 지원합니다.",
    target: "부모와 따로 사는 만 19~34세 무주택 청년(소득·재산 기준 충족 시)",
    category: "주거",
    status: "현재 확인 가능",
    keywords: "청년월세 지원 무주택 청년 월세지원금",
    blogUrl: "https://300md72.com/entry/%EC%B2%AD%EB%85%84%EC%9B%94%EC%84%B8-%EC%A7%80%EC%9B%90%EC%82%AC%EC%97%85-2026-%EB%8C%80%EC%83%81%C2%B7%EA%B8%88%EC%95%A1%C2%B7%EC%8B%A0%EC%B2%AD%EB%B0%A9%EB%B2%95-%EC%B4%9D%EC%A0%95%EB%A6%AC",
    officialUrl: "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00004661&wlfareInfoReldBztpCd=01"
  },
  {
    title: "2026 기초연금",
    summary: "소득 수준과 산정 방식에 따라 월 최대 40만 원 수준까지 차등 지급됩니다.",
    target: "만 65세 이상 국내 거주 국적자 중 소득인정액이 선정기준액 이하인 사람",
    category: "금융·생활비",
    status: "현재 확인 가능",
    keywords: "기초연금 노인 소득인정액",
    blogUrl: "https://300md72.com/entry/2026-%EA%B8%B0%EC%B4%88%EC%97%B0%EA%B8%88-%EC%86%8C%EB%93%9D%EC%9D%B8%EC%A0%95%EC%95%A1-%EA%B8%B0%EC%A4%80%EA%B3%BC-%EC%8B%A0%EC%B2%AD%EB%B0%A9%EB%B2%95-%EC%A0%95%EB%A6%AC",
    officialUrl: "https://www.mohw.go.kr/board.es?act=view&bid=0027&list_no=1488478&mid=a10503000000"
  },
  {
    title: "2026 새출발기금",
    summary: "소상공인의 과도한 채무를 조정해주는 채무조정 프로그램입니다.",
    target: "2020년 4월~2025년 6월 사업 운영 이력이 있는 개인사업자·법인 소상공인(폐업자 포함)",
    category: "금융·생활비",
    status: "현재 확인 가능",
    keywords: "새출발기금 소상공인 채무조정",
    blogUrl: "https://300md72.com/entry/2026-%EC%83%88%EC%B6%9C%EB%B0%9C%EA%B8%B0%EA%B8%88-%EC%8B%A0%EC%B2%AD%EB%8C%80%EC%83%81%EA%B3%BC-%EC%B1%84%EB%AC%B4%EC%A1%B0%EC%A0%95-%EB%B0%A9%EC%8B%9D-%EC%A0%95%EB%A6%AC",
    officialUrl: "https://www.newstartfund.or.kr"
  },
  {
    title: "2026 근로장려금 반기신청",
    summary: "가구 유형별로 단독 최대 165만 원, 홑벌이 최대 285만 원, 맞벌이 최대 330만 원을 지급합니다.",
    target: "근로소득만 있는 가구(사업소득자는 반기 신청 제외, 정기 신청만 가능)",
    category: "금융·생활비",
    status: "현재 확인 가능",
    keywords: "근로장려금 반기신청 저소득 근로자",
    blogUrl: "https://300md72.com/entry/2026-%EA%B7%BC%EB%A1%9C%EC%9E%A5%EB%A0%A4%EA%B8%88-%EB%B0%98%EA%B8%B0%EC%8B%A0%EC%B2%AD-%EA%B8%B0%EA%B0%84%EA%B3%BC-%EC%A7%80%EA%B8%89%EC%95%A1-%EC%A0%95%EB%A6%AC",
    officialUrl: "https://www.nts.go.kr"
  },
  {
    title: "2026 부모급여",
    summary: "0세는 월 100만 원, 1세는 월 50만 원을 지급하며 어린이집 이용 시 보육료 차감 후 차액을 받습니다.",
    target: "만 2세 미만(0~1세) 아동을 양육하는 모든 가구, 소득·재산 기준 없음",
    category: "금융·생활비",
    status: "현재 확인 가능",
    keywords: "부모급여 영아 육아 양육수당",
    blogUrl: "https://300md72.com/entry/2026-%EB%B6%80%EB%AA%A8%EA%B8%89%EC%97%AC-%EC%8B%A0%EC%B2%AD%EB%B0%A9%EB%B2%95%EA%B3%BC-%EC%A7%80%EA%B8%89%EA%B8%88%EC%95%A1-%EC%B4%9D%EC%A0%95%EB%A6%AC",
    officialUrl: "https://www.korea.kr/multi/visualNewsView.do?newsId=148957936"
  },
  {
    title: "2026 국민내일배움카드",
    summary: "5년간 기본 300만 원, 추가지원 대상은 최대 500만 원까지 직업훈련비를 지원합니다.",
    target: "구직자, 재직자, 육아휴직자, 특수형태근로종사자, 일정 요건의 자영업자, 졸업예정 대학생",
    category: "창업·취업",
    status: "현재 확인 가능",
    keywords: "국민내일배움카드 직업훈련 구직자",
    blogUrl: "https://300md72.com/entry/2026-%EA%B5%AD%EB%AF%BC%EB%82%B4%EC%9D%BC%EB%B0%B0%EC%9B%80%EC%B9%B4%EB%93%9C-%EB%B0%9C%EA%B8%89%EB%8C%80%EC%83%81%EA%B3%BC-%EC%A7%80%EC%9B%90%ED%95%9C%EB%8F%84-%EC%A0%95%EB%A6%AC",
    officialUrl: "https://www.work24.go.kr"
  },
  {
    title: "국민취업지원제도",
    summary: "Ⅰ유형은 구직촉진수당 월 60만 원을 6개월간 지급하고, Ⅱ유형은 참여수당 등을 지원합니다.",
    target: "15~69세 구직자 중 소득·재산 기준을 충족하는 Ⅰ유형·Ⅱ유형 참여자",
    category: "창업·취업",
    status: "현재 확인 가능",
    keywords: "국민취업지원제도 구직촉진수당 직업훈련",
    blogUrl: "https://300md72.com/entry/%EA%B5%AD%EB%AF%BC%EC%B7%A8%EC%97%85%EC%A7%80%EC%9B%90%EC%A0%9C%EB%8F%84-2026%EB%85%84-%EA%B5%AC%EC%A7%81%EC%B4%89%EC%A7%84%EC%88%98%EB%8B%B9%EB%B6%80%ED%84%B0-%EC%A7%81%EC%97%85%ED%9B%88%EB%A0%A8%EA%B9%8C%EC%A7%80-%EC%B4%9D%EC%A0%95%EB%A6%AC",
    officialUrl: "https://www.work24.go.kr/ua/z/z/1300/selectEmssRqutIntro.do"
  },
  {
    title: "2026 재난적의료비 지원사업",
    summary: "소득 구간과 본인부담 의료비 규모에 따라 의료비의 70~80%를 지원합니다.",
    target: "기준중위소득 100% 이하 가구(100~200%는 개별심사), 재산과표 7억 원 이하",
    category: "의료비",
    status: "현재 확인 가능",
    keywords: "재난적의료비 의료비지원 중증질환",
    blogUrl: "https://300md72.com/entry/2026-%EC%9E%AC%EB%82%9C%EC%A0%81%EC%9D%98%EB%A3%8C%EB%B9%84-%EC%A7%80%EC%9B%90%EC%82%AC%EC%97%85-%EB%8C%80%EC%83%81%EA%B3%BC-%EC%8B%A0%EC%B2%AD%EB%B0%A9%EB%B2%95",
    officialUrl: "https://www.nhis.or.kr/static/html/wbma/c/wbmac0222.html"
  }
];
