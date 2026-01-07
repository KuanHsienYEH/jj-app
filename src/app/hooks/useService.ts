import { useMemo } from "react";
import { Service } from "@/types/service";
//import { ApiResponse } from "@/types/api";

//const API_URL = "/api/service/get-serviceData";



const serviceData: Service[] = [
  {
    title: "中高階獵才服務",
    thumbnail: "/images/profile.png",
    subTitle: "專業主管甄選，確保企業人才匹配度",
    content: '我們的中高階獵才服務涵蓋多個產業，專注於尋找具備領導力、策略思維與行業專業的關鍵人才。我們採用精準篩選、深度訪談等專業評估方式，確保推薦的候選人不僅符合企業的專業需求，更能與企業文化契合，為組織帶來長遠價值。同時，我們嚴格遵循高度保密機制，確保所有企業資訊與人才資料均受到妥善保護。從人才搜尋、篩選到推薦與面試，全流程均在安全、保密的環境下進行，讓企業與候選人皆能安心合作。',
  },
  {
    title: "人才派遣",
    thumbnail: "/images/schedule.png",
    subTitle: "快速派遣解決企業臨時需求，彈性靈活",
    content: '提供短期性、季節性及專業技術人員的人力派遣服務，協助企業靈活調度人力，降低管理成本，並專注於核心業務。從人才招募與篩選，到入薪資發放、行政作業，一站式服務確保流程順暢無憂。滿足企業對彈性用工的需求，作為發掘專業人才的管道，為團隊注入新動能。無論是短期專案、人力補充，或特定技術支援，都能提供靈活且高效的解決方案，助企業在競爭市場中保持優勢。讓人力運用更具彈性，讓企業發展更具競爭力！',
  },
  {
    title: "正職代招",
    thumbnail: "/images/hiring.png",
    subTitle: "專業招聘服務，找到最佳人選",
    content: '為企業招募優秀的正職團隊成員，協助網羅各產業的專業人才，成為企業長期發展的可靠夥伴。我們的服務涵蓋大規模人才招募、專業技術人員招募，以及企業正式員工的招聘，職缺類別包括業務、行銷、客服、人資、行政、會計、總務、資訊技術工程師及助理職務等。此外，我們也提供客製化招募方案，滿足企業多元且精準的人才需求。',
  },
  {
    title: "人力資源外包服務",
    thumbnail: "/images/payment-day.png",
    subTitle: "簡化人事行政，專注核心發展",
    content: '我們提供全面的人力資源外包服務，幫助企業簡化行政流程，專注於核心業務。服務內容包括勞健團保的加退保、薪資計算與發放、扣繳憑單處理、薪資保險查詢等。我們提供單一窗口服務，確保高效解決您的每一項需求，讓您無後顧之憂。',
  },
  {
    title: "教育訓練",
    thumbnail: "/images/training.png",
    subTitle: "企業內訓課程，提升員工技能",
    content: '企業內訓課程，提升員工技能。我們提供多元化的培訓方案，專注於個人及團隊的專業發展，從而提高工作效率和團隊協作能力。豐富的課程內容涵蓋管理、溝通、領導技巧等，確保您的員工持續成長，應對未來挑戰。',
  },
  {
    title: "職涯諮詢",
    thumbnail: "/images/goal.png",
    subTitle: "專業職涯指導，助您職場進階",
    content: '職涯諮詢，專業職涯指導，助您職場進階。與我們一同探索職涯發展之路，解析個人優勢，制定有效計畫，提供專業指導，助您實現職場目標，成就更卓越的事業生涯。',
  },
];

export function useService() {
  const services = useMemo(() => serviceData, []);
  return { services };
}
