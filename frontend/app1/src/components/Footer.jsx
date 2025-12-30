function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #0b2d4d, #123f6b)",
        color: "#ffffff",
        padding: "50px 30px",
        marginTop: "60px",
      }}
    >
      <div className="row text-center text-md-start">
        <div className="col-md-6 mb-4">
          <h5 className="fw-bold text-info">SUNBEAM HINJAWADI PUNE</h5>
          <p className="mb-1">
            SunBeam IT Park, Phase 2, Rajiv Gandhi Infotech Park
          </p>
          <p className="mb-1">📞 +91 82 82 82 9805</p>
          <p className="mb-0">✉️ sit@sunbeaminfo.com</p>
        </div>

        <div className="col-md-6 mb-4">
          <h5 className="fw-bold text-info">SUNBEAM KARAD</h5>
          <p className="mb-1">
            Anuda Chambers, Shanivar Peth
          </p>
          <p className="mb-1">📞 +91 82 82 82 9806</p>
          <p className="mb-0">✉️ sitkarad@sunbeaminfo.com</p>
        </div>
      </div>

      <hr style={{ borderColor: "#4fa3ff" }} />

      <p className="text-center mb-0 text-light">
        © 2025 SunBeam Institute. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
