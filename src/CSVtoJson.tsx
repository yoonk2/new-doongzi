import Papa from "papaparse";

/**
 * CSV 문자열을 JSON 형식으로 변환하는 함수
 * @param {string} csvString - CSV 데이터를 포함하는 문자열
 * @returns {Object[]} - 변환된 JSON 배열
 */
interface CsvToJsonResult {
  [key: string]: string | number | boolean | null;
}

const csvToJson = (csvString: string): CsvToJsonResult[] => {
  const result = Papa.parse<CsvToJsonResult>(csvString, {
    header: true, // 첫 번째 행을 헤더로 사용
    skipEmptyLines: true, // 빈 줄을 무시
  });
  return result.data; // 파싱된 데이터를 반환
};

export default csvToJson;
