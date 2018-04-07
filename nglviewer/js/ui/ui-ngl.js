
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
      stage.setSpin(true);

    });