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
    blogUrl: "https://300md72.com/entry/2026-%EC%A3%BC%EA%B1%B0%EA%B8%89%EC%97%AC-%EB%8C%80%EC%83%81-%EC%A0%95%EB%A6%AC-1%EC%9D%B8-%EA%B0%80%EA%B5%AC-%EC%86%8C%EB%93%9D%EC%9D%B8%EC%A0%95%EC%95%A1-123%EB%A7%8C%EC%9B%90-%EC%9D%B4%ED%95%98",
    officialUrl: "https://www.bokjiro.go.kr/ssis-tbu/index.do"
  },
  {
    title: "숨은 보험금 찾기",
    summary: "가입한 보험과 찾아가지 않은 보험금이 있는지 확인할 수 있습니다.",
    target: "보험 가입 이력이 있는 사람",
    category: "금융·생활비",
    status: "현재 확인 가능",
    keywords: "숨은 보험금 내보험찾아줌 금융",
    blogUrl: "https://300md72.com/entry/%EC%88%A8%EC%9D%80%EB%B3%B4%ED%97%98%EA%B8%88-%EC%B0%BE%EB%8A%94-%EB%B2%95-%EB%82%B4%EB%B3%B4%ED%97%98%EC%B0%BE%EC%95%84%EC%A4%8C-%EC%A1%B0%ED%9A%8C-%EB%8C%80%EC%83%81%EA%B3%BC-%EB%B0%A9%EB%B2%95",
    officialUrl: "https://cont.insure.or.kr"
  },
  {
    title: "전세사기 피해자 지원",
    summary: "피해자로 결정된 경우 이용할 수 있는 주거·금융·법률 지원을 안내합니다.",
    target: "전세사기 피해자",
    category: "주거",
    status: "현재 확인 가능",
    keywords: "전세사기 피해 주거 금융 법률",
    blogUrl: "https://300md72.com/entry/%EC%A0%84%EC%84%B8%EC%82%AC%EA%B8%B0-%ED%94%BC%ED%95%B4%EC%9E%90-%EA%B2%B0%EC%A0%95-%ED%9B%84-%EB%B0%9B%EB%8A%94-%EC%A3%BC%EA%B1%B0%C2%B7%EA%B8%88%EC%9C%B5%C2%B7%EB%B2%95%EB%A5%A0-%EC%A7%80%EC%9B%90-%EC%B4%9D%EC%A0%95%EB%A6%AC",
    officialUrl: "https://www.khug.or.kr/jeonse/"
  },
  {
    title: "문화가 있는 날",
    summary: "매주 수요일 전국 참여 문화시설의 할인·무료입장·특별 프로그램을 확인할 수 있습니다.",
    target: "누구나",
    category: "문화·여가",
    status: "현재 확인 가능",
    keywords: "문화 영화 공연 박물관 미술관 수요일 할인",
    blogUrl: "https://300md72.com/entry/%EB%AC%B8%ED%99%94%EA%B0%80-%EC%9E%88%EB%8A%94-%EB%82%A0-%EB%A7%A4%EC%A3%BC-%EC%88%98%EC%9A%94%EC%9D%BC-%ED%99%95%EB%8C%80-2026%EB%85%84-%ED%98%9C%ED%83%9D-%EC%B4%9D%EC%A0%95%EB%A6%AC",
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
    blogUrl: "https://300md72.com/entry/2026-%EA%B8%B0%EC%B4%88%EC%97%B0%EA%B8%88-%EB%8B%A8%EB%8F%85%EA%B0%80%EA%B5%AC-247%EB%A7%8C%EC%9B%90-%EA%B8%B0%EC%A4%80-%EC%8B%A0%EC%B2%AD-%EC%8B%9C%EA%B8%B0%EC%99%80-%EB%B0%A9%EB%B2%95",
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
    blogUrl: "https://300md72.com/entry/2026-%EC%9E%AC%EB%82%9C%EC%A0%81%EC%9D%98%EB%A3%8C%EB%B9%84-%EC%A7%80%EC%9B%90-%EB%8C%80%EC%83%81-%EC%9D%98%EB%A3%8C%EB%B9%84-5080-%EC%8B%A0%EC%B2%AD%EB%B0%A9%EB%B2%95",
    officialUrl: "https://www.nhis.or.kr/static/html/wbma/c/wbmac0222.html"
  },
  {
    title: "2026 장애인연금 대상과 금액, 월 최대 43만9700원 총정리",
    summary: "2026년 1월부터 기초급여가 34만9700원으로 오르며, 부가급여를 더한 월 최대 지급액이 43만9700원이 됩니다.",
    target: "18세 이상 등록 중증장애인 중 본인·배우자 소득인정액이 선정기준액 이하인 사람(단독가구 140만원, 부부가구 224만원 이하)",
    category: "금융·생활비",
    status: "현재 확인 가능",
    keywords: "장애인연금 기초급여 부가급여 중증장애인 소득인정액",
    blogUrl: "https://300md72.com/entry/2026-%EC%9E%A5%EC%95%A0%EC%9D%B8%EC%97%B0%EA%B8%88-%EB%8C%80%EC%83%81%EA%B3%BC-%EA%B8%88%EC%95%A1-%EC%9B%94-%EC%B5%9C%EB%8C%80-43%EB%A7%8C9700%EC%9B%90-%EC%B4%9D%EC%A0%95%EB%A6%AC",
    officialUrl: "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00003249"
  },
  {
    title: "2026년 교육급여 지원금액｜초 50만2천·중 69만9천·고 86만원",
    summary: "교육활동지원비가 초등학생 50만2천원, 중학생 69만9천원, 고등학생 86만원으로 책정돼 전년 대비 평균 6% 인상됐습니다.",
    target: "소득인정액이 2026년 기준중위소득 50% 이하인 가구의 초·중·고 재학생(부양의무자 기준 미적용)",
    category: "금융·생활비",
    status: "현재 확인 가능",
    keywords: "교육급여 교육활동지원비 저소득 초중고 교육비지원",
    blogUrl: "https://300md72.com/entry/2026%EB%85%84-%EA%B5%90%EC%9C%A1%EA%B8%89%EC%97%AC-%EC%A7%80%EC%9B%90%EA%B8%88%EC%95%A1%EF%BD%9C%EC%B4%88-50%EB%A7%8C2%EC%B2%9C%C2%B7%EC%A4%91-69%EB%A7%8C9%EC%B2%9C%C2%B7%EA%B3%A0-86%EB%A7%8C%EC%9B%90",
    officialUrl: "https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00001089"
  },
  {
    title: "2026 발달재활서비스 월 바우처 대상과 본인부담금",
    summary: "18세 미만 등록장애아동의 언어·감각·운동 재활치료 비용 일부를 바우처로 지원합니다.",
    target: "18세 미만 등록장애아동 중 기준중위소득 180% 이하 가구(9세 미만은 장애 미등록도 전문의 의뢰서로 예외 신청 가능)",
    category: "의료비",
    status: "현재 확인 가능",
    keywords: "발달재활서비스 장애아동바우처 언어치료지원 감각통합치료",
    blogUrl: "https://300md72.com/entry/2026-%EB%B0%9C%EB%8B%AC%EC%9E%AC%ED%99%9C%EC%84%9C%EB%B9%84%EC%8A%A4-%EC%9B%94-%EB%B0%94%EC%9A%B0%EC%B2%98-%EB%8C%80%EC%83%81%EA%B3%BC-%EB%B3%B8%EC%9D%B8%EB%B6%80%EB%8B%B4%EA%B8%88",
    officialUrl: "https://www.mohw.go.kr/menu.es?mid=a10710060600"
  },
  {
    title: "2026 장애수당 월 6만원 대상과 복지로 신청방법",
    summary: "장애인연금 대상이 아닌 비중증 등록장애인 중 기초생활수급자·차상위계층에게 매달 지급하는 수당입니다.",
    target: "18세 이상 등록장애인 중 장애인연금법상 중증장애인이 아닌 기초생활수급자·차상위계층",
    category: "금융·생활비",
    status: "현재 확인 가능",
    keywords: "장애수당 비중증장애인 복지로신청 월6만원지원금",
    blogUrl: "https://300md72.com/entry/2026-%EC%9E%A5%EC%95%A0%EC%88%98%EB%8B%B9-%EC%9B%94-6%EB%A7%8C%EC%9B%90-%EB%8C%80%EC%83%81%EA%B3%BC-%EB%B3%B5%EC%A7%80%EB%A1%9C-%EC%8B%A0%EC%B2%AD%EB%B0%A9%EB%B2%95",
    officialUrl: "https://www.mohw.go.kr/menu.es?mid=a10710030200"
  },
  {
    title: "2026 긴급복지지원 생계비 대상과 129 신청방법",
    summary: "실직·폐업·질병·화재 등 갑작스러운 위기 상황에서 정기 모집 없이 바로 생계비를 지원받을 수 있는 제도입니다.",
    target: "실직·폐업·중한 질병·화재 등 위기 사유로 생계가 곤란한 저소득 가구(2026년 기준중위소득 75% 이하)",
    category: "금융·생활비",
    status: "현재 확인 가능",
    keywords: "긴급복지지원 129신청 긴급생계비 위기가구지원금",
    blogUrl: "https://300md72.com/entry/2026-%EA%B8%B4%EA%B8%89%EB%B3%B5%EC%A7%80%EC%A7%80%EC%9B%90-%EC%83%9D%EA%B3%84%EB%B9%84-%EB%8C%80%EC%83%81%EA%B3%BC-129-%EC%8B%A0%EC%B2%AD%EB%B0%A9%EB%B2%95",
    officialUrl: "https://www.mohw.go.kr/menu.es?mid=a10708010100"
  },
  {
    title: "2026 상병수당 시범사업, 전국이 아니라 14개 지역입니다",
    summary: "업무 외 질병·부상으로 일을 하지 못하는 취업자에게 최대 150일간 수당을 지급하는 제도로, 전국이 아닌 14개 시범지역에서만 운영됩니다.",
    target: "14개 시범지역 거주 또는 근무 취업자, 만 15세 이상 65세 미만으로 건강보험·고용보험·산재보험 가입자 또는 일정 요건의 자영업자",
    category: "금융·생활비",
    status: "현재 확인 가능",
    keywords: "상병수당 상병수당시범사업 아프면쉴권리 건강보험공단",
    blogUrl: "https://300md72.com/entry/2026-%EC%83%81%EB%B3%91%EC%88%98%EB%8B%B9-%EC%8B%9C%EB%B2%94%EC%82%AC%EC%97%85-%EC%A0%84%EA%B5%AD%EC%9D%B4-%EC%95%84%EB%8B%88%EB%9D%BC-14%EA%B0%9C-%EC%A7%80%EC%97%AD%EC%9E%85%EB%8B%88%EB%8B%A4",
    officialUrl: "https://www.mohw.go.kr/menu.es?mid=a10705020300"
  },
  {
    title: "치매약 본인부담금 연 36만원 지원, 소득기준은 지역마다 다르다",
    summary: "치매 진단을 받고 약을 복용 중인 주민에게 진료비·약제비 본인부담금을 월 3만원, 연 36만원 한도로 지원합니다.",
    target: "치매 진단을 받고 치매치료제를 복용 중이며 관할 지자체 소득기준(중위소득 120~140% 등, 지역별 상이)을 충족한 주민",
    category: "의료비",
    status: "현재 확인 가능",
    keywords: "치매치료관리비 치매약본인부담금 치매안심센터 지역별소득기준",
    blogUrl: "https://300md72.com/entry/%EC%B9%98%EB%A7%A4%EC%95%BD-%EB%B3%B8%EC%9D%B8%EB%B6%80%EB%8B%B4%EA%B8%88-%EC%97%B0-36%EB%A7%8C%EC%9B%90-%EC%A7%80%EC%9B%90-%EC%86%8C%EB%93%9D%EA%B8%B0%EC%A4%80%EC%9D%80-%EC%A7%80%EC%97%AD%EB%A7%88%EB%8B%A4-%EB%8B%A4%EB%A5%B4%EB%8B%A4",
    officialUrl: "https://health.suwon.go.kr/sub.asp?page_code=sub050602"
  },
  {
    title: "소아암 의료비 최대 3천만원, 백혈병과 그 외 암 지원금액 다르다",
    summary: "암환자 의료비 중 본인부담금과 비급여 비용을 지원하는 제도로, 성인은 연 최대 300만원, 소아는 암종에 따라 최대 2천만~3천만원까지 지원합니다.",
    target: "성인은 의료급여수급권자·차상위본인부담경감대상자, 소아(18세 미만)는 의료급여수급권자 또는 소득·재산 기준 충족 건강보험가입 가구",
    category: "의료비",
    status: "현재 확인 가능",
    keywords: "소아암지원 백혈병치료비 암환자의료비지원 조혈모세포이식지원",
    blogUrl: "https://300md72.com/entry/%EC%86%8C%EC%95%84%EC%95%94-%EC%9D%98%EB%A3%8C%EB%B9%84-%EC%B5%9C%EB%8C%80-3%EC%B2%9C%EB%A7%8C%EC%9B%90-%EB%B0%B1%ED%98%88%EB%B3%91%EA%B3%BC-%EA%B7%B8-%EC%99%B8-%EC%95%94-%EC%A7%80%EC%9B%90%EA%B8%88%EC%95%A1-%EB%8B%A4%EB%A5%B4%EB%8B%A4",
    officialUrl: "https://www.mohw.go.kr/menu.es?mid=a10703010100"
  },
  {
    title: "가사·간병 방문지원사업 대상과 2026년 본인부담금 정리",
    summary: "요양보호사가 가정을 방문해 세면·식사 보조, 청소, 외출동행 등을 지원하는 돌봄 서비스로, 소득구간에 따라 본인부담금이 달라집니다.",
    target: "만 65세 미만, 2026년 기준중위소득 70% 이하 가구 중 중증질환·희귀난치질환·중증장애·법정보호세대·퇴원 의료급여수급자 등",
    category: "금융·생활비",
    status: "현재 확인 가능",
    keywords: "가사간병방문지원 요양보호사방문서비스 저소득층돌봄서비스 기준중위소득70",
    blogUrl: "https://300md72.com/entry/%EA%B0%80%EC%82%AC%C2%B7%EA%B0%84%EB%B3%91-%EB%B0%A9%EB%AC%B8%EC%A7%80%EC%9B%90%EC%82%AC%EC%97%85-%EB%8C%80%EC%83%81%EA%B3%BC-2026%EB%85%84-%EB%B3%B8%EC%9D%B8%EB%B6%80%EB%8B%B4%EA%B8%88-%EC%A0%95%EB%A6%AC",
    officialUrl: "https://www.mohw.go.kr/menu.es?mid=a10709020300"
  },
  {
    title: "2026 근로장려금 8월 27일 지급 – 조회 방법과 감액 기준 총정리",
    summary: "2025년 귀속 근로·자녀장려금 정기신청분이 법정 기한보다 앞당겨 2026년 8월 27일 지급됩니다.",
    target: "2025년 귀속 근로·자녀장려금 정기신청 대상 가구(단독 2,200만원·홑벌이 3,200만원·맞벌이 4,400만원 소득 미만, 재산 2억4천만원 미만)",
    category: "금융·생활비",
    status: "현재 확인 가능",
    keywords: "근로장려금 지급일 조회방법 감액기준 국세청",
    blogUrl: "https://300md72.com/entry/2026-%EA%B7%BC%EB%A1%9C%EC%9E%A5%EB%A0%A4%EA%B8%88-8%EC%9B%94-27%EC%9D%BC-%EC%A7%80%EA%B8%89-%E2%80%93-%EC%A1%B0%ED%9A%8C-%EB%B0%A9%EB%B2%95%EA%B3%BC-%EA%B0%90%EC%95%A1-%EA%B8%B0%EC%A4%80-%EC%B4%9D%EC%A0%95%EB%A6%AC",
    officialUrl: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2453&cntntsId=7784"
  },
  {
    title: "고유가 피해지원금 사용기한 8월 31일, 잔액 확인 방법 정리",
    summary: "5월에 지급된 고유가 피해지원금 중 못 쓴 잔액이 있다면 2026년 8월 31일 24시까지만 사용할 수 있고, 이후에는 자동으로 소멸됩니다.",
    target: "2026년 5월 18일~7월 3일 신청·지급받은 국민(소득 하위 70% 등, 이미 지급 완료)",
    category: "금융·생활비",
    status: "현재 확인 가능",
    keywords: "고유가피해지원금 사용기한 잔액소멸 소상공인매장 주유소",
    blogUrl: "https://300md72.com/entry/%EA%B3%A0%EC%9C%A0%EA%B0%80-%ED%94%BC%ED%95%B4%EC%A7%80%EC%9B%90%EA%B8%88-%EC%82%AC%EC%9A%A9%EA%B8%B0%ED%95%9C-8%EC%9B%94-31%EC%9D%BC-%EC%9E%94%EC%95%A1-%ED%99%95%EC%9D%B8-%EB%B0%A9%EB%B2%95-%EC%A0%95%EB%A6%AC",
    officialUrl: "https://www.mois.go.kr/frt/bbs/type010/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000008&nttId=125906"
  },
  {
    title: "근로장려금 9월 반기신청, 신청기간·대상·지급액 정리",
    summary: "근로장려금 9월 반기신청이 2026년 9월 1일부터 15일까지 접수됩니다. 신청 대상, 지급액, 12월 선지급 방식과 신청 방법을 정리했습니다.",
    target: "2026년 상반기(1~6월) 근로소득만 있는 근로자(배우자 포함)",
    category: "금융·생활비",
    status: "현재 확인 가능",
    keywords: "근로장려금 9월 반기신청 신청기간 대상 지급액",
    blogUrl: "https://300md72.com/entry/%EA%B7%BC%EB%A1%9C%EC%9E%A5%EB%A0%A4%EA%B8%88-9%EC%9B%94-%EB%B0%98%EA%B8%B0%EC%8B%A0%EC%B2%AD-%EC%8B%A0%EC%B2%AD%EA%B8%B0%EA%B0%84%C2%B7%EB%8C%80%EC%83%81%C2%B7%EC%A7%80%EA%B8%89%EC%95%A1-%EC%A0%95%EB%A6%AC",
    officialUrl: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2453&cntntsId=7784"
  },
  {
    title: "국가장학금 2학기 2차 신청, 9월 9일까지 놓치지 마세요",
    summary: "2026년 2학기 국가장학금 2차 신청이 9월 9일까지 진행됩니다. 1차를 놓친 재학생과 신입생·편입생 대상 신청 자격, 학자금지원구간별 지원금액, 가구원 동의 마감일을 정리했습니다.",
    target: "2학기 신입생·편입생·재입학생·복학생 전체, 재학생은 재학 중 2회 한도의 구제 신청",
    category: "금융·생활비",
    status: "현재 확인 가능",
    keywords: "국가장학금 2학기 2차 신청 9월 9일까지",
    blogUrl: "https://300md72.com/entry/%EA%B5%AD%EA%B0%80%EC%9E%A5%ED%95%99%EA%B8%88-2%ED%95%99%EA%B8%B0-2%EC%B0%A8-%EC%8B%A0%EC%B2%AD-9%EC%9B%94-9%EC%9D%BC%EA%B9%8C%EC%A7%80-%EB%86%93%EC%B9%98%EC%A7%80-%EB%A7%88%EC%84%B8%EC%9A%94",
    officialUrl: "https://www.kosaf.go.kr"
  },
  {
    title: "국민취업지원제도·국민내일배움카드 2026 개편, 무엇이 달라졌나",
    summary: "2026년 국민취업지원제도와 국민내일배움카드 운영 방식이 일부 바뀌었습니다. 훈련참여지원수당 폐지, 구직촉진수당 기준, 훈련비 자비부담 신설 내용을 대상별로 정리했습니다.",
    target: "2026년 국민취업지원제도와 국민내일배움카드 운영 방식이 일부 바뀌었습니다. 훈련참여지원수당 폐지, 구직촉진수당 기준, 훈련비 자비부담 신설 내용을 대상별로 정리했습니다.",
    category: "창업·취업",
    status: "현재 확인 가능",
    keywords: "국민취업지원제도 국민내일배움카드 2026 개편 무엇이 달라졌나",
    blogUrl: "https://300md72.com/entry/%EA%B5%AD%EB%AF%BC%EC%B7%A8%EC%97%85%EC%A7%80%EC%9B%90%EC%A0%9C%EB%8F%84%C2%B7%EA%B5%AD%EB%AF%BC%EB%82%B4%EC%9D%BC%EB%B0%B0%EC%9B%80%EC%B9%B4%EB%93%9C-2026-%EA%B0%9C%ED%8E%B8-%EB%AC%B4%EC%97%87%EC%9D%B4-%EB%8B%AC%EB%9D%BC%EC%A1%8C%EB%82%98",
    officialUrl: "https://www.moel.go.kr/policyitrd/policyItrdView.do?policy_itrd_sn=52"
  },
  {
    title: "2026 청년월세 특별지원, 상시 신청으로 바뀐 자격조건과 신청방법",
    summary: "대상: 만 19~34세, 부모와 따로 거주하는 무주택 청년",
    target: "만 19~34세, 부모와 따로 거주하는 무주택 청년",
    category: "주거",
    status: "현재 확인 가능",
    keywords: "2026 청년월세 특별지원 상시 신청으로 바뀐",
    blogUrl: "https://300md72.com/entry/2026-%EC%B2%AD%EB%85%84%EC%9B%94%EC%84%B8-%ED%8A%B9%EB%B3%84%EC%A7%80%EC%9B%90-%EC%83%81%EC%8B%9C-%EC%8B%A0%EC%B2%AD%EC%9C%BC%EB%A1%9C-%EB%B0%94%EB%80%90-%EC%9E%90%EA%B2%A9%EC%A1%B0%EA%B1%B4%EA%B3%BC-%EC%8B%A0%EC%B2%AD%EB%B0%A9%EB%B2%95",
    officialUrl: "https://www.myhome.go.kr/hws/portal/cont/selectYouthPolicyYouthMonthlySupView.do"
  },
  {
    title: "청년도약계좌 끝났다면 청년미래적금 조건 먼저 확인",
    summary: "청년미래적금은 신규가입이 끝난 청년도약계좌를 대신하는 청년 자산형성 상품입니다. 가입조건, 소득기준, 정부기여금과 12월 추가 모집 관련 확인사항을 정리했습니다.",
    target: "만 19~34세 청년 (병역 이행자는 최대 6년 연령 제외)",
    category: "의료비",
    status: "현재 확인 가능",
    keywords: "청년도약계좌 끝났다면 청년미래적금 조건 먼저 확인",
    blogUrl: "https://300md72.com/entry/%EC%B2%AD%EB%85%84%EB%8F%84%EC%95%BD%EA%B3%84%EC%A2%8C-%EB%81%9D%EB%82%AC%EB%8B%A4%EB%A9%B4-%EC%B2%AD%EB%85%84%EB%AF%B8%EB%9E%98%EC%A0%81%EA%B8%88-%EC%A1%B0%EA%B1%B4-%EB%A8%BC%EC%A0%80-%ED%99%95%EC%9D%B8",
    officialUrl: "https://www.fsc.go.kr/no040101?cnId=2983"
  },
  {
    title: "2026년 실업급여 상한액 인상, 하한액과 함께 달라진 점",
    summary: "대상: 고용보험 가입기간 180일 이상 + 비자발적 퇴사(또는 법정 정당사유가 있는 자발적 퇴사)",
    target: "고용보험 가입기간 180일 이상 + 비자발적 퇴사(또는 법정 정당사유가 있는 자발적 퇴사)",
    category: "창업·취업",
    status: "현재 확인 가능",
    keywords: "2026년 실업급여 상한액 인상 하한액과 함께",
    blogUrl: "https://300md72.com/entry/2026%EB%85%84-%EC%8B%A4%EC%97%85%EA%B8%89%EC%97%AC-%EC%83%81%ED%95%9C%EC%95%A1-%EC%9D%B8%EC%83%81-%ED%95%98%ED%95%9C%EC%95%A1%EA%B3%BC-%ED%95%A8%EA%BB%98-%EB%8B%AC%EB%9D%BC%EC%A7%84-%EC%A0%90",
    officialUrl: "https://edrm.ei.go.kr/ei/eih/cm/hm/main.do"
  },
  {
    title: "2026 근로장려금 반기신청, 9월 15일까지 대상과 신청방법 정리",
    summary: "2026년 근로장려금 반기신청은 9월 1일부터 15일까지 홈택스·손택스에서 접수합니다. 근로소득자 대상 소득·재산 기준과 12월에 35%를 먼저 받는 지급 방식, 신청 절차와 유의사항을 정리했습니다.",
    target: "근로소득만 있는 근로소득자(사업소득·종교인소득자는 반기신청 대상 아님)",
    category: "금융·생활비",
    status: "현재 확인 가능",
    keywords: "2026 근로장려금 반기신청 9월 15일까지 대상과",
    blogUrl: "https://300md72.com/entry/2026-%EA%B7%BC%EB%A1%9C%EC%9E%A5%EB%A0%A4%EA%B8%88-%EB%B0%98%EA%B8%B0%EC%8B%A0%EC%B2%AD-9%EC%9B%94-15%EC%9D%BC%EA%B9%8C%EC%A7%80-%EB%8C%80%EC%83%81%EA%B3%BC-%EC%8B%A0%EC%B2%AD%EB%B0%A9%EB%B2%95-%EC%A0%95%EB%A6%AC",
    officialUrl: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2452&cntntsId=7783"
  },
  {
    title: "자영업자 고용보험료 최대 80% 환급, 상시근로자 5명 미만이면 확인하세요",
    summary: "2026년 소상공인 고용보험료 지원사업은 자영업자 고용보험료의 50~80%를 최대 5년간 환급합니다. 상시근로자 5명 미만 소상공인이 대상이며, 예산 소진 시까지 신청할 수 있습니다.",
    target: "'자영업자 고용보험'에 가입한 소상공인(상시근로자 5명 미만, 제조업·광업·건설업·운수업은 10명 미만)",
    category: "창업·취업",
    status: "현재 확인 가능",
    keywords: "자영업자 고용보험료 최대 80 환급 상시근로자",
    blogUrl: "https://300md72.com/entry/%EC%9E%90%EC%98%81%EC%97%85%EC%9E%90-%EA%B3%A0%EC%9A%A9%EB%B3%B4%ED%97%98%EB%A3%8C-%EC%B5%9C%EB%8C%80-80-%ED%99%98%EA%B8%89-%EC%83%81%EC%8B%9C%EA%B7%BC%EB%A1%9C%EC%9E%90-5%EB%AA%85-%EB%AF%B8%EB%A7%8C%EC%9D%B4%EB%A9%B4-%ED%99%95%EC%9D%B8%ED%95%98%EC%84%B8%EC%9A%94",
    officialUrl: "https://www.bizinfo.go.kr/web/lay1/bbs/S1T122C128/AS/74/view.do?pblancId=PBLN_000000000117022"
  },
  {
    title: "국세 지방세 미환급금 조회 방법, 홈택스 위택스로 확인하기",
    summary: "국세·지방세 미환급금 조회 방법을 정리했습니다. 홈택스 미수령환급금 조회 서비스와 위택스 지방세 환급금 조회로 대상, 5년 조회 기간, ARS·온라인 신청 방법까지 확인할 수 있습니다.",
    target: "부가가치세·종합소득세 등을 신고했거나 근로·자녀장려금을 신청해 환급이 결정됐지만 계좌 오류 등으로 받지 못한 사람(국세), 자동차세·재산세 등 지방세 환급 대상자(지방세)",
    category: "금융·생활비",
    status: "현재 확인 가능",
    keywords: "국세 지방세 미환급금 조회 방법 홈택스",
    blogUrl: "https://300md72.com/entry/%EA%B5%AD%EC%84%B8-%EC%A7%80%EB%B0%A9%EC%84%B8-%EB%AF%B8%ED%99%98%EA%B8%89%EA%B8%88-%EC%A1%B0%ED%9A%8C-%EB%B0%A9%EB%B2%95-%ED%99%88%ED%83%9D%EC%8A%A4%C2%B7%EC%9C%84%ED%83%9D%EC%8A%A4%EB%A1%9C-%ED%99%95%EC%9D%B8%ED%95%98%EA%B8%B0",
    officialUrl: "https://openservice.go.kr/refundInquiry"
  }
];
