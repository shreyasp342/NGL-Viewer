(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('preact'), require('redux')) :
	typeof define === 'function' && define.amd ? define(['preact', 'redux'], factory) :
	(factory(global.preact,global.Redux));
}(this, (function (preact,redux) { 'use strict';

// structure view
var INIT = 'INIT';
var SET_ASSEMBLY = 'SET_ASSEMBLY';
var SET_MODEL = 'SET_MODEL';
var SET_SYMMETRY = 'SET_SYMMETRY';
var SET_STYLE = 'SET_STYLE';
var SET_COLOR_SCHEME = 'SET_COLOR_SCHEME';
var SET_LIGAND_STYLE = 'SET_LIGAND_STYLE';
var SET_QUALITY = 'SET_QUALITY';
var SET_WATER_VISIBILITY = 'SET_WATER_VISIBILITY';
var SET_ION_VISIBILITY = 'SET_ION_VISIBILITY';
var SET_HYDROGEN_VISIBILITY = 'SET_HYDROGEN_VISIBILITY';
var SET_CLASH_VISIBILITY = 'SET_CLASH_VISIBILITY';
var SET_FOCUS = 'SET_FOCUS';
var SET_DEFAULT_STRUCTURE_VIEW = 'SET_DEFAULT_STRUCTURE_VIEW';

// ed maps
var SET_2FOFC = 'SET_2FOFC';
var SET_FOFC = 'SET_FOFC';
var SET_SCROLL = 'SET_SCROLL';
var SET_2FOFC_LEVEL = 'SET_2FOFC_LEVEL';
var SET_FOFC_LEVEL = 'SET_FOFC_LEVEL';
var SET_MAP_STYLE = 'SET_MAP_STYLE';
var SET_BOX_SIZE = 'SET_BOX_SIZE';
var SET_EDMAPS_LIGAND = 'SET_EDMAPS_LIGAND';
var SET_DEFAULT_MAPS_VIEW = 'SET_DEFAULT_MAPS_VIEW';

// ligand viewer
var SET_LIGAND = 'SET_LIGAND';
var SET_POCKET_NEAR_CLIPPING = 'SET_POCKET_NEAR_CLIPPING';
var SET_POCKET_RADIUS_CLIPPING = 'SET_POCKET_RADIUS_CLIPPING';
var SET_POCKET_OPACITY = 'SET_POCKET_OPACITY';
var SET_LIGAND_LABEL = 'SET_LIGAND_LABEL';
var SET_DEFAULT_LIGAND_VIEW = 'SET_DEFAULT_LIGAND_VIEW';
var TOGGLE_POLYMER_DISPLAY = 'TOGGLE_POLYMER_DISPLAY';
var SET_POCKET_COLOR = 'SET_POCKET_COLOR';

// checkboxes
var SET_HYDROGEN_BOND = 'SET_HYDROGEN_BOND';
var SET_HALOGEN_BOND = 'SET_HALOGEN_BOND';
var SET_HYDROPHOBIC = 'HYDROPHOBIC';
var SET_PI_INTERACTION = 'SET_PI_INTERACTION';
var SET_METAL_COORDINATION = 'SET_METAL_COORDINATION';

// viewer options
var SET_SPIN = 'SET_SPIN';
var CENTER = 'CENTER';
var SET_FULLSCREEN = 'SET_FULLSCREEN';
var SCREENSHOT = 'SCREENSHOT';
var SET_CAMERA_TYPE = 'SET_CAMERA_TYPE';
var SET_BACKGROUND = 'SET_BACKGROUND';

// urls
var validationUrlPrefix = '//ftp.rcsb.org/pub/pdb/validation_reports/';
var validationUrlSuffix = '_validation.xml.gz';
var edmapUrl = '//edmaps.rcsb.org/maps/';

// default values
var edmapsBoxSize = 20;
var edmapsMapStyle = 'contour';
var autoView = 1; // stage.autoView default param
//export const autoViewAnimate = 400 // stage.autoView default param to render animation

// message strings
var msgLigandViewerBegin = 'To begin select a ligand from the dropdown list.';
var msgLigandViewerPocket = 'The ligand pocket is only visible if the pocket opacity is set to greater than zero.';

var init = function () {
    return { type: INIT }
};

// structure view
var setAssembly = function (assembly) {
    return { type: SET_ASSEMBLY, assembly: assembly }
};
var setModel = function (model) {
    return { type: SET_MODEL, model: model }
};
var setSymmetry = function (symmetry) {
    return { type: SET_SYMMETRY, symmetry: symmetry }
};
var setStyle = function (style) {
    return { type: SET_STYLE, style: style }
};
var setColorScheme = function (colorScheme) {
    return { type: SET_COLOR_SCHEME, colorScheme: colorScheme }
};
var setLigandStyle = function (ligandStyle) {
    return { type: SET_LIGAND_STYLE, ligandStyle: ligandStyle }
};
var setQuality = function (quality) {
    return { type: SET_QUALITY, quality: quality }
};
var setWaterVisibility = function (waterVisibility) {
    return { type: SET_WATER_VISIBILITY, waterVisibility: waterVisibility }
};
var setIonVisibility = function (ionVisibility) {
    return { type: SET_ION_VISIBILITY, ionVisibility: ionVisibility }
};
var setHydrogenVisibility = function (hydrogenVisibility) {
    return { type: SET_HYDROGEN_VISIBILITY, hydrogenVisibility: hydrogenVisibility }
};
var setClashVisibility = function (clashVisibility) {
    return { type: SET_CLASH_VISIBILITY, clashVisibility: clashVisibility }
};
var setFocus = function (value) {
    return { type: SET_FOCUS, value: value }
};
var setDefaultStructureView = function () {
    return { type: SET_DEFAULT_STRUCTURE_VIEW }
};

// edmaps
var set2fofc = function (value) {
    return { type: SET_2FOFC, value: value }
};
var setFofc = function (value) {
    return { type: SET_FOFC, value: value }
};
var setScroll = function (scroll) {
    return { type: SET_SCROLL, scroll: scroll }
};
var set2fofcLevel = function (level) {
    return { type: SET_2FOFC_LEVEL, level: level }
};
var setFofcLevel = function (level) {
    return { type: SET_FOFC_LEVEL, level: level }
};
var setMapStyle = function (mapStyle) {
    return { type: SET_MAP_STYLE, mapStyle: mapStyle }
};
var setBoxSize = function (boxSize) {
    return { type: SET_BOX_SIZE, boxSize: boxSize }
};
var setDefaultMapsView = function () {
    return { type: SET_DEFAULT_MAPS_VIEW }
};
var setEdmapsLigand = function (value) {
    return { type: SET_EDMAPS_LIGAND, value: value }
};

// ligand viewer
var setLigand = function (value) {
    return { type: SET_LIGAND, value: value }
};
var setPocketNearClipping = function (value) {
    return { type: SET_POCKET_NEAR_CLIPPING, value: value }
};
var setPocketRadiusClipping = function (value) {
    return { type: SET_POCKET_RADIUS_CLIPPING, value: value }
};
var setPocketOpacity = function (value) {
    return { type: SET_POCKET_OPACITY, value: value }
};
var setPocketColor = function (value) {
    return { type: SET_POCKET_COLOR, value: value }
};
var setHydrogenBond = function (value) {
    return { type: SET_HYDROGEN_BOND, value: value }
};
var setHalogenBond = function (value) {
    return { type: SET_HALOGEN_BOND, value: value }
};
var setHydrophobic = function (value) {
    return { type: SET_HYDROPHOBIC, value: value }
};
var setPiInteraction = function (value) {
    return { type: SET_PI_INTERACTION, value: value }
};
var setMetalCoordination = function (value) {
    return { type: SET_METAL_COORDINATION, value: value }
};
var setLigandLabel = function () {
    return { type: SET_LIGAND_LABEL }
};
var togglePolymerDisplay = function () {
    return { type: TOGGLE_POLYMER_DISPLAY }
};
var setDefaultLigandView = function () {
    return { type: SET_DEFAULT_LIGAND_VIEW }
};

// viewer options
var setSpin = function () {
    return { type: SET_SPIN }
};
var center = function () {
    return { type: CENTER }
};
var setFullscreen = function () {
    return { type: SET_FULLSCREEN }
};
var screenshot = function () {
    return { type: SCREENSHOT }
};
var setCameraType = function (value) {
    return { type: SET_CAMERA_TYPE, value: value }
};
var setBackground = function (value) {
    return { type: SET_BACKGROUND, value: value }
};

function bionumber2assembly(bionumber) {
    return (!bionumber || bionumber === 'asym' || bionumber === '0' || bionumber === 0) ? '__AU' : 'BU' + bionumber
}

function setAtomCounts(state, model) {
    state.atomCounts = {};

    var structure = state.sc.structure;
    var biomolDict = structure.biomolDict;

    state.atomCounts['__AU'] = (model === "all")
            ? structure.atomStore.count
            : structure.getModelProxy(0).atomCount;
    //console.log('util: setAtomCounts: __AU' + '=' + state.atomCounts['__AU'])
    for (var name in biomolDict) {
        var _assembly = biomolDict[name];
        var count = 0;
        if (_assembly) {
            count = _assembly.getAtomCount(structure);
            if (model !== "all") {
                count /= structure.modelStore.count;
            }
        } else {
            if (model === "all") {
                count = structure.atomStore.count;
            } else {
                count = structure.getModelProxy(0).atomCount;
            }
        }
        //console.log('util: setAtomCounts: ' + name + '=' + count)
        /* TODO
        if (typeof window.orientation !== 'undefined') {
            count *= 4
        }
        let isBackboneOnly = structure.atomStore.count / structure.residueStore.count < 2
        if (isBackboneOnly) {
            count *= 10
        }*/
        state.atomCounts[name] = count;
    }
}

// get colorScale based on colorScheme
function getColorScale(colorScheme) {
    if (colorScheme === 'hydrophobicity') {
        return 'RdYlGn'
    } else if (colorScheme === 'bfactor') {
        return 'OrRd'
    } else {
        return 'RdYlBu'
    }
}

// get colorReverse based on colorScheme
function getColorReverse(colorScheme) {
    return (
        colorScheme === 'residueindex' ||
        colorScheme === 'chainname' ||
        colorScheme === 'hydrophobicity'
    )
}

// get ligand colorScheme
function getLigandColorScheme(state) {
    var colorScheme = state.structureView.colorScheme;
    if (colorScheme === 'bfactor') {
        return 'bfactor'
    } else if (colorScheme === 'densityfit') {
        return state.validationData ? 'densityfit' : 'element'
    } else if (colorScheme === 'geoquality') {
        return state.validationData ? 'geoquality' : 'chainname'
    } else {
        return 'element'
    }
}

// get default style based on atomCount
function getDefaultStyle(state) {
    //console.log('util.getDefaultStyle: state.atomCount=' + state.atomCount)
    return (state.atomCount < 200000) ? 'cartoon' : 'surface'
}

// get default color scheme based on atomCount
function getDefaultColorScheme(state) {
    //console.log('util.getDefaultColorScheme: state.atomCount=' + state.atomCount)
    return (state.atomCount < 200000) ? 'residueindex' : 'chainname'
}


// get sele
function getSele(state, type, repr) {
    var sele = '';

    var model = state.structureView.model;
    var hydrogenVisibility = state.structureView.hydrogenVisibility;
    var ionVisibility = state.structureView.ionVisibility;
    var waterVisibility = state.structureView.waterVisibility;

    if (type === 'polymer') {
        if (repr === 'cartoon' || repr === 'backbone') {
            if (model !== 'all') {
                sele = '/' + model;
            }
        } else if (repr === 'base') {
            sele = 'polymer and nucleic';
            if (model !== 'all') {
                sele += ' and /' + model;
            }
        } else if (repr === 'surface' || repr === 'spacefill' || repr === 'licorice') {
            if (repr === 'surface' && state.atomCount > 1000000) {  // for HIV capsids 3J3Q and 3J3Y
                sele = '.CA';
            } else {
                sele = 'polymer and ( protein or nucleic )';
            }
            if (model !== 'all') {
                sele += ' and /' + model;
            }
            if (hydrogenVisibility === false) {
                sele += ' and not hydrogen';
            }
        } else if (repr === 'line' || repr === 'point') {
            sele = 'all';
            if (model !== 'all') {
                sele += ' and /' + model;
            }
            if (hydrogenVisibility === false) {
                sele += ' and not hydrogen';
            }
            if (ionVisibility === false) {
                sele += ' and not ion';
            }
            if (waterVisibility === false) {
                sele += ' and not water';
            }
        } else if (repr === 'ball+stick') {
            if (state.sc.structure.validation) {
                sele = '( ' + state.sc.structure.validation.clashSele + ' )';
                if (model !== 'all') {
                    sele += ' and /' + model;
                }
                if (hydrogenVisibility === false) {
                    sele += ' and not hydrogen';
                }
            } else {
                sele = 'NONE';
            }
        }
    } else if (type === 'ligand') {
        sele = '( not polymer or not ( protein or nucleic ) )';
        if (model !== 'all') {
            sele += ' and /' + model;
        }
        if (hydrogenVisibility === false) {
            sele += ' and not hydrogen';
        }
        if (ionVisibility === false) {
            sele += ' and not ion';
        }
        if (waterVisibility === false) {
            sele += ' and not water';
        }
    }
    return sele
}

// process process symmetry data from new rest service
/*
    return values:
        type: global, pseudo and local
        for any of them the possible values are:
            Cn (n>0) cyclic
            Dn (n>1) dihedral
            T tetrahedral
            O octahedral
            I icosahedral
            H helical
*/
function processSymmetry(symmetry) {
    var symmetryData = {};
    if (symmetry && symmetry.length > 0) {
        symmetry.forEach( function (item) {
            var assemblyName = (item.biologicalAssemblyId === 0) ? '__AU' : 'BU' + item.biologicalAssemblyId;
            var symmetries = [];
            if (item.localSymmetry) {
                // note: for local symmetries, there may be multiple instances of the same symmetry, so label them 'C3 (local)(1)...(n)'
                var symmetryMap = {};
                item.localSymmetry.forEach( function (obj) {
                    var symmetry = obj.symmetry; // C2, C3 ...
                    if (symmetry !== 'C1') {
                        var o = {
                                label: (symmetry + " (local)"),
                                axes: obj.symmetryAxes
                        };
                        symmetries.push(o);
                        if (!symmetryMap[symmetry]) {
                            symmetryMap[symmetry] = [];
                        }
                        symmetryMap[symmetry].push(o);
                    }
                });
                // append numeric counter to label if there are multiple instances of the same symmetry
                for (var prop in symmetryMap) {
                    var o = symmetryMap[prop];
                    if (o.length > 1) {
                        o.forEach( function (item, i) { item.label += " (" + (i + 1) + ")"; });
                    }
                }
            }
            if (item.globalSymmetry && item.globalSymmetry.symmetry !== 'C1') {
                symmetries.push({
                    label: item.globalSymmetry.symmetry + ' (global)',
                    axes: item.globalSymmetry.symmetryAxes});
            }
            if (item.pseudoSymmetry && item.pseudoSymmetry.symmetry !== 'C1') {
                symmetries.push({
                    label: item.pseudoSymmetry.symmetry + ' (pseudo)',
                    axes: item.pseudoSymmetry.symmetryAxes});
            }
            if (symmetries.length > 0) {
                toJsonStr(symmetries);
                symmetryData[assemblyName] = { symmetries: symmetries };
            }
        });
    }
    //console.log('symmetryData=' +  JSON.stringify(symmetryData, null, 2))
    return symmetryData
}

function getSubdiv(state) {
    var quality = state.structureView.quality;
    var atomCount = state.atomCount;

    if (quality === 'auto') {
        if (atomCount < 15000) {
            return 12
        } else if (atomCount < 70000) {
            return 6
        } else {
            return 3
        }
    } else {
        if (quality === 'high') {
            return 12
        } else if (quality === 'medium') {
            return 6
        } else {
            return 3
        }
    }
}

function getRadialSegments(state, type, repr) {
    var quality = state.structureView.quality;
    var atomCount = state.atomCount;

    if (quality === 'auto') {
        if (atomCount < 15000) {
            return 20
        } else if (atomCount < 70000) {
            return 10
        } else {
            return (type === 'polymer' && repr === 'cartoon') ? 6 : 5
        }
    } else {
        if (quality === 'high') {
            return 20
        } else if (quality === 'medium') {
            return 10
        } else {
            return (type === 'polymer' && repr === 'cartoon') ? 6 : 5
        }
    }
}

function getSphereDetail(state) {
    var quality = state.structureView.quality;
    var atomCount = state.atomCount;

    if (quality === 'auto') {
        return atomCount < 15000 ? 1 : 0
    } else {
        return (quality === 'high' || quality === 'medium') ? 1 : 0
    }
}

function getLineOnly(state) {
    var quality = state.structureView.quality;
    var atomCount = state.atomCount;
    return (quality === 'auto') ? atomCount > 250000 : quality === 'low'
}

function getScaleFactor(state) {
    var quality = state.structureView.quality;
    var atomCount = state.atomCount;

    if (quality === 'low') {
        return 0.1
    } else if (quality === 'medium') {
        return 0.7
    } else if (quality === 'high') {
        return 1.7
    } else {
        return Math.min(1.5, Math.max(0.1, 50000 / atomCount))
    }
}

// set loading message
function setLoading(state, loading) {
    state.loading = loading;
    if (loading) {
        $('#loading').show();
    } else {
        $('#loading').hide();
    }
}

// update button state
function updateButtonState(id, val) {
    var cls = (val) ? 'on' : 'off';
    $('#' + id).attr('class', cls);
}

// update button name (text)
function updateButtonName(id, html) {
    $('#' + id).html(html);
}

function updateLigandPolymerDisplayButton(state) {
    var html = (state.structureView.style === '') ? 'Show Polymer Display' : 'Hide Polymer Display';
    updateButtonName('btnPolymerDisplayName', html);
}

// set a ui select element
function setSelect(name, val) {
    $('#select-' + name).val(val);
}

// set a ui checkbox element
function setCheckbox(name, val) {
    $('#checkbox-' + name).prop('checked', val);
}

// set a ui radio element
function setRadio(name, val) {
    $('#radio-' + name).prop('checked', val);
}

// update range input
function setRange(name, value) {
    $('#range-' + name).val(value);
    setRangeValue(name, value);
}

// set the numeric value display of the named slider
function setRangeValue(name, value) {
    value = (name === '2fofc-level' || name === 'fofc-level') ? parseFloat(value).toFixed(1) : parseInt(value);
    var rangeEl = $('#range-' + name);
    var valueEl = $('#value-' + name);
    valueEl.html(value);
    var max = rangeEl.attr('max');
    var left =  9 + (rangeEl.width() - 18) * value / max - (valueEl.width() / 2);
    valueEl.css({left: left});
}

// toggle range input disabled property
function setRangeDisabled(name, visible) {
    $('#range-' + name).attr('disabled', !visible);
}

// render component
// TODO component.setState() fails to update all ui elements, so use updateComponentUi() methods until this issue is resolved
function updateComponent(state, obj) {
    if (state[obj].component) {
        state[obj].component.setState();
    }
}

// the following functions are for dev only ----------------------------------------------------------------------------

// return obj in json format - for data only - for objects containing functions use inspect or inspectRecursive
function toJsonStr(obj, name) {
    if (!name) { name = 'obj'; }
    console.log('toJsonStr: ' + name + ' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(JSON.stringify(obj, null, 2));
    console.log('toJsonStr: END ' + name + ' ====================================');
}

// inspect any obj for debugging - returns only the top-level props
function inspect(obj, name) {
    if (!name) { name = 'obj'; }
    console.log('inspect: ' + name + ' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    if (Array.isArray(obj)) { // array is obj too so expicitly check for it before checking for object
        obj.forEach(function (item) { return console.log(item); });
    } else if (typeof obj === 'object'){
        for (var prop in obj) {
            console.log(prop + '=' + obj[prop]);
        }
    } else {
        console.log(obj);
    }
    console.log('inspect: END ' + name + ' ======================================');
}

// page header
var Title = (function (Component$$1) {
    function Title () {
        Component$$1.apply(this, arguments);
    }

    if ( Component$$1 ) Title.__proto__ = Component$$1;
    Title.prototype = Object.create( Component$$1 && Component$$1.prototype );
    Title.prototype.constructor = Title;

    Title.prototype.render = function render$$1 () {
        var ref = this.props;
        var title = ref.title;
        return (
            preact.h( 'h4', null, title )
        )
    };

    return Title;
}(preact.Component));

// structure view panel
var StructureView = (function (Component$$1) {
    function StructureView () {
        Component$$1.apply(this, arguments);
    }

    if ( Component$$1 ) StructureView.__proto__ = Component$$1;
    StructureView.prototype = Object.create( Component$$1 && Component$$1.prototype );
    StructureView.prototype.constructor = StructureView;

    StructureView.prototype.render = function render$$1 () {
        var store = this.props.store;
        var s = store.getState();
        s.structureView.component = this;
        return (
            preact.h( 'div', null,
                preact.h( 'div', null, preact.h( 'a', { href: '/pages/help/3dview#structure-view', target: '_blank' }, "Structure View Documentation") ),
                preact.h( 'br', null ),
                preact.h( SelectGroup, { label: 'Assembly', id: 'assembly', tooltip: 'View structure as asymmetric unit, biological assembly, unit cell, or stacked unit cells', options: s.assemblyOptions, selected: s.structureView.assembly, onChange: store.dispatch, action: setAssembly }),
                preact.h( SelectGroup, { label: 'Model', id: 'model', tooltip: 'View specific model for multi-model structure', options: s.modelOptions, selected: s.structureView.model, onChange: store.dispatch, action: setModel }),
                preact.h( SelectGroup, { label: 'Symmetry', id: 'symmetry', tooltip: 'View intrinsic molecular symmetry', options: s.symmetryOptions, selected: s.structureView.symmetry, onChange: store.dispatch, action: setSymmetry }),
                preact.h( SelectGroup, { label: 'Style', id: 'style', tooltip: 'View the structure in different presentation styles', options: s.styleOptions, selected: s.structureView.style, onChange: store.dispatch, action: setStyle }),
                preact.h( SelectGroup, { label: 'Color', id: 'colorScheme', tooltip: 'Color the structure using different schemes', options: s.colorSchemeOptions, selected: s.structureView.colorScheme, onChange: store.dispatch, action: setColorScheme }),
                preact.h( SelectGroup, { label: 'Ligand', id: 'ligandStyle', tooltip: 'Change ligand presentation style', options: s.ligandStyleOptions, selected: s.structureView.ligandStyle, onChange: store.dispatch, action: setLigandStyle }),
                preact.h( SelectGroup, { label: 'Quality', id: 'quality', tooltip: 'Adjust rendering quality', options: s.qualityOptions, selected: s.structureView.quality, onChange: store.dispatch, action: setQuality }),

                preact.h( 'div', { className: 'row horiz-group' },
                    preact.h( 'div', { className: 'col-sm-6 checkbox-label' },
                        preact.h( CheckboxGroup, {
                                label: 'Water', id: 'water', tooltip: 'Show/hide water molecules', checked: s.structureView.waterVisibility ? 'checked' : '', onClick: store.dispatch, action: setWaterVisibility })
                    ),
                    preact.h( 'div', { className: 'col-sm-6 checkbox-label' },
                        preact.h( CheckboxGroup, {
                                label: 'Ions', id: 'ion', tooltip: 'Show/hide ions', checked: s.structureView.ionVisibility ? 'checked' : '', onClick: store.dispatch, action: setIonVisibility })
                    )
                ),
                preact.h( 'div', { className: 'row horiz-group' },
                    preact.h( 'div', { className: 'col-sm-6 checkbox-label' },
                        preact.h( CheckboxGroup, {
                                label: 'Hydrogens', id: 'hydrogen', tooltip: 'Show/hide hydrogen atoms', checked: s.structureView.hydrogenVisibility ? 'checked' : '', onClick: store.dispatch, action: setHydrogenVisibility })
                    ),
                    preact.h( 'div', { className: 'col-sm-6 checkbox-label largeAUHidden' },
                        s.hasValidationReport &&
                            preact.h( CheckboxGroup, {
                                    label: 'Clashes', id: 'clash', tooltip: 'Show/hide clashes between atoms (indicated by pink disks) as given in the Validation Report', checked: s.structureView.clashVisibility ? 'checked' : '', onClick: store.dispatch, action: setClashVisibility })
                    )
                ),
                preact.h( 'div', { className: 'text-right' },
                    preact.h( Button, {
                            name: 'Default Structure View', id: 'btnDefaultStructureView', tooltip: 'Reset to the default structure view', onClick: store.dispatch, action: setDefaultStructureView })
                )
            )
        )
    };

    return StructureView;
}(preact.Component));

// edmap panel
var EDMaps = (function (Component$$1) {
    function EDMaps () {
        Component$$1.apply(this, arguments);
    }

    if ( Component$$1 ) EDMaps.__proto__ = Component$$1;
    EDMaps.prototype = Object.create( Component$$1 && Component$$1.prototype );
    EDMaps.prototype.constructor = EDMaps;

    EDMaps.prototype.render = function render$$1 () {
        var store = this.props.store;
        var s = store.getState();
        var ligandsHidden = (!s.ligandOptions);
        var ligand = (s.ligandOptions) ? s.ligandViewer.ligand : '';
        var isolevelAttrs = { min: 0, max: 10, value: 0, step: 0.1 };
        if (s.edmaps) {
            s.edmaps.component = this;
            return (
                preact.h( 'div', null,
                    preact.h( 'div', null, preact.h( 'a', { href: '/pages/help/3dview#edmaps-view', target: '_blank' }, "Electron Density Maps Documentation") ),
                    preact.h( 'br', null ),
                    preact.h( 'div', { className: 'row edmaps' },
                        preact.h( 'div', { className: 'col-xs-5' }),
                        preact.h( 'div', { className: 'col-xs-3 map-name' }, "2fo-fc"),
                        preact.h( 'div', { className: 'col-xs-3 map-name' }, "fo-fc")
                    ),
                    preact.h( 'div', { className: 'row edmaps' },
                        preact.h( 'div', { className: 'col-xs-5 label-right' },
                            preact.h( TooltipLabel, {
                                    label: 'Map', tooltip: 'Select the map to display, 2fo-fc (blue), fo-fc (positive: green, negative: red)' })
                        ),
                        preact.h( 'div', { className: 'col-xs-3' },
                            preact.h( Checkbox, {
                                    id: '2fofc', onClick: store.dispatch, action: set2fofc })
                        ),
                        preact.h( 'div', { className: 'col-xs-3' },
                            preact.h( Checkbox, {
                                    id: 'fofc', onClick: store.dispatch, action: setFofc })
                        )
                    ),
                    preact.h( 'div', { className: 'row edmaps' },
                        preact.h( 'div', { className: 'col-xs-5 label-right' },
                            preact.h( TooltipLabel, {
                                    label: 'Scroll', tooltip: 'Select the map whose ISO level will be changed via "Ctrl scroll-wheel"' })
                        ),
                        preact.h( 'div', { className: 'col-xs-3' },
                            preact.h( Radio, {  id: 'scroll-2fofc', name: 'scroll', value: '2fofc', onClick: store.dispatch, action: setScroll })
                        ),
                        preact.h( 'div', { className: 'col-xs-3' },
                            preact.h( Radio, {  id: 'scroll-fofc', name: 'scroll', value: 'fofc', onClick: store.dispatch, action: setScroll })
                        )
                    ),
                    preact.h( SliderGroup, {
                            label: '2fo-fc Level', tooltip: 'The ISO level of the 2fo-fc map', id: '2fofc-level', onInput: store.dispatch, action: set2fofcLevel, rangeColWidth: '7', attrs: isolevelAttrs, disabled: true }),
                    preact.h( SliderGroup, {
                            label: 'fo-fc Level', tooltip: 'The ISO level of the fo-fc map', id: 'fofc-level', onInput: store.dispatch, action: setFofcLevel, rangeColWidth: '7', attrs: isolevelAttrs, disabled: true }),
                    preact.h( 'div', { className: 'vspace-20' }),
                    preact.h( SelectGroup, {
                            label: 'Map Style', id: 'mapStyle', tooltip: 'Change the display style of the map', options: s.mapStyleOptions, selected: s.edmaps.mapStyle, onChange: store.dispatch, action: setMapStyle }),
                    preact.h( SliderGroup, {
                            label: 'Map Size', tooltip: 'The Map Size in \u212Bngstr\u00F6ms', id: 'boxSize', onInput: store.dispatch, action: setBoxSize, rangeColWidth: '7' }),
                    preact.h( SelectGroup, {
                            label: 'Ligand', id: 'ligandEdmaps', tooltip: 'Select the ligand to display', options: s.ligandOptions, selected: ligand, hidden: ligandsHidden, onChange: store.dispatch, action: setEdmapsLigand }),

                    preact.h( 'div', { className: 'vspace-20' }),

                    preact.h( ButtonRow, {
                            name: 'Default maps view', id: 'btnDefaultMapsView', tooltip: 'Set the Electron Density Maps to the default view', onClick: store.dispatch, action: setDefaultMapsView })
                )
            )
        } else {
            var html = 'There are no electron density maps for structure ' + s.sc.name.toUpperCase();
            return (
                preact.h( 'div', null,
                    preact.h( 'div', null, preact.h( 'a', { href: '/pages/help/3dview#edmaps-view', target: '_blank' }, "Electron Density Maps Documentation") ),
                    preact.h( 'br', null ),
                    preact.h( 'div', { class: 'message' }, html)
                )
            )
        }
    };

    return EDMaps;
}(preact.Component));// ligand viewer panel
var LigandViewer = (function (Component$$1) {
    function LigandViewer () {
        Component$$1.apply(this, arguments);
    }

    if ( Component$$1 ) LigandViewer.__proto__ = Component$$1;
    LigandViewer.prototype = Object.create( Component$$1 && Component$$1.prototype );
    LigandViewer.prototype.constructor = LigandViewer;

    LigandViewer.prototype.render = function render$$1 () {
        var store = this.props.store;
        var s = store.getState();
        var btnPolymerDisplayName = (s.structureView.style === '') ? 'Show polymer display' : 'Hide polymer display';
        if (s.ligandOptions) {
            s.ligandViewer.component = this;
            var controlsStyle = (s.ligandViewer.ligand === '') ? 'display: none;' : 'display: block;';
            var message = (s.ligandViewer.ligand === '') ?  msgLigandViewerBegin : msgLigandViewerPocket;
            var btnLigandLabelCls = (s.ligandViewer.ligand === '') ? 'off' : 'on';
            return (
                preact.h( 'div', null,
                    preact.h( 'div', null, preact.h( 'a', { href: '/pages/help/3dview#ligand-view', target: '_blank' }, "Ligand View Documentation") ),
                    preact.h( 'br', null ),
                    preact.h( 'div', { id: 'ligandViewerMessage', className: 'message' },
                        message
                    ),
                    preact.h( SelectGroup, {
                            label: 'Ligand', id: 'ligandLigandViewer', tooltip: 'Select the ligand to display', options: s.ligandOptions, selected: s.ligandViewer.ligand, onChange: store.dispatch, action: setLigand }),
                    preact.h( 'div', { id: 'ligandViewerControls', style: controlsStyle },

                        preact.h( 'hr', null ),

                        preact.h( 'div', { className: 'pocketLabel' }, "Pocket"),

                        preact.h( SliderGroup, {
                                label: 'Opacity', tooltip: 'Adjust the opacity of the ligand pocket from 0 - 100 percent', id: 'pocket-opacity', onInput: store.dispatch, action: setPocketOpacity }),
                        preact.h( SliderGroup, {
                                label: 'Near Clipping', tooltip: 'Adjust the clipping of the ligand pocket', id: 'pocket-near-clipping', onInput: store.dispatch, action: setPocketNearClipping }),
                        preact.h( SliderGroup, {
                                label: 'Radius Clipping', tooltip: 'Adjust the radius clipping of the ligand pocket', id: 'pocket-radius-clipping', onInput: store.dispatch, action: setPocketRadiusClipping }),

                        preact.h( 'div', { className: 'vspace-10' }),

                        preact.h( SelectGroup, {
                                label: 'Color', id: 'pocket-color', tooltip: 'Color the pocket surface using different schemes', options: s.pocketColorOptions, selected: s.ligandViewer.pocketColor, onChange: store.dispatch, action: setPocketColor }),

                        preact.h( 'hr', null ),

                        preact.h( CheckboxGroup, {
                                label: 'Hydrogen Bonds (blue)', id: 'hydrogenBond', tooltip: 'Show/hide hydrogen bonds. Donor and acceptor atoms within 3.5 Angstrom.', checked: s.ligandViewer.hydrogenBond ? 'checked' : '', onClick: store.dispatch, action: setHydrogenBond }),
                        preact.h( CheckboxGroup, {
                                label: 'Halogen Bonds (turquoise)', id: 'halogenBond', tooltip: 'Show/hide halogen bonds. Candidate halogens atoms within 4.0 Angstrom of acceptor atoms.', checked: s.ligandViewer.halogenBond ? 'checked' : '', onClick: store.dispatch, action: setHalogenBond }),
                        preact.h( CheckboxGroup, {
                                label: 'Hydrophobic Contacts (grey)', id: 'hydrophobic', tooltip: 'Show/hide hydrophobic interactions. Generally hydrocarbon and fluorine atoms within 4.0 Angstrom.', checked: s.ligandViewer.hydrophobic ? 'checked' : '', onClick: store.dispatch, action: setHydrophobic }),
                        preact.h( CheckboxGroup, {
                                label: 'Pi Interactions (orange, green)', id: 'piInteraction', tooltip: 'Show/hide cation-pi and pi-stacking interactions. Complexes of aromatic rings and positive charges.', checked: s.ligandViewer.piInteraction ? 'checked' : '', onClick: store.dispatch, action: setPiInteraction }),
                        preact.h( CheckboxGroup, {
                                label: 'Metal Interactions (purple)', id: 'metalCoordination', tooltip: 'Show/hide metal interactions. Dative bonds and ionic/ionic-type interactions involving metals.', checked: s.ligandViewer.metalCoordination ? 'checked' : '', onClick: store.dispatch, action: setMetalCoordination }),

                        preact.h( 'div', { className: 'vspace-10' }),

                        preact.h( ButtonRow, {
                                name: 'Label', id: 'btnLigandLabel', cls: btnLigandLabelCls, tooltip: 'Display labels for the ligand', onClick: store.dispatch, action: setLigandLabel }),
                        preact.h( ButtonRow, {
                                name: btnPolymerDisplayName, id: 'btnPolymerDisplay', tooltip: 'Show or hide the current polymer display', onClick: store.dispatch, action: togglePolymerDisplay }),
                        preact.h( ButtonRow, {
                                name: 'Default ligand view', id: 'btnDefaultLigandView', tooltip: 'Set the default ligand view', onClick: store.dispatch, action: setDefaultLigandView })
                    )/* END ligandViewerControls */
                )
            )
        } else {
            var html = 'There are no ligands to view for structure ' + s.sc.name.toUpperCase();
            return (
                preact.h( 'div', { class: 'message' }, html)
            )
        }
    };

    return LigandViewer;
}(preact.Component));

// viewerOptions panel
var ViewerOptions = (function (Component$$1) {
    function ViewerOptions () {
        Component$$1.apply(this, arguments);
    }

    if ( Component$$1 ) ViewerOptions.__proto__ = Component$$1;
    ViewerOptions.prototype = Object.create( Component$$1 && Component$$1.prototype );
    ViewerOptions.prototype.constructor = ViewerOptions;

    ViewerOptions.prototype.render = function render$$1 () {
        var store = this.props.store;
        var s = store.getState();
        s.viewer.component = this;
        return (
            preact.h( 'div', { id: 'viewerControls' },
                preact.h( Button, { name: 'Spin', id: 'btnSpin', tooltip: 'Start/stop spinning the structure along the y-axis', onClick: store.dispatch, action: setSpin }),
                preact.h( Button, { name: 'Center', tooltip: 'Reset molecule position', onClick: store.dispatch, action: center }),
                !s.isSafariMobile &&
                    preact.h( 'span', null,
                        preact.h( Button, { name: 'Fullscreen', id: 'btnFullscreen', tooltip: 'Activate/disable fullscreen mode', onClick: store.dispatch, action: setFullscreen }),
                        preact.h( Button, { name: 'Screenshot', tooltip: 'Download screenshot at twice the displayed resolution', onClick: store.dispatch, action: screenshot })
                    ),
                preact.h( 'div', { className: 'inline' },
                    preact.h( Select, { id: 'cameraType', options: s.cameraTypeOptions, selected: s.viewer.cameraType, onChange: store.dispatch, action: setCameraType })
                ),
                preact.h( 'div', { className: 'inline' },
                    preact.h( Select, { id: 'background', options: s.backgroundOptions, selected: s.viewer.background, onChange: store.dispatch, action: setBackground })
                ),
                preact.h( 'div', { className: 'inline' },
                    preact.h( 'div', { className: 'inline viewer-focus-label' },
                        preact.h( TooltipLabel, {
                                label: 'Focus', tooltip: 'Move far and near clipping planes towards the center' })
                    ),
                    preact.h( 'div', { className: 'inline viewer-focus-slider' },
                        preact.h( Slider, { id: 'focus', onInput: store.dispatch, action: setFocus })
                    )
                )
            )
        )
    };

    return ViewerOptions;
}(preact.Component));

// select group - select with label
var SelectGroup = (function (Component$$1) {
    function SelectGroup () {
        Component$$1.apply(this, arguments);
    }

    if ( Component$$1 ) SelectGroup.__proto__ = Component$$1;
    SelectGroup.prototype = Object.create( Component$$1 && Component$$1.prototype );
    SelectGroup.prototype.constructor = SelectGroup;

    SelectGroup.prototype.render = function render$$1 () {
        var ref = this.props;
        var onChange = ref.onChange;
        var action = ref.action;
        var label = ref.label;
        var id = ref.id;
        var tooltip = ref.tooltip;
        var options = ref.options;
        var selected = ref.selected;
        var hidden = ref.hidden;
        if (hidden) {
            return null
        } else {
            return (
                preact.h( 'div', { className: 'row horiz-group' },
                    preact.h( 'div', { className: 'col-xs-5 label-right' },
                        preact.h( TooltipLabel, {
                                label: label, tooltip: tooltip })
                    ),
                    preact.h( 'div', { className: 'col-xs-7' },
                        preact.h( Select, { onChange: onChange, action: action, id: id, options: options, selected: selected })
                    )
                )
            )
        }
    };

    return SelectGroup;
}(preact.Component));

// select group
var Select = (function (Component$$1) {
    function Select(props) {
        Component$$1.call(this, props);
        this.onChange = props.onChange;
        this.action = props.action;
    }

    if ( Component$$1 ) Select.__proto__ = Component$$1;
    Select.prototype = Object.create( Component$$1 && Component$$1.prototype );
    Select.prototype.constructor = Select;
    Select.prototype.handleChange = function handleChange (e) {
        this.onChange(this.action(e.target.value));
    };
    Select.prototype.render = function render$$1 () {
        var ref = this.props;
        var id = ref.id;
        var options = ref.options;
        var selected = ref.selected;
        var optionsList = getOptionsList(id, options, selected);
        return (
            preact.h( 'select', { onChange: this.handleChange.bind(this), className: 'form-control input-sm', id: 'select-' + id },
                optionsList
            )
        )
    };

    return Select;
}(preact.Component));

// selectGroup option
var Option = (function (Component$$1) {
    function Option () {
        Component$$1.apply(this, arguments);
    }

    if ( Component$$1 ) Option.__proto__ = Component$$1;
    Option.prototype = Object.create( Component$$1 && Component$$1.prototype );
    Option.prototype.constructor = Option;

    Option.prototype.render = function render$$1 () {
        var ref = this.props;
        var option = ref.option;
        var selected = ref.selected;
        var isSelected = (option.value === selected);
        return (preact.h( 'option', { selected: isSelected, value: option.value }, option.label))
    };

    return Option;
}(preact.Component));

// checkbox with label
var CheckboxGroup = (function (Component$$1) {
    function CheckboxGroup () {
        Component$$1.apply(this, arguments);
    }

    if ( Component$$1 ) CheckboxGroup.__proto__ = Component$$1;
    CheckboxGroup.prototype = Object.create( Component$$1 && Component$$1.prototype );
    CheckboxGroup.prototype.constructor = CheckboxGroup;

    CheckboxGroup.prototype.render = function render$$1 () {
        var ref = this.props;
        var onClick = ref.onClick;
        var action = ref.action;
        var label = ref.label;
        var id = ref.id;
        var tooltip = ref.tooltip;
        var checked = ref.checked;
        return (
            preact.h( 'div', null,
                preact.h( Checkbox, {
                        id: id, checked: checked, className: 'checkbox-with-label', onClick: onClick, action: action }),
                preact.h( TooltipLabel, {
                        label: label, tooltip: tooltip })
            )
        )
    };

    return CheckboxGroup;
}(preact.Component));

// checkbox
var Checkbox = (function (Component$$1) {
    function Checkbox(props) {
        Component$$1.call(this, props);
        this.onClick = props.onClick;
        this.action = props.action;
    }

    if ( Component$$1 ) Checkbox.__proto__ = Component$$1;
    Checkbox.prototype = Object.create( Component$$1 && Component$$1.prototype );
    Checkbox.prototype.constructor = Checkbox;
    Checkbox.prototype.handleClick = function handleClick (e) {
        //console.log('Checkbox: e.target.checked=' + e.target.checked)
        this.onClick(this.action(e.target.checked));
    };
    Checkbox.prototype.render = function render$$1 () {
        var ref = this.props;
        var checked = ref.checked;
        var id = ref.id;
        var className = ref.className;
        return (
            preact.h( 'input', { type: 'checkbox', onClick: this.handleClick.bind(this), checked: checked, id: 'checkbox-' + id, className: className })
        )
    };

    return Checkbox;
}(preact.Component));

// radio
var Radio = (function (Component$$1) {
    function Radio(props) {
        Component$$1.call(this, props);
        this.onClick = props.onClick;
        this.action = props.action;
    }

    if ( Component$$1 ) Radio.__proto__ = Component$$1;
    Radio.prototype = Object.create( Component$$1 && Component$$1.prototype );
    Radio.prototype.constructor = Radio;
    Radio.prototype.handleClick = function handleClick (e) {
        //console.log('Radio: e.target.value=' + e.target.value)
        this.onClick(this.action(e.target.value));
    };
    Radio.prototype.render = function render$$1 () {
        var ref = this.props;
        var id = ref.id;
        var name = ref.name;
        var value = ref.value;
        var checked = ref.checked;
        return (
            preact.h( 'input', { type: 'radio', id: 'radio-' + id, name: name, value: value, onClick: this.handleClick.bind(this), checked: checked, className: 'ngl-ui-radio' })
        )
    };

    return Radio;
}(preact.Component));

// slider with label
var SliderGroup = (function (Component$$1) {
    function SliderGroup () {
        Component$$1.apply(this, arguments);
    }

    if ( Component$$1 ) SliderGroup.__proto__ = Component$$1;
    SliderGroup.prototype = Object.create( Component$$1 && Component$$1.prototype );
    SliderGroup.prototype.constructor = SliderGroup;

    SliderGroup.prototype.render = function render$$1 () {
        var ref = this.props;
        var label = ref.label;
        var tooltip = ref.tooltip;
        var onInput = ref.onInput;
        var action = ref.action;
        var id = ref.id;
        var attrs = ref.attrs;
        var disabled = ref.disabled;
        var labelColWidth = 6; // default
        var rangeColWidth = 6; // default
        if (this.props.rangeColWidth) {
            rangeColWidth = this.props.rangeColWidth;
            labelColWidth = 12 - rangeColWidth;
        }
        return (
            preact.h( 'div', { className: 'row horiz-group' },
                preact.h( 'div', { className: 'col-sm-' + labelColWidth + ' label-right' },
                    preact.h( TooltipLabel, {
                            label: label, tooltip: tooltip })
                ),
                preact.h( 'div', { className: 'col-sm-' + rangeColWidth },
                    preact.h( Slider, { onInput: onInput, action: action, id: id, attrs: attrs, disabled: disabled })
                )
            )
        )
    };

    return SliderGroup;
}(preact.Component));

// stand-alone slider without label
var Slider = (function (Component$$1) {
    function Slider(props) {
        Component$$1.call(this, props);
        this.onInput = props.onInput;
        this.action = props.action;
    }

    if ( Component$$1 ) Slider.__proto__ = Component$$1;
    Slider.prototype = Object.create( Component$$1 && Component$$1.prototype );
    Slider.prototype.constructor = Slider;
    Slider.prototype.handleInput = function handleInput (e) {
        this.onInput(this.action(e.target.value));
    };
    Slider.prototype.render = function render$$1 () {
        var ref = this.props;
        var id = ref.id;
        var attrs = ref.attrs;
        var disabled = ref.disabled;
        var min = (attrs && attrs.min) ? attrs.min : 0;
        var max = (attrs && attrs.max) ? attrs.max : 100;
        var value = (attrs && attrs.value) ? attrs.value : 0;
        var step = (attrs && attrs.step) ? attrs.step : 1;
        return (
            preact.h( 'div', { className: 'range-input' },
                preact.h( 'input', { id: 'range-' + id, type: 'range', min: min, max: max, value: value, step: step, onInput: this.handleInput.bind(this), disabled: disabled }),
                preact.h( 'div', { id: 'value-' + id }, value)
            )
        )
    };

    return Slider;
}(preact.Component));

// button placed align-right in a single row
var ButtonRow = (function (Component$$1) {
    function ButtonRow () {
        Component$$1.apply(this, arguments);
    }

    if ( Component$$1 ) ButtonRow.__proto__ = Component$$1;
    ButtonRow.prototype = Object.create( Component$$1 && Component$$1.prototype );
    ButtonRow.prototype.constructor = ButtonRow;

    ButtonRow.prototype.render = function render$$1 () {
        var ref = this.props;
        var onClick = ref.onClick;
        var action = ref.action;
        var name = ref.name;
        var id = ref.id;
        var cls = ref.cls;
        var tooltip = ref.tooltip;
        return (
            preact.h( 'div', { className: 'text-right' },
                preact.h( Button, { name: name, id: id, cls: cls, tooltip: tooltip, onClick: onClick, action: action })
            )
        )
    };

    return ButtonRow;
}(preact.Component));

// button with tooltip
var Button = (function (Component$$1) {
    function Button(props) {
        Component$$1.call(this, props);
        this.onClick = props.onClick;
        this.action = props.action;
    }

    if ( Component$$1 ) Button.__proto__ = Component$$1;
    Button.prototype = Object.create( Component$$1 && Component$$1.prototype );
    Button.prototype.constructor = Button;
    Button.prototype.handleClick = function handleClick (e) {
        this.onClick(this.action());
    };
    Button.prototype.render = function render$$1 () {
        var ref = this.props;
        var name = ref.name;
        var id = ref.id;
        var cls = ref.cls;
        var tooltip = ref.tooltip;
        var className = (cls) ? cls : 'off';
        //console.log(name + ', ' + id + ', ' + tooltip)
        return (
            preact.h( 'button', { id: id, className: className, onClick: this.handleClick.bind(this) },
                preact.h( 'span', { id: id + 'Name' }, name), preact.h( Tooltip, { tooltip: tooltip })
            )
        )
    };

    return Button;
}(preact.Component));

// label with tooltip
var TooltipLabel = (function (Component$$1) {
    function TooltipLabel () {
        Component$$1.apply(this, arguments);
    }

    if ( Component$$1 ) TooltipLabel.__proto__ = Component$$1;
    TooltipLabel.prototype = Object.create( Component$$1 && Component$$1.prototype );
    TooltipLabel.prototype.constructor = TooltipLabel;

    TooltipLabel.prototype.render = function render$$1 () {
        var ref = this.props;
        var label = ref.label;
        var tooltip = ref.tooltip;
        return (
            preact.h( 'span', null,
                label, preact.h( Tooltip, { tooltip: tooltip })
            )
        )
    };

    return TooltipLabel;
}(preact.Component));

// tooltip
var Tooltip = (function (Component$$1) {
    function Tooltip () {
        Component$$1.apply(this, arguments);
    }

    if ( Component$$1 ) Tooltip.__proto__ = Component$$1;
    Tooltip.prototype = Object.create( Component$$1 && Component$$1.prototype );
    Tooltip.prototype.constructor = Tooltip;

    Tooltip.prototype.render = function render$$1 () {
        var ref = this.props;
        var tooltip = ref.tooltip;
        return (
            preact.h( 'span', { className: 'fa fa-question-circle ngl-ui-help', 'data-toggle': 'tooltip', 'data-placement': 'top', title: tooltip })
        )
    };

    return Tooltip;
}(preact.Component));

function getOptionsList(id, options, selected) {
    var list = [];
    options.forEach(function (option) {
        list.push(preact.h( Option, { option: option, selected: selected }));
    });
    return list
}

// init repr if it does not exist - type is one of unitcell|polymer|ligand|validation
function initStructureViewRepr(state, type, repr) {
    var reprs = state.structureView.reprs; // obj containing all structureView representations
    var sc = state.sc; // structureComponent
    var sv = state.structureView;

    //console.log('representations: initStructureViewRepr: type=' + type + ', repr=' + repr)

    if (type === 'unitcell') {
        if (reprs[type]) {
            //console.log('representations: WARN: reprs.' + type + ' EXISTS')
        } else {
            reprs.unitcell = sc.addRepresentation( 'unitcell', {
                disableImpostor: true,
                radiusSegments: 16
            } );
        }
    } else {
        if (reprs[type][repr]) {
            //console.log('representations: WARN: reprs.' + type + '.' + repr + ' EXISTS')
        } else {
            if (type === 'polymer') {
                var colorScheme = sv.colorScheme;
                var colorScale = getColorScale(sv.colorScheme);
                var colorReverse = getColorReverse(sv.colorScheme);
                if (!repr) {
                    repr = sv.style; // repr not specified so use state value
                }
                if (repr === 'cartoon') {
                    reprs.polymer.cartoon = sc.addRepresentation( 'cartoon', {
                        assembly: sv.assembly,
                        colorScheme: colorScheme,
                        colorReverse: colorReverse,
                        colorScale: colorScale,
                        aspectRatio: 5,
                        scale: 0.7,
                        quality: sv.quality,
                        subdiv: getSubdiv(state),
                        radialSegments: getRadialSegments(state, 'polymer', 'cartoon'),
                        sele: getSele(state, 'polymer', 'cartoon')
                    } );
                    reprs.polymer.base = sc.addRepresentation( 'base', {
                        colorScheme: colorScheme,
                        colorScale: colorScale,
                        colorReverse: colorReverse,
                        quality: sv.quality,
                        sphereDetail: getSphereDetail(state),
                        radialSegments: getRadialSegments(state, 'polymer', 'base'),
                        sele: getSele(state, 'polymer', 'base')
                    } );
                } else if (repr === 'backbone') {
                    reprs.polymer.backbone = sc.addRepresentation( 'backbone', {
                        assembly: sv.assembly,
                        colorScheme: colorScheme,
                        colorReverse: colorReverse,
                        colorScale: colorScale,
                        lineOnly: getLineOnly(state),
                        scale: 2.0,
                        sele: getSele(state, 'polymer', 'backbone')
                    } );
                } else if (repr === 'surface') {
                    reprs.polymer.surface = sc.addRepresentation( 'surface', {
                        assembly: sv.assembly,
                        colorScheme: colorScheme,
                        colorReverse: colorReverse,
                        colorScale: colorScale,
                        //quality: sv.quality,
                        surfaceType: 'sas',
                        probeRadius: 1.4,
                        useWorker: true,
                        scaleFactor: getScaleFactor(state),
                        sele: getSele(state, 'polymer', 'surface')
                    } );
                } else if (repr === 'spacefill') {
                    reprs.polymer.spacefill = sc.addRepresentation( 'spacefill', {
                        assembly: sv.assembly,
                        colorScheme: colorScheme,
                        colorReverse: colorReverse,
                        colorScale: colorScale,
                        quality: sv.quality,
                        sphereDetail: getSphereDetail(state),
                        sele: getSele(state, 'polymer', 'spacefill')
                    } );
                } else if (repr === 'licorice') {
                    reprs.polymer.licorice = sc.addRepresentation( 'licorice', {
                        assembly: sv.assembly,
                        multipleBond: 'symmetric',
                        colorScheme: colorScheme,
                        colorReverse: colorReverse,
                        colorScale: colorScale,
                        quality: sv.quality,
                        sphereDetail: getSphereDetail(state),
                        radialSegments: getRadialSegments(state, 'polymer', 'licorice'),
                        sele: getSele(state, 'polymer', 'licorice')
                    } );
                } else if (repr === 'ball+stick') {
                    reprs.polymer['ball+stick'] = sc.addRepresentation( 'ball+stick', {
                        assembly: sv.assembly,
                        multipleBond: 'symmetric',
                        colorScheme: colorScheme,
                        colorReverse: colorReverse,
                        colorScale: colorScale,
                        quality: sv.quality,
                        sphereDetail: getSphereDetail(state),
                        radialSegments: getRadialSegments(state, 'polymer', 'ball+stick'),
                        sele: getSele(state, 'polymer', 'ball+stick')
                    } );
                } else if (repr === 'line') {
                    reprs.polymer['line'] = sc.addRepresentation('line', {
                        assembly: sv.assembly,
                        multipleBond: 'offset',
                        colorScheme: colorScheme,
                        colorReverse: colorReverse,
                        colorScale: colorScale,
                        linewidth: 5,
                        sele: getSele(state, 'polymer', 'line')
                    });
                    reprs.polymer['point'] = sc.addRepresentation('point', {
                        assembly: sv.assembly,
                        colorScheme: colorScheme,
                        colorReverse: colorReverse,
                        colorScale: colorScale,
                        sizeAttenuation: false,
                        pointSize: 5,
                        alphaTest: 1,
                        useTexture: true,
                        sele: getSele(state, 'polymer', 'point')
                    });
                } else {
                    //console.log('representations: UNKNOWN REPR: type=' + type + ', repr=' + repr)
                }
            } else if (type === 'ligand') {
                if (!repr) {
                    repr = sv.ligandStyle; // repr not specified so use state value
                }
                if (repr === 'spacefill') {
                    reprs.ligand.spacefill = sc.addRepresentation( 'spacefill', {
                        assembly: sv.assembly,
                        colorScheme: getLigandColorScheme(state),
                        quality: sv.quality,
                        sele: getSele(state, 'ligand', null)
                    } );

                } else if (repr === 'ball+stick') {
                    reprs.ligand['ball+stick'] = sc.addRepresentation( 'ball+stick', {
                        assembly: sv.assembly,
                        multipleBond: 'symmetric',
                        colorScheme: getLigandColorScheme(state),
                        quality: sv.quality,
                        scale: 2.5,
                        aspectRatio: 1.2,
                        radiusSize: 0.4,
                        sele: getSele(state, 'ligand', null)
                    } );
                } else {
                    //console.log('representations: UNKNOWN REPR: type=' + type + ', repr=' + repr)
                }
            } else if (type === 'validation') {
                var validationColor = 'geoquality'; // geoquality|densityfit
                var sele = sc.structure.validation.clashSele;
                if (sv.model !== 'all') {
                    sele = '(' + sele + ') and /' + sv.model;
                }
                //console.log('sele=' + sele)
                reprs.validation.validation = sc.addRepresentation( 'validation', { sele: sele } );
                reprs.validation.ballandstick = sc.addRepresentation( 'ball+stick', {
                    sele: sele,
                    color: validationColor
                } );
            } else {
                //console.log('representations: UNKNOWN REPR: type=' + type + ', repr=' + repr)
            }
        }
    }
}

function initLigandViewerReprs(state) {
    var reprs = {};
    var sc = state.sc;
    reprs.neighborRepr = sc.addRepresentation('ball+stick', {
        sele: 'none',
        aspectRatio: 1.1,
        colorValue: 'white',
        multipleBond: 'symmetric'
    });
    reprs.ligandRepr = sc.addRepresentation('ball+stick', {
        multipleBond: 'symmetric',
        colorValue: 'grey',
        sele: 'none',
        aspectRatio: 1.2,
        scale: 2.5
    });
    reprs.contactRepr = sc.addRepresentation('contact', {
        sele: 'none',
        radius: 0.07,
        weakHydrogenBond: false,
        ionicInteraction: false,
        refineSaltBridges: false
    });
    reprs.pocketRepr = sc.addRepresentation('surface', {
        sele: 'none',
        lazy: true,
        clipNear: 0,
        opaqueBack: false,
        opacity: 0.0,
        color: 'hydrophobicity',
        roughness: 1.0,
        surfaceType: 'av'
    });
    reprs.labelRepr = sc.addRepresentation('label', {
        sele: 'none',
        color: '#333333',
        yOffset: 0.2,
        zOffset: 2.0,
        attachment: 'bottom-center',
        showBackground: true,
        backgroundColor: 'white',
        backgroundOpacity: 0.5,
        disablePicking: true,
        radiusType: 'size',
        radiusSize: 1.0,
        labelType: 'residue',
        labelGrouping: 'residue'
    });
    state.ligandViewer.reprs = reprs;
}

// update polymer and ligand repr params if assembly has changed
function updateReprsForAssembly(state) {
    var assembly = state.structureView.assembly;

    var polymer = state.structureView.reprs.polymer;
    var ligand = state.structureView.reprs.ligand;

    // atomCount changed so recalculate these params:
    var scaleFactor = getScaleFactor(state);
    var sphereDetail = getSphereDetail(state);
    var subdiv = getSubdiv(state);

    for(var repr in polymer) {
        //util.toJsonStr(polymer[repr].getParameters(), repr)
        var o = polymer[repr];
        var p = o.getParameters();
        if (p.assembly)
            { o.setParameters({ assembly: assembly }); }
        if (p.scaleFactor)
            { o.setParameters({ scaleFactor: scaleFactor }); }
        if (p.sphereDetail)
            { o.setParameters({ sphereDetail: sphereDetail }); }
        if (p.subdiv)
            { o.setParameters({ subdiv: subdiv }); }
        if (p.radialSegments)
            { o.setParameters({ radialSegments: getRadialSegments(state, 'polymer', repr) }); }
        if (repr === 'backbone')
            { o.setParameters({ lineOnly: getLineOnly(state) }); } // backbone only
    }

    // update ligand reprs
    for(var repr$1 in ligand) {
        ligand[repr$1].setParameters( { assembly: assembly } );
    }
}

// update polymer and ligand repr params if quality has changed
function updateReprsForQuality(state) {
    var quality = state.structureView.quality;

    var polymer = state.structureView.reprs.polymer;

    // quality changed so recalculate these params:
    var scaleFactor = getScaleFactor(state);
    var sphereDetail = getSphereDetail(state);
    var subdiv = getSubdiv(state);

    for(var repr in polymer) {
        //util.toJsonStr(polymer[repr].getParameters(), repr)
        var o = polymer[repr];
        var p = o.getParameters();
        if (p.quality)
            { o.setParameters({ quality: quality }); }
        if (p.scaleFactor)
            { o.setParameters({ scaleFactor: scaleFactor }); }
        if (p.sphereDetail)
            { o.setParameters({ sphereDetail: sphereDetail }); }
        if (p.subdiv)
            { o.setParameters({ subdiv: subdiv }); }
        if (p.radialSegments)
            { o.setParameters({ radialSegments: getRadialSegments(state, 'polymer', repr) }); }
        if (repr === 'backbone')
            { o.setParameters({ lineOnly: getLineOnly(state) }); } // backbone only
    }
}

// update sele in polymer and ligand reprs (for water|ions|hydrogen visibility)
function updatePolymerAndLigandSele(state) {
    var reprs = state.structureView.reprs;
    for(var type in reprs) {
        if (type === 'polymer' || type === 'ligand') {
            for(var repr in reprs[type]) {
                //console.log('representations: updatePolymerAndLigandSele: ' + type  + ' ' + repr)
                reprs[type][repr].setSelection(getSele(state, type, repr));
            }
        }
    }
}

// update sele for validation reprs
function updateValidationSele(state) {
    if (state.sc.structure.validation) {
        var sele = state.sc.structure.validation.clashSele;
        var model = state.structureView.model;
        if (model !== 'all') {
            sele = '(' + sele + ') and /' + model;
        }
        state.structureView.reprs.validation.validation.setSelection(sele);
        state.structureView.reprs.validation.ballandstick.setSelection(sele);
    }
}

// remove a repr if it exists
function removeRepr(state, type, repr) {
    var reprs = state.structureView.reprs;
    if (type === 'unitcell') {
        if (reprs.unitcell) {
            state.sc.removeRepresentation(reprs.unitcell);
            reprs.unitcell = null;
        }
    } else {
        if (reprs[type][repr]) {
            state.sc.removeRepresentation(reprs[type][repr]);
            delete reprs[type][repr];
        }
    }
}

// set ui dropdown options

// set all options
function setSelectOptions(state) {
    // display
    setAssemblyOptions(state);
    setModelOptions(state);
    setSymmetryOptions(state);
    setStyleOptions(state);
    setColorSchemeOptions(state);
    setLigandStyleOptions(state);
    setQualityOptions(state);

    // edmaps
    setMapStyleOptions(state);

    // ligand
    setLigandOptions (state);
    setPocketColorOptions (state);

    // viewer
    setCameraTypeOptions(state);
    setBackgroundOptions(state);
}

function setAssemblyOptions(state) {
    var options = [];
    var structure = state.sc.structure;
    var biomolDict = structure.biomolDict;
    if (!structure.unitcell && Object.keys(biomolDict).length === 1 && biomolDict['BU1'] && biomolDict['BU1'].isIdentity(structure)) {
        addOption(options, 'BU1', 'Full Structure');
    } else {
        var label = (structure.unitcell) ? 'Asymmetric Unit' : 'Full Structure';
        addOption(options, '__AU', label);
        for (var name in biomolDict) {
            if (name === 'UNITCELL') {
                addOption(options, name, 'Unitcell');
            } else if (name === 'SUPERCELL') {
                addOption(options, name, 'Supercell');
            } else if (name.substr(0, 2) === 'BU') {
                label = 'Bioassembly ' + name.substr(2);
                addOption(options, name, label);
            } else {
                addOption(options, name, name);
            }
        }
    }

    state.assemblyOptions = options;
}

function setModelOptions(state) {
    var options = [];
    var modelStore = state.sc.structure.modelStore;
    if (modelStore.count > 1) {
        addOption(options, 'all', 'All Models');
    }
    for (var i = 0; i < modelStore.count; ++i) {
        addOption(options, i, 'Model ' + (i + 1));
    }

    state.modelOptions = options;
}

function setSymmetryOptions(state) {
    var options = [];
    addOption(options, '-1', 'None');

    var assembly = state.structureView.assembly;
    if (state.symmetryData[assembly]) {
        var symmetries = state.symmetryData[assembly].symmetries;
        symmetries.forEach(function (symmetry, i) {
            addOption(options, i, symmetry.label);
        } );
    }

    state.symmetryOptions = options;
}


function setStyleOptions(state) {
    var options = [];
    addOption(options, '', 'None');
    addOption(options, 'backbone', 'Backbone');
    addOption(options, 'surface', 'Surface');
    addOption(options, 'cartoon', 'Cartoon');
    addOption(options, 'spacefill', 'Spacefill/CPK');
    addOption(options, 'licorice', 'Licorice');
    addOption(options, 'line', 'Line');

    /* TODO implement refined logic
    if (state.recommended) {
        if (state.atomCount < 100000) {
            addOption(options, 'cartoon', 'Cartoon')
        }
        if (state.atomCount < 80000) {
            addOption(options, 'spacefill', 'Spacefill/CPK')
        }
        if (state.atomCount < 80000) {
            addOption(options, 'licorice', 'Licorice')
        }
    } else {
        addOption(options, 'cartoon', 'Cartoon')
        if (!state.isBackboneOnly) {
            addOption(options, 'spacefill', 'Spacefill/CPK')
            addOption(options, 'licorice', 'Licorice')
        }
    }
    */
    state.styleOptions = options;
}

function setColorSchemeOptions(state) {
    var options = [];
    var bfactor = true;
    var densityfit = true;
    var geoquality = true;
    var methods = state.sc.structure.header.experimentalMethods;
    inspect(methods, 'methods');
    if (methods) {
        if (!methods.includes('X-RAY DIFFRACTION') &&
            !methods.includes('ELECTRON CRYSTALLOGRAPHY') &&
            !methods.includes('NEUTRON DIFFRACTION')
        ) {
            bfactor = false;
            densityfit = false;
        }
    }
    if (!state.hasValidationReport) {
        densityfit = false;
        geoquality = false;
    }
    if (!state.hasEdMaps) {
        densityfit = false;
    }
    console.log('geoquality=' + geoquality);
    console.log('densityfit=' + densityfit);

    addOption(options, 'chainname', 'By Chain');
    addOption(options, 'residueindex', 'Rainbow');
    addOption(options, 'element', 'By Element/CPK');
    addOption(options, 'resname', 'By Residue');
    if (bfactor) {
        addOption(options, 'bfactor', 'By B-factor');
    }
    addOption(options, 'sstruc', 'By Secondary Structure');
    addOption(options, 'hydrophobicity', 'By Hydrophobicity');
    if (densityfit) {
        addOption(options, 'densityfit', 'By Density Fit');
    }
    if (geoquality) {
        addOption(options, 'geoquality', 'By Geometry Quality');
    }

    state.colorSchemeOptions = options;
}

function setLigandStyleOptions(state) {
    var options = [];
    addOption(options, '', 'None');
    addOption(options, 'ball+stick', 'Ball & Stick');
    addOption(options, 'spacefill', 'Spacefill/CPK');

    state.ligandStyleOptions = options;
}

function setQualityOptions(state) {
    var options = [];
    addOption(options, 'auto', 'Automatic');
    addOption(options, 'low', 'Low');
    addOption(options, 'medium', 'Medium');
    addOption(options, 'high', 'High');

    state.qualityOptions = options;
}

// edmaps
function setMapStyleOptions(state) {
    var options = [];
    addOption(options, 'contour', 'Mesh');
    addOption(options, 'smooth', 'Smooth');
    addOption(options, 'flat', 'Flat');

    state.mapStyleOptions = options;
}

// edmaps and ligand viewer
function setLigandOptions(state) {
    var ligandSele = '( not polymer or not ( protein or nucleic ) ) and not ( water or ACE or NH2 ) and /0';
    var ligands = [];
    state.sc.structure.eachResidue(function (rp) {
        if (rp.isWater()) { return }
        var sele = '';
        if (rp.resno !== undefined) { sele += rp.resno; }
        if (rp.inscode) { sele += '^' + rp.inscode; }
        if (rp.chain) { sele += ':' + rp.chainname; }
        var name = (rp.resname ? '[' + rp.resname + ']' : '') + sele;
        ligands.push([sele, name]);
    }, new NGL.Selection(ligandSele));

    if (ligands.length > 0) {
        var options = [];
        addOption(options, '', 'None');
        ligands.forEach(function (d) {
            //console.log('select-options: setLigandOptions: ' + d[0] + ' ' + d[1])
            addOption(options, d[0], d[1]);
        });
        state.ligandOptions = options;
    }
}

function setPocketColorOptions (state) {
    var options = [];
    addOption(options, 'hydrophobicity', 'By Hydrophobicity');
    addOption(options, 'element', 'By Element/CPK');
    addOption(options, 'bfactor', 'By B-factor');

    state.pocketColorOptions = options;
}

// viewer options
function setCameraTypeOptions(state) {
    var options = [];
    addOption(options, 'perspective', 'Perspective Camera');
    addOption(options, 'orthographic', 'Orthographic Camera');

    state.cameraTypeOptions = options;
}

function setBackgroundOptions(state) {
    var options = [];
    addOption(options, 'white', 'White background');
    addOption(options, 'black', 'Black background');

    state.backgroundOptions = options;
}

// set option
function addOption(options, value, label) {
    options.push({value: value, label: label});
}

// optionValue - the value to pass to the callback function
function load(state, optionValue, callback) {
    var pdbid = state.sc.name.toLowerCase();
    var dir = pdbid.substring(1, 3);
    var validationUrl = validationUrlPrefix + dir + '/' + pdbid + '/' + pdbid + validationUrlSuffix;
    //console.log('validationUrl=' + validationUrl)

    NGL.autoLoad(validationUrl, { ext: 'validation' }).then( function(validation) {
        state.sc.structure.validation = validation;
        callback(state, optionValue, true);
    } ).catch(function(e) {
        console.log('error=' + e);
        callback(state, optionValue, false, e);
    } );
}

function setSpin$1(state) {
    state.structureView.spin = !state.structureView.spin;
    if (state.structureView.spin) {
        state.stage.setSpin([0, 1, 0], 0.005);
    } else {
        state.stage.setSpin(null, null);
    }
    updateButtonState('btnSpin', state.structureView.spin);
}

function center$1(state) {
    state.stage.autoView(autoView);
}

function setFullscreen$1(state) {
    state.stage.toggleFullscreen(document.getElementById('ngl-ui'));
    state.viewer.fullscreen = ($('#ngl-ui').width() === window.screen.width);
    updateButtonState('btnFullscreen', state.viewer.fullscreen);
}

function screenshot$1(state) {
    state.stage.makeImage({
        factor: 2,
        antialias: true,
        trim: false,
        transparent: false
    }).then(function(blob) {
        NGL.download(blob, (pdbid + "_screenshot.png"));
    });
}

function setFocus$1(state, focus) {
    focus = parseInt(focus);
    var f = 50 + focus * 0.5;
    state.stage.setFocus(f);
    setRangeValue('focus', focus);
}

function resetFocus(state) {
    state.stage.setFocus(0);
    setRange('focus', 0);
}

function clear$2(state) {
    center$1(state);
    resetFocus(state);
}

function setCameraType$1(state, value) {
    state.viewer.cameraType = value;
    state.stage.setParameters({ cameraType: value });
}

function setBackground$1(state, value) {
    console.log('reducers-viewer: setBackground: ' + value);
    state.viewer.background = value;
    state.stage.setParameters({ backgroundColor: value });
}

function setLigand$1(state, ligand) {
    //console.log('reducers-ligand: setLigand: ligand=' + value)

    var lv = state.ligandViewer;
    if (!lv.reprs) {
        initLigandViewerReprs(state);
    }
    lv.ligand = ligand;
    lv.ligandLabel = (ligand === '') ? false : true;

    var sc = state.sc;
    var reprs = lv.reprs;

    if (ligand === '') {
        for (var repr in reprs) {
            //console.log('reducers-ligand: setLigand: repr=' + repr)
            reprs[repr].setVisibility(false);
        }
        $('#ligandViewerControls').hide();
        setLigandViewerMessage(msgLigandViewerBegin);
        state.stage.tasks.onZeroOnce(function () { return state.stage.autoView(autoView); });
    } else {
        // update structure view
        setAssembly$1(state, '__AU', false, false);
        setStyle$1(state, '');
        setLigandStyle$1(state, '');
        updateComponentUi$$1(state);

        var modelSele = ' and /' + state.structureView.model;

        var structure = sc.structure;

        var withinSele = structure.getAtomSetWithinSelection(new NGL.Selection(ligand), 5);
        var withinGroup = structure.getAtomSetWithinGroup(withinSele);
        var expandedSele = withinGroup.toSeleString();
        var neighborSele = '(' + expandedSele + ') and not (' + ligand + ')';

        lv.expandedSele = expandedSele; // store in ligand obj
        lv.neighborSele = neighborSele; // store in ligand obj

        var pocketRadiusClipFactor = 1;

        var sview = structure.getView(new NGL.Selection(ligand));
        var pocketRadius = Math.max(sview.boundingBox.getSize().length() / 2, 2) + 5;
        lv.pocketRadius = pocketRadius; // store in ligand obj

        var withinSele2 = structure.getAtomSetWithinSelection(new NGL.Selection(ligand), pocketRadius + 2);
        var neighborSele2 = '(' + withinSele2.toSeleString() + ') and not (' + ligand + ') and polymer';

        reprs.ligandRepr.setVisibility(true);
        reprs.neighborRepr.setVisibility(true);
        reprs.contactRepr.setVisibility(true);
        reprs.pocketRepr.setVisibility(true);
        reprs.labelRepr.setVisibility(true);

        reprs.ligandRepr.setSelection(ligand + modelSele);

        reprs.neighborRepr.setSelection(neighborSele + modelSele);
        reprs.contactRepr.setSelection(expandedSele + modelSele);
        reprs.pocketRepr.setSelection(neighborSele2 + modelSele);

        reprs.contactRepr.setParameters({
            hydrogenBond: lv.hydrogenBond,
            halogenBond: lv.halogenBond,
            hydrophobic: lv.hydrophobic,
            piInteraction: lv.piInteraction,
            metalCoordination: lv.metalCoordination
        });
        reprs.pocketRepr.setParameters({
            clipRadius: pocketRadius * pocketRadiusClipFactor,
            clipCenter: sview.center
        });
        reprs.labelRepr.setSelection('((' + neighborSele + ') or (' + ligand + '))' + modelSele);

        state.stage.tasks.onZeroOnce(function () { return sc.autoView(expandedSele, autoView); });

        setRange('pocket-radius-clipping', 100);
        $('#ligandViewerControls').show();
        setLigandViewerMessage(msgLigandViewerPocket);
    }
    updateButtonState('btnLigandLabel', state.ligandViewer.ligandLabel);

    if (state.edmaps && state.edmaps.ligand !== ligand) {
        // update edmaps
        state.edmaps.ligand = ligand;
        updateComponentUi$1(state);
    }
}

// pocket functions
function setPocketOpacity$1(state, value) {
    value = parseInt(value);
    //console.log('reducers-ligand: setPocketOpacity: value=' + value)
    state.ligandViewer.pocketOpacity = value;
    state.ligandViewer.reprs.pocketRepr.setParameters({ opacity: value / 100 });
    setRangeValue('pocket-opacity', value);
}
function setPocketNearClipping$1(state, value) {
    //console.log('reducers-ligand: setPocketNearClipping: value=' + value)
    state.ligandViewer.pocketNearClipping = value;
    state.ligandViewer.reprs.pocketRepr.setParameters({ clipNear: value });
    setRangeValue('pocket-near-clipping', value);
}
function setPocketRadiusClipping$1(state, value) {
    value = parseInt(value);
    if (value === 0) {
        value = 0.1; // workaround
    }
    state.ligandViewer.pocketRadiusClipping = value;
    var pocketRadius = state.ligandViewer.pocketRadius;
    var pocketRadiusClipFactor = parseFloat(value) / 100;
    var clipRadius = pocketRadius * pocketRadiusClipFactor;
    state.ligandViewer.reprs.pocketRepr.setParameters({ clipRadius: clipRadius });
    setRangeValue('pocket-radius-clipping', value);
}
function setPocketColor$1(state, value) {
    console.log('reducers-ligand: setPocketColor: value=' + value);
    state.ligandViewer.pocketColor = value;
    state.ligandViewer.reprs.pocketRepr.setParameters({color: value});
}
// END pocket functions

// checkboxes
function setHydrogenBond$1(lv, val){
    lv.hydrogenBond = val;
    lv.reprs.contactRepr.setParameters({
        hydrogenBond: val,
        waterHydrogenBond: val,
        backboneHydrogenBond: val
    });
}
function setHalogenBond$1(lv, val) {
    lv.halogenBond = val;
    lv.reprs.contactRepr.setParameters({ halogenBond: val });
}
function setHydrophobic$1(lv, val) {
    lv.hydrophobic = val;
    lv.reprs.contactRepr.setParameters({ hydrophobic: val });
}
function setPiInteraction$1(lv, val) {
    lv.piInteraction = val;
    lv.reprs.contactRepr.setParameters({
        cationPi: val,
        piStacking: val
    });
}
function setMetalCoordination$1(lv, val) {
    lv.metalCoordination = val;
    lv.reprs.contactRepr.setParameters({ metalCoordination: val });
}
// END checkboxes

function setLigandLabel$1(state, val) {
    console.log('reducers-ligand: setLigandLabel');
    state.ligandViewer.ligandLabel = val;
    state.ligandViewer.reprs.labelRepr.setVisibility(state.ligandViewer.ligandLabel);
    updateComponentUi$2(state);
}

function togglePolymerDisplay$1(state) {
    console.log('reducers-ligand: togglePolymerDisplay');
    var style = '';
    var ligandStyle = '';
    console.log('reducers-ligand: togglePolymerDisplay: state.structureView.style=' + state.structureView.style);
    if (state.structureView.style === '') { // polymer is hidden
        style = 'backbone';
        ligandStyle = 'ball+stick';
    }
    // update structureView
    setStyle$1(state, style);
    setLigandStyle$1(state, ligandStyle);
    updateComponentUi$$1(state);

    updateLigandPolymerDisplayButton(state);
}

function setDefaultLigandView$1(state) {
    //console.log('reducers-ligand: setDefaultLigandView')

    // update structureView
    setAssembly$1(state, '__AU', false, false);
    setStyle$1(state, '');
    setLigandStyle$1(state, '');
    updateComponentUi$$1(state);

    // update edmaps
    clear$$1(state);

    resetFocus(state);

    // update ligand viewer
    setDefaults(state);
    updateComponentUi$2(state);

    state.stage.tasks.onZeroOnce(function () { return state.sc.autoView(state.ligandViewer.expandedSele, autoView); });
}

function clear$1(state) {
    //console.log('reducers-ligand-viewer: clear')
    if (state.ligandViewer) {
        setLigand$1(state, '');
        setDefaults(state);
        setLigandLabel$1(state, false); // default is true, set to false
        updateComponentUi$2(state);
    }
}

// TODO react util.updatecomponent() fails to update all ui elements, so use this method until this issue is resolved
function updateComponentUi$2(state) {
    //console.log('reducers-ligand: updateComponentUi')
    var lv = state.ligandViewer;

    setSelect('ligandLigandViewer', lv.ligand);
    setRange('pocket-opacity', lv.pocketOpacity);
    setRange('pocket-near-clipping', lv.pocketNearClipping);
    setRange('pocket-radius-clipping', lv.pocketRadiusClipping);
    setSelect('pocket-color', lv.pocketColor);
    setCheckbox('hydrogenBond', lv.hydrogenBond);
    setCheckbox('halogenBond', lv.halogenBond);
    setCheckbox('hydrophobic', lv.hydrophobic);
    setCheckbox('piInteraction', lv.piInteraction);
    setCheckbox('metalCoordination', lv.metalCoordination);
    updateButtonState('btnLigandLabel', lv.ligandLabel);
}

// private funcs ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function setDefaults(state) {
    var lv = state.ligandViewer;
    var lvd = state.ligandViewerDefaults;

    setPocketOpacity$1(state, lvd.pocketOpacity);
    setPocketNearClipping$1(state, lvd.pocketNearClipping);
    setPocketRadiusClipping$1(state, lvd.pocketRadiusClipping);
    setPocketColor$1(state, lvd.pocketColor);
    setHydrogenBond$1(lv, lvd.hydrogenBond);
    setHalogenBond$1(lv, lvd.halogenBond);
    setHydrophobic$1(lv, lvd.hydrophobic);
    setPiInteraction$1(lv, lvd.piInteraction);
    setMetalCoordination$1(lv, lvd.metalCoordination);
    setLigandLabel$1(state, lvd.ligandLabel);
}

function setLigandViewerMessage(msg) {
    $('#ligandViewerMessage').html(msg);
}

var script = 'reducers-edmaps';
var DEFAULT = 'default';

var surfParams = {
    surf2fofc: {
        color: 'skyblue',
        isolevel: getDefaultIsolevel('2fofc'),
        boxSize: edmapsBoxSize,
        useWorker: false,
        contour: true,
        opaqueBack: false,
        isolevelScroll: true
    },
    surfFofc: {
        color: 'mediumseagreen',
        isolevel: getDefaultIsolevel('fofc'),
        boxSize: edmapsBoxSize,
        useWorker: false,
        contour: true,
        opaqueBack: false,
        isolevelScroll: true
    },
    surfFofcNeg: {
        color: 'tomato',
        isolevel: getDefaultIsolevel('fofc'),
        negateIsolevel: true,
        boxSize: edmapsBoxSize,
        useWorker: false,
        contour: true,
        opaqueBack: false,
        isolevelScroll: true
    }
};

var mapStyleParams = {
    contour: {
        contour: true,
        flatShaded: false,
        opacity: 1,
        metalness: 0,
        wireframe: false,
        depthWrite: true
    },
    smooth: {
        contour: false,
        flatShaded: false,
        opacity: 0.5,
        metalness: 0,
        wireframe: false,
        depthWrite: false
    },
    flat: {
        contour: false,
        flatShaded: true,
        opacity: 0.3,
        metalness: 0.2,
        wireframe: false,
        depthWrite: false
    }
};

// show/hide map based on 'value' param true/false - 'view' may be 'default' or undefined
function set2fofc$1(state, value, view) {
    var map = '2fofc';
    var edmaps = state.edmaps;
    var map2fofc = edmaps.map2fofc;

    if (value) { // show map
        if (view !== DEFAULT) { setDefaultStructureView$2(state); }
        edmaps.scroll = map;

        if (map2fofc.loaded) { // map already loaded
            map2fofc.surf2fofc.setVisibility(true);
            map2fofc.visible = true;
            map2fofc.surf2fofc.setParameters(getMapParams(state, map, view));
            if (edmaps.mapFofc.visible && view !== DEFAULT) { setIsolevelScroll(state, 'fofc', false); } // update for other map
            updateComponentUi$1(state);
        } else {
            load2fofc(state, view);
        }
    } else { // hide map
        if (map2fofc.surf2fofc) {
            map2fofc.surf2fofc.setVisibility(false);
            map2fofc.visible = false;
            setIsolevelScroll(state, map, false);
        }
        edmaps.scroll = '';
        if (edmaps.mapFofc.visible) {  // if other map is visible update scroll
            edmaps.scroll = 'fofc';
            setIsolevelScroll(state, 'fofc', true);
        }
        updateComponentUi$1(state);
    }
}

// show/hide map based on 'value' param true/false - 'view' may be 'default' or undefined
function setFofc$1(state, value, view) {
    var map = 'fofc';
    var edmaps = state.edmaps;
    var mapFofc = edmaps.mapFofc;

    if (value) { // show map
        setDefaultStructureView$2(state);
        if (view !== DEFAULT) { edmaps.scroll = map; }

        if (mapFofc.loaded) { // map already loaded
            mapFofc.surfFofc.setVisibility(true);
            mapFofc.surfFofcNeg.setVisibility(true);
            mapFofc.visible = true;
            var params = getMapParams(state, map, view);
            mapFofc.surfFofc.setParameters(params);
            mapFofc.surfFofcNeg.setParameters(params);

            if (view === DEFAULT) {
                set2fofc$1(state, true, view);
            } else {
                if (edmaps.map2fofc.visible) { setIsolevelScroll(state, '2fofc', false); } // update other map
                updateComponentUi$1(state);
            }
        } else {
            loadFofc(state, view);
        }
    } else { // hide map
        if (mapFofc.surfFofc) {
            mapFofc.surfFofc.setVisibility(false);
            mapFofc.surfFofcNeg.setVisibility(false);
            mapFofc.visible = false;
            setIsolevelScroll(state, map, false);
        }
        edmaps.scroll = '';
        if (edmaps.map2fofc.visible) {  // if other map is visible update scroll
            edmaps.scroll = '2fofc';
            setIsolevelScroll(state, '2fofc', true);
        }
        updateComponentUi$1(state);
    }
}

function setScroll$1(state, scroll) {
    console.log(script + ': setScroll: ' + scroll);
    var edmaps = state.edmaps;
    if (    (scroll === '2fofc' && edmaps.map2fofc.visible) ||
        (scroll === 'fofc' && edmaps.mapFofc.visible) ||
        scroll === '') {
        // only set scroll if map is visible or scroll is ''
        edmaps.scroll = scroll;
        setIsolevelScroll(state, '2fofc', (scroll === '2fofc'));
        setIsolevelScroll(state, 'fofc', (scroll === 'fofc'));
    }
    updateComponentUi$1(state);
}

function set2fofcLevel$1(state, level) {
    //console.log(script + ': set2fofcLevel: level' + level)
    var map2fofc = state.edmaps.map2fofc;
    if (map2fofc.surf2fofc) {
        level = parseFloat(level);
        map2fofc.surf2fofc.setParameters({ isolevel: level });
        setRangeValue('2fofc-level', level);
    }
}

function setFofcLevel$1(state, level) {
    //console.log(script + ': set2fofcLevel: level' + level)
    var mapFofc = state.edmaps.mapFofc;
    if (mapFofc.surfFofc && mapFofc.surfFofcNeg) {
        level = parseFloat(level);
        mapFofc.surfFofc.setParameters({ isolevel: level });
        mapFofc.surfFofcNeg.setParameters({ isolevel: level });
        setRangeValue('fofc-level', level);
    }
}

function setMapStyle$1(state, mapStyle) {
    //console.log(script + ': setMapStyle: ' + mapStyle)
    var edmaps = state.edmaps;
    edmaps.mapStyle = mapStyle;
    var msParams = mapStyleParams[mapStyle];
    if (edmaps.map2fofc.loaded) {
        edmaps.map2fofc.surf2fofc.setParameters(msParams);
    }
    if (edmaps.mapFofc.loaded) {
        edmaps.mapFofc.surfFofc.setParameters(msParams);
        edmaps.mapFofc.surfFofcNeg.setParameters(msParams);
    }
}

function setBoxSize$1(state, value) {
    console.log(script + ': setBoxSize: value=' + value);
    var edmaps = state.edmaps;
    if (value) { edmaps.boxSize = parseInt(value); }
    if (edmaps.boxSize === 0) {
        edmaps.boxSize = 0.1; // workaround for boxSize flipping to 100 when range value is zero
    }
    var p = { boxSize: state.edmaps.boxSize };
    if (edmaps.map2fofc.loaded) {
        edmaps.map2fofc.surf2fofc.setParameters(p);
    }
    if (edmaps.mapFofc.loaded) {
        edmaps.mapFofc.surfFofc.setParameters(p);
        edmaps.mapFofc.surfFofcNeg.setParameters(p);
    }
    setRangeValue('boxSize', edmaps.boxSize);
}

function setEdmapsLigand$1(state, ligand, view) {
    console.log(script + ': setEdmapsLigand: ligand=' + ligand + ', view=' + view);
    state.edmaps.ligand = ligand;

    if (ligand === '') {
        if (view !== DEFAULT) { state.stage.tasks.onZeroOnce(function () { return state.stage.autoView(autoView); }); }
        // update ligandViewer
        clear$1(state);
        setStyle$1(state, 'line');
    } else {
        // update ligandViewer
        setLigand$1(state, ligand);
        if (state.ligandViewer && state.ligandViewer.pocketRadius) {
            setBoxSize$1(state, state.ligandViewer.pocketRadius);
            updateComponentUi$1(state);
        }
        updateComponentUi$2(state);
    }
}

// set the default maps view
function setDefaultMapsView$1(state) {
    //console.log(script + ': setDefaultMapsView')
    state.edmaps.scroll = '2fofc';
    state.edmaps.mapStyle = edmapsMapStyle;
    state.edmaps.boxSize = edmapsBoxSize;
    state.edmaps.ligand = '';
    setEdmapsLigand$1(state, state.edmaps.ligand, DEFAULT);

    setFofc$1(state, true, DEFAULT); // set2fofc will be called after fofc is loaded and/or displayed
}

// clear all reprs associated with edmaps view, set defaults and update ui
function clear$$1(state) {
    //console.log(script + ': clear')
    if (state.edmaps) {
        set2fofc$1(state, false);
        setFofc$1(state, false);
        state.edmaps.mapStyle = edmapsMapStyle;
        state.edmaps.boxSize = 0;
        state.edmaps.ligand = '';
        updateComponentUi$1(state);
    }
}

// TODO u.updatecomponent() fails to update all ui elements, so call this method until this issue is resolved
function updateComponentUi$1(state) {
    var edmaps = state.edmaps;
    var map2fofc = edmaps.map2fofc;
    var mapFofc = edmaps.mapFofc;

    setCheckbox('2fofc', map2fofc.visible);
    setCheckbox('fofc', mapFofc.visible);
    setRadio('scroll-2fofc', edmaps.scroll === '2fofc');
    setRadio('scroll-fofc', edmaps.scroll === 'fofc');
    setRangeDisabled('2fofc-level', map2fofc.visible);
    setRangeDisabled('fofc-level', mapFofc.visible);
    if (map2fofc.surf2fofc) { setRange('2fofc-level', getIsolevel(map2fofc.surf2fofc)); }
    if (mapFofc.surfFofc) { setRange('fofc-level', getIsolevel(mapFofc.surfFofc)); }
    setSelect('mapStyle', edmaps.mapStyle);
    setRange('boxSize', edmaps.boxSize);
    setSelect('ligandEdmaps', edmaps.ligand);
}

// private funcs ///////////////////////////////////////////////////////////////

// get repr surf params
function getMapParams(state, map, view) {
    console.log(state + ' ' + map + ' ' + view);
    var edmaps = state.edmaps;
    var msParams = mapStyleParams[edmaps.mapStyle];
    var p = {};

    // if boxSize set to < 2 or thsi is default view set boxSize to default, otherwise retain existing value
    p.boxSize = (edmaps.boxSize < 2 || view === DEFAULT) ? edmapsBoxSize : edmaps.boxSize;
    if (map === '2fofc') {
        p.isolevelScroll = true;
        if (view === DEFAULT) {
            p.isolevel = getDefaultIsolevel(map);
        }
    } else {
        p.isolevelScroll = true;
        if (view === DEFAULT) {
            p.isolevelScroll = false;
            p.isolevel = getDefaultIsolevel(map);
        }
    }
    return Object.assign({}, msParams, p)
}

// load 2fofc from network
function load2fofc(state, view) {
    setLoading(state, true);
    var map = '2fofc';
    var map2fofc = state.edmaps.map2fofc;
    loadMap(state, map).then(function (o) {
        var params = Object.assign({}, surfParams.surf2fofc, getMapParams(state, map, view));
        inspect(params, '2fofc params');
        map2fofc.surf2fofc = o.addRepresentation('surface', params);
        map2fofc.surf2fofc.signals.parametersChanged.add(function (p) {
           checkIsolevel(p.isolevel, map2fofc.surf2fofc, map);
        });
        setLoading(state, false);
        map2fofc.loaded = true;
        map2fofc.visible = true;
        if (state.edmaps.mapFofc.visible && view != DEFAULT) { setIsolevelScroll(state, 'fofc', false); } // update for other map
        updateComponentUi$1(state);
    });
}

// load fofc from network
function loadFofc(state, view) {
    setLoading(state, true);
    var map = 'fofc';
    var mapFofc = state.edmaps.mapFofc;
    loadMap(state, map).then(function (o) {
        var params = getMapParams(state, map, view);
        inspect(params, 'fofc params');
        var paramsPos = Object.assign({}, surfParams.surfFofc, params );
        var paramsNeg = Object.assign({}, surfParams.surfFofcNeg, params );

        mapFofc.surfFofc = o.addRepresentation('surface', paramsPos);
        mapFofc.surfFofc.signals.parametersChanged.add(function (p) {
           checkIsolevel(p.isolevel, mapFofc.surfFofc, map);
        });
        mapFofc.surfFofcNeg = o.addRepresentation('surface', paramsNeg);
        mapFofc.surfFofcNeg.signals.parametersChanged.add(function (p) {
           checkIsolevel(p.isolevel, mapFofc.surfFofcNeg, map);
        });
        setLoading(state, false);
        mapFofc.loaded = true;
        mapFofc.visible = true;

        if (view === DEFAULT) {
            set2fofc$1(state, true, view);
        } else {
            if (state.edmaps.map2fofc.visible) { setIsolevelScroll(state, '2fofc', false); } // update other map
            updateComponentUi$1(state);
        }
    });
}

// load map from network
function loadMap(state, map) {
    var pdbid = state.sc.name;
    var filename = pdbid + '_' + map + '.dsn6';
    var url = edmapUrl + filename.toLowerCase();
    return state.stage.loadFile(url)
}

// set structure view defaults for edmaps
function setDefaultStructureView$2(state) {
    setAssembly$1(state, '__AU', false, false);
    setStyle$1(state, 'line');
    setColorScheme$1(state, 'element');
    updateComponentUi$$1(state);
}

// limit isolevel to 0.01-10.0
function checkIsolevel (isolevel, surface, map) {
    if (isolevel < 0.01) {
        surface.setParameters({ isolevel: 0.01 });
    } else if (isolevel > 10) {
        surface.setParameters({ isolevel: 10 });
    } else {
        setRange(map + '-level', isolevel);
    }
}

function getDefaultIsolevel(map) {
    return (map === '2fofc') ? 1.5 : 3
}

function getIsolevel(repr) {
    return repr.getParameters().isolevel.toFixed(1)
}

// set repr isolevelScroll for map
function setIsolevelScroll(state, map, val) {
    var p = { isolevelScroll: val };
    if (map === '2fofc') {
        state.edmaps.map2fofc.surf2fofc.setParameters(p);
    } else {
        state.edmaps.mapFofc.surfFofc.setParameters(p);
        state.edmaps.mapFofc.surfFofcNeg.setParameters(p );
    }
}

function setAssembly$1(state, assembly, setAutoView, updateStyle) {
    //console.log('reducers-structure: setAssembly: assembly=' + assembly)
    state.structureView.assembly = assembly;
    state.sc.setDefaultAssembly(assembly);

    state.atomCount = state.atomCounts[assembly];

    // add/remove unitcell
    if (assembly === 'UNITCELL') {
        initStructureViewRepr(state, 'unitcell');
    } else {
        removeRepr(state, 'unitcell');
    }

    // update repr assembly params
    updateReprsForAssembly(state);

    // if setAssembly() is called from ligandViewer (which requires AU) 'updateStyle' param is set to false
    if (updateStyle && assembly === 'SUPERCELL') {
        // if atomCount has increased style may need to be set
        var defaultStyle = getDefaultStyle(state);
        if (defaultStyle !== state.structureView.style) {
            setStyle$1(state, defaultStyle);
        }
    }

    // update symmetry options
    clearSymmetryBuffer(state);
    state.structureView.symmetry = state.structureViewDefaults.symmetry;
    setSymmetryOptions(state);
    updateComponent(state, 'structureView'); // update select options

    updateComponentUi$$1(state);

    // if setAssembly() is called from edmaps or ligandViewer setAutoView is set to false
    if (setAutoView) {
        state.stage.tasks.onZeroOnce(function () { return state.stage.autoView(autoView); });
    }
}

// test with structure that has more than one model - 5ivk, 3zbe
function setModel$1(state, model) {
    //console.log('reducers-structure: setModel: model=' + model)
    state.structureView.model = (model === 'all') ? model : parseInt(model);

    updatePolymerAndLigandSele(state);
    updateValidationSele(state);
}

function setSymmetry$1(state, symmetry) {
    //console.log('reducers-structure: setSymmetry: symmetry=' + symmetry)
    state.structureView.symmetry = parseInt(symmetry);

    clearSymmetryBuffer(state);

    if (state.structureView.symmetry >= 0 && state.symmetryData[state.structureView.assembly]) {
        var data = state.symmetryData[state.structureView.assembly].symmetries[symmetry];
        if (data && data.axes) {
            // sort by order of the axes so that the view is oriented along the highest order axis
            var axes = data.axes.sort(function (a1, a2) { return a1.order < a2.order ? 1 : -1; });
            state.symmetryBuffer = new SymmetryBuffer(axes, {});
            state.symmetryBuffer.attach(state.sc);

            var tmpVec1 = new (Function.prototype.bind.apply( NGL.Vector3, [ null ].concat( axes[0].start) ));
            var tmpVec2 = new (Function.prototype.bind.apply( NGL.Vector3, [ null ].concat( axes[0].end) ));
            var v1 = new NGL.Vector3().subVectors(tmpVec1, tmpVec2).normalize();
            var v2 = new NGL.Vector3();
            if (axes.length > 1) {
                tmpVec1.set.apply(tmpVec1, axes[1].start);
                tmpVec2.set.apply(tmpVec2, axes[1].end);
                v2.subVectors(tmpVec1, tmpVec2);
            } else {
                v2.set(Math.random(), Math.random(), Math.random());
            }
            v2.normalize().cross(v1).normalize();
            var v3 = new NGL.Vector3().crossVectors(v1, v2).normalize();

            var basis = new NGL.Matrix4();
            basis.makeBasis(v3, v2, v1);
            if (basis.determinant() < 0) {
                basis.scale(new NGL.Vector3(-1, -1, -1));
            }

            var q = new NGL.Quaternion();
            q.setFromRotationMatrix(basis);
            q.inverse();

            state.stage.animationControls.rotate(q, 1000);
        }
    }
    state.stage.tasks.onZeroOnce(function () { return state.stage.autoView(autoView); });
}

function setStyle$1(state, style) {
    //console.log('reducers-structure: setStyle: style=' + style)
    state.structureView.style = style;
    var reprs = state.structureView.reprs;

    // if repr does not exist initialize it
    if (style !== '' && !reprs.polymer[style]) {
        initStructureViewRepr(state, 'polymer', style);
    }

    // set visibility of styles
    for (var repr in reprs.polymer) {
        //console.log('reducers-structure: setStyle: repr=' + repr)
        reprs.polymer[repr].setVisibility(repr === style);
        if (repr === 'base') {
            // also show base repr if style is cartoon
            reprs.polymer.base.setVisibility(style === 'cartoon');
        }
        if (repr === 'point') {
            // also show point repr if style is line
            reprs.polymer.point.setVisibility(style === 'line');
        }
    }
    updateLigandPolymerDisplayButton(state); // 'show/hide polymer display in ligand viewer'
}

function setColorScheme$1(state, colorScheme) {
    // update colorScheme, colorScale for polymer, ligand reprs
    //console.log('reducers-structure: setColorScheme: colorScheme=' + colorScheme)
    state.structureView.colorScheme = colorScheme;

    if ((colorScheme === "densityfit" || colorScheme === "geoquality") && !state.sc.structure.validation) {
        // load validation data
        setLoading(state, true);
        load(state, colorScheme, updateColorScheme);
    } else {
        updateColorScheme(state, colorScheme);
    }
}

function setLigandStyle$1(state, ligandStyle) {
    //console.log('reducers-structure: setLigandStyle: ' + ligandStyle)
    state.structureView.ligandStyle = ligandStyle;

    var reprs = state.structureView.reprs;
    if (!(ligandStyle === '')) { // denotes 'None'
        if (!reprs.ligand[ligandStyle]) {
            initStructureViewRepr(state, 'ligand', ligandStyle);
        }
    }
    for (var repr in reprs.ligand) {
        reprs.ligand[repr].setVisibility(repr === ligandStyle);
    }
}

function setQuality$1(state, quality) {
    //console.log('reducers-structure: setQuality: quality=' + quality)
    state.structureView.quality = quality;
    updateReprsForQuality(state);
}

function setHydrogenVisibility$1(state, hydrogenVisibility) {
    //console.log('reducers-structure: setHydrogenVisibility: ' + hydrogenVisibility)
    state.structureView.hydrogenVisibility = hydrogenVisibility;
    updatePolymerAndLigandSele(state);
}

function setIonVisibility$1(state, ionVisibility) {
    //console.log('reducers-structure: setIonVisibility: ' + ionVisibility)
    state.structureView.ionVisibility = ionVisibility;
    updatePolymerAndLigandSele(state);
}

function setWaterVisibility$1(state, waterVisibility) {
    //console.log('reducers-structure: setWaterVisibility: ' + waterVisibility)
    state.structureView.waterVisibility = waterVisibility;
    updatePolymerAndLigandSele(state);
}

function setClashVisibility$1(state, clashVisibility) {
    //console.log('reducers-structure: setClashVisibility: ' + clashVisibility)
    state.structureView.clashVisibility = clashVisibility;

    if (clashVisibility && !state.sc.structure.validation) {
        setLoading(state, true);
        load(state, clashVisibility, updateClashVisibility);
    } else {
        updateClashVisibility(state, clashVisibility);
    }
}

function setDefaultStructureView$1(state) {
    //console.log('reducers-structure-view: setDefaultStructureView')
    var svd = state.structureViewDefaults;
    setAssembly$1(state, svd.assembly, true, false);
    setModel$1(state, svd.model);
    setSymmetry$1(state, svd.symmetry);
    setStyle$1(state, svd.style);
    setColorScheme$1(state, svd.colorScheme);
    setLigandStyle$1(state, svd.ligandStyle);
    setQuality$1(state, svd.quality);
    if (state.hasValidationReport) {
        setClashVisibility$1(state, svd.clashVisibility);
    }
    setHydrogenVisibility$1(state, svd.hydrogenVisibility);
    setIonVisibility$1(state, svd.ionVisibility);
    setWaterVisibility$1(state, svd.waterVisibility);

    updateComponentUi$$1(state);

    clear$$1(state);
    clear$1(state);
    clear$2(state);
}

// TODO u.updateComponent() fails to update all ui elements, so use this method until this issue is resolved
function updateComponentUi$$1(state) {
    var sv = state.structureView;
    setSelect('assembly', sv.assembly);
    setSelect('model', sv.model);
    setSelect('symmetry', sv.symmetry);
    setSelect('style', sv.style);
    setSelect('colorScheme', sv.colorScheme);
    setSelect('ligandStyle', sv.ligandStyle);
    setSelect('quality', sv.quality);
    setCheckbox('water', sv.waterVisibility);
    setCheckbox('ion', sv.ionVisibility);
    setCheckbox('hydrogen', sv.hydrogenVisibility);
    setCheckbox('clash', sv.clashVisibility);
}


// private funcs ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function updateColorScheme(state, colorScheme, validationLoaded) {
    if (validationLoaded) {
        setLoading(state, false);
    }

    var colorScale = getColorScale(colorScheme);
    var colorReverse = getColorReverse(colorScheme);

    var reprs = state.structureView.reprs;
    for (var repr in reprs.polymer) {
        reprs.polymer[repr].setParameters({ colorScheme: colorScheme, colorScale: colorScale, colorReverse: colorReverse });
    }

    var ligandColorScheme = getLigandColorScheme(state);
    for (var repr$1 in reprs.ligand) {
        reprs.ligand[repr$1].setParameters({ colorScheme: ligandColorScheme });
    }
}

function updateClashVisibility(state, clashVisibility, validationLoaded, err) {
    if (validationLoaded || err) {
        setLoading(state, false);
    }

    if (err) {
        console.log('reducers-structure: updateClashVisibility: ' + err);
    } else {
        var reprs = state.structureView.reprs;
        if (clashVisibility) {
            if (!reprs.validation.validation) {
                // validation reprs not initialized
                initStructureViewRepr(state, 'validation');
            }
        }
        for(var repr in reprs.validation) {
            reprs.validation[repr].setVisibility(clashVisibility);
        }
        if (clashVisibility && state.preset === 'validationReport') {
            console.log('updateClashVisibility: state.preset=' + state.preset);
            setColorScheme$1(state, 'geoquality');
            setSelect('colorScheme', state.structureView.colorScheme);
            state.stage.tasks.onZeroOnce(function () { return state.stage.autoView(autoView); });
            state.preset = ''; // only execute this block the first time user enters with preset
        }
    }
}

// calculate default radius based on axis length
function getDefaultRadius(axisData) {
    var start = new (Function.prototype.bind.apply( NGL.Vector3, [ null ].concat( axisData.start) ));
    var end = new (Function.prototype.bind.apply( NGL.Vector3, [ null ].concat( axisData.end) ));
    var axis = new NGL.Vector3().subVectors(start, end);
    return Math.sqrt(axis.length() / 200)
}

// geometry for displaying symmetry axes
var SymmetryBuffer = function(axes, params) {
    var p = Object.assign({}, params);
    var c = new NGL.Color(p.color || "lime");
    var radius = p.radius || getDefaultRadius(axes[0]);
    var shapeRepr;
    var shape = new NGL.Shape("symmetry", {
        disableImpostor: false,
        openEnded: true
    });
    axes.forEach(function(ax) {
        shape.addSphere(ax.start, c, radius);
        shape.addSphere(ax.end, c, radius);
        shape.addCylinder(ax.start, ax.end, c, radius);
    });
    this.attach = function(component) {
        shapeRepr = component.addBufferRepresentation(shape.getBufferList());
    };
    this.dispose = function() {
        if (shapeRepr) { shapeRepr.dispose(); }
    };
};

// clear symmetryBuffer if it exists
function clearSymmetryBuffer(state) {
    if (state.symmetryBuffer) {
        state.symmetryBuffer.dispose();
        state.symmetryBuffer = undefined;
    }
}

function app(state, action) {
    if (    action.type === 'SET_FOCUS' ||
            action.type === 'SET_BOX_SIZE' ||
            action.type === 'SET_POCKET_NEAR_CLIPPING' ||
            action.type === 'SET_POCKET_RADIUS_CLIPPING' ||
            action.type === 'SET_POCKET_OPACITY') {
        // do not log range input
    } else {
        //console.log('reducers: app: action.type=' + action.type)
    }

    switch (action.type) {
        // init
        case INIT:
            init$1(state);
            break

        //  structure view
        case SET_ASSEMBLY:
            setAssembly$1(state, action.assembly, true, true);
            break
        case SET_MODEL:
            setModel$1(state, action.model); // TODO
            break
        case SET_SYMMETRY:
            setSymmetry$1(state, action.symmetry);
            break
        case SET_STYLE:
            setStyle$1(state, action.style);
            break
        case SET_COLOR_SCHEME:
            setColorScheme$1(state, action.colorScheme);
            break
        case SET_LIGAND_STYLE:
            setLigandStyle$1(state, action.ligandStyle);
            break
        case SET_QUALITY:
            setQuality$1(state, action.quality); // TODO
            break
        case SET_CLASH_VISIBILITY:
            setClashVisibility$1(state, action.clashVisibility);
            break
        case SET_HYDROGEN_VISIBILITY:
            setHydrogenVisibility$1(state, action.hydrogenVisibility);
            break
        case SET_ION_VISIBILITY:
            setIonVisibility$1(state, action.ionVisibility);
            break
        case SET_WATER_VISIBILITY:
            setWaterVisibility$1(state, action.waterVisibility);
            break
        case SET_DEFAULT_STRUCTURE_VIEW:
            setDefaultStructureView$1(state);
            break

        // edmaps
        case SET_2FOFC:
            set2fofc$1(state, action.value);
            break
        case SET_FOFC:
            setFofc$1(state, action.value);
            break
        case SET_SCROLL:
            setScroll$1(state, action.scroll);
            break
        case SET_2FOFC_LEVEL:
            set2fofcLevel$1(state, action.level);
            break
        case SET_FOFC_LEVEL:
            setFofcLevel$1(state, action.level);
            break
        case SET_MAP_STYLE:
            setMapStyle$1(state, action.mapStyle);
            break
        case SET_BOX_SIZE:
            setBoxSize$1(state, action.boxSize);
            break
        case SET_EDMAPS_LIGAND:
            setEdmapsLigand$1(state, action.value);
            break
        case SET_DEFAULT_MAPS_VIEW:
            setDefaultMapsView$1(state);
            break

        // ligand viewer
        case SET_LIGAND:
            setLigand$1(state, action.value);
            break
        case SET_POCKET_NEAR_CLIPPING:
            setPocketNearClipping$1(state, action.value);
            break
        case SET_POCKET_RADIUS_CLIPPING:
            setPocketRadiusClipping$1(state, action.value);
            break
        case SET_POCKET_OPACITY:
            setPocketOpacity$1(state, action.value);
            break
        case SET_LIGAND_LABEL:
            setLigandLabel$1(state, !state.ligandViewer.ligandLabel);
            break
        case SET_DEFAULT_LIGAND_VIEW:
            setDefaultLigandView$1(state);
            break
        case TOGGLE_POLYMER_DISPLAY:
            togglePolymerDisplay$1(state);
            break
        case SET_POCKET_COLOR:
            setPocketColor$1(state, action.value);
            break
        case SET_HYDROGEN_BOND:
            setHydrogenBond$1(state.ligandViewer, action.value);
            break
        case SET_HALOGEN_BOND:
            setHalogenBond$1(state.ligandViewer, action.value);
            break
        case SET_HYDROPHOBIC:
            setHydrophobic$1(state.ligandViewer, action.value);
            break
        case SET_PI_INTERACTION:
            setPiInteraction$1(state.ligandViewer, action.value);
            break
        case SET_METAL_COORDINATION:
            setMetalCoordination$1(state.ligandViewer, action.value);
            break

        // viewer options
        case SET_SPIN:
            setSpin$1(state);
            break
        case CENTER:
            center$1(state);
            break
        case SET_FULLSCREEN:
            setFullscreen$1(state);
            break
        case SCREENSHOT:
            screenshot$1(state);
            break
        case SET_FOCUS:
            setFocus$1(state, action.value);
            break
        case SET_CAMERA_TYPE:
            setCameraType$1(state, action.value);
            break
        case SET_BACKGROUND:
            setBackground$1(state, action.value);
            break

        // default
        default:
    }
    return state
}

// init state
function init$1(state) {
    var sc = state.sc; // structureComponent

    //console.log('reducers: state.assembly=' + state.assembly)
    sc.setDefaultAssembly(state.assembly);

    var model = 0; // default to 0, values: 0-n|'all'
    setAtomCounts(state, model);
    state.atomCount = (state.atomCounts[state.assembly]);

    state.loading = false; // nothing is being loaded

    console.log('state.preset=' + state.preset); // validationReport | ligandInteraction | electronDensityMaps | symmetry
    console.log('state.sele=' + state.sele); // ligandInteraction -> ligand | symmetry -> C2

    var clashVisibility = (state.preset === 'validationReport');

    // structure view
    state.structureViewDefaults = {
        assembly: state.assembly,
        model: model,
        symmetry: -1,
        style: getDefaultStyle(state),
        colorScheme: getDefaultColorScheme(state),
        ligandStyle: 'ball+stick',
        quality: 'auto',
        waterVisibility: false,
        ionVisibility: true,
        hydrogenVisibility: true,
        clashVisibility: false
    };

    // obj representing the current state of ligand viewer
    state.structureView = Object.assign({}, state.structureViewDefaults, { clashVisibility: clashVisibility });
    state.structureView.reprs = {
        unitcell: null,
        polymer: {},
        ligand: {},
        validation: {},
    };

    // initialize default options for the dropdowns
    setSelectOptions(state);

    // edmaps
    //console.log('reducers.init: state.hasEdMaps=' + state.hasEdMaps)
    if (state.hasEdMaps) {
        // obj representing the current state of edmaps
        state.edmaps = {
            map2fofc: { loaded: false, visible: false },
            mapFofc: { loaded: false, visible: false },
            scroll: '',
            mapStyle: edmapsMapStyle,
            boxSize: edmapsBoxSize,
            ligand: ''
        };
    }

    // ligand viewer
    if (state.ligandOptions) {
        var ligand = (state.preset === 'ligandInteraction') ? getLigandFromSeleParam(state) : '';
        console.log('reducers: init: state.ligandOptions.length=' + state.ligandOptions.length + ', ligand=' + ligand);

        // ligand viewer defaults
        state.ligandViewerDefaults = {
            ligand: '',
            pocketOpacity: 0,
            pocketNearClipping: 0,
            pocketRadiusClipping: 100,
            ligandLabel: true,
            pocketColor: 'hydrophobicity',
            hydrogenBond: true,
            halogenBond: true,
            hydrophobic: true,
            piInteraction: true,
            metalCoordination: true
        };
        // obj representing the current state of ligand viewer
        state.ligandViewer = Object.assign({}, state.ligandViewerDefaults, { ligand: ligand });

        //u.inspect(state.ligandViewerDefaults, 'state.ligandViewerDefaults')
        //u.inspect(state.ligandViewer, 'state.ligandViewer')
    }

    // obj representing the current state of the ui viewer options
    state.viewer = {
        spin: false,
        fullscreen: false,
        focus: 0,
        cameraType: 'perspective',
        background: 'white'
    };

    // initialize reprs - other reprs will be added as per user action
    initStructureViewRepr(state, 'polymer');
    initStructureViewRepr(state, 'ligand');

    // preset logic
    if (state.hasValidationReport && state.preset === 'validationReport') {
        setClashVisibility$1(state, true);
    } else if (state.preset === 'ligandInteraction' && state.ligandViewer.ligand !== '') {
        setLigand$1(state, state.ligandViewer.ligand);
    } else if (state.preset === 'symmetry') {
        var sele = state.sele;
        if (!sele || sele === '') {
            sele = getFirstSymmetry(state);
        }
        var symmetry = getSymmetryFromSeleParam(state, sele);
        setSymmetry$1(state, symmetry);
    } else if (state.preset === 'electronDensityMaps' && state.hasEdMaps) {
        setDefaultMapsView$1(state);
    } else {
        state.stage.tasks.onZeroOnce(function () { return state.stage.autoView(0); });
    }
}

function getLigandFromSeleParam(state) {
    console.log('state.ligandOptions.length=' + state.ligandOptions.length);
    // do not use forEach here - return statement does not break out of loop
    for ( var i = 0; i < state.ligandOptions.length; i++) {
        var ligandOption = state.ligandOptions[i];
        var label = ligandOption.label;
        //if (label.indexOf['['] === 0) {
            // [TRE]1001:A
            var s = label.substring(1, label.indexOf(']'));
            console.log('s=' + s);
            if (s === state.sele) {
                return label.substring(label.indexOf(']') + 1)
            }
        //}
    }
    return ''
}

function getSymmetryFromSeleParam(state, sele) {
    // do not use forEach in this scenario - return statement does not break out of loop
    for ( var i = 0; i < state.symmetryOptions.length; i++) {
        var symmetryOption = state.symmetryOptions[i];
        var label = symmetryOption.label;
        // C2 (global)
        if (label.indexOf(sele) === 0) {
            return symmetryOption.value
        }
    }
    return -1
}

function getFirstSymmetry(state) {
    // do not use forEach in this scenario - return statement does not break out of loop
    for ( var i = 0; i < state.symmetryOptions.length; i++) {
        var symmetryOption = state.symmetryOptions[i];
        if (symmetryOption.value > -1) {
            return symmetryOption.label
        }
    }
    return 'None'
}

// entry point for ngl-ui 3d view component

console.log('ngl-ui: NGL.Version=' + NGL.Version);

// init stage
var stage = new NGL.Stage('stageViewport', { backgroundColor: "white", hoverTimeout: 150 });

// note: pdbid, bionumber, and structureData3dView are declared in the enclosing template file
var assembly = bionumber2assembly(bionumber);  // one of __AU|BU<n>|UNITCELL|SUPERCELL
// var rcsbUrl = 'rcsb://' + pdbid;
var rcsbUrl = "mem_new.pdb";

stage.loadFile(rcsbUrl, { defaultRepresentation: false }).then( function(sc) {

    var sd = structureData3dView;
    var symmetryData = processSymmetry(sd.symmetry);

    var initialProps = {
        assembly: assembly,
        stage: stage,
        sc: sc,
        symmetryData: symmetryData,
        hasEdMaps: sd.hasEdMaps,
        hasValidationReport: sd.hasValidationReport,
        largeStructure: sd.largeStructure,
        sele: sele,
        preset: preset,
        isSafariMobile: navigator.userAgent.match(/(iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)
    };

    // create store with initial props
    var store = redux.createStore(app, initialProps);

    // init store.state
    store.dispatch(init());

    // render the ui
    renderUi(store);

    // ensure the scene gets centered after all tasks are done
    stage.tasks.onZeroOnce(function () { return stage.autoView(0); });

    // update focus slider whenever the stage parameters change
    stage.signals.parametersChanged.add(function (p) {
        var focus = Math.max(0, 4 * p.clipNear - 100);
        setRange('focus', focus);
    });

    // hide loading message
    setLoading(store.getState(), false);
} );


// render the ui
function renderUi(store) {
    var uiTitle        = document.getElementById('uiTitle');
    var structureView  = document.getElementById('structureView');
    var edMaps         = document.getElementById('edMaps');
    var ligandViewer   = document.getElementById('ligandViewer');
    var viewerOptions  = document.getElementById('viewerOptions');

    var state = store.getState();

    preact.render(preact.h( Title, { title: state.sc.structure.title }), uiTitle);
    preact.render(preact.h( StructureView, { store: store }), structureView);
    preact.render(preact.h( EDMaps, { store: store }), edMaps);
    preact.render(preact.h( LigandViewer, { store: store }), ligandViewer);
    preact.render(preact.h( ViewerOptions, { store: store }), viewerOptions);

    // initUi() is declared in the enclosing template file and can be called only after the ui has been rendered
    initUi(state);
}

})));
//# sourceMappingURL=ngl-ui.js.map