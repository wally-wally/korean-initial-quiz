const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
export function checkSameInitial(keyword) {
  let str = '';
  for (let i = 0; i < keyword.length; i++) {
    const ga = 44032;
    let uni = keyword[i].charCodeAt(0);
    uni -= ga;
    str += f[parseInt(uni / 588)];
  }
  console.log(str)
  return str;
}