/* Wire — YouTube embed click-to-play (GDPR-safe).
   Thumbnail loads statically. Iframe only loads on click. */
document.addEventListener("click", function (e) {
  var el = e.target.closest(".yt-embed");
  if (!el) return;
  var id = el.getAttribute("data-id");
  if (!id) return;
  var iframe = document.createElement("iframe");
  iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1";
  iframe.setAttribute("allow", "autoplay; encrypted-media");
  iframe.setAttribute("allowfullscreen", "");
  iframe.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;border:0";
  el.innerHTML = "";
  el.appendChild(iframe);
});
