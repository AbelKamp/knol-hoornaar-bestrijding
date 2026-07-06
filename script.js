
/* ══ NIEUWS DATA (aanpasbaar) ══ */
var N = [
  {d:"15 juni 2026", t:"Reggesteyn-leerlingen winnen prijs met duurzame website", tx:"Twee teams van Reggesteyn Nijverdal vielen in de prijzen tijdens de finale van 'Adviseurs van de toekomst' in het provinciehuis in Zwolle. Beide teams richtten zich op energiebesparing, tussen 17 leerling-adviesbureaus uit heel Overijssel.", b:"Duurzaam onderwijs", bk:"nb-g", k:"n-groen"},
  {d:"Regelmatig", t:"Informatieavonden over energie besparen", tx:"Het Duurzaamheidscentrum organiseert regelmatig informatie- en thema-avonden over energiebesparing, isolatie en zonnepanelen. Houd onze agenda in de gaten of loop gerust binnen.", b:"Thema-avond", bk:"nb-bl", k:"n-blauw"},
  {d:"Altijd handig", t:"Goed afval scheiden met de DCN Afvalwijzer", tx:"Twijfel je waar iets hoort? Met de DCN Afvalwijzer zie je snel hoe je afval het beste scheidt. Beter scheiden betekent meer hergebruik en minder verspilling.", b:"Afval scheiden", bk:"nb-t", k:"n-teal"},
  {d:"17 & 18 april 2026", t:"Kledingruilbeurs Fairtrade werkgroep", tx:"De Fairtrade werkgroep organiseert een gezellige kledingruilbeurs. Breng schone kleding mee en ruil het voor iets anders. Geen aanmelding nodig, iedereen welkom!", b:"Duurzaamheidscentrum", bk:"nb-g", k:"n-groen"},
  {d:"7 mei 2026", t:"Thema-avond: Water & Duurzaamheid", tx:"In samenwerking met gemeente Hellendoorn. Locatie: Het Huis voor Cultuur en Bestuur. Aanvang 19:30. Gratis toegang, geen aanmelding nodig.", b:"Gratis toegang", bk:"nb-bl", k:"n-blauw"},
  {d:"Elke week", t:"FIXbrigade: gratis energieklussen thuis", tx:"De FIXbrigade helpt inwoners van Hellendoorn gratis met tochtstrips, radiatorfolie, LED-lampen en waterbesparende douchekop. Wonend in Hellendoorn en hulp nodig? Mail ons!", b:"FIXbrigade \u2014 gratis", bk:"nb-p", k:"n-paars"},
  {d:"Wo t/m Za 13:00-17:00", t:"Repair Café: repareer in plaats van weggooien", tx:"Vrijwilligers repareren bijna alles met een stekker, maar ook meubels en speelgoed. Al meer dan 1.000 items gerepareerd! Gewoon binnenlopen.", b:"Wo\u2013Za 13:00\u201317:00", bk:"nb-t", k:"n-teal"},
  {d:"Altijd welkom", t:"Gratis energieadvies voor uw woning", tx:"Kom langs voor een gratis gesprek of vraag een gratis huisbezoek van een energiecoach aan. Gewoon binnenlopen op Grotestraat 178A Nijverdal.", b:"Gratis advies", bk:"nb-g", k:"n-groen"},
  {d:"Informatief", t:"Thuisbatterij \u2014 steeds interessanter", tx:"Met zonnepanelen en een thuisbatterij slaat u overdag opgewekte stroom op voor gebruik in de avond. Nu de salderingsregeling verandert, wordt een batterij steeds interessanter.", b:"Informatie", bk:"nb-bl", k:"n-blauw"}
];
 
/* ══ HTML ESCAPE HELPER ══ */
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ══ NIEUWS RENDEREN ══ */
function renderNieuws() {
  var g = document.getElementById('start-nieuws-grid');
  if (!g) return;
  var html = '';
  for (var i = 0; i < N.length; i++) {
    var item = N[i];
    html += '<div class="n-k">';
    html += '<div class="n-streak ' + esc(item.k) + '"></div>';
    html += '<div class="n-body">';
    html += '<div class="n-datum">' + esc(item.d) + '</div>';
    html += '<div class="n-titel">' + esc(item.t) + '</div>';
    html += '<div class="n-tekst">' + esc(item.tx) + '</div>';
    html += '<span class="n-badge ' + esc(item.bk) + '">' + esc(item.b) + '</span>';
    html += '</div></div>';
  }
  g.innerHTML = html;
}
 
/* ══ OVER ONS TABS ══ */
function toonPanel(naam, tab) {
  document.querySelectorAll('.over-panel').forEach(function(p) { p.classList.remove('toon'); });
  document.querySelectorAll('.over-tab').forEach(function(t) { t.classList.remove('actief'); });
  var panel = document.getElementById('panel-' + naam);
  if (panel) panel.classList.add('toon');
  if (tab) tab.classList.add('actief');
}
 
/* ══ NAVIGATIE ══ */
var SEC = ['s0','s1','s2','s3','s4','s5','s6'];
var ANKERNAMEN = {0:'home',1:'scan-woning',2:'scan-checklist',3:'scan-resultaat',4:'zonnepanelen',5:'subsidies',6:'diensten'};
var ANKERINDEX = {};
Object.keys(ANKERNAMEN).forEach(function(k){ ANKERINDEX[ANKERNAMEN[k]] = parseInt(k); });

function naarStap(n, updateHash) {
  for (var i = 0; i < SEC.length; i++) {
    var el = document.getElementById(SEC[i]);
    if (el) el.style.display = (i === n) ? 'block' : 'none';
  }
  // Scan balk: toon alleen bij stappen 1, 2, 3
  var balk = document.getElementById('scan-balk');
  if (balk) {
    if (n >= 1 && n <= 3) {
      balk.classList.add('toon');
      // Actieve stap markeren
      for (var j = 1; j <= 3; j++) {
        var ss = document.getElementById('ss' + j);
        if (ss) {
          ss.classList.remove('actief','klaar');
          if (j === n)       ss.classList.add('actief');
          else if (j < n)    ss.classList.add('klaar');
        }
      }
    } else {
      balk.classList.remove('toon');
    }
  }
  // Verberg nav op desktop tijdens scan (mobiel: nav blijft zichtbaar via CSS)
  var nav = document.getElementById('nav');
  if (nav) {
    if (n >= 1 && n <= 3) nav.classList.add('scan-actief');
    else nav.classList.remove('scan-actief');
    nav.style.display = '';
  }
  // Toon/verberg scan-opties in mobiel menu
  var mmScan = document.getElementById('mm-scan-sectie');
  if (mmScan) mmScan.style.display = (n >= 1 && n <= 3) ? 'block' : 'none';
  if (n === 3) berekenRes();
  if (n === 4) berekenZon();
  if (n === 0) renderNieuws();
  window.scrollTo(0, 0);
  // Nav knoppen highlight
  var nkMap = {0:'nk0',1:'nk1',2:'nk1',3:'nk1',4:'nk4',5:'nk5',6:'nk6'};
  ['nk0','nk1','nk4','nk5','nk6'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.classList.remove('hl');
  });
  var aktief = nkMap[n];
  if(aktief){
    var el = document.getElementById(aktief);
    if(el && aktief !== 'nk1') el.classList.add('hl');
  }
  // URL hash bijwerken
  if (updateHash !== false && ANKERNAMEN[n]) {
    history.replaceState(null, '', '#' + ANKERNAMEN[n]);
  }
}

/* ══ ANKERLINKS ══ */
function laadVanHash() {
  var hash = window.location.hash.replace('#','');
  if (hash && ANKERINDEX[hash] !== undefined) {
    naarStap(ANKERINDEX[hash], false);
  }
}
window.addEventListener('hashchange', laadVanHash);
 
/* ══ STAP 1 ══ */
var wF=1.0, iF=1.0, elF=1.0, verwF=1.0, aantalBew=2, antw={}, huurKoop='';
var VERWF = {'verw-cv':1.0,'verw-hybride':0.6,'verw-wp':0.4,'verw-stads':0.8,'verw-elek':1.8};
var VERH_IDS = ['spouwmuur','dakiso','vloeriso','zonnepanelen','zonneboiler','thuisbatterij'];
function kiesHK(keuze, el) {
  document.querySelectorAll('.hk-k').forEach(function(k) { k.classList.remove('ok'); });
  el.classList.add('ok');
  huurKoop = keuze;
  var hint = document.getElementById('hk-hint');
  if (hint) hint.style.display = (keuze === 'huur') ? 'block' : 'none';
  pasHuurAan(keuze);
  slaaScanOp();
}
function pasHuurAan(keuze) {
  var isHuur = (keuze === 'huur');
  document.querySelectorAll('.ci[data-verh="1"]').forEach(function(ci) {
    ci.classList.toggle('huur-v', isHuur);
  });
  document.querySelectorAll('.kv-vraag[data-verh="1"]').forEach(function(el) {
    el.classList.toggle('huur-v', isHuur);
  });
  var vb = document.getElementById('verh-blok');
  if (vb) vb.style.display = isHuur ? 'block' : 'none';
  var vr = document.getElementById('verh-resultaat');
  if (vr) vr.style.display = isHuur ? 'block' : 'none';
  updateVG();
  ['Verwarming','Koken','Douche','Apparaten','Isolatie','Verlichting'].forEach(updateProgGroep);
}
function kiesW(el) {
  document.querySelectorAll('.w-kaart').forEach(function(k) { k.classList.remove('ok'); });
  el.classList.add('ok');
  wF = parseFloat(el.dataset.f);
}
function kiesBJ(el) {
  document.querySelectorAll('.bj').forEach(function(b) { b.classList.remove('ok'); });
  el.classList.add('ok');
  iF = parseFloat(el.dataset.iso);
}
function kiesEL(el) {
  document.querySelectorAll('.el-k').forEach(function(k) { k.classList.remove('ok'); });
  el.classList.add('ok');
  var onbekend = el.dataset.onbekend === '1';
  var bjVeld = document.getElementById('bouwjaar-veld');
  if (onbekend) {
    elF = 1.0;
    if (bjVeld) bjVeld.style.display = 'block';
  } else {
    elF = parseFloat(el.dataset.elf);
    iF = 1.0;
    document.querySelectorAll('.bj').forEach(function(b) { b.classList.remove('ok'); });
    if (bjVeld) bjVeld.style.display = 'none';
  }
  localStorage.setItem('dc15_labelOnbekend', onbekend ? '1' : '0');
  slaaScanOp();
}
function bew(d) {
  aantalBew = Math.max(1, Math.min(10, aantalBew + d));
  document.getElementById('bew-n').textContent = aantalBew;
}
 
/* ══ CHECKLIST ══ */
var groepen = {
  verw: ['verw-cv','verw-hybride','verw-wp','verw-stads','verw-elek'],
  kook: ['gas-koken','keramisch','inductie'],
  douche: ['regendouche','normaal-douche','bespaardouche'],
  glas: ['enkel-glas','dubbel-glas','hr-glas'],
  verl: ['geen-led','led']
};
var idNaarGroep = {};
Object.keys(groepen).forEach(function(g) {
  groepen[g].forEach(function(id) { idNaarGroep[id] = g; });
});
 
function kiesType(el, groep) {
  document.querySelectorAll('.ki[data-groep="' + groep + '"]').forEach(function(k) {
    k.classList.remove('ki-actief');
    delete antw[k.dataset.id];
  });
  el.classList.add('ki-actief');
  antw[el.dataset.id] = 'ja';
  if (VERWF[el.dataset.id] !== undefined) verwF = VERWF[el.dataset.id];
  if (groep === 'verw') updateVerwCond(el.dataset.id);
  updateVG();
  var cb = el.closest('.cb');
  if (cb) updateProgGroep(cb.dataset.thema);
  slaaScanOp();
}

function updateVerwCond(verwTypeId) {
  var showKetelOud = (verwTypeId === 'verw-cv' || verwTypeId === 'verw-hybride');
  var showElek     = (verwTypeId === 'verw-elek');
  function setVerwCond(el, show) {
    if (!el) return;
    el.classList.toggle('verw-cond-hidden', !show);
    if (!show) { el.classList.remove('ja','nee'); delete antw[el.dataset.id]; }
  }
  setVerwCond(document.querySelector('.ci[data-id="ketel-oud"]'),   showKetelOud);
  setVerwCond(document.querySelector('.ci[data-id="elek-kachel"]'), showElek);
  setVerwCond(document.querySelector('.ci[data-id="infrarood"]'),   showElek);
}

function stel(knop, keuze) {
  var ci = knop.closest('.ci');
  var id = ci.dataset.id;
  var was = antw[id];
  var thema = ci.closest('.cb') ? ci.closest('.cb').dataset.thema : null;
  if (was === keuze) {
    ci.classList.remove('ja','nee');
    delete antw[id];
    var g = idNaarGroep[id];
    if (g) {
      groepen[g].forEach(function(oid) {
        var el = document.querySelector('[data-id="' + oid + '"]');
        if (el) el.classList.remove('verborgen');
      });
    }
  } else {
    ci.classList.remove('ja','nee');
    ci.classList.add(keuze);
    antw[id] = keuze;
    if (keuze === 'ja') {
      var g = idNaarGroep[id];
      if (g) {
        groepen[g].forEach(function(oid) {
          if (oid !== id) {
            var el = document.querySelector('[data-id="' + oid + '"]');
            if (el) { el.classList.add('verborgen'); el.classList.remove('ja','nee'); delete antw[oid]; }
          }
        });
      }
    }
  }
  updateVG();
  if (thema) updateProgGroep(thema);
  slaaScanOp();
}

function updateVG() {
  var totReg = 0, totKies = 0, bew = 0;
  document.querySelectorAll('.ci').forEach(function(ci) {
    if (!ci.classList.contains('huur-v') && !ci.classList.contains('verw-cond-hidden')) {
      totReg++;
      if (antw[ci.dataset.id] !== undefined) bew++;
    }
  });
  document.querySelectorAll('.kv-grid').forEach(function(grid) {
    var parent = grid.closest('.kv-vraag');
    if (!parent || !parent.classList.contains('huur-v')) {
      totKies++;
      if (grid.querySelector('.ki-actief')) bew++;
    }
  });
  var tot = totReg + totKies;
  var pct = tot > 0 ? Math.round(bew / tot * 100) : 0;
  document.getElementById('vg-t').textContent = bew + ' van ' + tot + ' \u00b7 ' + pct + '%';
  document.getElementById('vg-v').style.width = pct + '%';
}

function updateProgGroep(thema) {
  var cb = document.querySelector('.cb[data-thema="' + thema + '"]');
  if (!cb) return;
  var progEl = cb.querySelector('.ct-prog');
  if (!progEl) return;
  var tot = 0, bew = 0;
  cb.querySelectorAll('.ci').forEach(function(ci) {
    if (!ci.classList.contains('huur-v') && !ci.classList.contains('verw-cond-hidden')) {
      tot++;
      if (antw[ci.dataset.id] !== undefined) bew++;
    }
  });
  cb.querySelectorAll('.kv-grid').forEach(function(g) {
    var parent = g.closest('.kv-vraag');
    if (!parent || !parent.classList.contains('huur-v')) {
      tot++;
      if (g.querySelector('.ki-actief')) bew++;
    }
  });
  progEl.textContent = bew + ' van ' + tot + ' beantwoord';
}
 
/* ══ RESULTAAT ══ */
// Investeringsbedragen: richtprijzen 2025 (bron: Milieu Centraal, RVO ISDE, Nibud)
// invSchaal:'wF' = bedrag schaalt mee met woninggrootte, 'geen' = vast bedrag
var tipData = [
  {id:'wasdroger',    n:'Wasdroger',                     b:105, u:'Gebruik waslijn of warmtepompdroger (A+++).',                      inv:800,  invSchaal:'geen'},
  {id:'oud-koelkast', n:'Verouderde koelkast/vriezer',   b:85,  u:'Verouderde apparaten verbruiken 2–3× meer.',                      inv:700,  invSchaal:'geen'},
  {id:'vriezer-ijs',  n:'Vriezer ontdooien',             b:52,  u:'IJsaanslag laat de motor harder werken.',                         inv:0,    invSchaal:'geen'},
  {id:'airco',        n:'Airconditioning',               b:55,  u:'2°C hoger instellen en gordijnen sluiten.',                       inv:0,    invSchaal:'geen'},
  {id:'terrasverw',   n:'Terrasverwarming',              b:90,  u:'Gebruik een buitendeken.',                                        inv:0,    invSchaal:'geen'},
  {id:'hottub',       n:'Hottub/jacuzzi',                b:220, u:'Verbruikt 1.500–3.000 kWh/jaar.',                                 inv:0,    invSchaal:'geen'},
  {id:'boiler-elek',  n:'Elektrische boiler',            b:55,  u:'Zet op een timer.',                                               inv:1600, invSchaal:'geen'},
  {id:'regendouche',  n:'Regendouche',                   b:110, u:'Verbruikt dubbel zoveel warm water.',                             inv:50,   invSchaal:'geen'},
  {id:'normaal-douche',n:'Waterbesparende douchekop',    b:45,  u:'FIXbrigade plaatst gratis!',                                      inv:30,   invSchaal:'geen'},
  {id:'bad',          n:'Bad minder vullen',             b:65,  u:'150–200 liter warm water per bad.',                               inv:0,    invSchaal:'geen'},
  {id:'lang-douche',  n:'Korter douchen',                b:70,  u:'Elke minuut korter bespaart direct.',                             inv:0,    invSchaal:'geen'},
  {id:'wasmachine-heet',n:'Wassen op lagere temperatuur',b:38,  u:'30°C spaart 50–60% op wasenergie.',                               inv:0,    invSchaal:'geen'},
  {id:'keramisch',    n:'Keramische kookplaat',          b:45,  u:'Inductie is 30–40% zuiniger.',                                    inv:450,  invSchaal:'geen'},
  {id:'oven',         n:'Oven vs. airfryer',             b:32,  u:'Airfryer gebruikt 50–70% minder.',                                inv:100,  invSchaal:'geen'},
  {id:'frituur',      n:'Frituurpan',                   b:28,  u:'Vervang door airfryer.',                                          inv:0,    invSchaal:'geen'},
  {id:'waterkoker',   n:'Waterkoker',                   b:12,  u:'Kook alleen wat u nodig heeft.',                                  inv:0,    invSchaal:'geen'},
  {id:'laadpaal',     n:'Slim laden EV',                b:65,  u:'Laad in daluren (22:00–07:00).',                                  inv:0,    invSchaal:'geen'},
  {id:'aquarium',     n:'Aquarium',                     b:58,  u:'LED-verlichting en efficiënte filter helpen.',                    inv:0,    invSchaal:'geen'},
  {id:'gaming-pc',    n:'Computer/gaming-pc',           b:75,  u:'Echt uitzetten bespaart structureel.',                            inv:0,    invSchaal:'geen'},
  {id:'opladers',     n:'Opladers uit stopcontact',     b:28,  u:'Schakelbare stekkerdoos aanschaffen.',                            inv:25,   invSchaal:'geen'},
  {id:'tv-standby',   n:'TV echt uitzetten',            b:16,  u:'Standby verbruikt 5–15W continu.',                                inv:20,   invSchaal:'geen'},
  {id:'enkel-glas',   n:'Enkel glas vervangen',         b:160, u:'HR++-glas is de beste stap. Subsidie via ISDE.',                  inv:6000, invSchaal:'wF'},
  {id:'dubbel-glas',  n:'HR++-glas upgrade',            b:45,  u:'Vermindert warmteverlies verder.',                                inv:2500, invSchaal:'wF'},
  {id:'geen-led',     n:'Overstap naar LED',            b:75,  u:'Terugverdientijd onder een jaar.',                                inv:300,  invSchaal:'geen'},
  {id:'ketel-oud',   n:'CV-ketel vervangen of verbeteren', b:120, u:'Een ketel ouder dan 15 jaar is minder efficiënt — een energiecoach kan de besparing inschatten.', inv:2500, invSchaal:'wF'},
  {id:'elek-kachel', n:'Elektrische kachels beperken',     b:180, u:'Directe elektrische verwarming is duur. Een warmtepomp of betere isolatie helpt sterk.',            inv:0,    invSchaal:'geen'},
  {id:'infrarood',   n:'Infraroodpanelen',                  b:110, u:'Als enige verwarming duur in gebruik — combineer met zonnepanelen voor meer rendement.',            inv:0,    invSchaal:'geen'}
];
var kansenNee = {
  'spouwmuur':    {b:160, n:'Spouwmuurisolatie aanbrengen',  u:'Meest kosteneffectief voor woningen voor 2000.',  inv:3500, invSchaal:'wF'},
  'dakiso':       {b:110, n:'Dakisolatie aanbrengen',        u:'Via het dak verliest u 25–30% warmte.',           inv:5000, invSchaal:'wF'},
  'vloeriso':     {b:75,  n:'Vloer-/kruipruimte-isolatie',   u:'Goedkoop en effectief.',                          inv:4000, invSchaal:'wF'},
  'tocht':        {b:38,  n:'Tochtstrips aanbrengen',        u:'FIXbrigade doet dit gratis bij u thuis!',         inv:250,  invSchaal:'geen'},
  'radfolie':     {b:48,  n:'Radiatorfolie plaatsen',        u:'FIXbrigade plaatst het gratis!',                  inv:120,  invSchaal:'geen'},
  'zonnepanelen': {b:650, n:'Zonnepanelen plaatsen',         u:'Bekijk de zonnepanelen rekenmachine.',            inv:8000, invSchaal:'wF'},
  'thuisbatterij':{b:130, n:'Thuisbatterij overwegen',       u:'Steeds interessanter nu saldering afneemt.',      inv:6000, invSchaal:'geen'},
  'slimme-therm': {b:65,  n:'Slimme thermostaat',            u:'Bespaart gemiddeld 65 euro per jaar.',            inv:180,  invSchaal:'geen'},
  'bespaardouche':{b:58,  n:'Waterbesparende douchekop',     u:'FIXbrigade plaatst gratis!',                      inv:40,   invSchaal:'geen'},
  'zonneboiler':  {b:85,  n:'Zonneboiler',                   u:'50–70% besparing op warmwaterkosten.',            inv:3500, invSchaal:'wF'},
  'dyn-contract': {b:55,  n:'Dynamisch energiecontract',     u:'Aanzienlijk besparen met daluren.',               inv:0,    invSchaal:'geen'},
  'airfryer':     {b:22,  n:'Airfryer aanschaffen',          u:'50–70% minder dan een oven.',                     inv:80,   invSchaal:'geen'}
};
var goedItems = {
  'led':'LED-verlichting','verw-wp':'Warmtepomp','verw-hybride':'Hybride warmtepomp',
  'thuisbatterij':'Thuisbatterij','bespaardouche':'Waterbesparende douchekop',
  'airfryer':'Airfryer','hr-glas':'HR++-glas','spouwmuur':'Spouwmuurisolatie',
  'dakiso':'Dakisolatie','vloeriso':'Vloerisolatie','tocht':'Tochtstrips',
  'radfolie':'Radiatorfolie','slimme-therm':'Slimme thermostaat',
  'inductie':'Inductiekookplaat','zonneboiler':'Zonneboiler','dyn-contract':'Dynamisch contract'
};
 
function berekenRes() {
  var tot = 0, totInv = 0, tips = [], goed = [];
  tipData.forEach(function(t) {
    if (antw[t.id] === 'ja') {
      var b = Math.round(t.b * wF * (0.8 + aantalBew * 0.1) * iF * elF);
      var invBedrag = t.invSchaal === 'wF' ? Math.round(t.inv * wF) : t.inv;
      tips.push({n: t.n, b: b, u: t.u, inv: invBedrag});
      tot += b;
      totInv += invBedrag;
    }
  });
  Object.keys(kansenNee).forEach(function(id) {
    if (antw[id] === 'nee') {
      var info = kansenNee[id];
      var b = Math.round(info.b * wF);
      var invBedrag = info.invSchaal === 'wF' ? Math.round(info.inv * wF) : info.inv;
      tips.push({n: info.n, b: b, u: info.u, inv: invBedrag});
      tot += b;
      totInv += invBedrag;
    }
  });
  // Verhuurder-resultaat (alleen bij huurwoning)
  if (huurKoop === 'huur') {
    var verhTips = [];
    VERH_IDS.forEach(function(id) {
      if (kansenNee[id]) {
        var info = kansenNee[id];
        verhTips.push({n: info.n, b: Math.round(info.b * wF), u: info.u});
      }
    });
    verhTips.push({n: 'Raamglas verbeteren', b: 0, u: 'Afhankelijk van huidig glas: enkel \u2192 HR++ bespaart ~\u20ac160/jr,\u00a0dubbel \u2192 HR++ ~\u20ac45/jr.'});
    var vHtml = '';
    verhTips.forEach(function(t) {
      vHtml += '<div class="tip-k"><div class="tip-top"><div class="tip-n">' + t.n + '</div>';
      if (t.b > 0) vHtml += '<div class="tip-badge">~\u20ac' + t.b + '/jr</div>';
      vHtml += '</div><div class="tip-u">' + t.u + '</div></div>';
    });
    var vtc = document.getElementById('verh-tips-c');
    if (vtc) vtc.innerHTML = vHtml;
  }
  // Verwarmingstype-tips op basis van gekozen type + verwF
  var verwType = null;
  ['verw-cv','verw-hybride','verw-wp','verw-stads','verw-elek'].forEach(function(id) {
    if (antw[id] === 'ja') verwType = id;
  });
  if (verwType && verwType !== 'verw-wp' && verwType !== 'verw-stads') {
    var wpB = Math.round(200 * verwF * wF * (0.8 + aantalBew * 0.1));
    var wpInv = Math.round(10000 * wF);
    tips.push({n:'Warmtepomp installeren', b:wpB, u:'3–4× efficiënter dan gas. Subsidie via ISDE. Indicatie, afhankelijk van woning en situatie.', inv:wpInv});
    tot += wpB; totInv += wpInv;
  }
  if (verwType === 'verw-elek') {
    var elB = Math.round(150 * verwF * wF);
    tips.push({n:'Directe elektrische verwarming verminderen', b:elB, u:'Elektrische verwarming is duur. Warmtepomp of betere isolatie verlaagt de kosten sterk.', inv:0});
    tot += elB;
  }
  Object.keys(goedItems).forEach(function(id) {
    if (antw[id] === 'ja') goed.push(goedItems[id]);
  });
  tot = Math.round(tot);
  tips.sort(function(a, b) { return b.b - a.b; });
  document.getElementById('r-bedrag').textContent = '€ ' + tot.toLocaleString('nl-NL');
  document.getElementById('r-sub').textContent = 'Op basis van ' + Object.keys(antw).length + ' ingevulde vragen';
  // Vergelijking met gemiddeld Nederlandse huishouden
  var gemiddeld = Math.round(1850 * wF);
  var vgl = document.getElementById('r-vergelijk');
  if (vgl && tot > 0) {
    var pct = Math.round((tot / gemiddeld) * 100);
    vgl.style.display = 'block';
    vgl.innerHTML = '📊 Een gemiddeld Nederlands huishouden heeft ~€' + gemiddeld.toLocaleString('nl-NL') + ' bespaarpotentieel. Uw berekend potentieel is <strong>' + pct + '%</strong> hiervan.';
  } else if (vgl) {
    vgl.style.display = 'none';
  }
  // Investeringsblok tonen
  var invBlok = document.getElementById('r-inv-blok');
  if (invBlok && totInv > 0) {
    invBlok.style.display = 'block';
    document.getElementById('r-inv-bedrag').textContent = '€ ' + totInv.toLocaleString('nl-NL');
    var tvtEl = document.getElementById('r-inv-tvt');
    if (tvtEl) {
      if (tot > 0) {
        var tvt = Math.round(totInv / tot);
        tvtEl.textContent = tvt > 0 && tvt < 100 ? 'Geschatte terugverdientijd: ' + tvt + ' jaar' : '';
      } else {
        tvtEl.textContent = '';
      }
    }
  } else if (invBlok) {
    invBlok.style.display = 'none';
  }
  var tHtml = '';
  if (tips.length) {
    tips.forEach(function(t) {
      tHtml += '<div class="tip-k"><div class="tip-top"><div class="tip-n">' + t.n + '</div><div class="tip-badge">~€' + t.b + '/jr</div></div><div class="tip-u">' + t.u + '</div>';
      if (t.inv > 0) {
        var tipTvt = t.b > 0 ? Math.round(t.inv / t.b) : null;
        tHtml += '<div class="tip-inv">💶 Investering: ~€' + t.inv.toLocaleString('nl-NL');
        if (tipTvt !== null && tipTvt < 100) {
          tHtml += ' &nbsp;&bull;&nbsp; Terugverdientijd: ~' + tipTvt + ' jaar';
        }
        tHtml += '</div>';
      }
      tHtml += '</div>';
    });
  } else {
    tHtml = '<div style="color:var(--t3);padding:1rem;">Vul de checklist in om tips te zien.</div>';
  }
  document.getElementById('tips-c').innerHTML = tHtml;
  var pHtml = '';
  goed.forEach(function(n) { pHtml += '<li>✓ ' + n + '</li>'; });
  document.getElementById('pos-l').innerHTML = pHtml;
  document.getElementById('pos-b').style.display = goed.length ? 'block' : 'none';
}
 
/* ══ ZONNEPANELEN ══ */
function berekenZon() {
  var pZ = parseInt(document.getElementById('z-z').value) || 0;
  var pO = parseInt(document.getElementById('z-o').value) || 0;
  var pW = parseInt(document.getElementById('z-w').value) || 0;
  var pN = parseInt(document.getElementById('z-n').value) || 0;
  var wp = parseInt(document.getElementById('z-wp').value) || 400;
  var prijs = parseFloat(document.getElementById('z-prijs').value) || 0.36;
  var terug = parseFloat(document.getElementById('z-terug').value) || 0.08;
  var verbruik = parseInt(document.getElementById('z-verbruik').value) || 2900;
  var aandMult = parseFloat(document.getElementById('z-eigen').value) || 1.0;
  var battBonus = parseFloat(document.getElementById('z-batt').value) || 0;
  var invest = parseFloat(document.getElementById('z-invest').value) || 5000;
  var kwpZ = pZ*(wp/1000), kwpO = pO*(wp/1000)*0.87, kwpW = pW*(wp/1000)*0.87, kwpN = pN*(wp/1000)*0.65;
  var kwh = Math.round((kwpZ+kwpO+kwpW+kwpN)*875);
  if (kwh === 0) {
    ['z-tp','z-tkwp','z-opwek','z-ep','z-tk','z-met','z-zonder','z-tvt-oud','z-tvt-nu'].forEach(function(id) {
      var el = document.getElementById(id); if (el) el.textContent = '—';
    });
    var advel = document.getElementById('z-adv');
    if (advel) { advel.innerHTML = 'Vul het aantal panelen in om de berekening te starten.'; advel.className = 'z-adv'; }
    return;
  }
  // Gelijktijdigheidsfractie van het VERBRUIK (begrensd, niet van de opwek)
  var hasBatt = battBonus > 0;
  var maxFractie = hasBatt ? 0.80 : 0.50;
  var fractie = Math.min(maxFractie, 0.30 * aandMult + battBonus);
  var zelfverbruik = Math.round(Math.min(kwh, verbruik * fractie));
  var terugK = kwh - zelfverbruik;
  var zelfPct = Math.round(zelfverbruik / kwh * 100);
  var totO = Math.round(zelfverbruik*prijs) + Math.round(terugK*prijs);
  var totN = Math.round(zelfverbruik*prijs) + Math.round(terugK*terug);
  var tvtO = totO > 0 ? (invest/totO).toFixed(1) : '—';
  var tvtN = totN > 0 ? (invest/totN).toFixed(1) : '—';
  document.getElementById('z-tp').textContent = pZ+pO+pW+pN;
  document.getElementById('z-tkwp').textContent = (kwpZ+kwpO+kwpW+kwpN).toFixed(2);
  document.getElementById('z-opwek').textContent = kwh.toLocaleString('nl-NL') + ' kWh';
  document.getElementById('z-ep').textContent = zelfverbruik.toLocaleString('nl-NL') + ' kWh \u00b7 ' + zelfPct + '% van opwek';
  document.getElementById('z-tk').textContent = terugK.toLocaleString('nl-NL') + ' kWh';
  document.getElementById('z-met').textContent = '\u20ac ' + totO.toLocaleString('nl-NL');
  document.getElementById('z-zonder').textContent = '\u20ac ' + totN.toLocaleString('nl-NL');
  document.getElementById('z-tvt-oud').textContent = tvtO;
  document.getElementById('z-tvt-nu').textContent = tvtN;
  var adv = '', cls = 'geel', tvtNr = parseFloat(tvtN);
  var verbruikBenut = verbruik > 0 ? Math.round(zelfverbruik / verbruik * 100) : 0;
  if (tvtNr <= 8) {
    cls = 'groen';
    adv = 'Interessant! Terugverdientijd ' + tvtN + ' jaar ook zonder saldering. Een goede investering!';
  } else if (tvtNr <= 14) {
    cls = 'geel';
    adv = 'Redelijk interessant. ' + tvtN + ' jaar. ';
    if (verbruikBenut > 85) {
      adv += 'U benut de opwek al grotendeels t.o.v. uw verbruik \u2014 meer panelen leidt hoofdzakelijk tot meer teruglevering.';
    } else {
      adv += 'Verhoog uw eigen verbruik overdag (wassen, laden) of overweeg een batterij.';
    }
  } else {
    cls = 'rood';
    adv = 'Let op! ' + tvtN + ' jaar is lang. ';
    if (verbruikBenut > 85) {
      adv += 'U benut de opwek al grotendeels t.o.v. uw verbruik. Overweeg minder panelen.';
    } else {
      adv += 'Verhoog uw eigen verbruik overdag (wassen, laden overdag) of overweeg een batterij.';
    }
  }
  if (terug < 0.10) adv += '<br><br>Elk kWh zelf gebruiken is \u20ac' + prijs.toFixed(2) + ' waard vs. \u20ac' + terug.toFixed(2) + ' terugleveren.';
  adv += '<br><br>Seizoensvariatie: In de zomer wekt u 3\u20134\u00d7 zoveel op als in de winter. De berekening toont het jaargemiddelde.';
  var advel = document.getElementById('z-adv');
  advel.innerHTML = adv;
  advel.className = 'z-adv ' + cls;
}
 
/* ══ SUBSIDIES FILTER ══ */
function filterSub(cat, k) {
  document.querySelectorAll('.sf-k').forEach(function(x) { x.classList.remove('actief'); });
  k.classList.add('actief');
  document.querySelectorAll('.sub-k').forEach(function(x) {
    x.classList.toggle('verborgen', cat !== 'alles' && x.dataset.cats.indexOf(cat) === -1);
  });
}
 
/* ══ LOCALSTORAGE: SCAN OPSLAAN EN HERSTELLEN ══ */
var LS = 'dc15_'; // eigen prefix per versie — voorkomt dat opgeslagen staat van andere versies wordt geladen
function slaaScanOp() {
  try {
    localStorage.setItem(LS+'antw', JSON.stringify(antw));
    localStorage.setItem(LS+'wF', wF);
    localStorage.setItem(LS+'iF', iF);
    localStorage.setItem(LS+'elF', elF);
    localStorage.setItem(LS+'bew', aantalBew);
    localStorage.setItem(LS+'verwF', verwF);
    localStorage.setItem(LS+'huurKoop', huurKoop);
  } catch(e) { console.error('localStorage opslaan mislukt:', e); }
}

function clamp(v, min, max, def) { var n = parseFloat(v); return (isFinite(n) && n >= min && n <= max) ? n : def; }

function herstelScan() {
  try {
    var opgeslagen = localStorage.getItem(LS+'antw');
    if (!opgeslagen) return false;
    var parsed = JSON.parse(opgeslagen);
    antw = {};
    if (parsed && typeof parsed === 'object') {
      Object.keys(parsed).forEach(function(id) {
        if (parsed[id] === 'ja' || parsed[id] === 'nee') antw[id] = parsed[id];
      });
    }
    wF     = clamp(localStorage.getItem(LS+'wF'),    0.5, 2.5, 1.0);
    iF     = clamp(localStorage.getItem(LS+'iF'),    0.5, 2.5, 1.0);
    elF    = clamp(localStorage.getItem(LS+'elF'),   0.5, 1.5, 1.0);
    verwF  = clamp(localStorage.getItem(LS+'verwF'), 0.3, 2.0, 1.0);
    aantalBew = Math.max(1, Math.min(10, parseInt(localStorage.getItem(LS+'bew')) || 2));
    // Herstel UI: antwoorden markeren
    Object.keys(antw).forEach(function(id) {
      var ci = document.querySelector('.ci[data-id="' + id + '"]');
      if (ci) ci.classList.add(antw[id]);
      // Herstel ki-actief voor keuzekaarten
      var ki = document.querySelector('.ki[data-id="' + id + '"]');
      if (ki && antw[id] === 'ja') ki.classList.add('ki-actief');
    });
    // Herstel groep-verbergingen (bij 'ja' worden andere opties in dezelfde groep verborgen)
    Object.keys(antw).forEach(function(id) {
      if (antw[id] === 'ja') {
        var g = idNaarGroep[id];
        if (g) {
          groepen[g].forEach(function(oid) {
            if (oid !== id) {
              var el = document.querySelector('[data-id="' + oid + '"]');
              if (el) el.classList.add('verborgen');
            }
          });
        }
      }
    });
    // Herstel verwarmingscondities
    var opgeslagenVerwType = null;
    ['verw-cv','verw-hybride','verw-wp','verw-stads','verw-elek'].forEach(function(id) {
      if (antw[id] === 'ja') opgeslagenVerwType = id;
    });
    updateVerwCond(opgeslagenVerwType || '');
    // Herstel huurKoop
    huurKoop = localStorage.getItem(LS+'huurKoop') || '';
    if (huurKoop) pasHuurAan(huurKoop);
    // Herstel bouwjaar-veld bij Onbekend label
    if (localStorage.getItem('dc15_labelOnbekend') === '1') {
      var bjVeld = document.getElementById('bouwjaar-veld');
      if (bjVeld) bjVeld.style.display = 'block';
    }
    // Bewoners tellen
    var bewEl = document.getElementById('bew-n');
    if (bewEl) bewEl.textContent = aantalBew;
    updateVG();
    return Object.keys(antw).length > 0;
  } catch(e) { return false; }
}

/* ══ HERSTART ══ */
function herstart() {
  antw = {};
  try { localStorage.removeItem(LS+'antw'); } catch(e) {}
  document.querySelectorAll('.ci').forEach(function(ci) { ci.classList.remove('ja','nee','verborgen','huur-v'); });
  document.querySelectorAll('.ki').forEach(function(ki) { ki.classList.remove('ki-actief'); });
  document.querySelectorAll('.kv-vraag').forEach(function(el) { el.classList.remove('huur-v'); });
  document.querySelectorAll('.w-kaart,.bj,.el-k').forEach(function(k) { k.classList.remove('ok'); });
  wF=1.0; iF=1.0; elF=1.0; verwF=1.0; aantalBew=2; huurKoop='';
  document.getElementById('bew-n').textContent = 2;
  var bjVeld = document.getElementById('bouwjaar-veld');
  if (bjVeld) bjVeld.style.display = 'none';
  pasHuurAan('koop');
  localStorage.removeItem('dc15_labelOnbekend');
  updateVerwCond('');
  updateVG();
  naarStap(1);
}
 
/* ══ PRINT RESULTATEN ══ */
function printResultaat() {
  window.print();
}

/* ══ INIT ══ */
window.addEventListener('scroll', function() {
  var nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('vast', window.scrollY > 80);
});
// Toon alleen s0, verberg de rest
for (var i = 0; i < SEC.length; i++) {
  var el = document.getElementById(SEC[i]);
  if (el) el.style.display = (i === 0) ? 'block' : 'none';
}
renderNieuws();
berekenZon();
// Herstel scan vanuit localStorage (voor pagina-herlaad)
herstelScan();
// Navigeer naar ankerlink als aanwezig in URL
laadVanHash();
// Sticky thema-label via IntersectionObserver
(function() {
  if (!('IntersectionObserver' in window)) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        var el = document.getElementById('vg-thema');
        if (el) el.textContent = e.target.dataset.thema || '';
      }
    });
  }, { rootMargin: '-40px 0px -70% 0px' });
  document.querySelectorAll('.cb[data-thema]').forEach(function(cb) { obs.observe(cb); });
})();

/* ══ HAMBURGER MENU ══ */
function toggleMobielMenu(){
  var m=document.getElementById('mobiel-menu');
  var h=document.getElementById('hamburger');
  var open=m.style.display==='flex';
  m.style.display=open?'none':'flex';
  h.setAttribute('aria-expanded',open?'false':'true');
  h.setAttribute('aria-label',open?'Menu openen':'Menu sluiten');
}
function sluitMobielMenu(){
  var m=document.getElementById('mobiel-menu');
  var h=document.getElementById('hamburger');
  m.style.display='none';
  h.setAttribute('aria-expanded','false');
  h.setAttribute('aria-label','Menu openen');
}
