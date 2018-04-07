// (function (global, factory) {
//   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('preact'), require('redux')) :
//   typeof define === 'function' && define.amd ? define(['preact', 'redux'], factory) :
//   (factory(global.preact,global.Redux));
// }(this, (function (preact,redux) { 'use strict';

// // structure view
// var INIT = 'INIT';


// var init = function () {
//     return { type: INIT }
// };

// function bionumber2assembly(bionumber) {
//     return (!bionumber || bionumber === 'asym' || bionumber === '0' || bionumber === 0) ? '__AU' : 'BU' + bionumber
// }

// function setAtomCounts(state, model) {
//     state.atomCounts = {};

//     var structure = state.sc.structure;
//     var biomolDict = structure.biomolDict;

//     state.atomCounts['__AU'] = (model === "all")
//             ? structure.atomStore.count
//             : structure.getModelProxy(0).atomCount;
//     //console.log('util: setAtomCounts: __AU' + '=' + state.atomCounts['__AU'])
//     for (var name in biomolDict) {
//         var _assembly = biomolDict[name];
//         var count = 0;
//         if (_assembly) {
//             count = _assembly.getAtomCount(structure);
//             if (model !== "all") {
//                 count /= structure.modelStore.count;
//             }
//         } else {
//             if (model === "all") {
//                 count = structure.atomStore.count;
//             } else {
//                 count = structure.getModelProxy(0).atomCount;
//             }
//         }
//         //console.log('util: setAtomCounts: ' + name + '=' + count)
//         /* TODO
//         if (typeof window.orientation !== 'undefined') {
//             count *= 4
//         }
//         let isBackboneOnly = structure.atomStore.count / structure.residueStore.count < 2
//         if (isBackboneOnly) {
//             count *= 10
//         }*/
//         state.atomCounts[name] = count;
//     }
// }

// function processSymmetry(symmetry) {
//     var symmetryData = {};
//     if (symmetry && symmetry.length > 0) {
//         symmetry.forEach( function (item) {
//             var assemblyName = (item.biologicalAssemblyId === 0) ? '__AU' : 'BU' + item.biologicalAssemblyId;
//             var symmetries = [];
//             if (item.localSymmetry) {
//                 // note: for local symmetries, there may be multiple instances of the same symmetry, so label them 'C3 (local)(1)...(n)'
//                 var symmetryMap = {};
//                 item.localSymmetry.forEach( function (obj) {
//                     var symmetry = obj.symmetry; // C2, C3 ...
//                     if (symmetry !== 'C1') {
//                         var o = {
//                                 label: (symmetry + " (local)"),
//                                 axes: obj.symmetryAxes
//                         };
//                         symmetries.push(o);
//                         if (!symmetryMap[symmetry]) {
//                             symmetryMap[symmetry] = [];
//                         }
//                         symmetryMap[symmetry].push(o);
//                     }
//                 });
//                 // append numeric counter to label if there are multiple instances of the same symmetry
//                 for (var prop in symmetryMap) {
//                     var o = symmetryMap[prop];
//                     if (o.length > 1) {
//                         o.forEach( function (item, i) { item.label += " (" + (i + 1) + ")"; });
//                     }
//                 }
//             }
//             if (item.globalSymmetry && item.globalSymmetry.symmetry !== 'C1') {
//                 symmetries.push({
//                     label: item.globalSymmetry.symmetry + ' (global)',
//                     axes: item.globalSymmetry.symmetryAxes});
//             }
//             if (item.pseudoSymmetry && item.pseudoSymmetry.symmetry !== 'C1') {
//                 symmetries.push({
//                     label: item.pseudoSymmetry.symmetry + ' (pseudo)',
//                     axes: item.pseudoSymmetry.symmetryAxes});
//             }
//             if (symmetries.length > 0) {
//                 toJsonStr(symmetries);
//                 symmetryData[assemblyName] = { symmetries: symmetries };
//             }
//         });
//     }
//     //console.log('symmetryData=' +  JSON.stringify(symmetryData, null, 2))
//     return symmetryData
// }
//     // NGL.cssDirectory = "nglviewer/css/"
//     // document.addEventListener("DOMContentLoaded", function () {
//     //   var stage = new NGL.Stage("stagePanel");
//     //   stage.loadFile("mem_new.pdb", {defaultRepresentation: true});
//     // });


// // get default style based on atomCount
// function getDefaultStyle(state) {
//     //console.log('util.getDefaultStyle: state.atomCount=' + state.atomCount)
//     return (state.atomCount < 200000) ? 'cartoon' : 'surface'
// }

// // get default color scheme based on atomCount
// function getDefaultColorScheme(state) {
//     //console.log('util.getDefaultColorScheme: state.atomCount=' + state.atomCount)
//     return (state.atomCount < 200000) ? 'residueindex' : 'chainname'
// }
// // get sele
// function getSele(state, type, repr) {
//     var sele = '';

//     var model = state.structureView.model;
//     var hydrogenVisibility = state.structureView.hydrogenVisibility;
//     var ionVisibility = state.structureView.ionVisibility;
//     var waterVisibility = state.structureView.waterVisibility;

//     if (type === 'polymer') {
//         if (repr === 'cartoon' || repr === 'backbone') {
//             if (model !== 'all') {
//                 sele = '/' + model;
//             }
//         } else if (repr === 'base') {
//             sele = 'polymer and nucleic';
//             if (model !== 'all') {
//                 sele += ' and /' + model;
//             }
//         } else if (repr === 'surface' || repr === 'spacefill' || repr === 'licorice') {
//             if (repr === 'surface' && state.atomCount > 1000000) {  // for HIV capsids 3J3Q and 3J3Y
//                 sele = '.CA';
//             } else {
//                 sele = 'polymer and ( protein or nucleic )';
//             }
//             if (model !== 'all') {
//                 sele += ' and /' + model;
//             }
//             if (hydrogenVisibility === false) {
//                 sele += ' and not hydrogen';
//             }
//         } else if (repr === 'line' || repr === 'point') {
//             sele = 'all';
//             if (model !== 'all') {
//                 sele += ' and /' + model;
//             }
//             if (hydrogenVisibility === false) {
//                 sele += ' and not hydrogen';
//             }
//             if (ionVisibility === false) {
//                 sele += ' and not ion';
//             }
//             if (waterVisibility === false) {
//                 sele += ' and not water';
//             }
//         } else if (repr === 'ball+stick') {
//             if (state.sc.structure.validation) {
//                 sele = '( ' + state.sc.structure.validation.clashSele + ' )';
//                 if (model !== 'all') {
//                     sele += ' and /' + model;
//                 }
//                 if (hydrogenVisibility === false) {
//                     sele += ' and not hydrogen';
//                 }
//             } else {
//                 sele = 'NONE';
//             }
//         }
//     } else if (type === 'ligand') {
//         sele = '( not polymer or not ( protein or nucleic ) )';
//         if (model !== 'all') {
//             sele += ' and /' + model;
//         }
//         if (hydrogenVisibility === false) {
//             sele += ' and not hydrogen';
//         }
//         if (ionVisibility === false) {
//             sele += ' and not ion';
//         }
//         if (waterVisibility === false) {
//             sele += ' and not water';
//         }
//     }
//     return sele
// }

// function getSphereDetail(state) {
//     var quality = state.structureView.quality;
//     var atomCount = state.atomCount;

//     if (quality === 'auto') {
//         return atomCount < 15000 ? 1 : 0
//     } else {
//         return (quality === 'high' || quality === 'medium') ? 1 : 0
//     }
// }

// function getLineOnly(state) {
//     var quality = state.structureView.quality;
//     var atomCount = state.atomCount;
//     return (quality === 'auto') ? atomCount > 250000 : quality === 'low'
// }

// function getScaleFactor(state) {
//     var quality = state.structureView.quality;
//     var atomCount = state.atomCount;

//     if (quality === 'low') {
//         return 0.1
//     } else if (quality === 'medium') {
//         return 0.7
//     } else if (quality === 'high') {
//         return 1.7
//     } else {
//         return Math.min(1.5, Math.max(0.1, 50000 / atomCount))
//     }
// }

// // set ui dropdown options

// // set all options
// function setSelectOptions(state) {
//     // display
//     setAssemblyOptions(state);
//     setModelOptions(state);
//     setSymmetryOptions(state);
//     setStyleOptions(state);
//     setColorSchemeOptions(state);
//     setLigandStyleOptions(state);
//     setQualityOptions(state);

//     // edmaps
//     setMapStyleOptions(state);

//     // ligand
//     setLigandOptions (state);
//     setPocketColorOptions (state);

//     // viewer
//     setCameraTypeOptions(state);
//     setBackgroundOptions(state);
// }

// function setAssemblyOptions(state) {
//     var options = [];
//     var structure = state.sc.structure;
//     var biomolDict = structure.biomolDict;
//     if (!structure.unitcell && Object.keys(biomolDict).length === 1 && biomolDict['BU1'] && biomolDict['BU1'].isIdentity(structure)) {
//         addOption(options, 'BU1', 'Full Structure');
//     } else {
//         var label = (structure.unitcell) ? 'Asymmetric Unit' : 'Full Structure';
//         addOption(options, '__AU', label);
//         for (var name in biomolDict) {
//             if (name === 'UNITCELL') {
//                 addOption(options, name, 'Unitcell');
//             } else if (name === 'SUPERCELL') {
//                 addOption(options, name, 'Supercell');
//             } else if (name.substr(0, 2) === 'BU') {
//                 label = 'Bioassembly ' + name.substr(2);
//                 addOption(options, name, label);
//             } else {
//                 addOption(options, name, name);
//             }
//         }
//     }

//     state.assemblyOptions = options;
// }

// function setModelOptions(state) {
//     var options = [];
//     var modelStore = state.sc.structure.modelStore;
//     if (modelStore.count > 1) {
//         addOption(options, 'all', 'All Models');
//     }
//     for (var i = 0; i < modelStore.count; ++i) {
//         addOption(options, i, 'Model ' + (i + 1));
//     }

//     state.modelOptions = options;
// }

// function setSymmetryOptions(state) {
//     var options = [];
//     addOption(options, '-1', 'None');

//     var assembly = state.structureView.assembly;
//     if (state.symmetryData[assembly]) {
//         var symmetries = state.symmetryData[assembly].symmetries;
//         symmetries.forEach(function (symmetry, i) {
//             addOption(options, i, symmetry.label);
//         } );
//     }

//     state.symmetryOptions = options;
// }


// function setStyleOptions(state) {
//     var options = [];
//     addOption(options, '', 'None');
//     addOption(options, 'backbone', 'Backbone');
//     addOption(options, 'surface', 'Surface');
//     addOption(options, 'cartoon', 'Cartoon');
//     addOption(options, 'spacefill', 'Spacefill/CPK');
//     addOption(options, 'licorice', 'Licorice');
//     addOption(options, 'line', 'Line');

//     /* TODO implement refined logic
//     if (state.recommended) {
//         if (state.atomCount < 100000) {
//             addOption(options, 'cartoon', 'Cartoon')
//         }
//         if (state.atomCount < 80000) {
//             addOption(options, 'spacefill', 'Spacefill/CPK')
//         }
//         if (state.atomCount < 80000) {
//             addOption(options, 'licorice', 'Licorice')
//         }
//     } else {
//         addOption(options, 'cartoon', 'Cartoon')
//         if (!state.isBackboneOnly) {
//             addOption(options, 'spacefill', 'Spacefill/CPK')
//             addOption(options, 'licorice', 'Licorice')
//         }
//     }
//     */
//     state.styleOptions = options;
// }

// // get colorScale based on colorScheme
// function getColorScale(colorScheme) {
//     if (colorScheme === 'hydrophobicity') {
//         return 'RdYlGn'
//     } else if (colorScheme === 'bfactor') {
//         return 'OrRd'
//     } else {
//         return 'RdYlBu'
//     }
// }

// // get colorReverse based on colorScheme
// function getColorReverse(colorScheme) {
//     return (
//         colorScheme === 'residueindex' ||
//         colorScheme === 'chainname' ||
//         colorScheme === 'hydrophobicity'
//     )
// }

// function setColorSchemeOptions(state) {
//     var options = [];
//     var bfactor = true;
//     var densityfit = true;
//     var geoquality = true;
//     var methods = state.sc.structure.header.experimentalMethods;
//     inspect(methods, 'methods');
//     if (methods) {
//         if (!methods.includes('X-RAY DIFFRACTION') &&
//             !methods.includes('ELECTRON CRYSTALLOGRAPHY') &&
//             !methods.includes('NEUTRON DIFFRACTION')
//         ) {
//             bfactor = false;
//             densityfit = false;
//         }
//     }
//     if (!state.hasValidationReport) {
//         densityfit = false;
//         geoquality = false;
//     }
//     if (!state.hasEdMaps) {
//         densityfit = false;
//     }
//     console.log('geoquality=' + geoquality);
//     console.log('densityfit=' + densityfit);

//     addOption(options, 'chainname', 'By Chain');
//     addOption(options, 'residueindex', 'Rainbow');
//     addOption(options, 'element', 'By Element/CPK');
//     addOption(options, 'resname', 'By Residue');
//     if (bfactor) {
//         addOption(options, 'bfactor', 'By B-factor');
//     }
//     addOption(options, 'sstruc', 'By Secondary Structure');
//     addOption(options, 'hydrophobicity', 'By Hydrophobicity');
//     if (densityfit) {
//         addOption(options, 'densityfit', 'By Density Fit');
//     }
//     if (geoquality) {
//         addOption(options, 'geoquality', 'By Geometry Quality');
//     }

//     state.colorSchemeOptions = options;
// }

// function setLigandStyleOptions(state) {
//     var options = [];
//     addOption(options, '', 'None');
//     addOption(options, 'ball+stick', 'Ball & Stick');
//     addOption(options, 'spacefill', 'Spacefill/CPK');

//     state.ligandStyleOptions = options;
// }

// function setQualityOptions(state) {
//     var options = [];
//     addOption(options, 'auto', 'Automatic');
//     addOption(options, 'low', 'Low');
//     addOption(options, 'medium', 'Medium');
//     addOption(options, 'high', 'High');

//     state.qualityOptions = options;
// }

// // edmaps
// function setMapStyleOptions(state) {
//     var options = [];
//     addOption(options, 'contour', 'Mesh');
//     addOption(options, 'smooth', 'Smooth');
//     addOption(options, 'flat', 'Flat');

//     state.mapStyleOptions = options;
// }

// // edmaps and ligand viewer
// function setLigandOptions(state) {
//     var ligandSele = '( not polymer or not ( protein or nucleic ) ) and not ( water or ACE or NH2 ) and /0';
//     var ligands = [];
//     state.sc.structure.eachResidue(function (rp) {
//         if (rp.isWater()) { return }
//         var sele = '';
//         if (rp.resno !== undefined) { sele += rp.resno; }
//         if (rp.inscode) { sele += '^' + rp.inscode; }
//         if (rp.chain) { sele += ':' + rp.chainname; }
//         var name = (rp.resname ? '[' + rp.resname + ']' : '') + sele;
//         ligands.push([sele, name]);
//     }, new NGL.Selection(ligandSele));

//     if (ligands.length > 0) {
//         var options = [];
//         addOption(options, '', 'None');
//         ligands.forEach(function (d) {
//             //console.log('select-options: setLigandOptions: ' + d[0] + ' ' + d[1])
//             addOption(options, d[0], d[1]);
//         });
//         state.ligandOptions = options;
//     }
// }

// function setPocketColorOptions (state) {
//     var options = [];
//     addOption(options, 'hydrophobicity', 'By Hydrophobicity');
//     addOption(options, 'element', 'By Element/CPK');
//     addOption(options, 'bfactor', 'By B-factor');

//     state.pocketColorOptions = options;
// }

// // viewer options
// function setCameraTypeOptions(state) {
//     var options = [];
//     addOption(options, 'perspective', 'Perspective Camera');
//     addOption(options, 'orthographic', 'Orthographic Camera');

//     state.cameraTypeOptions = options;
// }

// function setBackgroundOptions(state) {
//     var options = [];
//     addOption(options, 'white', 'White background');
//     addOption(options, 'black', 'Black background');

//     state.backgroundOptions = options;
// }


// // set loading message
// function setLoading(state, loading) {
//     state.loading = loading;
//     if (loading) {
//         $('#loading').show();
//     } else {
//         $('#loading').hide();
//     }
// }

// // set option
// function addOption(options, value, label) {
//     options.push({value: value, label: label});
// }


// // optionValue - the value to pass to the callback function
// function load(state, optionValue, callback) {
//     var pdbid = state.sc.name.toLowerCase();
//     var dir = pdbid.substring(1, 3);
//     var validationUrl = validationUrlPrefix + dir + '/' + pdbid + '/' + pdbid + validationUrlSuffix;
//     //console.log('validationUrl=' + validationUrl)

//     NGL.autoLoad(validationUrl, { ext: 'validation' }).then( function(validation) {
//         state.sc.structure.validation = validation;
//         callback(state, optionValue, true);
//     } ).catch(function(e) {
//         console.log('error=' + e);
//         callback(state, optionValue, false, e);
//     } );
// }

// // init state
// function init$1(state) {
//     var sc = state.sc; // structureComponent

//     //console.log('reducers: state.assembly=' + state.assembly)
//     sc.setDefaultAssembly(state.assembly);

//     var model = 0; // default to 0, values: 0-n|'all'
//     setAtomCounts(state, model);
//     state.atomCount = (state.atomCounts[state.assembly]);

//     state.loading = false; // nothing is being loaded

//     // console.log('state.preset=' + state.preset); // validationReport | ligandInteraction | electronDensityMaps | symmetry
//     // console.log('state.sele=' + state.sele); // ligandInteraction -> ligand | symmetry -> C2

//     var clashVisibility = (state.preset === 'validationReport');

//     // structure view
//     state.structureViewDefaults = {
//         assembly: state.assembly,
//         model: model,
//         symmetry: -1,
//         style: getDefaultStyle(state),
//         colorScheme: getDefaultColorScheme(state),
//         ligandStyle: 'ball+stick',
//         quality: 'auto',
//         waterVisibility: false,
//         ionVisibility: true,
//         hydrogenVisibility: true,
//         clashVisibility: false
//     };

//     // obj representing the current state of ligand viewer
//     state.structureView = Object.assign({}, state.structureViewDefaults, { clashVisibility: clashVisibility });
//     state.structureView.reprs = {
//         unitcell: null,
//         polymer: {},
//         ligand: {},
//         validation: {},
//     };

//     // initialize default options for the dropdowns
//     setSelectOptions(state);

//     // edmaps
//     //console.log('reducers.init: state.hasEdMaps=' + state.hasEdMaps)
//     if (state.hasEdMaps) {
//         // obj representing the current state of edmaps
//         state.edmaps = {
//             map2fofc: { loaded: false, visible: false },
//             mapFofc: { loaded: false, visible: false },
//             scroll: '',
//             mapStyle: edmapsMapStyle,
//             boxSize: edmapsBoxSize,
//             ligand: ''
//         };
//     }

//     // ligand viewer
//     if (state.ligandOptions) {
//         var ligand = (state.preset === 'ligandInteraction') ? getLigandFromSeleParam(state) : '';
//         console.log('reducers: init: state.ligandOptions.length=' + state.ligandOptions.length + ', ligand=' + ligand);

//         // ligand viewer defaults
//         state.ligandViewerDefaults = {
//             ligand: '',
//             pocketOpacity: 0,
//             pocketNearClipping: 0,
//             pocketRadiusClipping: 100,
//             ligandLabel: true,
//             pocketColor: 'hydrophobicity',
//             hydrogenBond: true,
//             halogenBond: true,
//             hydrophobic: true,
//             piInteraction: true,
//             metalCoordination: true
//         };
//         // obj representing the current state of ligand viewer
//         state.ligandViewer = Object.assign({}, state.ligandViewerDefaults, { ligand: ligand });

//         //u.inspect(state.ligandViewerDefaults, 'state.ligandViewerDefaults')
//         //u.inspect(state.ligandViewer, 'state.ligandViewer')
//     }

//     // obj representing the current state of the ui viewer options
//     state.viewer = {
//         spin: false,
//         fullscreen: false,
//         focus: 0,
//         cameraType: 'perspective',
//         background: 'white'
//     };

//     // initialize reprs - other reprs will be added as per user action
//     initStructureViewRepr(state, 'polymer');
//     initStructureViewRepr(state, 'ligand');

//     // preset logic
//     if (state.hasValidationReport && state.preset === 'validationReport') {
//         setClashVisibility$1(state, true);
//     } else if (state.preset === 'ligandInteraction' && state.ligandViewer.ligand !== '') {
//         setLigand$1(state, state.ligandViewer.ligand);
//     } else if (state.preset === 'symmetry') {
//         var sele = state.sele;
//         if (!sele || sele === '') {
//             sele = getFirstSymmetry(state);
//         }
//         var symmetry = getSymmetryFromSeleParam(state, sele);
//         setSymmetry$1(state, symmetry);
//     } else if (state.preset === 'electronDensityMaps' && state.hasEdMaps) {
//         setDefaultMapsView$1(state);
//     } else {
//         state.stage.tasks.onZeroOnce(function () { return state.stage.autoView(0); });
//     }
// }

// function setLigand$1(state, ligand) {
//     //console.log('reducers-ligand: setLigand: ligand=' + value)

//     var lv = state.ligandViewer;
//     if (!lv.reprs) {
//         initLigandViewerReprs(state);
//     }
//     lv.ligand = ligand;
//     lv.ligandLabel = (ligand === '') ? false : true;

//     var sc = state.sc;
//     var reprs = lv.reprs;

//     if (ligand === '') {
//         for (var repr in reprs) {
//             //console.log('reducers-ligand: setLigand: repr=' + repr)
//             reprs[repr].setVisibility(false);
//         }
//         $('#ligandViewerControls').hide();
//         setLigandViewerMessage(msgLigandViewerBegin);
//         state.stage.tasks.onZeroOnce(function () { return state.stage.autoView(autoView); });
//     } else {
//         // update structure view
//         setAssembly$1(state, '__AU', false, false);
//         setStyle$1(state, '');
//         setLigandStyle$1(state, '');
//         updateComponentUi$$1(state);

//         var modelSele = ' and /' + state.structureView.model;

//         var structure = sc.structure;

//         var withinSele = structure.getAtomSetWithinSelection(new NGL.Selection(ligand), 5);
//         var withinGroup = structure.getAtomSetWithinGroup(withinSele);
//         var expandedSele = withinGroup.toSeleString();
//         var neighborSele = '(' + expandedSele + ') and not (' + ligand + ')';

//         lv.expandedSele = expandedSele; // store in ligand obj
//         lv.neighborSele = neighborSele; // store in ligand obj

//         var pocketRadiusClipFactor = 1;

//         var sview = structure.getView(new NGL.Selection(ligand));
//         var pocketRadius = Math.max(sview.boundingBox.getSize().length() / 2, 2) + 5;
//         lv.pocketRadius = pocketRadius; // store in ligand obj

//         var withinSele2 = structure.getAtomSetWithinSelection(new NGL.Selection(ligand), pocketRadius + 2);
//         var neighborSele2 = '(' + withinSele2.toSeleString() + ') and not (' + ligand + ') and polymer';

//         reprs.ligandRepr.setVisibility(true);
//         reprs.neighborRepr.setVisibility(true);
//         reprs.contactRepr.setVisibility(true);
//         reprs.pocketRepr.setVisibility(true);
//         reprs.labelRepr.setVisibility(true);

//         reprs.ligandRepr.setSelection(ligand + modelSele);

//         reprs.neighborRepr.setSelection(neighborSele + modelSele);
//         reprs.contactRepr.setSelection(expandedSele + modelSele);
//         reprs.pocketRepr.setSelection(neighborSele2 + modelSele);

//         reprs.contactRepr.setParameters({
//             hydrogenBond: lv.hydrogenBond,
//             halogenBond: lv.halogenBond,
//             hydrophobic: lv.hydrophobic,
//             piInteraction: lv.piInteraction,
//             metalCoordination: lv.metalCoordination
//         });
//         reprs.pocketRepr.setParameters({
//             clipRadius: pocketRadius * pocketRadiusClipFactor,
//             clipCenter: sview.center
//         });
//         reprs.labelRepr.setSelection('((' + neighborSele + ') or (' + ligand + '))' + modelSele);

//         state.stage.tasks.onZeroOnce(function () { return sc.autoView(expandedSele, autoView); });

//         setRange('pocket-radius-clipping', 100);
//         $('#ligandViewerControls').show();
//         setLigandViewerMessage(msgLigandViewerPocket);
//     }
//     updateButtonState('btnLigandLabel', state.ligandViewer.ligandLabel);

//     if (state.edmaps && state.edmaps.ligand !== ligand) {
//         // update edmaps
//         state.edmaps.ligand = ligand;
//         updateComponentUi$1(state);
//     }
// }

// function setClashVisibility$1(state, clashVisibility) {
//     //console.log('reducers-structure: setClashVisibility: ' + clashVisibility)
//     state.structureView.clashVisibility = clashVisibility;

//     if (clashVisibility && !state.sc.structure.validation) {
//         setLoading(state, true);
//         load(state, clashVisibility, updateClashVisibility);
//     } else {
//         updateClashVisibility(state, clashVisibility);
//     }
// }

// function updateClashVisibility(state, clashVisibility, validationLoaded, err) {
//     if (validationLoaded || err) {
//         setLoading(state, false);
//     }

//     if (err) {
//         console.log('reducers-structure: updateClashVisibility: ' + err);
//     } else {
//         var reprs = state.structureView.reprs;
//         if (clashVisibility) {
//             if (!reprs.validation.validation) {
//                 // validation reprs not initialized
//                 initStructureViewRepr(state, 'validation');
//             }
//         }
//         for(var repr in reprs.validation) {
//             reprs.validation[repr].setVisibility(clashVisibility);
//         }
//         if (clashVisibility && state.preset === 'validationReport') {
//             console.log('updateClashVisibility: state.preset=' + state.preset);
//             setColorScheme$1(state, 'geoquality');
//             setSelect('colorScheme', state.structureView.colorScheme);
//             state.stage.tasks.onZeroOnce(function () { return state.stage.autoView(autoView); });
//             state.preset = ''; // only execute this block the first time user enters with preset
//         }
//     }
// }


// function getSubdiv(state) {
//     var quality = state.structureView.quality;
//     var atomCount = state.atomCount;

//     if (quality === 'auto') {
//         if (atomCount < 15000) {
//             return 12
//         } else if (atomCount < 70000) {
//             return 6
//         } else {
//             return 3
//         }
//     } else {
//         if (quality === 'high') {
//             return 12
//         } else if (quality === 'medium') {
//             return 6
//         } else {
//             return 3
//         }
//     }
// }

// function getRadialSegments(state, type, repr) {
//     var quality = state.structureView.quality;
//     var atomCount = state.atomCount;

//     if (quality === 'auto') {
//         if (atomCount < 15000) {
//             return 20
//         } else if (atomCount < 70000) {
//             return 10
//         } else {
//             return (type === 'polymer' && repr === 'cartoon') ? 6 : 5
//         }
//     } else {
//         if (quality === 'high') {
//             return 20
//         } else if (quality === 'medium') {
//             return 10
//         } else {
//             return (type === 'polymer' && repr === 'cartoon') ? 6 : 5
//         }
//     }
// }

// // get ligand colorScheme
// function getLigandColorScheme(state) {
//     var colorScheme = state.structureView.colorScheme;
//     if (colorScheme === 'bfactor') {
//         return 'bfactor'
//     } else if (colorScheme === 'densityfit') {
//         return state.validationData ? 'densityfit' : 'element'
//     } else if (colorScheme === 'geoquality') {
//         return state.validationData ? 'geoquality' : 'chainname'
//     } else {
//         return 'element'
//     }
// }

// // init repr if it does not exist - type is one of unitcell|polymer|ligand|validation
// function initStructureViewRepr(state, type, repr) {
//     var reprs = state.structureView.reprs; // obj containing all structureView representations
//     var sc = state.sc; // structureComponent
//     var sv = state.structureView;

//     //console.log('representations: initStructureViewRepr: type=' + type + ', repr=' + repr)

//     if (type === 'unitcell') {
//         if (reprs[type]) {
//             //console.log('representations: WARN: reprs.' + type + ' EXISTS')
//         } else {
//             reprs.unitcell = sc.addRepresentation( 'unitcell', {
//                 disableImpostor: true,
//                 radiusSegments: 16
//             } );
//         }
//     } else {
//         if (reprs[type][repr]) {
//             //console.log('representations: WARN: reprs.' + type + '.' + repr + ' EXISTS')
//         } else {
//             if (type === 'polymer') {
//                 var colorScheme = sv.colorScheme;
//                 var colorScale = getColorScale(sv.colorScheme);
//                 var colorReverse = getColorReverse(sv.colorScheme);
//                 if (!repr) {
//                     repr = sv.style; // repr not specified so use state value
//                 }
//                 if (repr === 'cartoon') {
//                     reprs.polymer.cartoon = sc.addRepresentation( 'cartoon', {
//                         assembly: sv.assembly,
//                         colorScheme: colorScheme,
//                         colorReverse: colorReverse,
//                         colorScale: colorScale,
//                         aspectRatio: 5,
//                         scale: 0.7,
//                         quality: sv.quality,
//                         subdiv: getSubdiv(state),
//                         radialSegments: getRadialSegments(state, 'polymer', 'cartoon'),
//                         sele: getSele(state, 'polymer', 'cartoon')
//                     } );
//                     reprs.polymer.base = sc.addRepresentation( 'base', {
//                         colorScheme: colorScheme,
//                         colorScale: colorScale,
//                         colorReverse: colorReverse,
//                         quality: sv.quality,
//                         sphereDetail: getSphereDetail(state),
//                         radialSegments: getRadialSegments(state, 'polymer', 'base'),
//                         sele: getSele(state, 'polymer', 'base')
//                     } );
//                 } else if (repr === 'backbone') {
//                     reprs.polymer.backbone = sc.addRepresentation( 'backbone', {
//                         assembly: sv.assembly,
//                         colorScheme: colorScheme,
//                         colorReverse: colorReverse,
//                         colorScale: colorScale,
//                         lineOnly: getLineOnly(state),
//                         scale: 2.0,
//                         sele: getSele(state, 'polymer', 'backbone')
//                     } );
//                 } else if (repr === 'surface') {
//                     reprs.polymer.surface = sc.addRepresentation( 'surface', {
//                         assembly: sv.assembly,
//                         colorScheme: colorScheme,
//                         colorReverse: colorReverse,
//                         colorScale: colorScale,
//                         //quality: sv.quality,
//                         surfaceType: 'sas',
//                         probeRadius: 1.4,
//                         useWorker: true,
//                         scaleFactor: getScaleFactor(state),
//                         sele: getSele(state, 'polymer', 'surface')
//                     } );
//                 } else if (repr === 'spacefill') {
//                     reprs.polymer.spacefill = sc.addRepresentation( 'spacefill', {
//                         assembly: sv.assembly,
//                         colorScheme: colorScheme,
//                         colorReverse: colorReverse,
//                         colorScale: colorScale,
//                         quality: sv.quality,
//                         sphereDetail: getSphereDetail(state),
//                         sele: getSele(state, 'polymer', 'spacefill')
//                     } );
//                 } else if (repr === 'licorice') {
//                     reprs.polymer.licorice = sc.addRepresentation( 'licorice', {
//                         assembly: sv.assembly,
//                         multipleBond: 'symmetric',
//                         colorScheme: colorScheme,
//                         colorReverse: colorReverse,
//                         colorScale: colorScale,
//                         quality: sv.quality,
//                         sphereDetail: getSphereDetail(state),
//                         radialSegments: getRadialSegments(state, 'polymer', 'licorice'),
//                         sele: getSele(state, 'polymer', 'licorice')
//                     } );
//                 } else if (repr === 'ball+stick') {
//                     reprs.polymer['ball+stick'] = sc.addRepresentation( 'ball+stick', {
//                         assembly: sv.assembly,
//                         multipleBond: 'symmetric',
//                         colorScheme: colorScheme,
//                         colorReverse: colorReverse,
//                         colorScale: colorScale,
//                         quality: sv.quality,
//                         sphereDetail: getSphereDetail(state),
//                         radialSegments: getRadialSegments(state, 'polymer', 'ball+stick'),
//                         sele: getSele(state, 'polymer', 'ball+stick')
//                     } );
//                 } else if (repr === 'line') {
//                     reprs.polymer['line'] = sc.addRepresentation('line', {
//                         assembly: sv.assembly,
//                         multipleBond: 'offset',
//                         colorScheme: colorScheme,
//                         colorReverse: colorReverse,
//                         colorScale: colorScale,
//                         linewidth: 5,
//                         sele: getSele(state, 'polymer', 'line')
//                     });
//                     reprs.polymer['point'] = sc.addRepresentation('point', {
//                         assembly: sv.assembly,
//                         colorScheme: colorScheme,
//                         colorReverse: colorReverse,
//                         colorScale: colorScale,
//                         sizeAttenuation: false,
//                         pointSize: 5,
//                         alphaTest: 1,
//                         useTexture: true,
//                         sele: getSele(state, 'polymer', 'point')
//                     });
//                 } else {
//                     //console.log('representations: UNKNOWN REPR: type=' + type + ', repr=' + repr)
//                 }
//             } else if (type === 'ligand') {
//                 if (!repr) {
//                     repr = sv.ligandStyle; // repr not specified so use state value
//                 }
//                 if (repr === 'spacefill') {
//                     reprs.ligand.spacefill = sc.addRepresentation( 'spacefill', {
//                         assembly: sv.assembly,
//                         colorScheme: getLigandColorScheme(state),
//                         quality: sv.quality,
//                         sele: getSele(state, 'ligand', null)
//                     } );

//                 } else if (repr === 'ball+stick') {
//                     reprs.ligand['ball+stick'] = sc.addRepresentation( 'ball+stick', {
//                         assembly: sv.assembly,
//                         multipleBond: 'symmetric',
//                         colorScheme: getLigandColorScheme(state),
//                         quality: sv.quality,
//                         scale: 2.5,
//                         aspectRatio: 1.2,
//                         radiusSize: 0.4,
//                         sele: getSele(state, 'ligand', null)
//                     } );
//                 } else {
//                     //console.log('representations: UNKNOWN REPR: type=' + type + ', repr=' + repr)
//                 }
//             } else if (type === 'validation') {
//                 var validationColor = 'geoquality'; // geoquality|densityfit
//                 var sele = sc.structure.validation.clashSele;
//                 if (sv.model !== 'all') {
//                     sele = '(' + sele + ') and /' + sv.model;
//                 }
//                 //console.log('sele=' + sele)
//                 reprs.validation.validation = sc.addRepresentation( 'validation', { sele: sele } );
//                 reprs.validation.ballandstick = sc.addRepresentation( 'ball+stick', {
//                     sele: sele,
//                     color: validationColor
//                 } );
//             } else {
//                 //console.log('representations: UNKNOWN REPR: type=' + type + ', repr=' + repr)
//             }
//         }
//     }
// }

// function getLigandFromSeleParam(state) {
//     console.log('state.ligandOptions.length=' + state.ligandOptions.length);
//     // do not use forEach here - return statement does not break out of loop
//     for ( var i = 0; i < state.ligandOptions.length; i++) {
//         var ligandOption = state.ligandOptions[i];
//         var label = ligandOption.label;
//         //if (label.indexOf['['] === 0) {
//             // [TRE]1001:A
//             var s = label.substring(1, label.indexOf(']'));
//             console.log('s=' + s);
//             if (s === state.sele) {
//                 return label.substring(label.indexOf(']') + 1)
//             }
//         //}
//     }
//     return ''
// }



// init stage
var stage = new NGL.Stage('stagePanel', { backgroundColor: "black", hoverTimeout: 150 });

// note: pdbid, bionumber, and structureData3dView are declared in the enclosing template file
// var assembly = bionumber2assembly(bionumber);  // one of __AU|BU<n>|UNITCELL|SUPERCELL
// var rcsbUrl = 'rcsb://' + pdbid;
var rcsbUrl = "mem_new.pdb";

stage.loadFile(rcsbUrl, { defaultRepresentation: true });
// // stage.loadFile(rcsbUrl, { defaultRepresentation: false }).then( function(sc) {

// //     var sd = structureData3dView;
// //     var symmetryData = processSymmetry(sd.symmetry);

// //     var initialProps = {
// //         assembly: assembly,
// //         stage: stage,
// //         sc: sc,
// //         symmetryData: symmetryData,
// //         hasEdMaps: sd.hasEdMaps,
// //         hasValidationReport: sd.hasValidationReport,
// //         largeStructure: sd.largeStructure,
// //         sele: sele,
// //         preset: preset,
// //         isSafariMobile: navigator.userAgent.match(/(iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)
// //     };

// //     // create store with initial props
// //     var store = redux.createStore(app, initialProps);

// //     // init store.state
// //     store.dispatch(init());

// //     // render the ui
// //     renderUi(store);

// //     // ensure the scene gets centered after all tasks are done
// //     stage.tasks.onZeroOnce(function () { return stage.autoView(0); });

// //     // update focus slider whenever the stage parameters change
// //     stage.signals.parametersChanged.add(function (p) {
// //         var focus = Math.max(0, 4 * p.clipNear - 100);
// //         setRange('focus', focus);
// //     });

// //     // hide loading message
// //     setLoading(store.getState(), false);
// // } );



// // // load 2fofc from network
// // function load2fofc(state, view) {
// //     setLoading(state, true);
// //     var map = '2fofc';
// //     var map2fofc = state.edmaps.map2fofc;
// //     loadMap(state, map).then(function (o) {
// //         var params = Object.assign({}, surfParams.surf2fofc, getMapParams(state, map, view));
// //         inspect(params, '2fofc params');
// //         map2fofc.surf2fofc = o.addRepresentation('surface', params);
// //         map2fofc.surf2fofc.signals.parametersChanged.add(function (p) {
// //            checkIsolevel(p.isolevel, map2fofc.surf2fofc, map);
// //         });
// //         setLoading(state, false);
// //         map2fofc.loaded = true;
// //         map2fofc.visible = true;
// //         if (state.edmaps.mapFofc.visible && view != DEFAULT) { setIsolevelScroll(state, 'fofc', false); } // update for other map
// //         updateComponentUi$1(state);
// //     });
// // }

// // // load fofc from network
// // function loadFofc(state, view) {
// //     setLoading(state, true);
// //     var map = 'fofc';
// //     var mapFofc = state.edmaps.mapFofc;
// //     loadMap(state, map).then(function (o) {
// //         var params = getMapParams(state, map, view);
// //         inspect(params, 'fofc params');
// //         var paramsPos = Object.assign({}, surfParams.surfFofc, params );
// //         var paramsNeg = Object.assign({}, surfParams.surfFofcNeg, params );

// //         mapFofc.surfFofc = o.addRepresentation('surface', paramsPos);
// //         mapFofc.surfFofc.signals.parametersChanged.add(function (p) {
// //            checkIsolevel(p.isolevel, mapFofc.surfFofc, map);
// //         });
// //         mapFofc.surfFofcNeg = o.addRepresentation('surface', paramsNeg);
// //         mapFofc.surfFofcNeg.signals.parametersChanged.add(function (p) {
// //            checkIsolevel(p.isolevel, mapFofc.surfFofcNeg, map);
// //         });
// //         setLoading(state, false);
// //         mapFofc.loaded = true;
// //         mapFofc.visible = true;

// //         if (view === DEFAULT) {
// //             set2fofc$1(state, true, view);
// //         } else {
// //             if (state.edmaps.map2fofc.visible) { setIsolevelScroll(state, '2fofc', false); } // update other map
// //             updateComponentUi$1(state);
// //         }
// //     });
// // }

// // // load map from network
// // function loadMap(state, map) {
// //     var pdbid = state.sc.name;
// //     var filename = pdbid + '_' + map + '.dsn6';
// //     var url = edmapUrl + filename.toLowerCase();
// //     return state.stage.loadFile(url)
// // }


// function app(state, action) {
//     if (    action.type === 'SET_FOCUS' ||
//             action.type === 'SET_BOX_SIZE' ||
//             action.type === 'SET_POCKET_NEAR_CLIPPING' ||
//             action.type === 'SET_POCKET_RADIUS_CLIPPING' ||
//             action.type === 'SET_POCKET_OPACITY') {
//         // do not log range input
//     } else {
//         //console.log('reducers: app: action.type=' + action.type)
//     }

//     switch (action.type) {
//         // init
//         case INIT:
//             init$1(state);
//             break

//         // //  structure view
//         // case SET_ASSEMBLY:
//         //     setAssembly$1(state, action.assembly, true, true);
//         //     break
//         // case SET_MODEL:
//         //     setModel$1(state, action.model); // TODO
//         //     break
//         // case SET_SYMMETRY:
//         //     setSymmetry$1(state, action.symmetry);
//         //     break
//         // case SET_STYLE:
//         //     setStyle$1(state, action.style);
//         //     break
//         // case SET_COLOR_SCHEME:
//         //     setColorScheme$1(state, action.colorScheme);
//         //     break
//         // case SET_LIGAND_STYLE:
//         //     setLigandStyle$1(state, action.ligandStyle);
//         //     break
//         // case SET_QUALITY:
//         //     setQuality$1(state, action.quality); // TODO
//         //     break
//         // case SET_CLASH_VISIBILITY:
//         //     setClashVisibility$1(state, action.clashVisibility);
//         //     break
//         // case SET_HYDROGEN_VISIBILITY:
//         //     setHydrogenVisibility$1(state, action.hydrogenVisibility);
//         //     break
//         // case SET_ION_VISIBILITY:
//         //     setIonVisibility$1(state, action.ionVisibility);
//         //     break
//         // case SET_WATER_VISIBILITY:
//         //     setWaterVisibility$1(state, action.waterVisibility);
//         //     break
//         // case SET_DEFAULT_STRUCTURE_VIEW:
//         //     setDefaultStructureView$1(state);
//         //     break

//         // // edmaps
//         // case SET_2FOFC:
//         //     set2fofc$1(state, action.value);
//         //     break
//         // case SET_FOFC:
//         //     setFofc$1(state, action.value);
//         //     break
//         // case SET_SCROLL:
//         //     setScroll$1(state, action.scroll);
//         //     break
//         // case SET_2FOFC_LEVEL:
//         //     set2fofcLevel$1(state, action.level);
//         //     break
//         // case SET_FOFC_LEVEL:
//         //     setFofcLevel$1(state, action.level);
//         //     break
//         // case SET_MAP_STYLE:
//         //     setMapStyle$1(state, action.mapStyle);
//         //     break
//         // case SET_BOX_SIZE:
//         //     setBoxSize$1(state, action.boxSize);
//         //     break
//         // case SET_EDMAPS_LIGAND:
//         //     setEdmapsLigand$1(state, action.value);
//         //     break
//         // case SET_DEFAULT_MAPS_VIEW:
//         //     setDefaultMapsView$1(state);
//         //     break

//         // // ligand viewer
//         // case SET_LIGAND:
//         //     setLigand$1(state, action.value);
//         //     break
//         // case SET_POCKET_NEAR_CLIPPING:
//         //     setPocketNearClipping$1(state, action.value);
//         //     break
//         // case SET_POCKET_RADIUS_CLIPPING:
//         //     setPocketRadiusClipping$1(state, action.value);
//         //     break
//         // case SET_POCKET_OPACITY:
//         //     setPocketOpacity$1(state, action.value);
//         //     break
//         // case SET_LIGAND_LABEL:
//         //     setLigandLabel$1(state, !state.ligandViewer.ligandLabel);
//         //     break
//         // case SET_DEFAULT_LIGAND_VIEW:
//         //     setDefaultLigandView$1(state);
//         //     break
//         // case TOGGLE_POLYMER_DISPLAY:
//         //     togglePolymerDisplay$1(state);
//         //     break
//         // case SET_POCKET_COLOR:
//         //     setPocketColor$1(state, action.value);
//         //     break
//         // case SET_HYDROGEN_BOND:
//         //     setHydrogenBond$1(state.ligandViewer, action.value);
//         //     break
//         // case SET_HALOGEN_BOND:
//         //     setHalogenBond$1(state.ligandViewer, action.value);
//         //     break
//         // case SET_HYDROPHOBIC:
//         //     setHydrophobic$1(state.ligandViewer, action.value);
//         //     break
//         // case SET_PI_INTERACTION:
//         //     setPiInteraction$1(state.ligandViewer, action.value);
//         //     break
//         // case SET_METAL_COORDINATION:
//         //     setMetalCoordination$1(state.ligandViewer, action.value);
//         //     break

//         // // viewer options
//         // case SET_SPIN:
//         //     setSpin$1(state);
//         //     break
//         // case CENTER:
//         //     center$1(state);
//         //     break
//         // case SET_FULLSCREEN:
//         //     setFullscreen$1(state);
//         //     break
//         // case SCREENSHOT:
//         //     screenshot$1(state);
//         //     break
//         // case SET_FOCUS:
//         //     setFocus$1(state, action.value);
//         //     break
//         // case SET_CAMERA_TYPE:
//         //     setCameraType$1(state, action.value);
//         //     break
//         // case SET_BACKGROUND:
//         //     setBackground$1(state, action.value);
//         //     break

//         // default
//         default:
//     }
//     return state
// }
