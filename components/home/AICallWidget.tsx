"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Phone, PhoneOff, Loader2 } from "lucide-react";
import { Room, RoomEvent, type RemoteTrack } from "livekit-client";

// Configure these in `.env.local`:
//   NEXT_PUBLIC_AI_CALL_API_BASE=https://your-api.example.com
//   NEXT_PUBLIC_AI_CALL_API_KEY=cak_…
// Security note: the tenant API key is exposed to the browser here. For a
// hardened setup, proxy `/voice_assistent/call/start` through a Next.js route handler and
// keep the key server-side. For a personal portfolio that talks to your own
// backend, a public env var is acceptable.
const API_BASE = (process.env.NEXT_PUBLIC_AI_CALL_API_BASE ?? "").replace(/\/+$/, "");
const API_KEY = process.env.NEXT_PUBLIC_AI_CALL_API_KEY ?? "";

type CallState = "idle" | "connecting" | "live";

const AICallWidget: React.FC = () => {
  const [state, setState] = useState<CallState>("idle");
  const [status, setStatus] = useState<string>("");
  const roomRef = useRef<Room | null>(null);
  const audioElsRef = useRef<HTMLAudioElement[]>([]);

  const cleanupAudio = useCallback(() => {
    audioElsRef.current.forEach((el) => el.remove());
    audioElsRef.current = [];
  }, []);

  const endCall = useCallback(async () => {
    if (roomRef.current) {
      await roomRef.current.disconnect();
      roomRef.current = null;
    }
    cleanupAudio();
    setState("idle");
    setStatus("Call ended.");
  }, [cleanupAudio]);

  const startCall = useCallback(async () => {
    if (!API_BASE || !API_KEY) {
      setStatus("Call service isn't configured yet.");
      return;
    }

    // Microphone access requires a secure context (HTTPS or localhost).
    // On a plain-http LAN IP, navigator.mediaDevices is undefined.
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus(
        "Mic needs HTTPS. Open the site via https:// or http://localhost.",
      );
      return;
    }

    try {
      setState("connecting");
      setStatus("Connecting…");

      // 1. Ask the backend for a fresh LiveKit room + token.
      // `ngrok-skip-browser-warning` bypasses ngrok's free-tier interstitial
      // HTML page (harmless once the backend is on a real host).
      const resp = await fetch(`${API_BASE}/voice_assistent/call/start`, {
        method: "POST",
        headers: {
          "X-API-Key": API_KEY,
          "ngrok-skip-browser-warning": "true",
        },
      });
      if (!resp.ok) {
        const err = await resp.text();
        throw new Error(`/voice_assistent/call/start ${resp.status}: ${err}`);
      }
      const data: { url: string; token: string } = await resp.json();

      // 2. Connect to LiveKit using the token.
      const room = new Room({ adaptiveStream: true, dynacast: true });
      roomRef.current = room;

      room.on(RoomEvent.TrackSubscribed, (track: RemoteTrack) => {
        if (track.kind === "audio") {
          const el = track.attach() as HTMLAudioElement;
          el.autoplay = true;
          document.body.appendChild(el);
          audioElsRef.current.push(el);
        }
      });
      room.on(RoomEvent.Disconnected, () => {
        cleanupAudio();
        roomRef.current = null;
        setState("idle");
      });

      await room.connect(data.url, data.token);
      await room.localParticipant.setMicrophoneEnabled(true);

      setState("live");
      setStatus("Connected — speak now. Tap the red button to hang up.");
    } catch (e) {
      console.error(e);
      setStatus(`Couldn't start call: ${(e as Error).message}`);
      await endCall();
    }
  }, [cleanupAudio, endCall]);

  // Hang up if the component unmounts mid-call.
  useEffect(() => {
    return () => {
      if (roomRef.current) {
        roomRef.current.disconnect();
        roomRef.current = null;
      }
      cleanupAudio();
    };
  }, [cleanupAudio]);

  // Auto-hide transient status messages.
  useEffect(() => {
    if (!status || state === "connecting" || state === "live") return;
    const t = setTimeout(() => setStatus(""), 3500);
    return () => clearTimeout(t);
  }, [status, state]);

  const handleClick = () => {
    if (state === "live") {
      endCall();
    } else if (state === "idle") {
      startCall();
    }
  };

  const isLive = state === "live";
  const isConnecting = state === "connecting";

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-50 flex flex-col items-start gap-2">
      {status && (
        <div className="max-w-[260px] rounded-lg bg-black/80 px-3 py-2 text-xs text-white shadow-lg backdrop-blur-sm">
          {status}
        </div>
      )}

      <button
        onClick={handleClick}
        disabled={isConnecting}
        className={`flex items-center gap-2.5 rounded-full px-5 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-80 ${
          isLive
            ? "bg-[#c2272d] shadow-red-500/30 hover:shadow-red-500/50"
            : "bg-neutral-900 shadow-black/30 hover:bg-neutral-800"
        }`}
        aria-label={isLive ? "End AI voice call" : "Talk to my AI assistant"}
      >
        <span className="relative flex h-2.5 w-2.5">
          {isLive && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          )}
          {isConnecting ? (
            <Loader2 size={18} className="-m-[3.75px] animate-spin" />
          ) : isLive ? (
            <PhoneOff size={18} className="-m-[3.75px]" />
          ) : (
            <Phone size={18} className="-m-[3.75px]" />
          )}
        </span>
        <span className="text-sm">
          {isConnecting ? "Connecting…" : isLive ? "End call" : "Talk to my AI"}
        </span>
      </button>
    </div>
  );
};

export default AICallWidget;
