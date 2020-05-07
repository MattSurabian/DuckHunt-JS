const urlQueryString = new URLSearchParams(window.location.search);

function parseQueryParamAsInt(param) {
  return parseInt(urlQueryString.get(param), 10);
}

module.exports.parseLevelQueryString = function() {
  return {
    id: -1,
    title: urlQueryString.get('title') || 'Generated Level',
    waves: parseQueryParamAsInt('waves') || 1,
    ducks: parseQueryParamAsInt('ducks') || 1,
    pointsPerDuck: parseQueryParamAsInt('points') || 100,
    speed: parseQueryParamAsInt('speed') || 8,
    bullets: parseQueryParamAsInt('bullets') || 100,
    radius: parseQueryParamAsInt('radius') || 60,
    time: parseQueryParamAsInt('time') || 30
  };
};

module.exports.urlContainsLevelData = function() {
  return window.location.href.indexOf('?') !== -1;
};