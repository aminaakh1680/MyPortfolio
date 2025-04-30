import React from "react";
import ProjectStack from "../components/ProjectStack";
import project1 from "../assets/project1.jpg";
import project2 from "../assets/project2.jpeg";
import project3 from "../assets/project3.png";
import project4 from "../assets/project4.jpg";
import project5 from "../assets/project5.jpg";

interface ProjectsProps {
  setIsDetailOpen: (open: boolean) => void;
}

const Projects: React.FC<ProjectsProps> = ({ setIsDetailOpen }) => {
  const projects = [
    {
      id: 1,
      title: "DIET buddy",
      shortDesc: "식당 관리 웹웹",
      image: project1, // 이 경로도 실제 이미지가 존재해야 함!
      details: {
        description:
          "식당 관리를 위한 사용자 기반 웹입니다. 사용자가 개인 정보를 입력하고, 목표를 설정하면 목표값에 맞게 식당 플랜을 만들어 줍니다. ",
        stack: ["Javascript", "Css", "ejs", "Mysql", "mmm", "mmm"],
        github: "https://github.com/aminaakh1680/DietBuddy",
        type: "웹사이트",
        retrospective:
          "한 페이지에 내용이 많을 경우 반응형을 생각해서 개발해야 한다는 것을 알게 되었습니다. 개발을 한다음 반응형 처리하려니까 요소마다 각 각 다르게 동작하는 경우가 생겼습니다. ",
      },
    },
    {
      id: 2,
      title: "Workflow",
      shortDesc: "협업을 위한 웹사이트",
      image: project2,
      details: {
        description:
          "이 웹사이트를 통해 방을 만들수 있고, 참여할수도 있습니다. 방 전체 채팅 기능이 있고, 투두를 통해 프로젝트를 관리할수 있습니다.",
        stack: ["Typescript", "Express", "Mysql", "node.js", "bootstrap"],
        github: "https://github.com/TeamFiveAct",
        type: "웹사이트",
        retrospective:
          "typescript 를 처음 접했기에 중간 중간 오류가 많이 발생했고, 개발후 배포할 때 작동 안되는 기능들이 있어 어려움을 겪었습니다. 개발을 하는 과정에 있어 서버랑 연동잘 하고, 배포 테스트도 자주 해야 하겠다는 것을 배웠습니다. ",
      },
    },
    {
      id: 3,
      title: "점자 블록 인식",
      shortDesc: "시각장애인을 위한 점자블록 인식 시스템",
      image: project3,
      details: {
        description:
          "시각장애인을 위한 점자블록 , 횡당보도, 볼라드 인식 시스템을 구현해봤습니다. ",
        stack: ["python"],
        github: "https://github.com/aminaakh1680/Walking-Assistant-for-Blind",
        type: "연구",
        retrospective:
          "점자블록, 횡당보도, 볼라드 데이터가 매우 부족했습니다. 그리고 카메라와 점자블록간의 거리 측정하는데 여러움이 있었고, 화면에 여러개의 점자블록이 있을 경우 음성 안내가 반복되는게 복잡했습니다.",
      },
    },
    {
      id: 4,
      title: "감정 인식",
      shortDesc: "여러 각도에서 촬영된 얼굴 감정 인식 기능",
      image: project4,
      details: {
        description:
          "모델을 통해 3가지 각도에서 사람 얼굴을 보고 감정을 인식하는 기능을 개발해 봤습니다. ",
        stack: ["python"],
        github: "https://github.com/aminaakh1680/FER",
        type: "연구",
        retrospective:
          "각도 별로 촬영된 데이터가 없어서 기준 데이터셋을 임의로 각도별로 분류해서 학습시켰지만 정확도가 매우 낮은 편입니다. 좀 더 확실한 데이터셋이 있다면 좋은 결과를 얻을 수 있을 것 같습니다.",
      },
    },
    {
      id: 5,
      title: "시민 정서 분석",
      shortDesc: "SNS를 통한 시민 정서 분석 빅데이터 연구",
      image: project5,
      details: {
        description:
          "대학교에 다닐 때 개별연구로 진행한 프로젝트입니다. 인스타그램에서 특정 해시택을 검색후 나오는 사진의 내용 및 댓글들을 크롤링해서 textblob, flair, vader 등 분석 방법을 활용해 시민 정서를 분석해봤습니다. ",
        stack: ["Python"],
        github: "https://github.com/aminaakh1680/analysisofsns",
        type: "연구",
        retrospective:
          "인스타그램에서 특정 해시택을 검색해서 크롤링했지만 인스타 검색후 나오는 글들이 한계가 있었습니다. 저는 일단 해시택을 조금씩 바꿔가면서 크롤링을 진행했지만 좀 더 다른 방법을 찾아야겠다는 생각이 들었습니다.",
      },
    },
  ];
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        background: "transparent",
      }}
    >
      <ProjectStack projects={projects} setIsDetailOpen={setIsDetailOpen} />
    </div>
  );
};

export default Projects;
