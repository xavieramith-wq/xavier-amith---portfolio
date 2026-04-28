import { useEffect, useMemo, useState } from "react";

const DEFAULT_CERTIFICATE_IMAGE =
  "/images/certificates/certificate-placeholder.svg";

function getCertificateDownloadInfo(certificate) {
  const href =
    certificate?.file ||
    certificate?.downloadUrl ||
    certificate?.image ||
    DEFAULT_CERTIFICATE_IMAGE;
  const normalizedUrl = href.split("#")[0].split("?")[0];
  const extensionMatch = normalizedUrl.match(/\.([a-zA-Z0-9]+)$/);
  const extension = extensionMatch ? extensionMatch[1].toLowerCase() : "png";
  const safeName =
    certificate?.name
      ?.trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "certificate";

  return {
    href,
    fileName: certificate?.fileName || `${safeName}.${extension}`,
  };
}

export default function CertificationsSection({
  certifications,
  setSectionRef,
}) {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const downloadInfo = useMemo(() => {
    if (!selectedCertificate) {
      return null;
    }

    return getCertificateDownloadInfo(selectedCertificate);
  }, [selectedCertificate]);

  useEffect(() => {
    if (!selectedCertificate) {
      return undefined;
    }

    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        setSelectedCertificate(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscapeClose);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [selectedCertificate]);

  const closeModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <section
      id="certifications"
      ref={setSectionRef("certifications")}
      className="section-shell cert-showcase-section scroll-mt-24"
      data-section
    >
      <div className="cert-showcase-backdrop" aria-hidden="true">
        <span className="cert-showcase-aura cert-showcase-aura-left" />
        <span className="cert-showcase-aura cert-showcase-aura-right" />
        <span className="cert-showcase-comet" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <header
          className="cert-showcase-header mx-auto max-w-4xl text-center"
          data-aos="fade-up"
        >
          <p className="cert-showcase-eyebrow">CERTIFICATIONS</p>
          <h2 className="cert-showcase-title font-display">
            Certificates in{" "}
            <span className="cert-showcase-title-accent">
              Modern Technologies.
            </span>
          </h2>
          <p className="cert-showcase-description">
            Click any certificate to view complete details and instantly
            download the certificate file.
          </p>
        </header>

        <div className="cert-showcase-grid mt-14 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {certifications.map((certificate, index) => (
            <article
              key={certificate.name}
              className={`cert-showcase-card cert-showcase-card-${(index % 3) + 1}`}
              data-aos="fade-right"
              data-aos-delay={index * 110}
            >
              <button
                type="button"
                className="cert-showcase-preview-btn"
                aria-label={`Open ${certificate.name} certificate details`}
                onClick={() => setSelectedCertificate(certificate)}
              >
                <div className="cert-showcase-frame">
                  <img
                    src={certificate.image || DEFAULT_CERTIFICATE_IMAGE}
                    alt={`${certificate.name} certificate preview`}
                    className="cert-showcase-image"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = DEFAULT_CERTIFICATE_IMAGE;
                    }}
                  />
                </div>
              </button>

              <div className="cert-showcase-content cert-showcase-content-simple">
                <h3 className="cert-showcase-card-title cert-showcase-card-title-simple font-display">
                  {certificate.name}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedCertificate && (
        <div
          className="cert-modal-overlay"
          role="presentation"
          onClick={closeModal}
        >
          <div
            className="cert-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-modal-title"
            aria-describedby="certificate-modal-description"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="cert-modal-close"
              onClick={closeModal}
              aria-label="Close certificate details"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6 18 18M18 6 6 18" />
              </svg>
            </button>

            <div className="cert-modal-preview">
              <img
                src={selectedCertificate.image || DEFAULT_CERTIFICATE_IMAGE}
                alt={`${selectedCertificate.name} full certificate preview`}
                className="cert-modal-image"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = DEFAULT_CERTIFICATE_IMAGE;
                }}
              />
            </div>

            <div className="cert-modal-content">
              <p className="cert-modal-label">Certificate Details</p>
              <h3
                id="certificate-modal-title"
                className="cert-modal-title font-display"
              >
                {selectedCertificate.name}
              </h3>

              <div className="cert-modal-meta">
                <p className="cert-modal-meta-item">
                  <span className="cert-modal-meta-title">
                    Issuing Organization
                  </span>
                  <span className="cert-modal-meta-value">
                    {selectedCertificate.platform || "Not specified"}
                  </span>
                </p>

                <p className="cert-modal-meta-item">
                  <span className="cert-modal-meta-title">Issued Date</span>
                  <span className="cert-modal-meta-value">
                    {selectedCertificate.date ||
                      selectedCertificate.year ||
                      "Not specified"}
                  </span>
                </p>
              </div>

              <p
                id="certificate-modal-description"
                className="cert-modal-description"
              >
                {selectedCertificate.description ||
                  `Issued certificate from ${selectedCertificate.platform}.`}
              </p>

              <div className="cert-modal-actions">
                <a
                  href={downloadInfo?.href}
                  download={downloadInfo?.fileName}
                  className="cert-modal-download"
                >
                  Download Certificate
                </a>
                <button
                  type="button"
                  className="cert-modal-dismiss"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
