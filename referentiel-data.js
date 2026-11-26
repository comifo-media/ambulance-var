/* Référentiel kilométrique Var - source : Infos_pour_application.pdf (grilles 2025). Partagé par index.html et referentiel.html. */
(function (g) {
  'use strict';

  // Zones Grand Toulon. Hyères Plage et Hyères Giens sont rattachées à Hyères (Z2).
  var ZONES = {
    Z1: { label: 'Zone 1', communes: ['Toulon', 'La Farlède', 'La Garde', 'La Valette du Var', 'Le Pradet', 'Le Revest'] },
    Z2: { label: 'Zone 2', communes: ['Carqueiranne', 'Hyères', 'Hyères Plage', 'Hyères Giens', 'La Crau', 'Solliès-Pont', 'Solliès-Toucas', 'Solliès-Ville'] },
    Z3: { label: 'Zone 3', communes: ['La Seyne-sur-Mer', 'Ollioules', 'Sanary-sur-Mer', 'Saint-Mandrier', 'Six-Fours-les-Plages'] }
  };

  var HOPITAUX = [
    { ville: 'Hyères', items: ['Hôpital Léon Bérard', 'Hôpital Pomponiana', 'Hôpital San Salvadour (Hyères Plage)', 'Hôpital René Sabran (Hyères Giens)'] },
    { ville: 'Marseille Centre', items: ['La Timone', 'La Conception', 'St Joseph', 'Européen', 'Clinique Juge', 'Centre Monticelli'] },
    { ville: 'Marseille Sud', items: ['Clairval', 'Paoli Calmette', 'Ste Marguerite'] },
    { ville: 'Marseille Nord', items: ['Hôpital Nord'] },
    { ville: 'Nice Aéroport / Ouest', items: ['Archet 1', 'Archet 2', 'Lenval'] },
    { ville: 'Nice Nord', items: ['Pasteur', 'Lacassagne'] },
    { ville: 'Nice Centre', items: ['Saint Roch', 'Cimiez'] }
  ];

  // Distances conventionnelles [départ, arrivée, km]
  var PAIRS = [
    ['Toulon','Aix',90],['Toulon','Antibes',136],['Toulon','Arles',167],['Toulon','Aubagne',46],['Toulon','Avignon',160],['Toulon','Bandol',19],['Toulon','Bargemon',106],['Toulon','Barjols',76],['Toulon','Belgentier',24],['Toulon','Berre',120],['Toulon','Brignoles',52],['Toulon','Callian',118],['Toulon','Cannes (Le Cannet)',125],['Toulon','Carpentras',185],['Toulon','Carnoules',35],['Toulon','Cavaillon',150],['Toulon','Cavalaire',62],['Toulon','Cogolin',63],['Toulon','Cuers',22],['Toulon','Draguignan',88],['Toulon','Fayence',115],['Toulon','Fos',115],['Toulon','Fréjus',92],['Toulon','Gonfaron',45],['Toulon','Grasse',140],['Toulon','Hyères',20],['Toulon','Hyères Plage',25],['Toulon','Hyères Giens',32],['Toulon','Istres',125],['Toulon','La Cadière',25],['Toulon','La Londe',32],['Toulon','Le Beausset',19],['Toulon','Le Beausset Matra',26],['Toulon','Le Beausset Vieux',18],['Toulon','Le Brulat',22],['Toulon','Le Castellet',24],['Toulon','Le Lavandou',45],['Toulon','Le Luc',57],['Toulon','Le Muy',80],['Toulon','Le Pradet',10],['Toulon','Mandelieu',116],['Toulon','Manosque',140],['Toulon','Marignane',90],['Toulon','Marseille Centre',70],['Toulon','Marseille Sud',82],['Toulon','Marseille Nord',82],['Toulon','Méounes',30],['Toulon','Menton',192],['Toulon','Miramas',135],['Toulon','Mons',129],['Toulon','Montauroux',120],['Toulon','Monte-Carlo',180],['Toulon','Nice Aéroport',147],['Toulon','Nice Nord',158],['Toulon','Nice Centre',153],['Toulon','Nice Est',162],['Toulon','Pierrefeu',30],['Toulon','Puget-Ville',30],['Toulon','La Roquebrussanne',36],['Toulon','Salon',120],['Toulon','Seillans',114],['Toulon','St-Cyr',33],['Toulon','St-Laurent du Var',147],['Toulon','St-Maximin',58],['Toulon','St-Paul en Forêt',114],['Toulon','St-Raphaël',97],['Toulon','St-Tropez',75],['Toulon','St-Zacharie',65],['Toulon','Ste-Anne du Castellet',25],['Toulon','Tavernes',81],['Toulon','Tourves',48],['Toulon','Vidauban',69],['Toulon','Vitrolles',108],
    ['Hyères','Fréjus',91],['Hyères','La Crau',8],['Hyères','La Londe',10],['Hyères','Marseille Centre',90],['Hyères','Marseille Nord',100],['Hyères','Marseille Sud',90],['Hyères','Pierrefeu',20],['Hyères','Toulon',20],
    ['Brignoles','Aups',35],['Brignoles','Barjols',25],['Brignoles','Besse',18],['Brignoles','Bras',15],['Brignoles','Cabasse',15],['Brignoles','Camps la Source',6],['Brignoles','Carcès',20],['Brignoles','Chateauvert',15],['Brignoles','Correns',15],['Brignoles','Cotignac',23],['Brignoles','Draguignan',55],['Brignoles','Entrecasteaux',25],['Brignoles','Flassans',15],['Brignoles','Forcalqueiret',13],['Brignoles','Fréjus',65],['Brignoles','Garéoult',15],['Brignoles','Gonfaron',25],['Brignoles','Hyères',54],['Brignoles','La Celle',6],['Brignoles','Le Luc',25],['Brignoles','Les Censiés',6],['Brignoles','Le Val',6],['Brignoles','Lorgues',35],['Brignoles','Marseille Sud',78],['Brignoles','Marseille Centre',62],['Brignoles','Marseille Nord',72],['Brignoles','Mazaugues',15],['Brignoles','Méounes',25],['Brignoles','Montfort',12],['Brignoles','Montmeyan',40],['Brignoles','Néoules',20],['Brignoles','Pierrefeu',34],['Brignoles','Pignans',25],['Brignoles','Pourcieux',30],['Brignoles','Pourrières',35],['Brignoles','La Roquebrussanne',15],['Brignoles','Ste Anastasie',18],['Brignoles','St Maximin',23],['Brignoles','Salernes',39],['Brignoles','Tavernes',30],['Brignoles','Toulon',52],['Brignoles','Tourves',13],['Brignoles','Varages',36],['Brignoles','Vins',9],
    ['Draguignan','Bargemon',21],['Draguignan','Callas',15],['Draguignan','Callian',39],['Draguignan','Fayence',35],['Draguignan','Figanières',12],['Draguignan','Flayosc',8],['Draguignan','Fréjus',32],['Draguignan','Hyères',84],['Draguignan','Hyères Plage',89],['Draguignan','Giens',96],['Draguignan','Les Arcs',10],['Draguignan','Lorgues',13],['Draguignan','Marseille Sud',145],['Draguignan','Marseille Centre',140],['Draguignan','Marseille Nord',135],['Draguignan','Mons',49],['Draguignan','Montauroux',39],['Draguignan','Nice Nord',96],['Draguignan','Nice Centre',91],['Draguignan','Nice Est',100],['Draguignan','Pierrefeu',60],['Draguignan','St Laurent du Var',83],['Draguignan','St Raphaël',35],['Draguignan','Seillans',38],['Draguignan','Toulon',88],['Draguignan','Trans',5],['Draguignan','Vidauban',18],
    ['St Raphaël','Agay',10],['St Raphaël','Anthéor',16],['St Raphaël','Bagnols en Forêt',21],['St Raphaël','Bargemon',46],['St Raphaël','Boulouris',5],['St Raphaël','Callian',32],['St Raphaël','Cannes',33],['St Raphaël','Cavalaire',46],['St Raphaël','Cogolin',37],['St Raphaël','Draguignan',35],['St Raphaël','Fayence',38],['St Raphaël','Figanières',42],['St Raphaël','Grasse',56],['St Raphaël','Hyères',94],['St Raphaël','Hyères Plage',99],['St Raphaël','Giens',106],['St Raphaël','La Motte',26],['St Raphaël','Le Dramont',9],['St Raphaël','Le Luc',43],['St Raphaël','Le Muy',20],['St Raphaël','Le Trayas',21],['St Raphaël','Les Issambres',14],['St Raphaël','Marignane',151],['St Raphaël','Marseille Nord',139],['St Raphaël','Marseille Sud',153],['St Raphaël','Marseille Centre',148],['St Raphaël','Mons',52],['St Raphaël','Montauroux',27],['St Raphaël','Nice Aéroport',63],['St Raphaël','Nice Nord',74],['St Raphaël','Nice Centre',69],['St Raphaël','Nice Est',78],['St Raphaël','Pierrefeu',71],['St Raphaël','Puget-sur-Argens',9],['St Raphaël','Quartier Caïs Bonfin',11],['St Raphaël','Roquebrune',17],['St Raphaël','Seillans',43],['St Raphaël','St Aygulf',10],['St Raphaël','St Laurent du Var',61],['St Raphaël','St Paul en Forêt',28],['St Raphaël','St Tropez',38],['St Raphaël','Ste Maxime',24],['St Raphaël','Toulon',95],['St Raphaël','Tour de Mare',5],['St Raphaël','Tourrettes',38],['St Raphaël',"Val d'Esquières",14],
    ['Fréjus','Agay',13],['Fréjus','Anthéor',19],['Fréjus','Bagnols en Forêt',18],['Fréjus','Bargemon',43],['Fréjus','Boulouris',8],['Fréjus','Callian',35],['Fréjus','Cannes',36],['Fréjus','Cavalaire',43],['Fréjus','Cogolin',34],['Fréjus','Draguignan',32],['Fréjus','Fayence',35],['Fréjus','Figanières',39],['Fréjus','Grasse',53],['Fréjus','Hyères',91],['Fréjus','Hyères Plage',96],['Fréjus','Giens',103],['Fréjus','La Motte',23],['Fréjus','Le Dramont',12],['Fréjus','Le Luc',40],['Fréjus','Le Muy',17],['Fréjus','Le Trayas',24],['Fréjus','Les Issambres',11],['Fréjus','Marignane',148],['Fréjus','Marseille Nord',136],['Fréjus','Marseille Sud',150],['Fréjus','Marseille Centre',145],['Fréjus','Mons',49],['Fréjus','Montauroux',30],['Fréjus','Nice Aéroport',60],['Fréjus','Nice Nord',71],['Fréjus','Nice Centre',66],['Fréjus','Nice Est',75],['Fréjus','Pierrefeu',68],['Fréjus','Puget-sur-Argens',6],['Fréjus','Quartier Caïs Bonfin',8],['Fréjus','Roquebrune',14],['Fréjus','Seillans',40],['Fréjus','St Aygulf',7],['Fréjus','St Laurent du Var',58],['Fréjus','St Paul en Forêt',25],['Fréjus','St Raphaël',3],['Fréjus','St Tropez',35],['Fréjus','Ste Maxime',21],['Fréjus','Toulon',92],['Fréjus','Tour de Mare',8],['Fréjus','Tourrettes',35],['Fréjus',"Val d'Esquières",17]
  ];

  // Péages (EUR), tarifs 2025 : Escota depuis La Seyne (VSL/TPMR gros volume, puis TPMR/Ambulance CAT A) et tunnel Prado
  var PEAGES_ESCOTA_VSL = [['Sanary',0.9],['Bandol',1.4],['La Cadière',2.5],['St Cyr Les Lecques',2.5],['La Ciotat',3.9],['Cassis',5.1],['La Bédoule',5.1],['Aubagne',5.1],['Auriol',6.3],['Pas de Trets',6.5],['Belcodène',7.2],['Aix en Provence',8.8]];
  var PEAGES_ESCOTA_CATA = [['Sanary',1.4],['Bandol',2],['La Cadière',4.1],['St Cyr Les Lecques',4.1],['La Ciotat',6.3],['Cassis',8.5],['La Bédoule',8.5],['Aubagne',8.5],['Auriol',10.5],['Pas de Trets',10.6],['Belcodène',11.6],['Aix en Provence',14.3]];
  var PEAGES_PRADO = [['Tunnel Prado Carénage',3.3],['Tunnel Prado Sud',2.8],['Carénage + Sud',6.1]];

  // Normalisation : minuscules, sans accents, sans espaces ni tirets, Saint -> st
  function norm(s) {
    return String(s || '')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\bsaint\b/g, 'st')
      .replace(/[^a-z0-9]/g, '');
  }

  var MAP = {};
  PAIRS.forEach(function (p) {
    MAP[norm(p[0]) + '|' + norm(p[1])] = p[2];
    MAP[norm(p[1]) + '|' + norm(p[0])] = p[2];
  });

  function distance(a, b) {
    var k = norm(a) + '|' + norm(b);
    return Object.prototype.hasOwnProperty.call(MAP, k) ? MAP[k] : null;
  }

  // Retourne 'Z1', 'Z2', 'Z3' ou null (hors Grand Toulon)
  function zoneOf(commune) {
    var n = norm(commune);
    if (!n) return null;
    var keys = Object.keys(ZONES);
    for (var i = 0; i < keys.length; i++) {
      var list = ZONES[keys[i]].communes;
      for (var j = 0; j < list.length; j++) {
        if (norm(list[j]) === n) return keys[i];
      }
    }
    return null;
  }

  // Forfait selon les règles : 'toulon' (Agglo) ou 'dep' (Départemental), ou null si indéterminé
  function forfaitFor(depart, arrivee) {
    var zd = zoneOf(depart), za = zoneOf(arrivee);
    if (!depart || !arrivee) return null;
    if (zd && za) {
      var pair = [zd, za].sort().join('-');
      if (pair === 'Z2-Z3') return 'dep';
      return 'toulon';
    }
    return 'dep';
  }

  // Liste de suggestions : Z1, Z2, Z3 puis destinations principales (sans doublons)
  function suggestions() {
    var seen = {}, out = [];
    function add(x) { var k = norm(x); if (k && !seen[k]) { seen[k] = true; out.push(x); } }
    ['Z1', 'Z2', 'Z3'].forEach(function (z) { ZONES[z].communes.forEach(add); });
    PAIRS.forEach(function (p) { add(p[0]); add(p[1]); });
    return out;
  }

  g.REF = {
    ZONES: ZONES, HOPITAUX: HOPITAUX, PAIRS: PAIRS,
    PEAGES_ESCOTA_VSL: PEAGES_ESCOTA_VSL, PEAGES_ESCOTA_CATA: PEAGES_ESCOTA_CATA, PEAGES_PRADO: PEAGES_PRADO,
    norm: norm, distance: distance, zoneOf: zoneOf, forfaitFor: forfaitFor, suggestions: suggestions
  };
})(window);
