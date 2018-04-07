<!DOCTYPE html>
<html lang="en">
<head>
  <title>NGL - webapp</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <!-- <link rel="stylesheet" href="nglviewer/css/font-awesome.min.css" /> -->
  <link rel="stylesheet" href="nglviewer/css/main.css" />
  <link rel="stylesheet" href="nglviewer/css/ngl-ui.css">
  <!-- <link rel="preload" href="../css/light.css" as="style" />
  <link rel="preload" href="../css/dark.css" as="style"/> -->
</head>
<body>
  <!-- NGL -->
  <script src="https://cdn.rawgit.com/arose/ngl/v0.10.3/dist/ngl.js"></script>
  <!-- <script src="../build/js/ngl.dev.js"></script> -->

  <!-- UI -->
  <!-- <script src="../js/lib/signals.min.js"></script>
  <script src="../js/lib/tether.min.js"></script>
  <script src="../js/lib/colorpicker.min.js"></script>
  <script src="../js/ui/ui.js"></script>
  <script src="../js/ui/ui.extra.js"></script>
  <script src="../js/ui/ui.ngl.js"></script>
  <script src="../js/gui.js"></script> -->

  <script>
    NGL.cssDirectory = "nglviewer/css/"
    // NGL.documentationUrl = "../build/docs/"
    // NGL.examplesListUrl = "../build/scriptsList.json"
    // NGL.examplesScriptUrl = "./scripts/"

  // <script>
    document.addEventListener("DOMContentLoaded", function () {
      var stage = new NGL.Stage("viewport");
      // stage.loadFile("rcsb://1crn", {defaultRepresentation: true});
      stage.loadFile("mem_new.pdb", {defaultRepresentation: true});

    });
  </script>

  <!-- <div class="container" id="maincontainer">
  <div class="row">
    <div class="col-sm-12" style="background-color:lavender;">.col-sm-4<br>
    <div id="viewport" class="col-sm-8" style="width:400px; height:300px;"></div>
    <div id="parameters" class="col-sm-4" style="background-color:lavenderblush;"> blah bla=dfjghjfkgjdvnbdjkgndjvnsdjfnsjdndjdkjf</div>
  </div>
   <div class="col-xs-4" class="col-sm-4" style="background-color:lavenderblush;">.col-sm-4</div>
    <div class="col-xs-4" class="col-sm-4" style="background-color:lavender;">.col-sm-4</div> -->
  <!-- </div>
</div>
  <div id="viewport" ></div> --> 









<div class="container" id="maincontentcontainer">
    <br>
    <div id="summary">
        <div class="row" id="ngl-ui" data-normal-width="" data-normal-height="" style="">
            <div class="col-lg-9 col-md-8 col-sm-12 col-xs-12">
                <!-- <div id="stageHeader">Note: Use your mouse to drag, rotate, and zoom in and out of the structure. Mouse-over to identify atoms and bonds.
                    <a href="/pages/help/3dview#mouse-controls" target="_blank">Mouse controls documentation</a>.</div> -->
                <div id="stagePanel">
                    <div class="progress" id="loading" style="width: 421.5px; top: 421.5px; left: 210.75px; display: none;">
                        <div class="progress-bar progress-bar-warning progress-bar-striped active" id="progressBar" style="width: 421.5px;">Loading data...</div>
                    </div>
                    <div id="stageViewport" style="height: 843px; overflow: hidden;">
                        <div style="position: relative;">
                          <canvas width="527" height="526" tabindex="-1" style="width: 844.5px; height: 843px; background-color: rgb(255, 255, 255); touch-action: none; outline: none;"></canvas>
                        </div>
                        <div style="display: none; position: fixed; z-index: 1000000; pointer-events: none; background-color: rgba(0, 0, 0, 0.6); color: lightgrey; padding: 8px; font-family: sans-serif; bottom: 379px; left: 734px;">atom: [PRO]79:A.CA (1LYZ)</div>
                    </div>
                </div>
                <div id="viewerOptions">
                    <div id="viewerControls"><button id="btnSpin" class="off"><span id="btnSpinName">Spin</span><span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="" data-original-title="Start/stop spinning the structure along the y-axis"></span></button>
                        <button
                            class="off"><span id="undefinedName">Center</span><span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="" data-original-title="Reset molecule position"></span></button><span><button id="btnFullscreen" class="off"><span id="btnFullscreenName">Fullscreen</span>
                            <span
                                class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="" data-original-title="Activate/disable fullscreen mode"></span>
                                </button><button class="off"><span id="undefinedName">Screenshot</span><span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="" data-original-title="Download screenshot at twice the displayed resolution"></span></button></span>
                                <div
                                    class="inline"><select class="form-control input-sm" id="select-cameraType"><option value="perspective">Perspective Camera</option><option value="orthographic">Orthographic Camera</option></select></div>
                    <div class="inline"><select class="form-control input-sm" id="select-background"><option value="white">White background</option><option value="black">Black background</option></select></div>
                    <div class="inline">
                        <div class="inline viewer-focus-label"><span>Focus<span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="" data-original-title="Move far and near clipping planes towards the center"></span></span>
                        </div>
                        <div class="inline viewer-focus-slider">
                            <div class="range-input"><input id="range-focus" type="range" min="0" max="100" step="1">
                                <div id="value-focus" style="left: 6.5px;">0</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
            <div id="controls-tabs">
                <div onclick="toggle(&quot;structureView&quot;)" id="structureViewTab" class="tab-active">Structure<br>View</div>
                <div onclick="toggle(&quot;edMaps&quot;)" id="edMapsTab" class="tab-inactive">Electron<br>Density Maps</div>
                <div onclick="toggle(&quot;ligandViewer&quot;)" id="ligandViewerTab" class="tab-inactive">Ligand<br>Viewer</div>
            </div>
            <div class="controls" id="structureView" style="display: block;">
                <div>
                    <div><a href="/pages/help/3dview#structure-view" target="_blank">Structure View Documentation</a></div><br>
                    <div class="row horiz-group">
                        <div class="col-xs-5 label-right"><span>Assembly<span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="" data-original-title="View structure as asymmetric unit, biological assembly, unit cell, or stacked unit cells"></span></span>
                        </div>
                        <div class="col-xs-7"><select class="form-control input-sm" id="select-assembly"><option value="__AU">Asymmetric Unit</option><option value="BU1">Bioassembly 1</option><option value="UNITCELL">Unitcell</option><option value="SUPERCELL">Supercell</option></select></div>
                    </div>
                    <div class="row horiz-group">
                        <div class="col-xs-5 label-right"><span>Model<span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="" data-original-title="View specific model for multi-model structure"></span></span>
                        </div>
                        <div class="col-xs-7"><select class="form-control input-sm" id="select-model"><option value="0">Model 1</option></select></div>
                    </div>
                    <div class="row horiz-group">
                        <div class="col-xs-5 label-right"><span>Symmetry<span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="" data-original-title="View intrinsic molecular symmetry"></span></span>
                        </div>
                        <div class="col-xs-7"><select class="form-control input-sm" id="select-symmetry"><option value="-1">None</option></select></div>
                    </div>
                    <div class="row horiz-group">
                        <div class="col-xs-5 label-right"><span>Style<span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="" data-original-title="View the structure in different presentation styles"></span></span>
                        </div>
                        <div class="col-xs-7"><select class="form-control input-sm" id="select-style"><option value="">None</option><option value="backbone">Backbone</option><option value="surface">Surface</option><option value="cartoon">Cartoon</option><option value="spacefill">Spacefill/CPK</option><option value="licorice">Licorice</option><option value="line">Line</option></select></div>
                    </div>
                    <div class="row horiz-group">
                        <div class="col-xs-5 label-right"><span>Color<span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="" data-original-title="Color the structure using different schemes"></span></span>
                        </div>
                        <div class="col-xs-7"><select class="form-control input-sm" id="select-colorScheme"><option value="chainname">By Chain</option><option value="residueindex">Rainbow</option><option value="element">By Element/CPK</option><option value="resname">By Residue</option><option value="bfactor">By B-factor</option><option value="sstruc">By Secondary Structure</option><option value="hydrophobicity">By Hydrophobicity</option><option value="geoquality">By Geometry Quality</option></select></div>
                    </div>
                    <div class="row horiz-group">
                        <div class="col-xs-5 label-right"><span>Ligand<span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="" data-original-title="Change ligand presentation style"></span></span>
                        </div>
                        <div class="col-xs-7"><select class="form-control input-sm" id="select-ligandStyle"><option value="">None</option><option value="ball+stick">Ball &amp; Stick</option><option value="spacefill">Spacefill/CPK</option></select></div>
                    </div>
                    <div class="row horiz-group">
                        <div class="col-xs-5 label-right"><span>Quality<span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="" data-original-title="Adjust rendering quality"></span></span>
                        </div>
                        <div class="col-xs-7"><select class="form-control input-sm" id="select-quality"><option value="auto">Automatic</option><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></div>
                    </div>
                    <div class="row horiz-group">
                        <div class="col-sm-6 checkbox-label">
                            <div><input type="checkbox" id="checkbox-water" class="checkbox-with-label"><span>Water<span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="" data-original-title="Show/hide water molecules"></span></span>
                            </div>
                        </div>
                        <div class="col-sm-6 checkbox-label">
                            <div><input type="checkbox" id="checkbox-ion" class="checkbox-with-label"><span>Ions<span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="" data-original-title="Show/hide ions"></span></span>
                            </div>
                        </div>
                    </div>
                    <div class="row horiz-group">
                        <div class="col-sm-6 checkbox-label">
                            <div><input type="checkbox" id="checkbox-hydrogen" class="checkbox-with-label"><span>Hydrogens<span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="" data-original-title="Show/hide hydrogen atoms"></span></span>
                            </div>
                        </div>
                        <div class="col-sm-6 checkbox-label largeAUHidden">
                            <div><input type="checkbox" id="checkbox-clash" class="checkbox-with-label"><span>Clashes<span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="" data-original-title="Show/hide clashes between atoms (indicated by pink disks) as given in the Validation Report"></span></span>
                            </div>
                        </div>
                    </div>
                    <div class="text-right"><button id="btnDefaultStructureView" class="off"><span id="btnDefaultStructureViewName">Default Structure View</span><span class="fa fa-question-circle ngl-ui-help" data-toggle="tooltip" data-placement="top" title="" data-original-title="Reset to the default structure view"></span></button></div>
                </div>
            </div>
            <div class="controls" id="edMaps" style="display: none;">
                <div>
                    <div><a href="/pages/help/3dview#edmaps-view" target="_blank">Electron Density Maps Documentation</a></div><br>
                    <div class="message">There are no electron density maps for structure 1LYZ</div>
                </div>
            </div>
            <div class="controls" id="ligandViewer" style="display: none;">
                <div class="message">There are no ligands to view for structure 1LYZ</div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-9 col-md-8 col-sm-12">
            <div class="row">
                <div class="col-xs-6"><small><a href="https://github.com/arose/ngl" target="_blank">NGL</a> is a WebGL based 3D viewer powered by <a href="http://mmtf.rcsb.org" target="_blank">MMTF</a>.</small></div>
                <div class="col-xs-6" style="text-align: right"><small>Select a different viewer</small><select class="input-sm" id="viewers" style="margin-left:10px;" onchange="selectViewer()"><option value="" selected="">NGL (WebGL)</option><option value="HTML5">JSmol (JavaScript)</option></select></div>
            </div>
        </div>
    </div><br>
    <div class="citation">
        <h5>Citation</h5><small>When using the NGL Viewer please cite:<ul><li>AS Rose, AR Bradley, Y Valasatava, JM Duarte, A Prlić and PW Rose. <i>Web-based molecular graphics for large complexes.</i> ACM Proceedings of the 21st International Conference on Web3D Technology (Web3D '16): 185-186, 2016. <a href="http://dx.doi.org/10.1145/2945292.2945324" target="_blank">doi:10.1145/2945292.2945324</a></li><li>AS Rose and PW Hildebrand. <i>NGL Viewer: a web application for molecular visualization.</i> Nucl Acids Res (1 July 2015) 43 (W1): W576-W579 first published online April 29, 2015. <a href="https://doi.org/10.1093/nar/gkv402" target="_blank">doi:10.1093/nar/gkv402</a></li></ul></small></div>
</div>
<script>
    setStageHeight()
    setLoadingProgressBar()
</script>
<script src="js/ngl-ui.js"></script>
</div>

</body>
</html>