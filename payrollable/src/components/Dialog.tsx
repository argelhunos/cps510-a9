import { type ReactNode } from "react";

type DialogProps = {
    title: string;
    body: ReactNode;
    onConfirm: () => void;
}

export default function Dialog({title, body, onConfirm}: DialogProps) {
    return (
        <div className="modal show" style={{ display: "block", position: "relative" }}>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
            </div>

            <div className="modal-body">
                {body}
            </div>

            <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onConfirm}>Yes</button>
                <button className="btn btn-secondary">No</button>
            </div>
            </div>
        </div>
        </div>
    )
}