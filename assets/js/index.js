// @ts-nocheck
$(document).ready(function() {
  const location = window.location.href;
  const toVrgorac = $('#toVrgorac');
  const toDebeljak = $('#toDebeljak');
  const initialFPS = $('#fps').get(0).value;
  toVrgorac.get(0).setAttribute('href', createNewUrlWithFPS(`${location}vrgorac`, initialFPS));
  toDebeljak.get(0).setAttribute('href', createNewUrlWithFPS(`${location}debeljak`, initialFPS));

  $('#btn').click(() => {
    const fps = $('#fps').get(0).value;
    const vrgoracHref = toVrgorac.attr('href');
    const debeljakHref = toDebeljak.attr('href');
    toVrgorac.get(0).setAttribute('href', createNewUrlWithFPS(vrgoracHref, fps));
    toDebeljak.get(0).setAttribute('href', createNewUrlWithFPS(debeljakHref, fps));
  });
});

const createNewUrlWithFPS = (url, fps) => {
  const newUrl = new URL(url);
  newUrl.searchParams.set('fps', fps);
  return newUrl.href;
};
