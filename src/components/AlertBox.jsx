/* SOFIE */
import "../css/Sofie.css";

export default function AlertBox({
  alertMessage,
  showConfirmButtons = false,
  onConfirm,
  onCancel,
  onOk,
}) {
  return (
    <div className="alert_box">
      <img className="logo_alert" src="img/logo_fire.png" alt="logo" />
      <span className="circle_alert"></span>
      <p className="p_alert">{alertMessage}</p>
      <div className="btn_alert">
        {/* different buttons for different occaisions */}
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
