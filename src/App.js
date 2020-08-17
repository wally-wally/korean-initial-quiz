import SetKeyword from './components/SetKeyword.js';
import WordList from './components/WordList.js';
import { getItem } from './utils/sessionStorage.js';

export default class App {
  constructor($target) {
    const keywords = getItem('recent');
    new SetKeyword({ $target, keywords });
    new WordList({ $target });
  }
}