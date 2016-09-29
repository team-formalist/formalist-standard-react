/**
 * Parse a regex from a string.
 * @param  {String} format A regex defined as a string. Will turn '/foo/gi'
 * into /foo/gi
 * @return {RegExp} Parsed regex
 */
export default function parseRegexFromString(format) {
  if (format instanceof RegExp) {
    return format;
  } else {
    var matches = format.match(/^\/(.+)(?:\/([gimy]+)?)/);
    return new RegExp(matches[1], matches[2]);
  }
}
