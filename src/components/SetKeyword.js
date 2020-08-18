import { checkKorean } from '../utils/checkKorean.js';
import { doubleConsonants } from '../utils/doubleConsonants.js';
import { setItem, getItem, removeItem } from '../utils/sessionStorage.js';

export default class SetKeyword {
  constructor({ $target, keywords }) {
    this.header = document.createElement('header');
    this.recentKeywords = keywords;

    $target.appendChild(this.header);

    this.render();
  }

  validKoreanInitial(value) {
    if (value.length >= 2) {
      alert('한글 초성 1자만 입력할 수 있습니다.');
      return value.charAt(0);
    }
    if (doubleConsonants(value)) {
      alert('쌍자음이나 겹자음은 입력할 수 없습니다.');
      return '';
    }
    if (value) {
      if (!checkKorean(value)) {
        alert('한글 초성만 입력 가능합니다.');
        return '';
      }
    }
  }

  initForm() {
    document.querySelectorAll('.keyword-box').forEach(elem => {
      elem.value = '';
    })
  }

  showNowKeyword(keyword) {
    const nowKeywordWrapper = document.querySelector('.now-keyword-wrapper');

    const nowKeyword = document.createElement('span');
    nowKeyword.className = 'now-keyword';
    nowKeyword.innerText = keyword;

    const resetButton = document.createElement('button');
    resetButton.innerText = 'Reset';
    resetButton.addEventListener('click', () => {
      this.toggleShowKeywordBox('block', 'none');
      document.querySelector('.now-keyword-wrapper').innerHTML = '';
      removeItem('wordList');
      document.querySelector('.word-list').innerHTML = '';
    })
    
    nowKeywordWrapper.appendChild(nowKeyword);
    nowKeywordWrapper.appendChild(resetButton);
  }

  toggleShowKeywordBox(displayKeywordBox, displayNowKeyword) {
    const keywordBoxWrapper = document.querySelector('.keyword-box-wrapper');
    const nowKeywordWrapper = document.querySelector('.now-keyword-wrapper');
    keywordBoxWrapper.style.display = displayKeywordBox;
    nowKeywordWrapper.style.display = displayNowKeyword;
  }

  showRecentKeywords() {
    const recentKeywordWrapper = document.querySelector('.recent-keyword-wrapper');
    recentKeywordWrapper.innerHTML = '<span>최근 검색어: </span>';
    this.recentKeywords.map(keyword => {
      const keywordTag = document.createElement('span');
      keywordTag.className = 'recent-keyword';
      keywordTag.innerText = keyword;
      recentKeywordWrapper.appendChild(keywordTag);
    })
  }

  render() {
    this.header.innerHTML = '<h1>초성 퀴즈</h1>';

    const wrapper = document.createElement('form');
    wrapper.className = 'keyword-box-wrapper';

    const inputKeywordBox = document.createElement('input');
    inputKeywordBox.className = 'keyword-box keyword-one';

    const inputKeywordBox2 = document.createElement('input');
    inputKeywordBox2.className = 'keyword-box keyword-two';

    const setButton = document.createElement('button');
    setButton.innerText = 'Set';
    
    inputKeywordBox.addEventListener('keyup', e => {
      let newValue = this.validKoreanInitial(e.target.value);
      if (newValue !== undefined) {
        e.target.value = newValue;
      }
    })

    inputKeywordBox2.addEventListener('keyup', e => {
      let newValue = this.validKoreanInitial(e.target.value);
      if (newValue !== undefined) {
        e.target.value = newValue;
      }
    })

    wrapper.addEventListener('submit', e => {
      e.preventDefault();

      const firstKeyword = document.querySelector('.keyword-one').value;
      const secondKeyword = document.querySelector('.keyword-two').value;
      let keyword = firstKeyword + secondKeyword;
      if (!firstKeyword.length || !secondKeyword.length) {
        alert('한글 초성 2자를 입력해주세요.');
        return;
      }
      if (!this.recentKeywords.includes(keyword)) {
        if (this.recentKeywords.length >= 5) {
          this.recentKeywords.shift();
        }
        this.recentKeywords.push(keyword);
        setItem('recent', this.recentKeywords);
      }
      setItem('nowKeyword', keyword);

      this.showNowKeyword(keyword);
      this.toggleShowKeywordBox('none', 'block');

      this.showRecentKeywords(); 

      this.initForm();
    })

    wrapper.appendChild(inputKeywordBox);
    wrapper.appendChild(inputKeywordBox2);
    wrapper.appendChild(setButton);

    const nowKeywordWrapper = document.createElement('div');
    nowKeywordWrapper.className = 'now-keyword-wrapper';

    const recentKeywordWrapper = document.createElement('div');
    recentKeywordWrapper.className = 'recent-keyword-wrapper';
    
    this.header.appendChild(wrapper);
    this.header.appendChild(nowKeywordWrapper);
    this.header.appendChild(recentKeywordWrapper);

    this.showRecentKeywords();
    if (getItem('nowKeyword')) {
      this.showNowKeyword(getItem('nowKeyword'));
      this.toggleShowKeywordBox('none', 'block');
    }
  }
}