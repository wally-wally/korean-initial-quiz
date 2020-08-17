import { checkKoreanSpelling } from '../utils/checkKorean.js';
import { getItem, setItem } from '../utils/sessionStorage.js';
import { checkSameInitial } from '../utils/checkSameInitial.js';

export default class WordList {
  constructor({ $target }) {
    this.wordListWrapper = document.createElement('section');
    this.wordList = document.createElement('ul');

    $target.appendChild(this.wordListWrapper);

    this.render();
  }

  validKoreanInitial(value) {
    if (value.length >= 3) {
      alert('세 글자 이상 단어를 작성할 수 없습니다.');
      return value.slice(0, 2);
    }
    if (value) {
      if (!checkKoreanSpelling(value)) {
        alert('한글 초성만 입력 가능합니다.');
        return '';
      }
    }
  }

  showWordList(words) {
    this.wordList.innerHTML = '';
    words.map(word => {
      const wordTag = document.createElement('li');
      wordTag.className = 'word';
      wordTag.innerText = word;
      this.wordList.appendChild(wordTag);
    })
  }

  render() {
    // 한글 단어 입력 form 구성
    const inputWordWrapper = document.createElement('form');
    inputWordWrapper.className = 'input-word-wrapper';

    const inputWordBox = document.createElement('input');
    inputWordBox.className = 'input-word-box';

    const addButton = document.createElement('button');
    addButton.innerText = '등록';

    inputWordBox.addEventListener('keyup', e => {
      let newValue = this.validKoreanInitial(e.target.value);
      if (newValue !== undefined) {
        e.target.value = newValue;
      }
    })

    inputWordWrapper.addEventListener('submit', e => {
      e.preventDefault();

      const inputWord = inputWordBox.value;
      const extractInitial = checkSameInitial(inputWord);
      const nowKeywordInitial = getItem('nowKeyword');
      if (!getItem('nowKeyword')) {
        alert('기준 초성을 먼저 작성해주세요.');
        return
      }
      const extractInitialASCIICode = extractInitial.split('')
        .map(str => str.charCodeAt(0)).join('-')
      const nowKeywordASCIICode = nowKeywordInitial.split('')
        .map(str => str.charCodeAt(0)).join('-')
      if (extractInitialASCIICode == nowKeywordASCIICode) {
        let words = getItem('wordList');
        if (words.includes(inputWord)) {
          alert('이미 등록된 단어입니다.');
          return
        }
        words.push(inputWord);
        setItem('wordList', words);
        inputWordBox.value = '';
        this.showWordList(getItem('wordList'));
      } else {
        alert('초성이 일치하지 않습니다.');
      }
    })

    inputWordWrapper.appendChild(inputWordBox);
    inputWordWrapper.appendChild(addButton);

    // 저장된 단어 리스트 표시
    this.showWordList(getItem('wordList'));

    this.wordListWrapper.appendChild(inputWordWrapper);
    this.wordListWrapper.appendChild(this.wordList);
  }
}