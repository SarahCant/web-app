/* SOFIE */
import "../css/sofie.css";

export default function AlertBox({
  alertMessage,
  showConfirmButtons = false,
  onConfirm,
  onCancel,
  onOk,
}) {
  return (
    <div className="alert_box">
      <img className="logo_alert" src="../public/img/logo_fire.png" alt="" />
      <span className="circle_alert"></span>
      <p className="p_alert">{alertMessage}</p>
      <div className="btn_alert">
        {showConfirmButtons ? (
          <>
            <button className="btn" onClick={onConfirm}>
              Ja
            </button>
            <button className="btn btn_delete" onClick={onCancel}>
              Annuller
            </button>
          </>
        ) : (
          <button className="btn" onClick={onOk}>
            Ok
          </button>
        )}
      </div>
    </div>
  );
}
