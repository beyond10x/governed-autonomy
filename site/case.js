// Hero illustration: one intent moving through a governed case to a verified outcome.
(() => {
  const root = document.getElementById('case');
  if (!root) return;

  const intentEl = document.getElementById('intent-text');
  const stateEl = document.getElementById('case-state');
  const eventEl = document.getElementById('event');
  const rows = [...root.querySelectorAll('.obligations li')];
  const pill = (k) => root.querySelector(`li[data-k="${k}"] .pill`);

  const INTENT = 'We need enterprise SSO.';
  const LABEL = {
    open: 'open',
    working: 'working',
    evidence: 'needs evidence',
    approval: 'needs approval',
    independent: 'independent check',
    reverify: 'reverify',
    verified: 'verified',
  };

  const set = (k, s) => {
    const p = pill(k);
    p.dataset.s = s;
    p.textContent = LABEL[s];
  };
  const caseState = (s) => {
    stateEl.dataset.s = s;
    stateEl.textContent = s;
  };
  const say = (text) => { eventEl.textContent = text; };

  const reset = () => {
    root.dataset.done = 'false';
    root.dataset.agents = 'false';
    root.dataset.typing = 'true';
    intentEl.textContent = '';
    rows.forEach((r) => { r.classList.remove('in'); set(r.dataset.k, 'open'); });
    caseState('open');
    say('Waiting for intent');
  };

  const finalState = () => {
    root.dataset.typing = 'false';
    intentEl.textContent = 'Enterprise SSO';
    rows.forEach((r) => { r.classList.add('in'); set(r.dataset.k, 'verified'); });
    caseState('verified');
    root.dataset.done = 'true';
    say('Verified in production. The original intent is true.');
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finalState();
    return;
  }

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  const type = async (text) => {
    for (let i = 1; i <= text.length; i++) {
      intentEl.textContent = text.slice(0, i);
      await wait(55 + Math.random() * 45);
    }
  };

  // Each step: [delay before it in ms, action].
  const script = [
    [700, () => { caseState('working'); say('Case opened. Obligations derived from the protocol.'); }],
    ...rows.map((r) => [170, () => r.classList.add('in')]),
    [900, () => {
      root.dataset.agents = 'true';
      set('spec', 'working'); set('sec', 'working'); set('impl', 'working');
      say('Agents investigate, design and implement in parallel.');
    }],
    [1600, () => { set('spec', 'evidence'); caseState('gated'); say('Specification drafted. Evidence required before it counts.'); }],
    [1500, () => { set('spec', 'verified'); set('sec', 'approval'); say('Security requirements wait for approval from their owner.'); }],
    [1600, () => { set('sec', 'verified'); set('impl', 'evidence'); set('verify', 'working'); caseState('working'); say('Change proposed at revision 2. Tests running.'); }],
    [1500, () => { set('impl', 'verified'); set('verify', 'independent'); caseState('gated'); say('Independent verification required.'); }],
    [1500, () => { set('impl', 'reverify'); set('verify', 'reverify'); say('Revision changed. Earlier evidence no longer applies. Reverify.'); }],
    [1700, () => { set('impl', 'working'); set('verify', 'working'); caseState('working'); say('Re-running verification against revision 3.'); }],
    [1400, () => { set('impl', 'verified'); set('verify', 'verified'); set('deploy', 'approval'); caseState('gated'); say('Release requires explicit authority.'); }],
    [1700, () => { set('deploy', 'working'); caseState('working'); say('Release authorized. Deploying.'); }],
    [1400, () => { set('deploy', 'verified'); set('ops', 'evidence'); say('Observing production. Waiting for evidence.'); }],
    [2000, () => {
      set('ops', 'verified');
      root.dataset.agents = 'false';
      root.dataset.typing = 'false';
      intentEl.textContent = 'Enterprise SSO';
      caseState('verified');
      root.dataset.done = 'true';
      say('Verified in production. The original intent is true.');
    }],
  ];

  const run = async () => {
    for (;;) {
      reset();
      await wait(600);
      await type(INTENT);
      for (const [delay, step] of script) {
        await wait(delay);
        step();
      }
      await wait(6000);
    }
  };

  run();
})();
