<!DOCTYPE html>
<html lang="en">
<head>
    <title>Delphi Output</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.min.js" defer=""></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>   <!-- 
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> -->
    <link rel="stylesheet" href="nglviewer/css/font-awesome.min.css">
    <link rel="stylesheet" href="nglviewer/css/main.css">
    
    <!-- <link rel="stylesheet" href="nglviewer/css/structure/structuresummarypage.css">
    <link rel="stylesheet" href="nglviewer/css/structure/tabbar.css">
     -->
     <link rel="stylesheet" href="nglviewer/css/ngl-ui.css">
    <!-- <script src="nglviewer/js/redux.min.js"></script>
    <script src="nglviewer/js/preact.min.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.7.2/redux.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/preact/8.2.7/preact.min.js"></script>

    <script src="https://cdn.rawgit.com/arose/ngl/v0.10.3/dist/ngl.js"></script>
    <script>
        var state
        // pdbid, bionumber retrieved url
        var pdbid = '1LYZ'
        var bionumber = '0'
        // preset, sele retrieved from querystring
        var preset = ''
        var sele = ''
        var structureData3dView = {"entryId":"1LYZ","hasCSFile":false,"hasEdMaps":false,"hasNMRV1":false,"hasNMRV2":false,"hasSFFile":false,"hasValidationReport":true,"largeStructure":false,"symmetry":[{"biologicalAssemblyId":0,"globalSymmetry":{"symmetry":"C1"}},{"biologicalAssemblyId":1,"globalSymmetry":{"symmetry":"C1"}}],"title":"Real-space refinement of the structure of hen egg-white lysozyme"}
        
        // list of control panel ids
        var panelIds = ['structureView', 'edMaps', 'ligandViewer']
        
        // toggle control panels
        function toggle(id) {
            if($('#' + id).css('display') === 'block') {
                // panel already displayed - do nothing
            } else {
                togglePanel(id)
                // hide any other panel
                for (var i = 0, n = panelIds.length; i < n; i++) {
                    var panelId = panelIds[i]
                    if (panelId !== id) {
                        if($('#' + panelId).css('display') === 'block') {
                            togglePanel(panelId)
                        }
                    }
                }
            }
        }
        
        // toggle control panel
        function togglePanel(id) {
            $('#' + id).toggle()
            $('#' + id + 'Tab').toggleClass('tab-active tab-inactive')
        }
        
        // handle viewer select
        function selectViewer() {
            var val = $( "#viewers" ).val()
            if (val != '') {
                var jmolBionumber = (bionumber === '0') ? '' : bionumber
                window.location.href = '/pdb/explore/jmol.do?structureId=' + pdbid + '&bionumber=' + jmolBionumber + '&jmolMode=' + val
            }
        }
        
        // set stage height to <= stage width and >= stageWidth * .5625 (16:9 ratio)
        function setStageHeight() {
            var stageWidth = $('#stageViewport').width()
            var height = $(window).height() - ($('#header').height() + 410) // get approximate available height
            height = Math.max(Math.min(stageWidth, height), stageWidth * .5625)
            $('#stageViewport').height(height)
        }
        
        // set size and position loading progress bar
        function setLoadingProgressBar() {
            var w = $('#stageViewport').width()
            var h = $('#stageViewport').height()
            console.log(w + ' x ' + h)
            $('#loading').width(w/2)
            $('#progressBar').width(w/2)
            $('#loading').css('top', h/2)
            $('#loading').css('left', w/4)
        }
        
        // called from ngl-ui.js
        function initUi(_state) {
            state = _state
            initTooltip()
            // set the panel to display when page loads - structureView | edMaps | ligandViewer
            var panel = 'structureView' // default
            if (preset === 'ligandInteraction') {
                panel = 'ligandViewer'
            } else if (preset === 'electronDensityMaps') {
                panel = 'edMaps'
            }
            togglePanel(panel)
        }
        
        function center() {
            state.stage.autoView(400)
        }
        
        // this function may be triggered by:
        //       1) window resize
        //       2) clicking 'Fullscreen' button
        //       3) esc key in fullscreen mode
        function resizeStage() {
            var fullscreen = ($('#ngl-ui').width() > $('#pdbid-and-buttons').width()) // test for fullscreen
            if (fullscreen) {
                $('#stageViewport').height($(window).height() - 114)
            } else {
                setStageHeight()
            }
            setLoadingProgressBar()
        
            state.stage.viewer.handleResize()
        
            state.viewer.fullscreen = fullscreen
            const cls = (fullscreen) ? 'on' : 'off'
            $('#btnFullscreen').attr('class', cls)
        }
        
        // this function is called only after the structure has been loaded and the ui has been rendered
        function initTooltip() {
            $('[data-toggle="tooltip"]').tooltip()
        }
        
        // on resize
        $(window).resize(function() {
            resizeStage()
        });
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.css">
</head>



<body>
    
    <div id="header">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-5 hidden-xs" id="logo_container">
                        <img id="rcsblogo" src="http://compbio.clemson.edu/forum/styles/prosilver/theme/images/site_logo.gif" data-src="http://compbio.clemson.edu/forum/styles/prosilver/theme/images/site_logo.gif" alt="Delphi">
                    
                    <div class="clearfix"></div>
                </div>
                
            </div>
        </div>
    </div>


    <div class="container" id="maincontentcontainer">
        
        <div id="summary">
            <div class="row" id="ngl-ui" data-normal-width="" data-normal-height="" style="">
                <div class="col-lg-9 col-md-8 col-sm-12 col-xs-12">
                    
                    <div id="stagePanel" style="height: 403.875px; width:100%; overflow: hidden;">
                        <!-- <div class="progress" id="loading" style="width: 359px; top: 202px; left: 179.5px; display: none;">
                            <div class="progress-bar progress-bar-warning progress-bar-striped active" id="progressBar" style="width: 359px;">Loading data...</div>
                        </div> -->
                        <!-- <div id="stageViewport" style="height: 403.875px; overflow: hidden;"> -->
                            <!-- <div id="can" style="position: relative;">
                                <canvas  width="896" height="504" tabindex="-1" style="width: 17px; height: 403.875px; background-color: rgb(255, 255, 255); touch-action: none; outline: none;">
                                </canvas>
                            </div> -->
                            <!-- <div style="display: none; position: fixed; z-index: 1000000; pointer-events: none; background-color: rgba(0, 0, 0, 0.6); color: lightgrey; padding: 8px; font-family: sans-serif; bottom: 379px; left: 734px;">atom: [PRO]79:A.CA (1LYZ)</div> -->
                        <!-- </div> -->
                    </div>
                    <div id="stageHeader">Note: Use your mouse to drag, rotate, and zoom in and out of the structure. Mouse-over to identify atoms and bonds.
                    </div>
                    <div id="viewerOptions">
                       <!--  <div id="viewerControls">
                            <button id="btnSpin" class="off">
                                <span id="btnSpinName">Spin</span>
                                <span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="Start/stop spinning the structure along the y-axis"></span>
                            </button>
                            <button class="off">
                                <span id="undefinedName">Center</span>
                                <span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="Reset molecule position"></span>
                            </button>
                            <span>
                                <button id="btnFullscreen" class="off">
                                    <span id="btnFullscreenName">Fullscreen</span>
                                    <span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="Activate/disable fullscreen mode"></span>
                                </button>
                                <button class="off">
                                    <span id="undefinedName">Screenshot</span>
                                    <span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="Download screenshot at twice the displayed resolution"></span>
                                </button>
                            </span>
                            <div class="inline">
                                <select class="form-control input-sm" id="select-cameraType">
                                    <option value="perspective">Perspective Camera</option>
                                    <option value="orthographic">Orthographic Camera</option>
                                </select>
                            </div>
                            <div class="inline">
                                <select class="form-control input-sm" id="select-background">
                                    <option value="white">White background</option>
                                    <option value="black">Black background</option>
                                </select>
                            </div>
                            <div class="inline">
                                <div class="inline viewer-focus-label">
                                    <span>Focus
                                        <span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="Move far and near clipping planes towards the center"></span>
                                    </span>
                                </div>
                                <div class="inline viewer-focus-slider">
                                    <div class="range-input">
                                        <input id="range-focus" type="range" min="0" max="100" step="1">
                                        <div id="value-focus" style="left: 6.5px;">0</div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                    
                    <!-- <div class="controls" id="structureView" style="display: block;">
                        <div>
                            <h4><b>Controls</b></h4><br>
                            <div class="row horiz-group">
                                <div class="col-xs-5 label-right">
                                    <span>Assembly
                                        <span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="View structure as asymmetric unit, biological assembly, unit cell, or stacked unit cells"></span>
                                    </span>
                                </div>
                                <div class="col-xs-7">
                                    <select class="form-control input-sm" id="select-assembly">
                                        <option value="__AU">Asymmetric Unit</option>
                                        <option value="BU1">Bioassembly 1</option>
                                        <option value="UNITCELL">Unitcell</option>
                                        <option value="SUPERCELL">Supercell</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row horiz-group">
                                <div class="col-xs-5 label-right">
                                    <span>Model
                                        <span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="View specific model for multi-model structure"></span>
                                    </span>
                                </div>
                                <div class="col-xs-7">
                                    <select class="form-control input-sm" id="select-model">
                                        <option value="0">Model 1</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row horiz-group">
                                <div class="col-xs-5 label-right">
                                    <span>Symmetry
                                        <span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="View intrinsic molecular symmetry"></span>
                                    </span>
                                </div>
                                <div class="col-xs-7">
                                    <select class="form-control input-sm" id="select-symmetry">
                                        <option value="-1">None</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row horiz-group">
                                <div class="col-xs-5 label-right">
                                    <span>Style
                                        <span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="View the structure in different presentation styles"></span>
                                    </span>
                                </div>
                                <div class="col-xs-7">
                                    <select class="form-control input-sm" id="select-style">
                                        <option value="">None</option>
                                        <option value="backbone">Backbone</option>
                                        <option value="surface">Surface</option>
                                        <option value="cartoon">Cartoon</option>
                                        <option value="spacefill">Spacefill/CPK</option>
                                        <option value="licorice">Licorice</option>
                                        <option value="line">Line</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row horiz-group">
                                <div class="col-xs-5 label-right">
                                    <span>Color
                                        <span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="Color the structure using different schemes"></span>
                                    </span>
                                </div>
                                <div class="col-xs-7">
                                    <select class="form-control input-sm" id="select-colorScheme">
                                        <option value="chainname">By Chain</option>
                                        <option value="residueindex">Rainbow</option>
                                        <option value="element">By Element/CPK</option>
                                        <option value="resname">By Residue</option>
                                        <option value="bfactor">By B-factor</option>
                                        <option value="sstruc">By Secondary Structure</option>
                                        <option value="hydrophobicity">By Hydrophobicity</option>
                                        <option value="geoquality">By Geometry Quality</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row horiz-group">
                                <div class="col-xs-5 label-right">
                                    <span>Ligand
                                        <span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="Change ligand presentation style"></span>
                                    </span>
                                </div>
                                <div class="col-xs-7">
                                    <select class="form-control input-sm" id="select-ligandStyle">
                                        <option value="">None</option>
                                        <option value="ball+stick">Ball &amp; Stick</option>
                                        <option value="spacefill">Spacefill/CPK</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row horiz-group">
                                <div class="col-xs-5 label-right">
                                    <span>Quality
                                        <span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="Adjust rendering quality"></span>
                                    </span>
                                </div>
                                <div class="col-xs-7">
                                    <select class="form-control input-sm" id="select-quality">
                                        <option value="auto">Automatic</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row horiz-group">
                                <div class="col-sm-6 checkbox-label">
                                    <div>
                                        <input type="checkbox" id="checkbox-water" class="checkbox-with-label">
                                        <span>Water
                                            <span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="Show/hide water molecules"></span>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-sm-6 checkbox-label">
                                    <div>
                                        <input type="checkbox" id="checkbox-ion" class="checkbox-with-label">
                                        <span>Ions
                                            <span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="Show/hide ions"></span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="row horiz-group">
                                <div class="col-sm-6 checkbox-label">
                                    <div>
                                        <input type="checkbox" id="checkbox-hydrogen" class="checkbox-with-label">
                                        <span>Hydrogens
                                            <span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="Show/hide hydrogen atoms"></span>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-sm-6 checkbox-label largeAUHidden">
                                    <div>
                                        <input type="checkbox" id="checkbox-clash" class="checkbox-with-label">
                                        <span>Clashes
                                            <span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="Show/hide clashes between atoms (indicated by pink disks) as given in the Validation Report"></span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="text-right">
                                <button id="btnDefaultStructureView" class="off">
                                    <span id="btnDefaultStructureViewName">Default Structure View</span>
                                    <span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="Reset to the default structure view"></span>
                                </button>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-9 col-md-8 col-sm-12">
                    <div class="row">
                        <div class="col-xs-6">
                            <small><a href="https://github.com/arose/ngl" target="_blank">NGL</a> is a WebGL based 3D viewer powered by <a href="http://mmtf.rcsb.org" target="_blank">MMTF</a>.</small>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <br>
            <div class="citation">
                <h5>Citation</h5>
                <small>When using the NGL Viewer please cite:
                    <ul>
                        <li>AS Rose, AR Bradley, Y Valasatava, JM Duarte, A Prlić and PW Rose. <i>Web-based molecular graphics for large complexes.</i> ACM Proceedings of the 21st International Conference on Web3D Technology (Web3D '16): 185-186, 2016. <a href="http://dx.doi.org/10.1145/2945292.2945324" target="_blank">doi:10.1145/2945292.2945324</a></li>
                        <li>AS Rose and PW Hildebrand. <i>NGL Viewer: a web application for molecular visualization.</i> Nucl Acids Res (1 July 2015) 43 (W1): W576-W579 first published online April 29, 2015. <a href="https://doi.org/10.1093/nar/gkv402" target="_blank">doi:10.1093/nar/gkv402</a></li>
                    </ul>
                </small>
            </div> -->
        </div>
<!-- 
    <script>
        setStageHeight()
        setLoadingProgressBar()
    </script>
    <script src="nglviewer/js/ngl-ui.js"></script> -->
    <!-- <script src="nglviewer/js/ui-ngl.js"></script> -->
    <script>
    NGL.cssDirectory = "nglviewer/css/"
    // NGL.documentationUrl = "../build/docs/"
    // NGL.examplesListUrl = "../build/scriptsList.json"
    // NGL.examplesScriptUrl = "./scripts/"

  // <script>
    document.addEventListener("DOMContentLoaded", function () {
      var stage = new NGL.Stage("stagePanel");
      // var stage = new NGL.Stage("stageViewport");
      // stage.loadFile("rcsb://1crn", {defaultRepresentation: true});
      // stage.setSpin(true);
      stage.loadFile("mem_new.pdb", {defaultRepresentation: true});
      // var a = new THREE.Vector3( 0, 1, 0 );
      // var num = new Number(100);
      // stage.setSpin(true);

    });
  </script>
    </div>
    <div class="hidden-print" id="footer_main">
        <div class="container">
            
        </div>
    </div>
    <div id = "viewport" style = "height:400px;width:300px;"> </div>
    
    <!-- Related to Autocomplete-->
    <!-- <script>
        function QuerySuggest(e,t){this.settings=jQuery.extend(this.defaultSettings(),t),this.textBoxId=$(e).attr("id"),this.suggestId=this.textBoxId+"_querySuggest",this.queryExecutions={},this.emptyExecution=null,this.queryTexts=[],this.delayTimer=0,this.clearTimer=0,this.autoHide=!0,this.pendingQuery=null,this.anotherPending=null}jQuery.fn.querySuggest=function(e){return this.each(function(t,i){var s=new QuerySuggest(i,e);$(i).focus(function(e){return s.enableSuggest(e)}),$(i).blur(function(e){return s.disableSuggest(e)}),$(i).keyup(function(e){return s.digestInput(e)}),$(i).bind("paste",function(e){setTimeout(function(){return s.digestInput()},30)}),$(i).after('<div id="'+s.suggestId+'" class="'+s.settings.cssClass+'" style="display:none;"></div>'),$("#"+s.suggestId).click(function(e){s.autoHide=!1,s.manualClose()}),i.querySuggest=s})},jQuery.fn.getQuerySuggest=function(){return 0==this.length?null:this[0].querySuggest},QuerySuggest.prototype.defaultSettings=function(){return{width:600,cssClass:"querySuggest",delay:800,align:"center",cacheSize:10,minQuerySize:1,maxQuerySize:500,condensed:!1,initQuery:!0,limit:6,present:function(e,t,i,s){QuerySuggest.prototype.defaultPresent(e,t,i,s)},empty:function(e,t){QuerySuggest.prototype.defaultEmpty(e,t)},queryUrl:function(e,t){return""}}},QuerySuggest.prototype.enableSuggest=function(){this.autoHide=!0,this.querySuggestions()},QuerySuggest.prototype.disableSuggest=function(){var e=this.suggestId,t=this;setTimeout(function(){t.autoHide&&$("#"+e).hide()},200)},QuerySuggest.prototype.manualClose=function(){$("#suggestClose_"+this.suggestId).html()||$("#"+this.suggestId).append("<div class='Close_SearchSuggestionWindow' id='suggestClose_"+this.suggestId+"'><a href='#' onclick='$(\"#"+this.suggestId+"\").hide();return false;'>close <span class='glyphicon glyphicon-remove'></span></a></div>")},QuerySuggest.prototype.digestInput=function(){var e=$("#"+this.textBoxId).val(),t=this;if(0===this.clearTimer&&(this.clearTimer=setTimeout(function(){t.emptySuggestions()},1.2*this.settings.delay)),0!==this.delayTimer&&(clearTimeout(this.delayTimer),this.delayTimer=0),!e||e.length<this.settings.minQuerySize||e.length>this.settings.maxQuerySize)return void $("#"+this.suggestId).hide();this.delayTimer=setTimeout(function(){t.querySuggestions()},this.settings.delay)},QuerySuggest.prototype.emptySuggestions=function(){this.clearTimer=0,0===this.delayTimer&&this.settings.empty(this,this.suggestId)},QuerySuggest.prototype.querySuggestions=function(){this.delayTimer=0;var e=$("#"+this.textBoxId).val();if(e.length<this.settings.minQuerySize&&(e=""),!this.settings.initQuery&&e.length<this.settings.minQuerySize)return void $("#"+this.suggestId).hide();if(this.pendingQuery&&(!this.anotherPending||(new Date).getTime()-this.anotherPending>2e3))return void(this.anotherPending=(new Date).getTime());if(this.anotherPending=null,this.pendingQuery=e,this.pendingUrl=this.settings.queryUrl(this.pendingQuery,this),null==this.pendingUrl)return this.pendingQuery=null,void $("#"+this.suggestId).hide();var t=this.queryExecutions[this.pendingUrl];this.pendingQuery||(t=this.emptyExecution),void 0!==t&&null!==t?this.giveSuggestions(t):this.requestSuggestions()},QuerySuggest.prototype.requestSuggestions=function(){var e=this,t=this.pendingQuery,i=this.pendingUrl;$.getJSON(this.pendingUrl,function(s){e.pendingQuery=t,e.pendingUrl=i,e.giveSuggestions(s),e.anotherPending&&e.querySuggestions()})},QuerySuggest.prototype.giveSuggestions=function(e){void 0!==e&&null!=e&&this.cacheSuggestions(this.pendingQuery,this.pendingUrl,e);var t=this.pendingQuery;this.pendingQuery=null,this.pendingUrl=null,0!==this.clearTimer&&(clearTimeout(this.clearTimer),this.clearTimer=0),t==$("#"+this.textBoxId).val()?(this.settings.present(this,this.suggestId,e,t),e&&e.length?$("#"+this.suggestId).show():$("#"+this.suggestId).hide()):$("#"+this.suggestId).hide()},QuerySuggest.prototype.cacheSuggestions=function(e,t,i){if(!e)return void(this.emptyExecution=i);if(this.queryExecutions[t]){var s=0;for(s=0;s<this.queryTexts.length&&this.queryTexts[s]!==t;s++);s!==this.queryTexts.length&&this.queryTexts.splice(s,1)}this.queryTexts.length>this.settings.cacheSize&&(this.queryExecutions[this.queryTexts[0]]=null,this.queryTexts.splice(0,1)),this.queryTexts.push(t),this.queryExecutions[t]=i},QuerySuggest.prototype.defaultEmpty=function(e,t){e.settings.initQuery?e.emptyExecution?e.settings.present(e,t,e.emptyExecution,""):e.querySuggestions():$("#"+t).html("")},QuerySuggest.prototype.defaultPresent=function(e,t,i,s){var n="",u=0,g=0;if(i){for(u=0;u<i.length;u++){var r=i[u];for(n+="<div>"+r.name+"<ul>",g=0;g<r.matches.length;g++){var h=r.matches[g];n+="<li><a href='"+h.url+"'>"+h.label+"</a>"}n+="</ul></div>"}$("#"+t).html(n)}else e.settings.empty(e,t)};function markQuery(e,t){var r=e.toLowerCase().indexOf(t.toLowerCase());if(-1!==r&&"b"!=t)return e.substr(0,r)+"<b>"+e.substr(r,t.length)+"</b>"+e.substr(r+t.length);var a,s=t.replace(/-/g," ").split(" ");if(s.length>1)for(a=0;a<s.length;a++)e=markQuery(e,s[a]);return e}function focusSuggest(e,t){var r=$("#"+e).getQuerySuggest();r.itemId=t,r.settings.limit=47,r.querySuggestions()}function reSuggest(e){$("#"+e).getQuerySuggest().querySuggestions()}function presentSuggestionsInSearchBar(e,t,r,a){var s,l="",n="",u=0,i=0,o=0,g="",c="",p=ContextLabels[t.replace("_querySuggest","")],h=p||t,d={Author:"authorProfileIcon"};e.popupCounter||(e.popupCounter=0),e.popupCounter++,$("#tiptip_holder").hide(),$.each(r,function(t,r){if(r.suggestions.length<=0)return!0;g="",c="",n="",u=0,s=0,$.each(r.suggestions,function(e,l){i=Math.round(1e3*l.percent)/10,l.abbreviation||(l.abbreviation=l.label);var o=markQuery(l.label,a),p=markQuery(l.abbreviation,a),f=l.label!==l.abbreviation?o.replace(/'/g,"&#39;"):null;l.percent&&(f=i+"% "+o+" ("+l.population+" hits)");var m=(-1==l.url.indexOf("?")?"?":"&")+"evtc=Suggest&evta="+r.name.replace(" ","")+"&evtl="+h;if(f){var b=f.replace("<b>","");b=b.replace("</b>","")}if(n+="<li "+(f?"title='"+b+"'":"")+" class='querySuggestGroup"+(f?" mantooltip":"")+(l.isEnabled?"":" suggestNotFocus")+"' style='white-space:nowrap;'>",n+="<a class='groupLabel' id='drill_"+t+"_"+(i>0?u+"":e+"_n")+"return true;' href='"+l.url+m+"'>",n+=p,n+=l.population?" ("+l.population+")":"",n+=l.url?"</a>":"",l.redirectUrl){d[r.id]?d[r.id]:n+="<a href='"+l.redirectUrl+"'>&nbsp;<i class='fa fa-sitemap'></i></a>"}n+="</li>",g+=(u>0?",":"")+i;var v=l.abbreviation;v.length>35&&(v=v.substring(0,32)+"..."),c+=(u>0?"|":"")+i+"% "+v+" ("+l.population+" hits)",u++,u%12==0&&(n+="</ul><ul>"),s++}),s>o&&(o=s),o>12&&(o=12);var p=r.name;if(l+="<div class='suggestgroup'><h5>"+p+"</h5>",l+="<ul>",l+=n,r.allUrl||r.moreResults||e.itemId){l+="<li class='querySuggestAll' >";var f="",m="";if(r.moreResults&&!e.itemId&&(f+="<a style='float:left' href='#' onclick='focusSuggest(\""+e.textBoxId+'","'+r.id+"\");return false;'>More</a>"),e.itemId&&(f+="<a style='float:left' href='#' onclick='reSuggest(\""+e.textBoxId+"\");return false;'>Less</a>"),r.allUrl&&-1==r.name.indexOf("Author")){var b=(-1==r.allUrl.indexOf("?")?"?":"&")+"evtc=Suggest&evta="+r.name.replace(" ","")+"All&evtl="+h;m+="<a href='"+r.allUrl+b+"return true;'>Find all</a>"}r.moreResults&&e.itemId&&!r.allUrl&&(m+="<span>Too many matches</span>"),l+=f+(f&&m?"<span style='float:left'>&nbsp;&nbsp;-&nbsp;&nbsp;</span>":"")+m,l+="</li>"}l+="</ul>",l+="</div>"}),l+="<div class='clearHide'>&nbsp</div>",$("#"+t).html(l),e.itemId=null,e.settings.limit=6,0==e.settings.condensed&&$("#"+t+" .suggestgroup").css("min-height",10*o+130+"px"),e.manualClose();var f=e.fixedItemId;f||(f="All")}triggeredSubmit=!1,ContextLabels={autosearch:"TopBar",othersearch:"OtherOptions",noresults:"NoResults"},$(document).ready(function(e){e(function(){e("#autosearch_SearchBar").querySuggest({queryUrl:function(e,t){return"All"==t.fixedItemId&&(t.fixedItemId=""),"/pdb/json/autosearch.do?limit="+t.settings.limit+"&"+(t.fixedItemId?"p="+t.fixedItemId+"&":t.itemId?"p="+t.itemId+"&":"")+"q="+encodeURIComponent(e)},initQuery:!1,present:presentSuggestionsInSearchBar,align:"left",delay:200,width:675})}),e("#autosearch_SearchBar").keyup(function(t){e("#autosearch_SearchBar").getQuerySuggest(),e("#autosearch_SearchBar").val()}),e("#headerQueryForm").submit(function(t){if(e("#autosearch_SearchBar").val().length<2)return alert("Please Enter at Least a 2 Character Search Term. Thank You."),!1;var r=(e("#autosearch_SearchBar").getQuerySuggest(),e("#autosearch_SearchBar").val());return gtag("event","search",{event_category:"Top Bar Search",event_label:r}),triggeredSubmit=!0,!0})});
    </script> -->
</body>


</html>