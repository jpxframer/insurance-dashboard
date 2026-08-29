(() => {
  const box = (el) => { if(!el) return null; const r = el.getBoundingClientRect();
    return { w:+r.width.toFixed(2), h:+r.height.toFixed(2) }; };
  const link = document.querySelector('a[aria-label="SureBase"]');
  const tile = link?.querySelector("span > span");
  const svg = link?.querySelector("svg");
  const word = link?.textContent?.trim();
  return {
    lockup: box(link), tile: box(tile), mark: box(svg), wordmark: word,
    tileBg: tile ? getComputedStyle(tile).backgroundColor : null,
    tileRadius: tile ? getComputedStyle(tile).borderRadius : null,
    hasGloss: tile ? getComputedStyle(tile).boxShadow.includes("inset") : null,
    oldAssetRefs: document.body.innerHTML.includes("redpear"),
  };
})();
