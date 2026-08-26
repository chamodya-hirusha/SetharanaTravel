"use client";

import { useActionState } from "react";
import { useState } from "react";
import { Map, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

async function loginWithState(
  _prev: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string } | null> {
  const { loginAction } = await import("@/app/admin/actions/auth");
  return loginAction(formData);
}

type LoginState = { error?: string } | null;

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    loginWithState,
    null
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "24px",
          padding: "40px 36px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #0E4B3A, #1a6b52)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              boxShadow: "0 6px 20px rgba(14,75,58,0.25)",
            }}
          >
            <Map size={26} color="#D4AF37" />
          </div>
          <h1
            style={{
              color: "#111827",
              fontSize: "22px",
              fontWeight: 800,
              marginBottom: "4px",
            }}
          >
            Setharana Admin
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "14px" }}>
            Sign in to manage your travel website
          </p>
        </div>

        {/* Error */}
        {state?.error && (
          <div
            style={{
              background: "#fff5f5",
              border: "1px solid #fecaca",
              borderRadius: "10px",
              padding: "12px 14px",
              marginBottom: "18px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#dc2626",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            <AlertCircle size={16} />
            {state.error}
          </div>
        )}

        {/* Form */}
        <form action={formAction}>
          <div style={{ marginBottom: "18px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                color: "#374151",
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "7px",
              }}
            >
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="admin@setharana.com"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  background: "#f9fafb",
                  border: `1px solid ${state?.error ? "#fca5a5" : "#e5e7eb"}`,
                  borderRadius: "11px",
                  color: "#111827",
                  fontSize: "15px",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                color: "#374151",
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "7px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "13px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                  pointerEvents: "none",
                }}
              >
                <Lock size={15} />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter password"
                style={{
                  width: "100%",
                  padding: "12px 42px 12px 40px",
                  background: "#f9fafb",
                  border: `1px solid ${state?.error ? "#fca5a5" : "#e5e7eb"}`,
                  borderRadius: "11px",
                  color: "#111827",
                  fontSize: "15px",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "13px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                  display: "flex",
                  padding: 0,
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            style={{
              width: "100%",
              padding: "13px",
              background: isPending ? "rgba(14,75,58,0.6)" : "#0E4B3A",
              border: "none",
              borderRadius: "12px",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 700,
              cursor: isPending ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              boxShadow: "0 4px 14px rgba(14,75,58,0.25)",
              transition: "all 0.2s ease",
            }}
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div
          style={{
            marginTop: "24px",
            textAlign: "center",
            color: "#d1d5db",
            fontSize: "12px",
          }}
        >
          Setharana Travels · Admin Portal
        </div>
      </div>
    </div>
  );
}
