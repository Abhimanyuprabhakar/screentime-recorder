import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaDownload,
  FaPuzzlePiece,
  FaToggleOn,
  FaFolderOpen,
  FaSignInAlt,
  FaCheckCircle,
  FaChrome,
  FaShieldAlt,
  FaClock,
  FaChartBar,
  FaBell,
  FaArrowRight,
  FaExternalLinkAlt,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaDownload className="text-2xl" />,
    color: "from-green-400 to-emerald-600",
    bg: "bg-green-500/10 border-green-500/30",
    num: "01",
    title: "Download the Extension",
    desc: "Click the download button to get the extension zip file.",
    action: (
      <a
        id="step1-download-btn"
        href="/extension.zip"
        download="screentime-recorder-extension.zip"
        className="mt-3 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:scale-105 shadow"
      >
        <FaDownload /> Download ZIP
      </a>
    ),
  },
  {
    icon: <FaChrome className="text-2xl" />,
    color: "from-blue-400 to-blue-600",
    bg: "bg-blue-500/10 border-blue-500/30",
    num: "02",
    title: "Open Chrome Extensions",
    desc: "In Chrome, navigate to the Extensions management page.",
    action: (
      <a
        id="step2-chrome-extensions-link"
        href="chrome://extensions"
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:scale-105 shadow"
      >
        <FaExternalLinkAlt /> chrome://extensions
      </a>
    ),
  },
  {
    icon: <FaToggleOn className="text-2xl" />,
    color: "from-purple-400 to-purple-600",
    bg: "bg-purple-500/10 border-purple-500/30",
    num: "03",
    title: "Enable Developer Mode",
    desc: 'Toggle "Developer mode" switch in the top-right corner of the Extensions page.',
    tip: "Required to load unpacked extensions",
  },
  {
    icon: <FaFolderOpen className="text-2xl" />,
    color: "from-orange-400 to-orange-600",
    bg: "bg-orange-500/10 border-orange-500/30",
    num: "04",
    title: "Unzip & Load Unpacked",
    desc: 'First unzip the downloaded file, then click "Load unpacked" and select the extracted extension folder.',
    tip: "Select the folder that contains manifest.json",
  },
  {
    icon: <FaSignInAlt className="text-2xl" />,
    color: "from-pink-400 to-pink-600",
    bg: "bg-pink-500/10 border-pink-500/30",
    num: "05",
    title: "Sign In & Start Tracking",
    desc: "Click the extension icon in your toolbar, sign in to your account, and activity tracking begins automatically.",
    action: (
      <Link
        id="step5-login-btn"
        to="/login"
        className="mt-3 inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:scale-105 shadow"
      >
        <FaSignInAlt /> Go to Login
      </Link>
    ),
  },
];

const features = [
  {
    icon: <FaClock />,
    title: "Auto Time Tracking",
    desc: "Automatically tracks time spent on every website — no manual input needed.",
    color: "text-green-400",
  },
  {
    icon: <FaChartBar />,
    title: "Dashboard Sync",
    desc: "All activity syncs in real-time to your personal analytics dashboard.",
    color: "text-blue-400",
  },
  {
    icon: <FaBell />,
    title: "Smart Reminders",
    desc: "Get notified when you spend too long on distracting sites.",
    color: "text-yellow-400",
  },
  {
    icon: <FaShieldAlt />,
    title: "Privacy First",
    desc: "Your data is stored in your own account. We never sell your data.",
    color: "text-purple-400",
  },
];

const ExtensionPage = () => {
  const [copied, setCopied] = useState(false);

  const copyStep = () => {
    navigator.clipboard.writeText("chrome://extensions");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Hero */}
      <div className="relative overflow-hidden pt-20 pb-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-[#0d1117] to-blue-900/20 pointer-events-none" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, #22c55e 0%, transparent 70%)",
          }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center shadow-2xl shadow-green-500/30 animate-pulse">
                <FaPuzzlePiece className="text-4xl text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-1.5">
                <FaChrome className="text-white text-sm" />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 text-green-400 text-sm font-medium mb-6">
            <FaCheckCircle className="text-xs" /> Free Chrome Extension
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-green-400 via-emerald-300 to-blue-400 bg-clip-text text-transparent mb-6 leading-tight">
            Track Your Screentime
            <br />
            <span className="text-white">Right in Chrome</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Install the Screentime Recorder extension to automatically monitor
            your browsing habits, sync data to your dashboard, and take back
            control of your time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              id="hero-download-btn"
              href="/extension.zip"
              download="screentime-recorder-extension.zip"
              className="group flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-green-500/30 hover:shadow-green-400/40 transition-all hover:scale-105 text-lg"
            >
              <FaDownload className="group-hover:animate-bounce" />
              Download Extension
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                FREE
              </span>
            </a>
            <Link
              id="hero-dashboard-btn"
              to="/dashboard"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold px-8 py-4 rounded-2xl transition-all text-lg"
            >
              Go to Dashboard <FaArrowRight className="text-sm" />
            </Link>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Works with Chrome & Edge · No account needed to download · Free
            forever
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-center text-3xl font-bold text-white mb-3">
          What the Extension Does
        </h2>
        <p className="text-center text-gray-400 mb-12">
          Everything runs silently in the background — zero effort, maximum insight.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-2xl p-6 text-center transition-all hover:scale-[1.03] hover:shadow-xl group"
            >
              <div
                className={`text-3xl mb-4 ${f.color} group-hover:scale-110 transition-transform inline-block`}
              >
                {f.icon}
              </div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Install Steps */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            Install in 5 Simple Steps
          </h2>
          <p className="text-gray-400">
            No Chrome Web Store needed. Load it directly in seconds.
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative border ${step.bg} rounded-2xl p-6 transition-all hover:scale-[1.01]`}
            >
              <div className="flex items-start gap-5">
                {/* Number badge */}
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}
                >
                  {step.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono text-gray-500">
                      STEP {step.num}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                  {step.tip && (
                    <p className="mt-1 text-xs text-yellow-400/80 flex items-center gap-1">
                      <span>💡</span> {step.tip}
                    </p>
                  )}
                  {step.action && <div>{step.action}</div>}
                </div>

                <div className="flex-shrink-0 text-3xl font-black text-white/5 font-mono select-none">
                  {step.num}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick copy tip */}
        <div className="mt-8 bg-gray-900 border border-gray-700 rounded-xl p-4 flex items-center gap-4">
          <FaChrome className="text-blue-400 text-2xl flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-300 font-medium">
              Tip: Paste this in your Chrome address bar
            </p>
            <code className="text-green-400 text-sm">chrome://extensions</code>
          </div>
          <button
            id="copy-chrome-url-btn"
            onClick={copyStep}
            className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-2 rounded-lg transition flex-shrink-0"
          >
            {copied ? "✅ Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-green-900/30 to-blue-900/20 border border-white/10 rounded-3xl p-12">
          <FaPuzzlePiece className="text-5xl text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to track smarter?
          </h2>
          <p className="text-gray-400 mb-8">
            Download the extension, create your free account, and start understanding
            your screen habits in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              id="cta-download-btn"
              href="/extension.zip"
              download="screentime-recorder-extension.zip"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-green-500/25 hover:scale-105 transition-all"
            >
              <FaDownload /> Download Extension
            </a>
            <Link
              id="cta-register-btn"
              to="/register"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:scale-105"
            >
              Create Free Account <FaArrowRight className="text-sm" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtensionPage;
