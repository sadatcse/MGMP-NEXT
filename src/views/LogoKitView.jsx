"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaDownload,
  FaCopy,
  FaCheck,
  FaSearch,
  FaPalette,
  FaRulerCombined,
  FaShieldAlt,
  FaFileArchive,
  FaExpand,
  FaExternalLinkAlt,
  FaArrowDown,
  FaTimes
} from 'react-icons/fa';
import {
  brandCategories,
  brandColors,
  sizingRules,
  brandRules,
  brandLogos
} from '../data/brandLogos';

export default function LogoKitView() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [canvasBgMode, setCanvasBgMode] = useState('auto'); // 'auto', 'dark', 'light', 'grid'
  const [copiedColor, setCopiedColor] = useState(null);
  const [copiedSvg, setCopiedSvg] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);

  // Filter logos by category and search
  const filteredLogos = useMemo(() => {
    return brandLogos.filter((logo) => {
      const matchesCategory =
        selectedCategory === 'all' || logo.categorySlug === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        logo.title.toLowerCase().includes(q) ||
        logo.description.toLowerCase().includes(q) ||
        logo.filename.toLowerCase().includes(q) ||
        logo.category.toLowerCase().includes(q) ||
        logo.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  // Copy Color Hex
  const handleCopyColor = (hex) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(hex);
      setCopiedColor(hex);
      setTimeout(() => setCopiedColor(null), 1800);
    }
  };

  // Copy SVG Code
  const handleCopySvg = async (logo) => {
    try {
      const res = await fetch(logo.path);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopiedSvg(logo.id);
      setTimeout(() => setCopiedSvg(null), 1800);
    } catch (err) {
      console.error('Failed to copy SVG code:', err);
    }
  };

  // Determine stage background styling
  const getStageClass = (isDarkStage) => {
    if (canvasBgMode === 'dark') return 'bg-[#141416] text-white';
    if (canvasBgMode === 'light') return 'bg-white text-black';
    if (canvasBgMode === 'grid')
      return 'bg-[radial-gradient(#ffffff22_1px,#111_1px)] bg-[size:16px_16px] text-white';
    // auto mode
    return isDarkStage ? 'bg-[#141416] text-white' : 'bg-white text-black';
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#F4F4F5] selection:bg-red-600 selection:text-white font-sans relative overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-96 right-10 w-[450px] h-[450px] bg-custom-yellow/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[180px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 relative z-10">

        {/* HERO SECTION */}
        <header className="border-b border-white/10 pb-12 mb-12">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-custom-yellow text-[11px] font-black uppercase tracking-[0.25em] mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            Official Brand & Vector Logo Kit
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black italic tracking-tight uppercase leading-[1.05]">
                Every Version, <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-400 to-yellow-400">A to Z.</span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                Rebuilt as true production vector artwork — traced from the original master file, colour-separated into frame, figures and wordmark, and engineered into twenty-two production-ready vector assets. Scales to a highway billboard without losing a fraction of sharpness.
              </p>
            </div>

            {/* Top Quick Actions */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
              <a
                href="/brand/multigym-premium-logos.zip"
                download="multigym-premium-logos.zip"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-red-600/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <FaFileArchive className="text-base" />
                <span>Download All (.ZIP)</span>
                <span className="text-[10px] opacity-80 px-1.5 py-0.5 rounded bg-black/30 font-mono">378 KB</span>
              </a>

              <a
                href="#guidelines"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-bold text-sm uppercase tracking-wider transition-all duration-300"
              >
                <FaArrowDown className="text-xs text-custom-yellow" />
                <span>Brand Rules</span>
              </a>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/5">
            {[
              { label: 'Production Formats', value: '22 Vector SVGs' },
              { label: 'Scalability', value: '100% Infinite' },
              { label: 'Color Accuracy', value: 'Pantone & Hex' },
              { label: 'Usage License', value: 'Official Club Assets' }
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 block font-bold">
                  {stat.label}
                </span>
                <span className="text-lg font-black text-white mt-1 block">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </header>

        {/* CONTROLS BAR: CATEGORIES, SEARCH, BACKGROUND SELECTOR */}
        <section className="mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white/[0.03] p-3 sm:p-4 rounded-2xl border border-white/10 backdrop-blur-md">

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {brandCategories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-gray-400'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input and Canvas Mode Switcher */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 22 assets..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-custom-yellow transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
                    title="Clear search"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>

              {/* Canvas Preview Background Mode */}
              <div className="flex items-center gap-1 bg-black/40 border border-white/10 p-1 rounded-xl w-full sm:w-auto justify-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 px-2">
                  Canvas:
                </span>
                {[
                  { mode: 'auto', label: 'Auto' },
                  { mode: 'dark', label: 'Dark' },
                  { mode: 'light', label: 'Light' },
                  { mode: 'grid', label: 'Grid' }
                ].map((item) => (
                  <button
                    key={item.mode}
                    onClick={() => setCanvasBgMode(item.mode)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      canvasBgMode === item.mode
                        ? 'bg-custom-yellow text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-gray-400 px-1">
            <span>
              Showing <strong className="text-white">{filteredLogos.length}</strong> of{' '}
              <strong className="text-white">{brandLogos.length}</strong> official logos
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-custom-yellow hover:underline text-xs"
              >
                Reset Search
              </button>
            )}
          </div>
        </section>

        {/* LOGO ASSET CARDS GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredLogos.map((logo) => {
            const isCopied = copiedSvg === logo.id;
            return (
              <article
                key={logo.id}
                className="group flex flex-col bg-[#141416] rounded-2xl border border-white/10 overflow-hidden hover:border-custom-yellow/50 transition-all duration-300 hover:shadow-2xl hover:shadow-black/60"
              >
                {/* SVG Display Stage */}
                <div
                  className={`relative p-8 flex items-center justify-center min-h-[220px] transition-colors duration-300 select-none overflow-hidden ${getStageClass(
                    logo.isDarkStage
                  )}`}
                >
                  {/* Aspect Ratio Container for crisp rendering */}
                  <div className="w-full h-full flex items-center justify-center max-h-[170px] relative">
                    <img
                      src={logo.path}
                      alt={logo.title}
                      loading="lazy"
                      className="max-h-[160px] max-w-[85%] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-gray-300 border border-white/10">
                      {logo.width}×{logo.height}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-red-600/80 text-[9px] font-black uppercase tracking-wider text-white">
                      SVG
                    </span>
                  </div>

                  {/* Expand button */}
                  <button
                    onClick={() => setPreviewLogo(logo)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-gray-300 hover:text-custom-yellow hover:bg-black transition-all opacity-0 group-hover:opacity-100"
                    title="Fullscreen Preview"
                  >
                    <FaExpand className="text-xs" />
                  </button>
                </div>

                {/* Meta Information & Download Actions */}
                <div className="p-5 flex flex-col flex-1 gap-3 bg-[#121215]">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-base font-extrabold text-white group-hover:text-custom-yellow transition-colors">
                        {logo.title}
                      </h3>
                      <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">
                        {logo.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed font-normal">
                      {logo.description}
                    </p>
                  </div>

                  {/* Filename & Actions */}
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                    <code className="text-[11px] font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded border border-white/5 truncate max-w-[140px] sm:max-w-[180px]">
                      {logo.filename}
                    </code>

                    <div className="flex items-center gap-2">
                      {/* Copy SVG Code */}
                      <button
                        onClick={() => handleCopySvg(logo)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10'
                        }`}
                        title="Copy raw vector SVG XML code to clipboard"
                      >
                        {isCopied ? (
                          <>
                            <FaCheck className="text-[10px]" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <FaCopy className="text-[10px]" />
                            <span>Code</span>
                          </>
                        )}
                      </button>

                      {/* Download File */}
                      <a
                        href={logo.path}
                        download={logo.filename}
                        className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md hover:shadow-red-600/30"
                        title={`Download ${logo.filename}`}
                      >
                        <FaDownload className="text-[10px]" />
                        <span>SVG</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* BRAND GUIDELINES & SPECIFICATIONS */}
        <section id="guidelines" className="pt-12 border-t border-white/10 space-y-12">

          {/* Section Header */}
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-custom-yellow block">
              Identity Standards
            </span>
            <h2 className="text-3xl font-black italic uppercase tracking-tight text-white">
              Brand Guidelines & Specifications
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Strict visual identity rules for designers, developers, print vendors, media agencies, and partners reproducing the Multigym Premium brand.
            </p>
          </div>

          {/* 1. Official Color Palette */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-white">
              <FaPalette className="text-custom-yellow" />
              <span>Official Brand Colours</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {brandColors.map((color) => {
                const isCopied = copiedColor === color.hex;
                return (
                  <div
                    key={color.hex}
                    onClick={() => handleCopyColor(color.hex)}
                    className="group bg-[#141416] p-4 rounded-2xl border border-white/10 hover:border-custom-yellow/40 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-bold text-white group-hover:text-custom-yellow transition-colors">
                        {color.name}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1">
                        {isCopied ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <FaCheck /> Copied!
                          </span>
                        ) : (
                          <span>Click to Copy</span>
                        )}
                      </span>
                    </div>

                    {/* Swatch Pill */}
                    <div
                      className="h-16 w-full rounded-xl flex items-center px-4 justify-between shadow-inner border border-white/10 mb-3"
                      style={{ backgroundColor: color.hex }}
                    >
                      <span
                        className={`text-sm font-mono font-black ${
                          color.textDark ? 'text-black' : 'text-white'
                        }`}
                      >
                        {color.hex}
                      </span>
                      <FaCopy
                        className={`text-xs opacity-70 group-hover:opacity-100 ${
                          color.textDark ? 'text-black' : 'text-white'
                        }`}
                      />
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between text-gray-400">
                        <span>RGB:</span>
                        <span className="font-mono text-gray-300">{color.rgb}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 pt-1 leading-snug">
                        {color.role}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Sizing and Clear Space */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-white">
              <FaRulerCombined className="text-custom-yellow" />
              <span>Sizing & Clear Space Specifications</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {sizingRules.map((rule, idx) => (
                <div
                  key={idx}
                  className="bg-[#141416] p-5 rounded-2xl border border-white/10 space-y-3"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-600 block">
                    Rule 0{idx + 1}
                  </span>
                  <h4 className="text-base font-extrabold text-white">
                    {rule.title}
                  </h4>
                  <div className="space-y-1 py-1 text-xs">
                    <p className="flex justify-between text-gray-400">
                      <span>Screen Min:</span>
                      <strong className="text-custom-yellow">{rule.minScreen}</strong>
                    </p>
                    <p className="flex justify-between text-gray-400">
                      <span>Print Min:</span>
                      <strong className="text-white">{rule.minPrint}</strong>
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-normal">
                    {rule.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Brand Rules: Dos & Don'ts */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-white">
              <FaShieldAlt className="text-custom-yellow" />
              <span>Brand Usage Integrity (Do's & Don'ts)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* DO's */}
              <div className="bg-[#141416] p-6 rounded-2xl border border-emerald-500/20 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-black uppercase tracking-wider text-xs">
                  <FaCheck /> Recommended Best Practices
                </div>
                <ul className="space-y-3 text-xs text-gray-300">
                  {brandRules.dos.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* DON'Ts */}
              <div className="bg-[#141416] p-6 rounded-2xl border border-red-500/20 space-y-4">
                <div className="flex items-center gap-2 text-red-500 font-black uppercase tracking-wider text-xs">
                  <FaTimes /> Prohibited Modifications
                </div>
                <ul className="space-y-3 text-xs text-gray-300">
                  {brandRules.donts.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 4. Single-file HTML Link banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-bold text-white">
                Standalone Single-File Kit
              </h4>
              <p className="text-xs text-gray-400">
                Need the self-contained HTML file with embedded inline SVGs and standalone download script?
              </p>
            </div>
            <a
              href="/multigym-premium-logo-kit.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold tracking-wider uppercase transition-colors"
            >
              <span>View Raw HTML Kit</span>
              <FaExternalLinkAlt className="text-[10px] text-custom-yellow" />
            </a>
          </div>

        </section>

      </div>

      {/* FULLSCREEN PREVIEW MODAL */}
      {previewLogo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setPreviewLogo(null)}
        >
          <div
            className="bg-[#141416] border border-white/15 rounded-3xl max-w-2xl w-full p-6 space-y-6 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-black text-white">{previewLogo.title}</h3>
                <span className="text-xs text-gray-400 font-mono">{previewLogo.filename}</span>
              </div>
              <button
                onClick={() => setPreviewLogo(null)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Stage */}
            <div
              className={`p-10 rounded-2xl flex items-center justify-center min-h-[300px] ${
                previewLogo.isDarkStage ? 'bg-[#0E0E10]' : 'bg-white'
              }`}
            >
              <img
                src={previewLogo.path}
                alt={previewLogo.title}
                className="max-h-[260px] max-w-full h-auto w-auto object-contain"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-gray-400">
                Dimensions: <strong className="text-white">{previewLogo.width} × {previewLogo.height}</strong>
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleCopySvg(previewLogo)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 hover:text-white flex items-center gap-2"
                >
                  <FaCopy className="text-xs" />
                  <span>{copiedSvg === previewLogo.id ? 'Copied Code!' : 'Copy Code'}</span>
                </button>
                <a
                  href={previewLogo.path}
                  download={previewLogo.filename}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-red-600/30"
                >
                  <FaDownload className="text-xs" />
                  <span>Download SVG</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
