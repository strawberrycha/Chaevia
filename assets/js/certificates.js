(() => {
  const certificateList = document.querySelector("#certificate-list");
  const certificateStatus = document.querySelector("#certificate-status");

  function textElement(tag, text, className = "") {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  function loadCertificates() {
    try {
      const certificates = window.CHAEVIA_CERTIFICATES;
      certificateList.replaceChildren(...certificates.map(({ title, issuer }) => {
        const item = document.createElement("li");
        item.className = "card";
        item.append(textElement("h3", title), textElement("p", issuer || "Online course"));
        return item;
      }));
    } catch {
      certificateStatus.textContent = "Certificates could not be loaded.";
    }
  }

  loadCertificates();
})();
