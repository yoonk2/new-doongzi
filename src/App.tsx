import { useEffect, useState } from "react";
import "./App.css";
import comments from "./comments.json";
import csvToJson from "./CSVtoJson";

const dataCsv = `id,title,tags,description,Related 가지들,imgType
1,Knock Knock: How to Doongzi,전시,둥지의 처음(이자 마지막)으로 개최한 단독 전시. 2022년 9월 월간 〈디자인〉 531호에 약 80*100mm의 분량으로 소개되었다.,2,
2,둥키백과,웹,"‘둥’이라는 한 글자. 둥지 이름의 반절을 차지할 정도로 둥지 정체성의 큰 비중을 차지한다.
‘둥’이라는 글자를 함께 공유하는 여러 단어들을 수집하여 재배치했다.
앞으로는 ‘둥’이라는 글자를 봤을 때 ‘대한민국에서 활동하는 디자인 크루’인 둥지가 가장 먼저 생각났으면 좋겠다는 야심을 담아...",1,gif
3,둥지,둥지,둥지,,
60,둥사이트 시즌 1,웹,"둥지의 첫 웹사이트. 둥지의 처음과 두 번째 전시에서 선보였으며, 둥지의 팬들이 남긴 600여 개의 방명록이 남아있다. 참고로 둥지의 웹사이트 도메인은 doongzi.ga, doongzi.works를 거쳐 현재는 doongzi.kr를 사용하고 있다.",4,png
61,둥사이트 홍보 포스터,작업,둥지의 첫 웹사이트를 홍보하기 위해 제작한 포스터.,,png
4,이화여대 소모임 연합전시,전시,"둥지가 결성 후 처음으로 참여한 전시. 둥지의 이율리가 전시 아이덴티티를, 권윤이 리플렛을 디자인했다.",3,
5,둥지 X 글피 전시,전시,둥지와 디자인 소모임 ‘글피’가 함께 개최한 전시. 2022년 가을 이화 아트파빌리온에서 열렸다.,,
6,둥지 멤버수는? 티셔츠,작업,복잡한 수식이 적힌 티셔츠. 열심히 수식을 계산해보면 둥지의 멤버수인 ‘4’가 도출된다.,39,
7,쪽글 프로젝트,작업,"둥지의 쪽글을 엮은 서적입니다.
–  
분명 처음 시작할 땐 무심코 주인잃은 생각,사념을 만들어버리는 짓이 아까워서 쪽글 한두 줄을 쌓기 시작했지만 원고 작업을 모두 마친지 오래인 지금 돌아와서 봤을 때 저도 모르고 있던, 나 자신이 세상을 바라보는 시각과 살아가는 태도의 궤적을 추적해볼 수 있다는게 새삼 신기합니다.
–  
그럼에도 우리가 글짓기를 멈추지 않는 이유는 사실 별 거 아닌 것들이 모이고 모여 간신히 보냈던 날들이 분명히 있기 때문입니다. 그러니 기록함으로써 아끼는 사람들, 시간들, 그리고 사랑하는 것들을 까먹지 않기 위해 노력해야 합니다.
–
",,png
8,벽돌공,작업,벽돌공이 차곡차곡 벽돌을 쌓듯 아이디어를 쌓는다. 이 책은 둥지의 벽돌공들이 각자의 작업에서 생각을 발산하며 남긴 스케치와 그 흐름을 담은 참조 매뉴얼이다. 회로가 느려진 작업자가 아이디어를 발굴하고 그것들을 원하는 모양으로 조적할 수 있도록 돕는 역할을 한다. 우리가 쌓고 있는 벽돌은 무슨 모양일까? 과연 어떤 집이 탄생할까?,,
9,열받는 매뉴얼,작업,,,
10,번아웃²,작업,"차근차근 풀이 과정을 따라가면 답이 명쾌하게 나오는 수학 문제처럼, 번아웃을 해결할 수는 없을까? 번아웃으로 고통받고 있는 5천만 디자이너들을 위해! 번아웃을 번아웃 시키는 방법을 알려주는 문제집을 만들었다. 이 문제집 한 권만 있다면, 당신도 번아웃을 해결할 수 있을지도?",,jpeg
11,파브르 프로젝트,작업,"둥지의 파브르(Fabre)는 둥지의 정체를 궁금해하시는 분들을 위해 제작된 생물 도감 프로젝트입니다. 멤버 한 명은 관찰자이자 관찰 대상이 되어 도감을 기록하기도 하고, 도감에 기록되기도 합니다. 각 멤버들이 어떤 성격과 생활 습성을 띄고 있는지 확인 해보세요!",,jpeg
12,둥브제,작업,"둥지가 자주 사용하는 단어들을 멤버들이 레터링하고, 김나연이 그를 오브제로 제작한 프로젝트. ‘둥’, ‘쫄’, ‘즐’, ‘킹’ 네 가지의 오브제가 있다.",,
13,"서대문구 연희로 32, 203호",작업실,2022년 9월부터 2024년 8월까지 사용한 세 번째 작업실. 유명 빵집 ‘만동제과’와 이웃이었다.,,
14,"서대문구 연희로 2안길 12, B103호",작업실,2021년 9월부터 2022년 9월까지 사용한 두 번째 작업실.,,
15,강남구 도곡로 37길 50,작업실,2021년 7월부터 2021년 9월까지 사용한 첫 작업실.,,
16,"중구 창경궁로 7, 402호",작업실,"2024년 9월부터 현재까지 사용중인 네 번째 작업실. 디자이너 그룹 ‘콜리’, 디자이너 ‘유지율’과 함께 사용한다.",28,
17,권윤,둥지 멤버,"둥지의 멤버.이 웹사이트를 포함해, 둥지의 웹 작업들을 맡아 하고 있다.",38,
18,이채영,둥지 멤버,둥지의 멤버이자 그래픽 디자이너.,38,
19,김나연,둥지 멤버,둥지의 멤버. 디자인과 건축 공부를 함께 하고 있다.,38,
20,이율리,둥지 멤버,"둥지의 창립자. 2022년 초여름, 인스타그램 스토리에 “같이 작업실 쓸 사람?”이라는 말을 던지며 둥지의 첫 시작을 주도했다.",38,
21,유지율,둥지의 동료,2022년부터 현재까지 둥지와 작업실을 공유하고 있는 디자이너. 둥지의 멤버 ‘김나연’보다 작업실을 사용한 기간이 길다.,16,
22,심지영,둥지의 동료,2023년 4월 4일부터 2024년 3월까지 둥지와 작업실을 공유한 디자이너,,
23,지예안,둥지의 동료,2023년 10월부터 2024년 5월까지 둥지와 작업실을 공유한 디자이너,,
24,김채영,둥지의 동료,2024년 9월부터 현재까지 둥지와 작업실을 공유하고 있는 디자이너이자 둥지와 친밀한 디자이너 그룹 ‘콜리’의 멤버.,28,
25,윤주향,둥지의 동료,2024년 9월부터 현재까지 둥지와 작업실을 공유하고 있는 디자이너이자 둥지와 친밀한 디자이너 그룹 ‘콜리’의 멤버.,28,
26,남유현,둥지의 동료,2024년 9월부터 현재까지 둥지와 작업실을 공유하고 있는 디자이너이자 둥지와 친밀한 디자이너 그룹 ‘콜리’의 멤버.,28,
27,이가경,둥지의 동료,2024년 9월부터 현재까지 둥지와 작업실을 공유하고 있는 디자이너이자 둥지와 친밀한 디자이너 그룹 ‘콜리’의 멤버.,28,
28,콜리,둥지의 동료,둥지와 친밀한 디자이너 그룹,"[24,25,26,27,16]",
35,wrm space,둥지의 전시가 열린 공간,"소란스러움을 지향하는 빈 공간이다. wrm은 이 공간을 통해 저자성을 띤 그래픽 디자이너의 전시나 행사, 동종업계 종사자끼리 주체적 앞날을 도모하는 프로그램 등 공간을 매개로 이뤄지는 디자인·출판 프로젝트를 지원한다. 둥지가 ‘wrm space 대관 지원’에 선정되어 첫 단독 전시를 진행한 공간. 2024년 1월 말 문을 닫아 많은 디자이너들의 아쉬움을 샀다.",1,
,이화 아트파빌리온,둥지의 전시가 열린 공간,"이화여자대학교 정문 근처에 자리했던 작은 갤러리. 둥지의 멤버들이 대학 신입생 시절 첫 과제전을 진행했으며, 2022년 가을 디자인 소모임 ‘글피’와의 합동 전시를 진행했던 공간이다. 2024년 8월 25일 철거되었다.",,
,이화 아트센터,둥지의 전시가 열린 공간,"둥지가 참여한 첫 전시이자, 둥지라는 이름이 처음으로 다수에게 공개된 곳.",,
36,월간 디자인,둥지를 주목한 잡지사,대한민국의 종합 디자인 매거진. 531호에 약 80*100mm의 분량으로 둥지의 전시 〈KNOCK KNOCK: HOW TO DOONGZI〉가 소개되었다.,1,
37,673,둥지와 관련된 숫자,둥지의 인스타그램 팔로워수,,
38,4,둥지와 관련된 숫자,둥지의 멤버수,"[17,18,19,20]",
39,66000,둥지와 관련된 숫자,둥지가 참여한 첫 플리마켓에서 번 돈(단위: 원),6,
40,23854,둥지와 관련된 숫자,둥지 웹사이트의 2024년 11월 서버비,,
41,둥사이트 시즌 2,웹,이 웹사이트.,,
43,https://www.youtube.com/watch?v=oiXTyqaOFnE,둥지가 2024년 11월에 추천한 유튜브 영상,"Leroy Anderson Ritvélin, The Typewriter",,gif
44,쓰레기 중 가장 쓰레기 같은 쓰레기,둥지 멤버의 과반수 이상이 참여한 전시,비주얼 레포트 서울에서 주관하고 두성페이퍼갤러리에서 열린 전시. 둥지의 이율리와 이채영이 ‘슈퍼루키’로 참여했다.,,
45,타닥타닥,둥지 멤버의 과반수 이상이 참여한 전시,"2024 이화여자대학교 디자인학부 졸업전시. 둥지의 이율리가 졸업전시 준비 위원회의 디자인 팀장을, 권윤이 웹사이트 디자인을 맡았다. \n둥지의 이채영, 이율리, 권윤이 전시에 참여했다.",,
57,Ex Libris 꽃,둥지 멤버의 과반수 이상이 참여한 전시,"이화여자대학교 한글타이포그래피학회 꽃의 네 번째 정기 작품전. 2022년 2월 369 예술터에서 열렸다. 둥지의 이율리, 권윤이 참여했으며 권윤이 포스터 디자인을 맡았다.",,
58,"꽃잔치, 글자가옥에서 맞이하는 순년",둥지 멤버의 과반수 이상이 참여한 전시,"이화여자대학교 한글타이포그래피학회 꽃의 다섯 번째 정기 작품전. 2023년 2월 wrm space에서 열렸다. 둥지의 이채영, 이율리, 권윤이 참여했으며 이채영이 포스터 디자인을 맡았다.
-
반갑습니다. 2023년, 꽃이 올겨울 추위를 이겨내고 순년을 맞이하며 〈꽃잔치〉를 베풀게 되었습니다. 이번 정기전에서의 꽃은, 당신이 계묘년(癸卯年)을 무사히 살아가는 데에 도움이 될 만한 가치를 글자에 담아 빚었습니다. 각 전시 공간은 잔치를 베푸는 공간이자 하나의 글자가옥이며, 중심에 있는 사랑채는 한국적인 정서를 꽃의 새로운 해석으로 보여줍니다. 가옥의 다른 방들 또한 글자에 대한 새로운 시선을 담았으니 편히 즐겨주시길 바라겠습니다. 글자로써 건네는 꽃의 기원과 함께 무사태평한 2023년을 보내시기를 소망합니다.",,
46,둥지성분표,작업,"둥지는 어떤 성분으로 구성되어 있을까요?
해시태그로 들어가 자세한 값을 확인해보세요!",,png
47,HOW TO DOONGZI 포스터,작업,"2022년 8월 8일부터 8월 14일까지 열린 둥지의 단독전시 포스터. 전시의 큰 흐름은 둥지가 둥지하는 법을 소개하는 매뉴얼과도 같다. 볼드한 서체, 큰 화살표, 넘버링, 그리고 단순화된 그래픽 등의 요소로써 단독전시와 둥지를 한 장의 설명서 같은 포스터에 담고자 했다.",,
48,아크릴 워크샵,작업,둥지가 직접 그린 도안을 아크릴로 재단하여 염색하는 워크샵입니다. 아크릴의 색상은 염료에 담그는 시간과 염료의 온도에 따라 매번 다르게 입혀진답니다!,,jpeg
49,둥지의 탄생,사건,"2022년 어느 날, 역삼동에서 둥지가 탄생했다.",,jpeg
56,졸업전시 풍선 습격,사건,"2024년 12월 18일, 둥지 3인의 졸업전시에 김나연이 풍선꽃을 만들어 방문한 사건.",,jpeg
59,둥지 재결합,사건,"둥지 멤버들의 교환학생 및 해외 인턴 생활로 떨어져 지내던 둥지가, 2년 만에 완전체로 한국에서 다시 모인 사건.",,
50,어디서 본 적 있을,작업,어디서 본 적 있을 것들을 모아 둥지의 시선으로 재해석했습니다.,,png
51,길빵,작업,"어느 화창한 아침, 둥지는 길바닥에서 일용할 빵을 나눠 먹는다. 누군가가 검지와 중지 사이에 빵을 끼우고선, 길에서 빵먹는 행위를 ""길빵""이라 칭한다. 잘게 부숴 먹던 빵의 형태, 넷이 모여 빵을 씹던 투박한 상황을 레터링으로 표현했다.",,jpeg
52,파브르 패키지,작업,"동기들의 생활상을 관찰하고 기록하는 매거진 프로젝트인 파브르 프로젝트를 위한 패키지 디자인이다.
3가지 박스는 각각 관찰을 하는데에 필요한 키트 및 굿즈 박스를 제작하는 상황으로 가정했다.",,jpeg
53,둥티셔츠,작업,전시 아이덴티티 [KNOCK KNOCK: 록록 綠錄]의 레터링을 티셔츠에 실크스크린으로 찍어낸 프로젝트입니다. Artivive 앱을 실행해 티셔츠를 비춤으로써 전시의 모션 포스터를 확인할 수 있습니다.,,jpeg
54,알.,작업,둥지가 품고 있는 알이다. 어떤 형태로든지 변신할 수 있는 잠재력을 지녔다. 알을 깨고 나올 무언가를 기대하시라.,,png
55,둥지의 둥지,작업,"둥지가 생각하는 이상적인 작업실을 설계하는 프로젝트 입니다. 연희동 작은 작업실에서 둥고둥락 하는 둥지들을 위해 멋드러진 가상의 아뜰리에를 디자인했습니다. 사내 밴드 패스파인더스의 공연장, 스케이트 보드를 탈 수 있는 긴 복도, 그리고 옥상 정원까지 !",,`;
const data = csvToJson(dataCsv);
const symbols = [
  "🫠",
  "🫡",
  "🫢",
  "🫣",
  "🫤",
  "🫥",
  "🫦",
  "🫧",
  "🫨",
  "🥶",
  "🥵",
  "🥴",
  "🙉",
  "💝",
  "🧞",
  "💥",
  "💭",
  "💦",
  "🧖",
  "🧗",
  "🧘",
  "🧚",
  "🧛",
  "🧜",
  "🧝",
  "🧞",
  "🧟",
  "🧠",
  "🧡",
  "🩵",
  "🩶",
  "🩷",
  "🩸",
  "🩹",
  "🩺",
  "🪀",
  "🧢",
  "🧣",
  "🧤",
  "🧥",
  "🧦",
  "🧨",
  "🧩",
  "🧪",
  "🧫",
  "🧬",
  "🧭",
  "🤡",
  "🪺",
  "🪹",
  "🐣",
  "🐤",
  "🐥",
  "🐦",
  "🐧",
  "🕊️",
  "🖕",
];

const getRandomHEX = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const designs = ["randomTextColor", "commas", "tree", "images", "symbols"];
// const designs = ["symbols"];
function App() {
  const [design, setDesign] = useState(designs[0]);

  useEffect(() => {
    setDesign(designs[Math.floor(Math.random() * designs.length)]);
  }, []);

  const changeDesign = () => {
    // reset scroll position
    window.scrollTo(0, 0);
    const currentIndex = designs.indexOf(design);
    setDesign(designs[currentIndex + 1] || designs[0]);
  };

  useEffect(() => {
    switch (design) {
      case "randomColors":
        document.body.style.backgroundColor = "white";
        document.body.style.color = "green";

        data.sort((a, b) => (a.title?.toString().length || 0) - (b.title?.toString().length || 0));
        comments.sort((a, b) => a.content.toString().length - b.content.toString().length);
        break;
      // Add more cases here if needed for other designs
      case "commas":
      case "tree":
        // sort in alphabetical order
        data.sort((a, b) => (a.title?.toString() || "").localeCompare(b.title?.toString() || ""));
        comments.sort((a, b) => a.content.toString().localeCompare(b.content.toString()));
        break;

      default:
        data.sort((a, b) => (a.title?.toString().length || 0) - (b.title?.toString().length || 0));
        data.sort((a, b) => (a.tags?.toString() || "").localeCompare(b.tags?.toString() || ""));
        data.sort((a, b) => (a.tags?.toString().length || 0) - (b.tags?.toString().length || 0));
        break;
    }
  }, [design]);
  return (
    <>
      <main>
        {design === "default" || design === "randomColors" || design === "randomTextColor" ? (
          <ul
            className="rows"
            style={
              {
                // color : "",
                // mixBlendMode: design === "randomColors" ? "difference" : undefined,
              }
            }>
            {data
              // .sort((a, b) => a.tags.localeCompare(b.tags))
              .map((item, index) => (
                <li
                  key={item.id as number}
                  className="row"
                  onMouseEnter={
                    design === "randomColors"
                      ? (e) => {
                          e.currentTarget.style.color = e.currentTarget.style.color === "red" ? "green" : "red";
                        }
                      : undefined
                  }>
                  <p
                    className={`${index > 0 && data[index - 1].tags === item.tags ? "" : "firsttag"} listName`}
                    style={{
                      color: design === "randomTextColor" ? getRandomHEX() : "",
                    }}>
                    {item.tags}
                  </p>
                  <p
                    className="title"
                    style={{
                      color: design === "randomTextColor" ? getRandomHEX() : "",
                    }}>
                    {item.title},
                  </p>
                  <p
                    className="description"
                    style={{
                      color: design === "randomTextColor" ? getRandomHEX() : "",
                    }}>
                    {item.description}
                  </p>
                  <div className="image">
                    <img
                      src={`project-images/${item.id}.${item.imgType ? item.imgType : "jpg"}`}
                      alt={item.title ? item.title.toString() : "No title"}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </li>
              ))}
            {comments.map((comment, index) => (
              <li
                key={index}
                className="row comment"
                onMouseEnter={
                  design === "randomColors"
                    ? (e) => {
                        e.currentTarget.style.color = e.currentTarget.style.color === "red" ? "green" : "red";
                      }
                    : undefined
                }>
                <p
                  className={`${index == 0 ? "firsttag" : ""}listName`}
                  style={{
                    color: design === "randomTextColor" ? getRandomHEX() : "",
                    textAlign: design === "randomColors" ? "right" : "left",
                  }}>
                  둥지의 첫 웹 방명록에 작성된 댓글
                </p>
                <p
                  className="title"
                  style={{
                    color: design === "randomTextColor" ? getRandomHEX() : "",
                  }}>
                  {comment.content},
                </p>
                <p
                  className="description"
                  style={{
                    color: design === "randomTextColor" ? getRandomHEX() : "",
                  }}>
                  {new Date(comment.created_at)
                    .toLocaleString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })
                    .replace(".", "년 ")
                    .replace(".", "월 ")
                    .replace(".", "일 ")
                    .replace(":", "시 ") + "분에 작성된 댓글"}
                </p>
                <div></div>
              </li>
            ))}
          </ul>
        ) : design === "commas" ? (
          <div className="commas">
            {data.map((item) => (
              <div
                key={item.id as number}
                className="item"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = e.currentTarget.style.color === "red" ? "green" : "red";
                }}>
                {item.title},&nbsp;
                <div className="detail">
                  <div className="text">
                    <p>{item.tags}</p>
                    <p>{item.description}</p>
                  </div>
                  <img
                    src={`project-images/${item.id}.${item.imgType ? item.imgType : "jpg"}`}
                    alt={item.title?.toString()}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="commacomments">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="item comment"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = e.currentTarget.style.color === "red" ? "green" : "red";
                  }}>
                  {comment.content},&nbsp;
                  <div className="detail">
                    <div className="text">
                      <p>둥지의 첫 웹 방명록에 작성된 댓글</p>
                      <p>
                        {new Date(comment.created_at)
                          .toLocaleString("ko-KR", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })
                          .replace(/\./g, "년 ")
                          .replace(" ", "월 ")
                          .replace(" ", "일 ")
                          .replace(":", "시 ") + "분에 작성된 댓글"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : design === "tree" ? (
          <>
            <div className="tree">
              {data.map((item) => (
                <div key={item.id as number} className="item">
                  <div className="text">
                    <p className="title">{item.title}</p>
                    <p className="tags-description">
                      <span className="tags">
                        <span className="asterisk">*</span>
                        {item.tags}
                        <span className="asterisk">*</span>
                      </span>{" "}
                      {item.description}
                    </p>
                  </div>
                  <img
                    src={`project-images/${item.id}.${item.imgType ? item.imgType : "jpg"}`}
                    alt={item.title?.toString()}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              ))}
              <div className="tree comments">
                {comments.map((comment, index) => (
                  <div key={index} className="comment">
                    {comment.content},&nbsp;
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : design === "images" ? (
          <div className="images">
            {data.map((item) => (
              <div key={item.id as number} className="item">
                <img
                  src={`project-images/${item.id}.${item.imgType ? item.imgType : "jpg"}`}
                  alt={item.title?.toString()}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const nextSibling = e.currentTarget.nextElementSibling as HTMLElement | null;
                    if (nextSibling) {
                      nextSibling.style.display = "block";
                    }
                    const nextnextSibling = e.currentTarget.nextElementSibling
                      ?.nextElementSibling as HTMLElement | null;
                    if (nextnextSibling) {
                      nextnextSibling.style.width = "100px";
                    }
                  }}
                />
                <div className="imgfallback">{/* <p>{item.title}</p> */}</div>
                <div className="detail">
                  <img
                    src={`project-images/${item.id}.${item.imgType ? item.imgType : "jpg"}`}
                    alt={item.title?.toString()}
                    style={{ opacity: 0, backgroundColor: "red" }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const nextSibling = e.currentTarget.nextElementSibling as HTMLElement | null;
                      if (nextSibling) {
                        nextSibling.style.display = "block";
                      }
                      const nextnextSibling = e.currentTarget.nextElementSibling
                        ?.nextElementSibling as HTMLElement | null;
                      if (nextnextSibling) {
                        nextnextSibling.style.width = "100px";
                      }
                    }}
                  />
                  <div className="detail-text">
                    <p className="title">
                      {item.title} <span className="tags">[{item.tags}]</span>
                    </p>

                    <p className="description">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : design === "symbols" ? (
          <p className="symbols">
            {data
              // .sort((a, b) => (a.title?.toString().length || 0) - (b.title?.toString().length || 0))
              .map((item) => (
                <span key={item.id as number} className="item">
                  <span className="title-text-symbol">
                    <span className="title-text-cont">
                      {item.title
                        ?.toString()
                        .split("")
                        .map((char, index) => {
                          if (char === " ") {
                            return (
                              <span key={index} className="every-char">
                                <span key={index} className="title-text title-text-space"></span>
                                <span key={index} className="title-symbol">
                                  {symbols[Math.floor(Math.random() * symbols.length)]}
                                </span>
                              </span>
                            );
                          } else {
                            return (
                              <span key={index} className="every-char">
                                <span
                                  key={index}
                                  className="title-text"
                                  // ref={titleTextRef.current ? titleTextRef.current[index] : null}
                                >
                                  {char}
                                </span>
                                <span key={index * 100} className="title-symbol">
                                  {symbols[Math.floor(Math.random() * symbols.length)]}
                                </span>
                              </span>
                            );
                          }
                        })}
                    </span>
                    {/* {item.title
                      ?.toString()
                      .split("")
                      .map((char, index) => (
                        <span key={index} className="title-symbol">
                          {[10, 15, 20, 25, 28, 30, 32, 35, 36, 40].includes(index) || char === " "
                            ? ""
                            : symbols[Math.floor(Math.random() * symbols.length)]}
                        </span>
                      ))} */}
                  </span>
                </span>
              ))}
            <span className="item">
              <span className="every-char">
                <span className="title-text title-text-space">둥</span>
                <span className="title-symbol">🪺</span>
              </span>
              <span className="every-char">
                <span className="title-text title-text-space">지</span>
                <span className="title-symbol">🐣</span>
              </span>
              <span className="every-char">
                <span className="title-text title-text-space">는</span>
                <span className="title-symbol">🐦</span>
              </span>
              <span className="every-char">
                <span className="title-text title-text-space">멋</span>
                <span className="title-symbol">💌</span>
              </span>
              <span className="every-char">
                <span className="title-text title-text-space">집</span>
                <span className="title-symbol">🏂</span>
              </span>
              <span className="every-char">
                <span className="title-text title-text-space">니</span>
                <span className="title-symbol">🧑‍🌾</span>
              </span>
              <span className="every-char">
                <span className="title-text title-text-space">다</span>
                <span className="title-symbol">🪺</span>
              </span>
            </span>
          </p>
        ) : null}
        <button className="change-design-btn" onClick={changeDesign}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#000000" viewBox="0 0 256 256">
            <path d="M216,48V88a8,8,0,0,1-16,0V67.31L156.28,111A8,8,0,0,1,145,99.72L188.69,56H168a8,8,0,0,1,0-16h40A8,8,0,0,1,216,48Zm-8,112a8,8,0,0,0-8,8v20.69L53.66,42.34A8,8,0,0,0,42.34,53.66L188.69,200H168a8,8,0,0,0,0,16h40a8,8,0,0,0,8-8V168A8,8,0,0,0,208,160ZM99.72,145,42.34,202.34a8,8,0,0,0,11.32,11.32L111,156.28A8,8,0,0,0,99.72,145Z"></path>
          </svg>
        </button>
      </main>
      <style>
        {`
       ${Array.from(
         { length: 100 },
         (_, i) => `
       .every-char:nth-child(${i + 1}) > .title-symbol,
       .every-char:nth-child(${i + 1}) > .title-text {
         transition-delay: ${i * 0.1}s;
       }`
       ).join("")}
       `}
      </style>
    </>
  );
}

export default App;
