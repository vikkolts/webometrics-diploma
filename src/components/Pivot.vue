<!--HTML related information for displaying the component-->
<template>
  <div>Pivot</div>
</template>

<!--JavaScript related information for the component's logic-->
<script>
import Flexmonster from "flexmonster";
export default {
  name: "Pivot",
  props: {
    afterchartdraw: Function,
    aftergriddraw: Function,
    beforegriddraw: Function,
    beforetoolbarcreated: Function,
    cellclick: Function,
    celldoubleclick: Function,
    componentFolder: String,
    customizeAPIRequest: Function,
    customizeCell: Function,
    customizeChartElement: Function,
    customizeContextMenu: Function,
    datachanged: Function,
    dataerror: Function,
    datafilecancelled: Function,
    dataloaded: Function,
    drillthroughclose: Function,
    drillthroughopen: Function,
    fieldslistclose: Function,
    fieldslistopen: Function,
    filterclose: Function,
    filteropen: Function,
    fullscreen: Function,
    global: Object,
    height: [String, Number],
    licenseKey: String,
    licenseFilePath: String,
    loadingdata: Function,
    loadinglocalization: Function,
    loadingolapstructure: Function,
    loadingreportfile: Function,
    localizationerror: Function,
    localizationloaded: Function,
    olapstructureerror: Function,
    olapstructureloaded: Function,
    openingreportfile: Function,
    querycomplete: Function,
    queryerror: Function,
    ready: Function,
    report: [String, Object],
    reportchange: Function,
    reportcomplete: Function,
    reportfilecancelled: Function,
    reportfileerror: Function,
    reportfileloaded: Function,
    runningquery: Function,
    toolbar: Boolean,
    unauthorizederror: Function,
    update: Function,
    width: [Number, String],
    accessibility: Object
  },
  data: function () {
    return {
      eventList: [
        "afterchartdraw",
        "aftergriddraw",
        "beforetoolbarcreated",
        "cellclick",
        "celldoubleclick",
        "chartclick",
        "datachanged",
        "dataerror",
        "datafilecancelled",
        "dataloaded",
        "drillthroughclose",
        "drillthroughopen",
        "exportcomplete",
        "exportstart",
        "fieldslistclose",
        "fieldslistopen",
        "filterclose",
        "filteropen",
        "loadingdata",
        "loadinglocalization",
        "loadingolapstructure",
        "loadingreportfile",
        "localizationerror",
        "localizationloaded",
        "olapstructureerror",
        "olapstructureloaded",
        "openingreportfile",
        "printcomplete",
        "printstart",
        "querycomplete",
        "queryerror",
        "ready",
        "reportchange",
        "reportcomplete",
        "reportfilecancelled",
        "reportfileerror",
        "runningquery",
        "update",
      ],
    };
  },
  mounted: function() {
    this.flexmonster = new Flexmonster({
      ...this.$props,
      container: this.$el
    });
    function clearTrialText(){
      const trialDiv = document.querySelectorAll('#fm-pivot-view > div.fm-ui-element.fm-ui.fm-noselect');
        if(trialDiv && trialDiv.length > 0){
          trialDiv.forEach(el => {
            if(el.innerHTML.includes('(trial version)')) el.innerHTML = '';
          })
        }
    }

    for(let ev in this.eventList){
      this.flexmonster.on(this.eventList[ev], () => {
        clearTrialText();
        //console.log(this.eventList[ev]);
      });
    }
  },
  methods: {
  },
  beforeUpdate() {
    return false;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "~flexmonster/flexmonster.min.css";
</style>

<style lang="scss">
#fm-pivot-view .fm-branding-bar{
  display: none;
}
</style>
