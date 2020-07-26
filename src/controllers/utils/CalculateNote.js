module.exports = function (note_alt, request) {
  if (note_alt) {
    const note = Number(note_alt) + Number(request);

    return (note / 2).toPrecision(2);
  } else {
    return Number(request).toPrecision(2);
  }
};
