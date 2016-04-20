import findWithRegex from 'find-with-regex'

const UL_REGEX = /^\*\s$/g;

export default (contentBlock, callback) => {
  findWithRegex(UL_REGEX, contentBlock, callback);
}
