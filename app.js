'use strict';
// ═══════════════════════════════════════════════════════════
// §A  Constants & enums
// ═══════════════════════════════════════════════════════════
const STATE = { AVAILABLE:'available', ACQUIRED:'acquired', ACKNOWLEDGED:'acknowledged', ARCHIVED:'archived' };
const ACK   = { ACCEPT:'accept', RELEASE:'release', REJECT:'reject', RENEW:'renew' };

// ── Theme palettes ──────────────────────────────────────────
const DARK = {
  cellBg: {
    available:            '#1a3a5c',
    acquired:             '#7a3d00',
    acknowledged_accept:  '#1a4a2e',
    acknowledged_release: '#3b1a5c',
    acknowledged_reject:  '#5c1a1a',
    archived:             '#1e2430',
    _default:             '#1a1d27',
  },
  cellBorder: {
    available:            '#2196F3',
    acquired:             '#FF9800',
    acknowledged_accept:  '#4CAF50',
    acknowledged_release: '#9C27B0',
    acknowledged_reject:  '#F44336',
    archived:             '#3d4f63',
    _default:             '#3d4f63',
  },
  legend: [
    ['AVAIL',   '#2196F3', '#1a3a5c'],
    ['ACQ',     '#FF9800', '#7a3d00'],
    ['ACCEPT',  '#4CAF50', '#1a4a2e'],
    ['RELEASE', '#9C27B0', '#3b1a5c'],
    ['REJECT',  '#F44336', '#5c1a1a'],
    ['ARCH',    '#607D8B', '#1e2430'],
  ],
  processedBg:'#0b1118',  processedStrokeA:'#161f2e',  processedStrokeR:'#2a1010',
  processedSymA:'#1a3a28', processedSymR:'#5a1a1a',
  processedPillBg:'#0e1620', processedPillTxt:'#243550',
  acceptGapBg:'#111820',  acceptGapStroke:'#1e2a3a',  acceptGapSym:'#2a4a3a',
  rejectGapBg:'#180e0e',  rejectGapStroke:'#3a1a1a',  rejectGapSym:'#7a2a2a',
  offsetPillBg:'#1e2a40', offsetPillTxt:'#90aed4',
  partLabel:'#4a6080',
  histBg:'#0d1118',       histStroke:'#1a2232',
  liveBg:'#141820',       liveStroke:'#222840',
  emptyTxt:'#2d3748',
  gapPillBg:'#1a2030',    gapPillTxt:'#4a6080',
  spsoColor:'#4CAF50',    spsoClipped:'#2a5c3a',
  speoColor:'#63b3ed',
  statsTxt:'#2d4060',
  lagBg:'#131820',        lagBgActive:'#2a1e08',
  lagStroke:'#1e2a3a',    lagStrokeActive:'#7a5010',
  lagLbl:'#2d4060',       lagLblActive:'#a07030',
  lagVal:'#3a5070',       lagValActive:'#e2a83a',
  conBg:'#161b22',        conBgProc:'#1a1f0a',        conBgCrash:'#1e0808',
  conStroke:'#2a3347',    conStrokeProc:'#FF9800',     conStrokeCrash:'#e05252',
  conHeader:'#1c2230',    conHeaderProc:'#1e2a0a',     conHeaderCrash:'#3a0f0f',
  conTxt:'#c9d1d9',       conTxtCrash:'#fc8181',
  conBadge:'#4a5568',     conBadgeProc:'#FF9800',      conBadgeCrash:'#e05252',
  conCrashIcon:'#6e2a2a', conCrashTxt:'#e05252',       conWaiting:'#2a3347',
  pillBg:'#1a2a0a',       pillBgLimit:'#3a1515',
  pillStroke:'#FF9800',   pillStrokeLimit:'#e05252',
  pillOffset:'#FF9800',   pillDc:'#6e8a6e',  pillDcLimit:'#fc8181',  pillMore:'#4a5568',
  dcWarn:'#fc8181',       dcOrange:'#fbd38d', dcNormal:'#718096',
  ttEmpty:'#3d5068',      ttPillBg:'#0d1a2a', ttPillBorder:'#1e3048',
  ttPillOffset:'#FF9800', ttRecordsLbl:'#6e7d91',
  ttStateCrash:'#fc8181', ttStateProc:'#FF9800', ttStateIdle:'#6e7d91',
};

const LIGHT = {
  cellBg: {
    available:            '#c8e0f8',
    acquired:             '#fde8c8',
    acknowledged_accept:  '#c8f0d8',
    acknowledged_release: '#e8c8f8',
    acknowledged_reject:  '#f8c8c8',
    archived:             '#d8dee8',
    _default:             '#e8ecf2',
  },
  cellBorder: {
    available:            '#1565c0',
    acquired:             '#e65100',
    acknowledged_accept:  '#2e7d32',
    acknowledged_release: '#6a1b9a',
    acknowledged_reject:  '#c62828',
    archived:             '#455a64',
    _default:             '#8090a8',
  },
  legend: [
    ['AVAIL',   '#1565c0', '#c8e0f8'],
    ['ACQ',     '#e65100', '#fde8c8'],
    ['ACCEPT',  '#2e7d32', '#c8f0d8'],
    ['RELEASE', '#6a1b9a', '#e8c8f8'],
    ['REJECT',  '#c62828', '#f8c8c8'],
    ['ARCH',    '#455a64', '#d8dee8'],
  ],
  processedBg:'#e8edf2',  processedStrokeA:'#b8d0c0',  processedStrokeR:'#d8b8b8',
  processedSymA:'#2e7d32', processedSymR:'#c62828',
  processedPillBg:'#d0dcea', processedPillTxt:'#3a5880',
  acceptGapBg:'#eaf4ee',  acceptGapStroke:'#a8d0b8',   acceptGapSym:'#2e7d32',
  rejectGapBg:'#faeaea',  rejectGapStroke:'#d8a8a8',   rejectGapSym:'#c62828',
  offsetPillBg:'#d0dcea', offsetPillTxt:'#2a4870',
  partLabel:'#3a5880',
  histBg:'#e0e6f0',       histStroke:'#c0ccda',
  liveBg:'#e8edf5',       liveStroke:'#b8c4d4',
  emptyTxt:'#7080a0',
  gapPillBg:'#d0dcea',    gapPillTxt:'#3a5880',
  spsoColor:'#2e7d32',    spsoClipped:'#4a9060',
  speoColor:'#1565c0',
  statsTxt:'#4a6080',
  lagBg:'#eaeff5',        lagBgActive:'#fef3e2',
  lagStroke:'#c0cad8',    lagStrokeActive:'#c8a04a',
  lagLbl:'#7080a0',       lagLblActive:'#906010',
  lagVal:'#5060a0',       lagValActive:'#b07020',
  conBg:'#ffffff',        conBgProc:'#f5fde8',         conBgCrash:'#fef0f0',
  conStroke:'#c8d0dc',    conStrokeProc:'#FF9800',      conStrokeCrash:'#e05252',
  conHeader:'#f0f4f8',    conHeaderProc:'#e8f5d8',      conHeaderCrash:'#fde8e8',
  conTxt:'#1a2030',       conTxtCrash:'#c04040',
  conBadge:'#7080a0',     conBadgeProc:'#e07000',       conBadgeCrash:'#c04040',
  conCrashIcon:'#f0a0a0', conCrashTxt:'#c04040',        conWaiting:'#9090a8',
  pillBg:'#e8f5d8',       pillBgLimit:'#fde8e8',
  pillStroke:'#e07000',   pillStrokeLimit:'#c04040',
  pillOffset:'#d07010',   pillDc:'#507050',  pillDcLimit:'#c04040',  pillMore:'#7080a0',
  dcWarn:'#c04040',       dcOrange:'#c07000', dcNormal:'#6070a0',
  ttEmpty:'#6070a0',      ttPillBg:'#e8edf5', ttPillBorder:'#c0cad8',
  ttPillOffset:'#d07010', ttRecordsLbl:'#5a7090',
  ttStateCrash:'#c04040', ttStateProc:'#e07000', ttStateIdle:'#5a7090',
};

let T = DARK;
let CELL_COLOR = T.cellBg;
let CELL_BORDER = T.cellBorder;
const STATE_LABEL = {
  available:    'AVAIL',
  acquired:     'ACQ',
  acknowledged_accept:  'ACCEPT',
  acknowledged_release: 'RELEASE',
  acknowledged_reject:  'REJECT',
  archived:     'ARCH',
};
const FLASH_TICKS  = 8;
const LOCK_TICKS   = 28;
const MAX_RECORDS       = 40;
const PRODUCE_RATES     = [50, 100, 150, 300, 500]; // events/sec options
const PROC_TIME_VALUES  = [1, 2, 3, 5, 10, 15, 25]; // processing time options (seconds)
const BASE_TICK_RATE    = 1000 / 220;            // ticks/sec at 1×
const P_CRASH      = 0.004;
const MIN_CELL_W = 34;   // minimum cell width before we start windowing
const MAX_CELL_W = 70;   // maximum cell width
const HIST_COUNT  = 5;   // pre-SPSO processed cells shown in history strip
const HIST_CELL_W = 26;  // fixed px width of each history cell

// ═══════════════════════════════════════════════════════════
// §B  Data constructors
// ═══════════════════════════════════════════════════════════
let _nextId = 0;

function makeRecord(partitionId, offset) {
  return {
    id: _nextId++,
    partitionId,
    offset,
    state: STATE.AVAILABLE,
    ackType: null,
    deliveryCount: 0,
    acquiredBy: null,
    lockExpiresAt: Infinity,
    stateChangedAt: 0,
    renewPulse: 0,
    flashAge: 0,   // render frames since last state change (for flash)
  };
}

function makePartition(id) {
  return {
    id,
    // keyed by offset for O(1) lookup
    recordMap: new Map(),
    rejectedOffsets: new Set(),
    spso: 0,   // Share Partition Start Offset
    speo: -1,  // Share Partition End Offset (last produced offset; -1 = empty)
    nextOffset: 0,
    // running totals per partition for display
    totalAccepted: 0, totalReleased: 0, totalRejected: 0, totalArchived: 0,
  };
}

function makeConsumer(id) {
  return {
    id,
    state: 'idle',          // idle | processing | crashed
    acquiredRecords: [],    // array of {partitionId, offset}
    processingTicks: 0,
    crashCooldown: 0,
    shake: 0,
  };
}

// ═══════════════════════════════════════════════════════════
// §C  SimState & config
// ═══════════════════════════════════════════════════════════
const config = {
  partitionCount: 1,
  consumerCount: 1,
  acknowledgementMode: 'implicit',
  acquireMode: 'batch_optimized',
  renewAcknowledgeEnable: true,
  maxPollRecords: 3,
  deliveryCountLimit: 5,
  speedMultiplier: 1,
  produceRate: 50,       // events per second (total across all partitions)
  processingTimeSecs: 1, // how long each consumer takes to settle a batch
};

let sim = null;
let running = true;

function initSim() {
  _nextId = 0;
  sim = {
    tick: 0,
    partitions: Array.from({length: config.partitionCount}, (_, i) => makePartition(i)),
    consumers:  Array.from({length: config.consumerCount},  (_, i) => makeConsumer(i)),
    counters: { accepted: 0, released: 0, rejected: 0, archived: 0 },
    produceCredit: 0,   // global fractional credit accumulator
    produceNext: 0,     // round-robin partition index
  };
}

// helper: all live records across all partitions
function* allRecords() {
  for (const p of sim.partitions)
    for (const r of p.recordMap.values())
      yield r;
}

function liveCount() {
  let n = 0;
  for (const p of sim.partitions) n += p.recordMap.size;
  return n;
}

// ═══════════════════════════════════════════════════════════
// §D  Simulation
// ═══════════════════════════════════════════════════════════

function produceRecords() {
  // Global credit pool + strict round-robin ensures even distribution across partitions.
  // Each tick the pool earns (rate / ticksPerSec) credits total; we spend them one
  // record at a time cycling through partitions in order, so every partition gets
  // exactly the same number of records regardless of MAX_RECORDS timing.
  const ticksPerSec = config.speedMultiplier * BASE_TICK_RATE;
  const creditsPerTick = config.produceRate / ticksPerSec;

  sim.produceCredit += creditsPerTick;
  // Cap to avoid bursting after a long pause (max ~1 full cycle of records)
  sim.produceCredit = Math.min(sim.produceCredit, config.partitionCount * 4);

  while (sim.produceCredit >= 1) {
    if (liveCount() >= MAX_RECORDS) { sim.produceCredit = 0; break; }
    sim.produceCredit -= 1;
    const p = sim.partitions[sim.produceNext % config.partitionCount];
    sim.produceNext = (sim.produceNext + 1) % config.partitionCount;
    const offset = p.nextOffset++;
    p.speo = offset;
    const r = makeRecord(p.id, offset);
    p.recordMap.set(offset, r);
    if (offset === 0) p.spso = 0;
  }
}

function consumerPollStep() {
  // Gather all available records sorted by partition then offset (FIFO — older records first)
  // This matches how the broker delivers from SPSO forward in real share partitions.
  const avail = [];
  for (const r of allRecords())
    if (r.state === STATE.AVAILABLE) avail.push(r);
  if (!avail.length) return;
  avail.sort((a, b) => a.partitionId - b.partitionId || a.offset - b.offset);

  for (const c of sim.consumers) {
    if (c.state !== 'idle') continue;
    let maxTake = config.maxPollRecords;
    if (config.acquireMode === 'batch_optimized')
      maxTake = Math.max(1, Math.floor(maxTake * (0.5 + Math.random() * 0.6)));

    // Each consumer gets a fresh view of still-available records (earlier consumers may have taken some)
    const pool = avail.filter(r => r.state === STATE.AVAILABLE);
    const take = pool.slice(0, maxTake);
    if (!take.length) continue;

    for (const r of take) {
      r.state = STATE.ACQUIRED;
      r.deliveryCount++;
      r.acquiredBy = c.id;
      r.lockExpiresAt = sim.tick + LOCK_TICKS;
      r.stateChangedAt = sim.tick;
      r.flashAge = 0;
      c.acquiredRecords.push({ partitionId: r.partitionId, offset: r.offset });
    }
    c.state = 'processing';
    c.processingTicks = Math.max(1, Math.round(config.processingTimeSecs * BASE_TICK_RATE));
  }
}

function consumerAckStep() {
  for (const c of sim.consumers) {
    if (c.state !== 'processing') continue;
    if (--c.processingTicks > 0) {
      // Still processing — proactively extend locks about to expire (explicit+RENEW mode only)
      if (config.acknowledgementMode === 'explicit' && config.renewAcknowledgeEnable) {
        for (const { partitionId, offset } of c.acquiredRecords) {
          const r = sim.partitions[partitionId]?.recordMap.get(offset);
          if (!r || r.state !== STATE.ACQUIRED) continue;
          if (sim.tick + 4 >= r.lockExpiresAt) {
            r.lockExpiresAt = sim.tick + LOCK_TICKS;
            r.renewPulse = 15;
          }
        }
      }
      continue;
    }

    const toAck = c.acquiredRecords.splice(0);
    c.state = 'idle';

    for (const { partitionId, offset } of toAck) {
      const p = sim.partitions[partitionId];
      const r = p.recordMap.get(offset);
      if (!r || r.state !== STATE.ACQUIRED) continue;

      let ackType;
      if (config.acknowledgementMode === 'implicit') {
        ackType = ACK.ACCEPT;
      } else {
        const roll = Math.random();
        if (roll < 0.65)       ackType = ACK.ACCEPT;
        else if (roll < 0.80)  ackType = ACK.RELEASE;
        else                   ackType = ACK.REJECT;
      }
      applyAck(r, c, ackType);
    }
  }
}

function applyAck(r, consumer, ackType) {
  if (ackType === ACK.RENEW) {
    r.lockExpiresAt = sim.tick + LOCK_TICKS;
    r.renewPulse = 15;
    consumer.acquiredRecords.push({ partitionId: r.partitionId, offset: r.offset });
    consumer.state = 'processing';
    consumer.processingTicks = 8 + Math.floor(Math.random() * 10);
    return;
  }
  r.acquiredBy = null;
  r.ackType = ackType;
  r.state = STATE.ACKNOWLEDGED;
  r.stateChangedAt = sim.tick;
  r.flashAge = 0;
}

function lockTimeoutStep() {
  for (const r of allRecords()) {
    if (r.state === STATE.ACQUIRED && sim.tick > r.lockExpiresAt) {
      const c = sim.consumers.find(x => x.id === r.acquiredBy);
      if (c) c.acquiredRecords = c.acquiredRecords.filter(x => !(x.partitionId === r.partitionId && x.offset === r.offset));
      r.state = STATE.AVAILABLE;
      r.acquiredBy = null;
      r.lockExpiresAt = Infinity;
      r.stateChangedAt = sim.tick;
      r.flashAge = 0;
    }
  }
}

function crashStep() {
  for (const c of sim.consumers) {
    if (c.state === 'crashed') {
      if (--c.crashCooldown <= 0) { c.state = 'idle'; c.shake = 0; }
      continue;
    }
    if (c.state === 'processing' && Math.random() < P_CRASH) crashConsumer(c);
  }
}

function crashConsumer(c) {
  for (const { partitionId, offset } of c.acquiredRecords) {
    const r = sim.partitions[partitionId].recordMap.get(offset);
    if (!r) continue;
    r.state = STATE.AVAILABLE;
    r.acquiredBy = null;
    r.lockExpiresAt = Infinity;
    r.stateChangedAt = sim.tick;
    r.flashAge = 0;
  }
  c.acquiredRecords = [];
  c.state = 'crashed';
  c.crashCooldown = 20;
  c.shake = 20;
}

function transientCleanup() {
  for (const p of sim.partitions) {
    for (const r of p.recordMap.values()) {
      if (r.state !== STATE.ACKNOWLEDGED) continue;
      if (sim.tick - r.stateChangedAt < FLASH_TICKS) continue;

      if (r.ackType === ACK.ACCEPT) {
        p.recordMap.delete(r.offset);
        p.totalAccepted++;
        sim.counters.accepted++;
        advanceSPSO(p);
      } else if (r.ackType === ACK.RELEASE) {
        r.state = STATE.AVAILABLE;
        r.ackType = null;
        r.lockExpiresAt = Infinity;
        r.stateChangedAt = sim.tick;
        r.flashAge = 0;
        p.totalReleased++;
        sim.counters.released++;
      } else if (r.ackType === ACK.REJECT) {
        p.rejectedOffsets.add(r.offset);
        p.recordMap.delete(r.offset);
        p.totalRejected++;
        sim.counters.rejected++;
        advanceSPSO(p);
      }
    }
  }
}

function advanceSPSO(p) {
  // SPSO = lowest offset of any live record in this partition
  if (p.recordMap.size === 0) {
    p.spso = p.nextOffset;
    return;
  }
  let min = Infinity;
  for (const offset of p.recordMap.keys()) if (offset < min) min = offset;
  p.spso = min;
}

function archiveCheck() {
  for (const p of sim.partitions) {
    for (const r of p.recordMap.values()) {
      if (r.state === STATE.AVAILABLE && r.deliveryCount >= config.deliveryCountLimit) {
        p.recordMap.delete(r.offset);
        p.totalArchived++;
        sim.counters.archived++;
        advanceSPSO(p);
      }
    }
  }
}

function simulationTick() {
  sim.tick++;
  produceRecords();
  consumerPollStep();
  consumerAckStep();
  lockTimeoutStep();
  crashStep();
  transientCleanup();
  archiveCheck();
  updateStatusBar();
}

// ═══════════════════════════════════════════════════════════
// §E  Layout
// ═══════════════════════════════════════════════════════════
const canvas = document.getElementById('viz');
const ctx = canvas.getContext('2d');
let L = {};

function computeLayout() {
  const W = canvas.width;
  const H = canvas.height;
  const np = config.partitionCount;
  const nc = config.consumerCount;

  // Consumer row at bottom: taller for legibility
  const CONSUMER_ROW_H = Math.max(90, Math.min(130, H * 0.22));
  const PARTITION_AREA_H = H - CONSUMER_ROW_H - 8;
  // Cap lane height so a single partition doesn't sprawl; min for 3 partitions
  const LANE_H = Math.min(200, PARTITION_AREA_H / np);

  // Left margin: label strip + history zone (5 pre-SPSO processed cells) + gap
  const LABEL_W     = 36;
  const HIST_AREA_W = HIST_COUNT * HIST_CELL_W;   // 5 × 26 = 130
  const LEFT_MARGIN = LABEL_W + HIST_AREA_W + 6;  // 172
  // Right margin for SPEO label
  const RIGHT_MARGIN = 64;
  const USABLE_W = W - LEFT_MARGIN - RIGHT_MARGIN;

  // CELL_W is computed dynamically per partition in viewportFor()
  const CELL_H = LANE_H - 42; // room for offset pill labels top and stats bottom

  // Consumer box sizing
  const CBOX_W = Math.max(80, Math.min(130, (W - 20) / Math.max(nc, 1) - 8));
  const CBOX_H = CONSUMER_ROW_H - 10;
  const CBOX_Y = H - CONSUMER_ROW_H;
  // center the row
  const cboxTotalW = nc * CBOX_W + (nc - 1) * 6;
  const CBOX_X0 = (W - cboxTotalW) / 2;

  L = { W, H, np, nc, LANE_H, LABEL_W, HIST_AREA_W, LEFT_MARGIN, RIGHT_MARGIN, USABLE_W,
        CELL_H, PARTITION_AREA_H,
        CONSUMER_ROW_H, CBOX_W, CBOX_H, CBOX_Y, CBOX_X0 };
}

// For a given partition, compute viewport range + dynamic cell width.
// Always anchors at SPSO so both markers are always visible.
function viewportFor(p) {
  if (p.speo < 0) return { start: 0, end: -1, cellW: MAX_CELL_W };

  const spso = p.spso;
  const speo = p.speo;
  const totalCells = speo - spso + 1;

  // Try to fit all cells from SPSO→SPEO
  const idealW = Math.floor(L.USABLE_W / totalCells);

  if (idealW >= MIN_CELL_W) {
    // All cells fit — show everything, clamp cell width
    return { start: spso, end: speo, cellW: Math.min(idealW, MAX_CELL_W) };
  }

  // Too many cells — show a window ending at SPEO, starting as close to SPSO as possible
  const maxFit = Math.floor(L.USABLE_W / MIN_CELL_W);
  const start  = Math.max(spso, speo - maxFit + 1);
  return { start, end: speo, cellW: MIN_CELL_W, clipped: start > spso, spso };
}

// ═══════════════════════════════════════════════════════════
// §F  Rendering
// ═══════════════════════════════════════════════════════════

function drawProcessedCell(x, y, w, h, offset, rejected = false) {
  ctx.fillStyle = T.processedBg;
  ctx.beginPath(); ctx.roundRect(x + 1, y, w - 2, h, 3); ctx.fill();
  ctx.strokeStyle = rejected ? T.processedStrokeR : T.processedStrokeA; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect(x + 1, y, w - 2, h, 3); ctx.stroke();

  ctx.fillStyle = rejected ? T.processedSymR : T.processedSymA;
  ctx.font = `bold ${Math.min(11, h * 0.28)}px sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(rejected ? '✕' : '✓', x + w / 2, y + h / 2 + 2);

  // Offset pill — very dim
  const offStr = String(offset);
  ctx.font = 'bold 9px Courier New';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const offW = ctx.measureText(offStr).width + 6;
  const offH = 12;
  const offX = x + w / 2 - offW / 2;
  const offY = y - offH - 2;
  ctx.fillStyle = T.processedPillBg;
  ctx.beginPath(); ctx.roundRect(offX, offY, offW, offH, 3); ctx.fill();
  ctx.fillStyle = T.processedPillTxt;
  ctx.fillText(offStr, x + w / 2, offY + offH / 2);
}

function drawAcceptedGap(x, y, w, h) {
  ctx.fillStyle = T.acceptGapBg;
  ctx.beginPath(); ctx.roundRect(x + 1, y, w - 2, h, 3); ctx.fill();
  ctx.strokeStyle = T.acceptGapStroke; ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = T.acceptGapSym;
  ctx.font = `bold ${Math.min(14, h * 0.3)}px sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('✓', x + w / 2, y + h / 2);
}

function drawRejectedGap(x, y, w, h) {
  ctx.fillStyle = T.rejectGapBg;
  ctx.beginPath(); ctx.roundRect(x + 1, y, w - 2, h, 3); ctx.fill();
  ctx.strokeStyle = T.rejectGapStroke; ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = T.rejectGapSym;
  ctx.font = `bold ${Math.min(14, h * 0.3)}px sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('✕', x + w / 2, y + h / 2);
}

function cellKey(r) {
  if (r.state === STATE.ACKNOWLEDGED) {
    if (r.ackType === ACK.ACCEPT)  return 'acknowledged_accept';
    if (r.ackType === ACK.RELEASE) return 'acknowledged_release';
    if (r.ackType === ACK.REJECT)  return 'acknowledged_reject';
  }
  return r.state;
}

function drawCell(x, y, w, h, r, offset) {
  const key = r ? cellKey(r) : 'archived';

  // Cell background
  ctx.fillStyle = CELL_COLOR[key] || CELL_COLOR._default;
  ctx.beginPath();
  ctx.roundRect(x + 1, y, w - 2, h, 3);
  ctx.fill();

  // Border — glow during flash
  const flashing = r && (performance.now() / 120 + r.id) % 2 < 1 &&
                   r.flashAge !== undefined && r.flashAge < 12;
  ctx.strokeStyle = CELL_BORDER[key] || CELL_BORDER._default;
  ctx.lineWidth = flashing ? 2 : 1;
  if (flashing) { ctx.shadowColor = CELL_BORDER[key]; ctx.shadowBlur = 8; }
  ctx.beginPath();
  ctx.roundRect(x + 1, y, w - 2, h, 3);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Offset label — pill background above cell for legibility
  const offStr = String(offset);
  ctx.font = 'bold 10px Courier New';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const offW = ctx.measureText(offStr).width + 8;
  const offH = 14;
  const offX = x + w / 2 - offW / 2;
  const offY = y - offH - 2;
  ctx.fillStyle = T.offsetPillBg;
  ctx.beginPath(); ctx.roundRect(offX, offY, offW, offH, 3); ctx.fill();
  ctx.fillStyle = T.offsetPillTxt;
  ctx.fillText(offStr, x + w / 2, offY + offH / 2);

  if (!r) return;

  // State label
  const label = STATE_LABEL[key] || key;
  const fontSize = Math.max(9, Math.min(13, (w - 6) / label.length * 1.7));
  ctx.fillStyle = CELL_BORDER[key] || CELL_BORDER._default;
  ctx.font = `bold ${fontSize}px Courier New`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, x + w / 2, h >= 42 ? y + h * 0.30 : y + h * 0.38);

  // Delivery count — always show on ACQ cells; only on redelivery for others
  const showDC = r.state === STATE.ACQUIRED
    ? r.deliveryCount >= 1
    : r.deliveryCount > 1;
  if (showDC && h >= 30) {
    const dcLabel = `×${r.deliveryCount}`;
    const atLimit = r.deliveryCount >= config.deliveryCountLimit - 1;
    ctx.fillStyle = atLimit ? T.dcWarn : (r.state === STATE.ACQUIRED ? T.dcOrange : T.dcNormal);
    ctx.font = `bold ${Math.max(9, Math.min(11, w / 3.5))}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(dcLabel, x + w / 2, y + h * 0.62);
  }

  // Consumer badge (bottom of ACQ cell)
  if (r.state === STATE.ACQUIRED && r.acquiredBy !== null && h >= 36) {
    ctx.fillStyle = CELL_BORDER.acquired;
    ctx.font = `bold ${Math.max(9, Math.min(11, w / 4))}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`C${r.acquiredBy}`, x + w / 2, y + h - 2);
  }

  // RENEW pulse ring
  if (r.renewPulse > 0) {
    const progress = 1 - r.renewPulse / 15;
    ctx.beginPath();
    ctx.roundRect(x + 1 - progress * 4, y - progress * 4,
                  w - 2 + progress * 8, h + progress * 8, 5);
    ctx.strokeStyle = `rgba(255,255,255,${0.7 * (1 - progress)})`;
    ctx.lineWidth = 2;
    ctx.stroke();
    r.renewPulse--;
  }
}

function drawPartitionLane(p, laneIdx) {
  const vp = viewportFor(p);
  const { start, end } = vp;
  const cw = vp.cellW;
  const laneY = laneIdx * L.LANE_H;
  const cellTop = laneY + 24;  // room for offset pill labels above
  const ch = L.CELL_H;

  // ── Partition label (in LABEL_W strip) ──
  ctx.fillStyle = T.partLabel;
  ctx.font = 'bold 12px Courier New';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`P${p.id}`, L.LABEL_W / 2, laneY + L.LANE_H / 2);

  // ── History zone background (between label and SPSO boundary) ──
  const histX0 = L.LABEL_W + 2;
  const histW  = L.HIST_AREA_W;
  ctx.fillStyle = T.histBg;
  ctx.beginPath();
  ctx.roundRect(histX0, laneY + 4, histW, L.LANE_H - 8, 4);
  ctx.fill();
  ctx.strokeStyle = T.histStroke; ctx.lineWidth = 1; ctx.stroke();

  // ── History cells: up to HIST_COUNT pre-SPSO records, right-aligned to SPSO boundary ──
  if (p.spso > 0) {
    for (let i = 0; i < HIST_COUNT; i++) {
      const offset = p.spso - HIST_COUNT + i;
      if (offset < 0) continue;
      const hx = histX0 + i * HIST_CELL_W;
      drawProcessedCell(hx, cellTop, HIST_CELL_W, ch, offset, p.rejectedOffsets.has(offset));
    }
  }

  // ── Live zone background ──
  ctx.fillStyle = T.liveBg;
  ctx.beginPath();
  ctx.roundRect(L.LEFT_MARGIN - 4, laneY + 4, L.USABLE_W + 8, L.LANE_H - 8, 5);
  ctx.fill();
  ctx.strokeStyle = T.liveStroke;
  ctx.lineWidth = 1;
  ctx.stroke();

  if (end < 0) {
    // Empty partition — placeholder
    ctx.fillStyle = T.emptyTxt;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('awaiting records…', L.LEFT_MARGIN + L.USABLE_W / 2, laneY + L.LANE_H / 2);
    return;
  }

  // Draw cells from start to end
  const numCells = end - start + 1;
  for (let offset = start; offset <= end; offset++) {
    const col = offset - start;
    const cx = L.LEFT_MARGIN + col * cw;
    const r = p.recordMap.get(offset);
    if (r) {
      drawCell(cx, cellTop, cw, ch, r, offset);
    } else {
      // Gap: offset was produced but record was accepted/rejected and removed from map
      // Draw the offset label above the gap (same pill style as drawCell)
      const gapStr = String(offset);
      ctx.font = 'bold 10px Courier New';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const gapOffW = ctx.measureText(gapStr).width + 8;
      const gapOffH = 14;
      const gapOffX = cx + cw / 2 - gapOffW / 2;
      const gapOffY = cellTop - gapOffH - 2;
      ctx.fillStyle = T.gapPillBg;
      ctx.beginPath(); ctx.roundRect(gapOffX, gapOffY, gapOffW, gapOffH, 3); ctx.fill();
      ctx.fillStyle = T.gapPillTxt;
      ctx.fillText(gapStr, cx + cw / 2, gapOffY + gapOffH / 2);
      if (p.rejectedOffsets.has(offset)) {
        drawRejectedGap(cx, cellTop, cw, ch);
      } else {
        drawAcceptedGap(cx, cellTop, cw, ch);
      }
    }
  }

  // ── SPSO boundary line — always pinned at LEFT_MARGIN (left edge of live zone) ──
  const spsoX = L.LEFT_MARGIN - 2;
  ctx.beginPath();
  ctx.moveTo(spsoX, laneY + 4);
  ctx.lineTo(spsoX, laneY + L.LANE_H - 4);
  ctx.strokeStyle = T.spsoColor; ctx.lineWidth = 2;
  ctx.setLineDash([4, 3]); ctx.stroke(); ctx.setLineDash([]);
  // SPSO label above history zone (right-aligned to boundary)
  ctx.fillStyle = T.spsoColor;
  ctx.font = 'bold 8px Courier New';
  ctx.textAlign = 'right'; ctx.textBaseline = 'top';
  ctx.fillText('SPSO', spsoX - 1, laneY + 5);
  ctx.font = '8px Courier New';
  ctx.fillText(`=${p.spso}`, spsoX - 1, laneY + 14);
  // Arrow pointing right into live zone
  ctx.fillStyle = T.spsoColor;
  ctx.beginPath();
  ctx.moveTo(spsoX, laneY + L.LANE_H / 2 - 4);
  ctx.lineTo(spsoX + 7, laneY + L.LANE_H / 2);
  ctx.lineTo(spsoX, laneY + L.LANE_H / 2 + 4);
  ctx.closePath(); ctx.fill();
  // When viewport is windowed (start > spso), note hidden live records
  if (vp.clipped && start > p.spso) {
    ctx.fillStyle = T.spsoClipped;
    ctx.font = '8px Courier New';
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText(`+${start - p.spso} live`, L.LEFT_MARGIN + 2, laneY + 5);
  }

  // ── SPEO marker ──
  const speoX = L.LEFT_MARGIN + numCells * cw;

  ctx.beginPath();
  ctx.moveTo(speoX, laneY + 6);
  ctx.lineTo(speoX, laneY + L.LANE_H - 10);
  ctx.strokeStyle = T.speoColor;
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 3]);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = T.speoColor;
  ctx.font = 'bold 9px Courier New';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillText(`SPEO`, speoX - 2, laneY + 14);
  ctx.font = '9px Courier New';
  ctx.fillText(`=${p.speo}`, speoX - 2, laneY + 23);

  // Arrow right on SPEO
  ctx.fillStyle = T.speoColor;
  ctx.beginPath();
  ctx.moveTo(speoX - 7, laneY + L.LANE_H / 2 - 4);
  ctx.lineTo(speoX, laneY + L.LANE_H / 2);
  ctx.lineTo(speoX - 7, laneY + L.LANE_H / 2 + 4);
  ctx.closePath();
  ctx.fill();

  // ── Partition stats (bottom right of lane) ──
  ctx.fillStyle = T.statsTxt;
  ctx.font = '9px Courier New';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  const statsStr = `acc:${p.totalAccepted}  rel:${p.totalReleased}  rej:${p.totalRejected}  arch:${p.totalArchived}`;
  ctx.fillText(statsStr, L.LEFT_MARGIN + L.USABLE_W, laneY + L.LANE_H - 4);

  // ── Live count (bottom left) ──
  ctx.fillStyle = T.statsTxt;
  ctx.font = '9px Courier New';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';
  ctx.fillText(`live: ${p.recordMap.size}`, L.LEFT_MARGIN, laneY + L.LANE_H - 4);

  // ── Lag badge (KIP-1226) — top-right corner of live zone ──
  const lag = p.speo >= 0 ? p.speo - p.spso + 1 : 0;
  const badgeW = 58, badgeH = 34;
  const badgeX = L.LEFT_MARGIN + L.USABLE_W - badgeW - 4;
  const badgeY = laneY + 6;
  const hasLag = lag > 0;
  ctx.fillStyle = hasLag ? T.lagBgActive : T.lagBg;
  ctx.beginPath(); ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 4); ctx.fill();
  ctx.strokeStyle = hasLag ? T.lagStrokeActive : T.lagStroke; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 4); ctx.stroke();
  // "LAG" label
  ctx.fillStyle = hasLag ? T.lagLblActive : T.lagLbl;
  ctx.font = 'bold 8px Courier New';
  ctx.textAlign = 'center'; ctx.textBaseline = 'top';
  ctx.fillText('LAG', badgeX + badgeW / 2, badgeY + 4);
  // Lag value
  ctx.fillStyle = hasLag ? T.lagValActive : T.lagVal;
  ctx.font = `bold ${Math.min(16, badgeH * 0.52)}px Courier New`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
  ctx.fillText(String(lag), badgeX + badgeW / 2, badgeY + badgeH - 3);
}

function consumerBoxRect(i) {
  const w = L.CBOX_W, h = L.CBOX_H;
  return { x: L.CBOX_X0 + i * (w + 8), y: L.CBOX_Y, w, h };
}

function drawConsumerRow() {
  for (let i = 0; i < sim.consumers.length; i++) {
    const c = sim.consumers[i];
    const { x, y, w, h } = consumerBoxRect(i);
    const shakeX = c.shake > 0 ? Math.sin(c.shake * 1.3) * 2 : 0;
    const bx = x + shakeX;

    const isCrashed    = c.state === 'crashed';
    const isProcessing = c.state === 'processing';
    const hasRecords   = c.acquiredRecords.length > 0;

    // Card shadow/glow
    if (isCrashed) { ctx.shadowColor = '#F44336'; ctx.shadowBlur = 12; }
    else if (isProcessing) { ctx.shadowColor = '#FF9800'; ctx.shadowBlur = 6; }

    // Card background
    ctx.fillStyle = isCrashed ? T.conBgCrash : isProcessing ? T.conBgProc : T.conBg;
    ctx.beginPath(); ctx.roundRect(bx, y, w, h, 6); ctx.fill();

    // Card border
    ctx.strokeStyle = isCrashed ? T.conStrokeCrash : isProcessing ? T.conStrokeProc : T.conStroke;
    ctx.lineWidth = isCrashed || isProcessing ? 1.5 : 1;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // ── Header strip ──
    const headerH = 22;
    ctx.fillStyle = isCrashed ? T.conHeaderCrash : isProcessing ? T.conHeaderProc : T.conHeader;
    ctx.beginPath(); ctx.roundRect(bx + 1, y + 1, w - 2, headerH, [5, 5, 0, 0]); ctx.fill();

    // Consumer ID
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillStyle = isCrashed ? T.conTxtCrash : T.conTxt;
    ctx.font = 'bold 12px Courier New';
    ctx.fillText(`C${c.id}`, bx + 9, y + headerH / 2 + 1);

    // State badge (right of header)
    const stateText = isCrashed ? 'CRASHED' : isProcessing ? 'PROCESSING' : 'IDLE';
    const badgeColor = isCrashed ? T.conBadgeCrash : isProcessing ? T.conBadgeProc : T.conBadge;
    ctx.font = 'bold 8px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillStyle = badgeColor;
    ctx.fillText(stateText, bx + w - 7, y + headerH / 2 + 1);

    // ── Record pills ──
    const bodyY = y + headerH + 5;
    const bodyH = h - headerH - 10;

    if (isCrashed) {
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = T.conCrashIcon;
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('💥', bx + w / 2, bodyY + bodyH / 2 - 6);
      ctx.fillStyle = T.conCrashTxt;
      ctx.font = '9px sans-serif';
      ctx.fillText(`recovery in ${c.crashCooldown}`, bx + w / 2, bodyY + bodyH / 2 + 8);
    } else if (!hasRecords) {
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = T.conWaiting;
      ctx.font = '9px sans-serif';
      ctx.fillText('waiting for records', bx + w / 2, bodyY + bodyH / 2);
    } else {
      // Draw each held record as a small pill: [Pn:offset ×dc]
      const pillH = 15;
      const pillGap = 3;
      const maxVisible = Math.floor(bodyH / (pillH + pillGap));
      const records = c.acquiredRecords.slice(0, maxVisible);

      records.forEach(({ partitionId, offset }, idx) => {
        const py = bodyY + idx * (pillH + pillGap);
        const r  = sim.partitions[partitionId]?.recordMap.get(offset);
        const dc = r ? r.deliveryCount : 1;
        const atLimit = dc >= config.deliveryCountLimit - 1;

        // Pill bg
        ctx.fillStyle = atLimit ? T.pillBgLimit : T.pillBg;
        ctx.beginPath(); ctx.roundRect(bx + 6, py, w - 12, pillH, 3); ctx.fill();
        ctx.strokeStyle = atLimit ? T.pillStrokeLimit : T.pillStroke;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Partition + offset
        ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillStyle = T.pillOffset;
        ctx.font = 'bold 9px Courier New';
        ctx.fillText(`P${partitionId}:${offset}`, bx + 10, py + pillH / 2);

        // Delivery count badge
        ctx.textAlign = 'right';
        ctx.fillStyle = atLimit ? T.pillDcLimit : T.pillDc;
        ctx.font = '8px Courier New';
        ctx.fillText(`×${dc}`, bx + w - 8, py + pillH / 2);
      });

      // Overflow indicator
      if (c.acquiredRecords.length > maxVisible) {
        ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
        ctx.fillStyle = T.pillMore;
        ctx.font = '8px sans-serif';
        ctx.fillText(`+${c.acquiredRecords.length - maxVisible} more`, bx + w / 2, y + h - 3);
      }
    }

    if (c.shake > 0) c.shake--;
  }
}

function drawLegend() {
  // Top-right corner mini legend
  const items = T.legend;
  const iw = 62, ih = 16, gap = 2;
  const totalH = items.length * (ih + gap);
  const x0 = L.W - iw - 6;
  const y0 = 8;
  for (let i = 0; i < items.length; i++) {
    const [label, border, bg] = items[i];
    const y = y0 + i * (ih + gap);
    ctx.fillStyle = bg;
    ctx.beginPath(); ctx.roundRect(x0, y, iw, ih, 2); ctx.fill();
    ctx.strokeStyle = border; ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = border;
    ctx.font = 'bold 8px Courier New';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(label, x0 + iw / 2, y + ih / 2);
  }
}

function render() {
  ctx.clearRect(0, 0, L.W, L.H);
  if (!sim) return;

  // Tick flashAge for all records
  for (const r of allRecords()) r.flashAge++;

  for (let i = 0; i < sim.partitions.length; i++)
    drawPartitionLane(sim.partitions[i], i);

  drawConsumerRow();
  drawLegend();
}

// ═══════════════════════════════════════════════════════════
// §G  Animation loop
// ═══════════════════════════════════════════════════════════
const BASE_TICK_MS = 220;
let lastTickTime = 0;

function animationFrame(ts) {
  const tickMs = BASE_TICK_MS / config.speedMultiplier;
  if (running && ts - lastTickTime >= tickMs) {
    simulationTick();
    lastTickTime = ts;
  }
  render();
  requestAnimationFrame(animationFrame);
}

// ═══════════════════════════════════════════════════════════
// §H  Status bar
// ═══════════════════════════════════════════════════════════
function updateStatusBar() {
  let avail = 0, acq = 0, totalLag = 0;
  for (const r of allRecords()) {
    if (r.state === STATE.AVAILABLE) avail++;
    else if (r.state === STATE.ACQUIRED) acq++;
  }
  for (const p of sim.partitions)
    totalLag += p.speo >= 0 ? p.speo - p.spso + 1 : 0;
  document.getElementById('cntAvail').textContent = avail;
  document.getElementById('cntAcq').textContent   = acq;
  document.getElementById('cntAcc').textContent   = sim.counters.accepted;
  document.getElementById('cntRel').textContent   = sim.counters.released;
  document.getElementById('cntRej').textContent   = sim.counters.rejected;
  document.getElementById('cntArch').textContent  = sim.counters.archived;
  document.getElementById('cntLag').textContent   = totalLag;
}

// ═══════════════════════════════════════════════════════════
// §I  Controls & toolbar
// ═══════════════════════════════════════════════════════════
function setRunning(val) {
  running = val;
  const btn = document.getElementById('btnPlay');
  const hint = document.getElementById('pauseHint');
  if (running) {
    btn.textContent = '⏸ Pause';
    btn.className = 'btn running';
    hint.style.display = 'none';
  } else {
    btn.textContent = '▶ Resume';
    btn.className = 'btn paused';
    hint.style.display = 'block';
  }
}

document.getElementById('btnPlay').addEventListener('click', () => setRunning(!running));

document.getElementById('btnStep').addEventListener('click', () => {
  if (!running && sim) { simulationTick(); render(); }
});

document.getElementById('btnReset').addEventListener('click', () => {
  initSim(); computeLayout();
});

document.getElementById('btnCrash').addEventListener('click', () => {
  if (!sim) return;
  const eligible = sim.consumers.filter(c => c.state !== 'crashed');
  if (!eligible.length) return;
  crashConsumer(eligible[Math.floor(Math.random() * eligible.length)]);
});

document.getElementById('speedSlider').addEventListener('input', e => {
  config.speedMultiplier = +e.target.value;
  const v = +e.target.value;
  document.getElementById('speedVal').textContent = (v === Math.floor(v) ? v : v.toFixed(2)).toString() + '×';
});

// Partition slider: index 0-3 → values 1,3,6,9
const PART_VALUES     = [1, 3, 6, 9];
// Consumer slider: index 0-7 → values 1,3,6,9,12,15,21,25
const CONSUMER_VALUES = [1, 3, 6, 9, 12, 15, 21, 25];
document.getElementById('partSlider').addEventListener('input', e => {
  const n = PART_VALUES[+e.target.value];
  document.getElementById('partVal').textContent = n;
  config.partitionCount = n;
  initSim(); computeLayout();
});

document.getElementById('consumerSlider').addEventListener('input', e => {
  const n = CONSUMER_VALUES[+e.target.value];
  document.getElementById('consumerVal').textContent = n;
  if (!sim) return;
  if (n > sim.consumers.length) {
    while (sim.consumers.length < n) sim.consumers.push(makeConsumer(sim.consumers.length));
  } else {
    const removed = sim.consumers.splice(n);
    for (const c of removed) {
      for (const { partitionId, offset } of c.acquiredRecords) {
        const r = sim.partitions[partitionId]?.recordMap.get(offset);
        if (r) { r.state = STATE.AVAILABLE; r.acquiredBy = null; r.lockExpiresAt = Infinity; }
      }
    }
  }
  config.consumerCount = n;
  computeLayout();
});

// (partition radios replaced by slider — no buildPartitionRadios needed)

document.getElementById('produceSlider').addEventListener('input', e => {
  config.produceRate = PRODUCE_RATES[+e.target.value];
  document.getElementById('produceVal').textContent = config.produceRate;
});

document.getElementById('ackMode').addEventListener('change', e => { config.acknowledgementMode = e.target.value; });
document.getElementById('acquireMode').addEventListener('change', e => { config.acquireMode = e.target.value; });
document.getElementById('renewEnable').addEventListener('change', e => {
  config.renewAcknowledgeEnable = e.target.checked;
  document.getElementById('renewLabel').textContent = e.target.checked ? 'enabled' : 'disabled';
});

// Info popover toggles
document.querySelectorAll('.info-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const id = btn.dataset.info;
    const popover = document.getElementById(id);
    const wasOpen = popover.classList.contains('open');
    // Close all popovers first
    document.querySelectorAll('.info-popover.open').forEach(p => p.classList.remove('open'));
    if (!wasOpen) popover.classList.add('open');
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('.info-popover.open').forEach(p => p.classList.remove('open'));
});
document.getElementById('pollSlider').addEventListener('input', e => {
  config.maxPollRecords = +e.target.value;
  document.getElementById('pollVal').textContent = e.target.value;
});
document.getElementById('deliverySlider').addEventListener('input', e => {
  config.deliveryCountLimit = +e.target.value;
  document.getElementById('deliveryVal').textContent = e.target.value;
});

document.getElementById('procTimeSlider').addEventListener('input', e => {
  config.processingTimeSecs = PROC_TIME_VALUES[+e.target.value];
  document.getElementById('procTimeVal').textContent = config.processingTimeSecs + 's';
});

// Spacebar to pause/resume
document.addEventListener('keydown', e => {
  if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT') {
    e.preventDefault();
    setRunning(!running);
  }
});

// ═══════════════════════════════════════════════════════════
// §J  Resize & bootstrap
// ═══════════════════════════════════════════════════════════
function handleResize() {
  const wrap = document.getElementById('canvasWrap');
  canvas.width  = wrap.clientWidth;
  canvas.height = wrap.clientHeight;
  computeLayout();
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ═══════════════════════════════════════════════════════════
// §L  Tooltip / hit-test
// ═══════════════════════════════════════════════════════════
const tooltip = document.getElementById('tooltip');

// Given canvas pixel coords, return the consumer box under the cursor (or null)
function consumerAtPoint(px, py) {
  if (!sim) return null;
  for (let i = 0; i < sim.consumers.length; i++) {
    const { x, y, w, h } = consumerBoxRect(i);
    if (px >= x && px <= x + w && py >= y && py <= y + h) {
      return sim.consumers[i];
    }
  }
  return null;
}

function showConsumerTooltip(c, mouseX, mouseY) {
  const stateLabel = c.state === 'crashed' ? 'CRASHED'
                   : c.state === 'processing' ? 'PROCESSING'
                   : 'IDLE';
  const stateColor = c.state === 'crashed' ? T.ttStateCrash
                   : c.state === 'processing' ? T.ttStateProc : T.ttStateIdle;

  let recordRows = '';
  if (c.acquiredRecords.length === 0) {
    recordRows = `<div class="tt-row" style="color:${T.ttEmpty};font-style:italic">no records held</div>`;
  } else {
    for (const { partitionId, offset } of c.acquiredRecords) {
      const r = sim.partitions[partitionId]?.recordMap.get(offset);
      const dc = r ? r.deliveryCount : '?';
      const atLimit = r && r.deliveryCount >= config.deliveryCountLimit - 1;
      const lockLeft = r ? Math.max(0, r.lockExpiresAt - sim.tick) : '?';
      recordRows += `
        <div style="margin:4px 0 2px;padding:4px 6px;background:${T.ttPillBg};border-radius:4px;border:1px solid ${T.ttPillBorder}">
          <div class="tt-row">
            <span class="tt-key">offset</span>
            <span class="tt-val" style="color:${T.ttPillOffset}">P${partitionId}:${offset}</span>
          </div>
          <div class="tt-row">
            <span class="tt-key">delivery count</span>
            <span class="tt-val ${atLimit ? 'dc-warn' : ''}">${dc}${atLimit ? ' ⚠' : ''}</span>
          </div>
          <div class="tt-row">
            <span class="tt-key">lock expires in</span>
            <span class="tt-val">${lockLeft} ticks</span>
          </div>
        </div>`;
    }
  }

  tooltip.innerHTML = `
    <div class="tt-head">Consumer C${c.id} — <span style="color:${stateColor}">${stateLabel}</span></div>
    ${c.state === 'crashed' ? `<div class="tt-row"><span class="tt-key">recovery in</span><span class="tt-val" style="color:${T.ttStateCrash}">${c.crashCooldown} ticks</span></div>` : ''}
    ${c.state === 'processing' ? `<div class="tt-row"><span class="tt-key">ticks remaining</span><span class="tt-val">${c.processingTicks}</span></div>` : ''}
    <div style="margin-top:6px;font-size:10px;color:${T.ttRecordsLbl};text-transform:uppercase;letter-spacing:.05em">Held Records (${c.acquiredRecords.length})</div>
    ${recordRows}
  `;
  tooltip.style.display = 'block';

  const tw = tooltip.offsetWidth  || 210;
  const th = tooltip.offsetHeight || 160;
  let tx = mouseX + 14;
  let ty = mouseY - th / 2;
  if (tx + tw > window.innerWidth  - 8) tx = mouseX - tw - 8;
  if (ty < 8)                           ty = 8;
  if (ty + th > window.innerHeight - 8) ty = window.innerHeight - th - 8;
  tooltip.style.left = tx + 'px';
  tooltip.style.top  = ty + 'px';
}

// Given canvas pixel coords, return the record under the cursor (or null)
function recordAtPoint(px, py) {
  if (!sim) return null;
  for (let i = 0; i < sim.partitions.length; i++) {
    const p = sim.partitions[i];
    const vp = viewportFor(p);
    if (vp.end < 0) continue;
    const { start, end, cellW } = vp;
    const laneY   = i * L.LANE_H;
    const cellTop = laneY + 20;
    const ch      = L.CELL_H;

    if (py < cellTop || py > cellTop + ch) continue;

    for (let offset = start; offset <= end; offset++) {
      const col = offset - start;
      const cx  = L.LEFT_MARGIN + col * cellW;
      if (px >= cx + 1 && px <= cx + cellW - 2) {
        const r = p.recordMap.get(offset);
        return { record: r || null, offset, partitionId: p.id, partition: p };
      }
    }
  }
  return null;
}

function stateClass(r) {
  if (!r) return 'state-archived';
  if (r.state === STATE.AVAILABLE)    return 'state-available';
  if (r.state === STATE.ACQUIRED)     return 'state-acquired';
  if (r.state === STATE.ARCHIVED)     return 'state-archived';
  if (r.ackType === ACK.ACCEPT)       return 'state-ack-accept';
  if (r.ackType === ACK.RELEASE)      return 'state-ack-release';
  if (r.ackType === ACK.REJECT)       return 'state-ack-reject';
  return '';
}

function showTooltip(hit, mouseX, mouseY) {
  const { record: r, offset, partitionId, partition } = hit;

  const stateLabel = r
    ? (r.state === STATE.ACKNOWLEDGED
        ? `ACKNOWLEDGED (${r.ackType?.toUpperCase()})`
        : r.state.toUpperCase())
    : 'ACCEPTED (removed)';

  const sc = stateClass(r);
  const dc = r ? r.deliveryCount : '—';
  const dcWarn = r && r.deliveryCount >= config.deliveryCountLimit - 1;
  const consumer = r && r.acquiredBy !== null ? `C${r.acquiredBy}` : '—';
  const lockInfo = r && r.state === STATE.ACQUIRED
    ? `${Math.max(0, r.lockExpiresAt - sim.tick)} ticks`
    : '—';

  tooltip.innerHTML = `
    <div class="tt-head">P${partitionId} · offset ${offset}</div>
    <div class="tt-row"><span class="tt-key">state</span><span class="tt-val ${sc}">${stateLabel}</span></div>
    <div class="tt-row"><span class="tt-key">delivery count</span><span class="tt-val ${dcWarn ? 'dc-warn' : ''}">${dc}${dcWarn ? ' ⚠' : ''}</span></div>
    <div class="tt-row"><span class="tt-key">acquired by</span><span class="tt-val">${consumer}</span></div>
    <div class="tt-row"><span class="tt-key">lock expires in</span><span class="tt-val">${lockInfo}</span></div>
    <div class="tt-row"><span class="tt-key">SPSO</span><span class="tt-val">${partition.spso}</span></div>
    <div class="tt-row"><span class="tt-key">SPEO</span><span class="tt-val">${partition.speo}</span></div>
  `;
  tooltip.style.display = 'block';

  // Position tooltip — keep it inside the viewport
  const tw = tooltip.offsetWidth  || 200;
  const th = tooltip.offsetHeight || 160;
  let tx = mouseX + 14;
  let ty = mouseY + 14;
  if (tx + tw > window.innerWidth  - 8) tx = mouseX - tw - 8;
  if (ty + th > window.innerHeight - 8) ty = mouseY - th - 8;
  tooltip.style.left = tx + 'px';
  tooltip.style.top  = ty + 'px';
}

function hideTooltip() {
  tooltip.style.display = 'none';
}

canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width  / rect.width;
  const scaleY = canvas.height / rect.height;
  const px = (e.clientX - rect.left) * scaleX;
  const py = (e.clientY - rect.top)  * scaleY;

  // Check consumer boxes first (they're at the bottom)
  const consumer = consumerAtPoint(px, py);
  if (consumer) {
    showConsumerTooltip(consumer, e.clientX, e.clientY);
    canvas.style.cursor = 'pointer';
    return;
  }

  // Then check record cells
  const hit = recordAtPoint(px, py);
  if (hit) {
    showTooltip(hit, e.clientX, e.clientY);
    canvas.style.cursor = 'crosshair';
  } else {
    hideTooltip();
    canvas.style.cursor = 'default';
  }
});

canvas.addEventListener('mouseleave', hideTooltip);

// ═══════════════════════════════════════════════════════════
// §J  Theme
// ═══════════════════════════════════════════════════════════
function setTheme(mode) {
  T = mode === 'light' ? LIGHT : DARK;
  CELL_COLOR = T.cellBg;
  CELL_BORDER = T.cellBorder;
  document.body.classList.toggle('light', mode === 'light');
  const btn = document.getElementById('btnTheme');
  if (btn) btn.textContent = mode === 'light' ? '☾ Dark' : '☀ Light';
  localStorage.setItem('themeMode', mode);
}

document.getElementById('btnTheme').addEventListener('click', () => {
  setTheme(document.body.classList.contains('light') ? 'dark' : 'light');
});

handleResize();
initSim();
// Restore saved theme before first frame
const _savedTheme = localStorage.getItem('themeMode');
if (_savedTheme === 'light') setTheme('light');
requestAnimationFrame(animationFrame);
window.addEventListener('resize', handleResize);
