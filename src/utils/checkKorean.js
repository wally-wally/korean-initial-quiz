export function checkKorean(keyword) {
  let checkKor = /[ㄱ-ㅎ]/;
  return checkKor.test(keyword);
}

export function checkKoreanSpelling(keyword) {
  let checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  return checkKor.test(keyword);
}