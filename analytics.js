(function () {
  const id = window.SITE_CONFIG && window.SITE_CONFIG.gaMeasurementId;
  if (!id || !/^G-[A-Z0-9]+$/.test(id)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", id, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
})();
