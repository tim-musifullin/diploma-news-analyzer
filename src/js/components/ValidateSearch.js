export class ValidateSearch {
  constructor(phrase) {
    this.phrase = phrase;
  }

  validateInput(word) {
    if(word.length === 0) {
      document.querySelector('.search__error').setAttribute('style', 'display: block');
      return false;
    } else {
      document.querySelector('.search__error').setAttribute('style', 'display: none');
      return true;
    }
  }

  searchInputBlock() {
    document.querySelector('.search__input').setAttribute('disabled', true);
    document.querySelector('.search__button').setAttribute('disabled', 'true');
  }

  searchInputNonBlock() {
    document.querySelector('.search__input').removeAttribute('disabled');
    document.querySelector('.search__button').removeAttribute('disabled');
  }
}
