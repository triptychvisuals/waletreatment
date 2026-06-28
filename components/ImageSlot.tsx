"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SlotData = { url: string; px: number; py: number; scale: number };
const KEY = (id: string) => `overthink-slot:${id}`;
const ACCEPT = ["image/png", "image/jpeg", "image/webp", "image/avif", "image/gif"];

function read(id: string): SlotData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY(id));
    if (!raw) return null;
    const v = JSON.parse(raw);
    if (v && typeof v.url === "string") return v;
  } catch {}
  return null;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result as string);
    fr.onerror = () => reject(fr.error);
    fr.readAsDataURL(file); // raw bytes — GIFs keep animating
  });
}

export default function ImageSlot({
  id,
  placeholder = "Drop a photo or GIF",
  src,
}: {
  id: string;
  placeholder?: string;
  src?: string;
}) {
  const [data, setData] = useState<SlotData | null>(null);
  const [over, setOver] = useState(false);
  const [editing, setEditing] = useState(false);
  const [grabbing, setGrabbing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const elRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  useEffect(() => {
    const stored = read(id);
    if (stored) setData(stored);
    else if (src) setData({ url: src, px: 50, py: 50, scale: 1 });
    else setData(null);
  }, [id, src]);

  const persist = useCallback(
    (d: SlotData | null) => {
      setData(d);
      try {
        if (d) window.localStorage.setItem(KEY(id), JSON.stringify(d));
        else window.localStorage.removeItem(KEY(id));
      } catch {}
    },
    [id]
  );

  const ingest = useCallback(
    async (file: File) => {
      if (!file || ACCEPT.indexOf(file.type) < 0) return;
      const url = await fileToDataUrl(file);
      persist({ url, px: 50, py: 50, scale: 1 });
      setEditing(false);
    },
    [persist]
  );

  // Drag to pan (editing mode)
  useEffect(() => {
    if (!editing) return;
    const move = (e: PointerEvent) => {
      if (!drag.current || !elRef.current) return;
      const r = elRef.current.getBoundingClientRect();
      const dx = ((e.clientX - drag.current.x) / r.width) * 100;
      const dy = ((e.clientY - drag.current.y) / r.height) * 100;
      const px = Math.max(0, Math.min(100, drag.current.px - dx));
      const py = Math.max(0, Math.min(100, drag.current.py - dy));
      setData((d) => (d ? { ...d, px, py } : d));
    };
    const up = () => {
      drag.current = null;
      setGrabbing(false);
      setData((d) => {
        if (d) {
          try {
            window.localStorage.setItem(KEY(id), JSON.stringify(d));
          } catch {}
        }
        return d;
      });
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [editing, id]);

  const onDown = (e: React.PointerEvent) => {
    if (!editing || !data) return;
    e.preventDefault();
    drag.current = { x: e.clientX, y: e.clientY, px: data.px, py: data.py };
    setGrabbing(true);
  };

  const onWheel = (e: React.WheelEvent) => {
    if (!editing || !data) return;
    e.preventDefault();
    const scale = Math.max(1, Math.min(4, data.scale * Math.pow(1.0015, -e.deltaY)));
    persist({ ...data, scale });
  };

  return (
    <div
      ref={elRef}
      className={
        "slot" + (over ? " over" : "") + (editing ? " editing" : "") + (grabbing ? " grabbing" : "")
      }
      onDragEnter={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const f = e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) ingest(f);
      }}
      onDoubleClick={() => {
        if (data) setEditing((v) => !v);
      }}
      onPointerDown={onDown}
      onWheel={onWheel}
    >
      {data ? (
        <>
          <img
            src={data.url}
            alt=""
            draggable={false}
            style={{
              objectPosition: `${data.px}% ${data.py}%`,
              transform: `scale(${data.scale})`,
            }}
          />
          {editing && <div className="hint">Drag to move · scroll to zoom · dbl-click done</div>}
          <div className="badge">
            <button
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
            >
              Replace
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditing(false);
                try { window.localStorage.removeItem(KEY(id)); } catch {}
                if (src) setData({ url: src, px: 50, py: 50, scale: 1 });
                else setData(null);
              }}
            >
              Remove
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="empty" onClick={() => inputRef.current?.click()}>
            <div className="ph">{placeholder}</div>
            <div className="br">drag in · or click to browse</div>
          </div>
          <div className="ring" />
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT.join(",")}
        hidden
        onChange={(e) => {
          const f = e.target.files && e.target.files[0];
          if (f) ingest(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}
