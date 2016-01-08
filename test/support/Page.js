import RL from "../../src/relayer.js"

export default class Page extends RL.Resource {

  static get layouts(){
    return {
      "one_column": {
      "label": "One Column",
      "template": {
        "main": { type: "text/html" }
      }
    },
    "two_column": {
      "label": "Two Column",
      "template": {
        "columnOne": { type: "text/html" },
        "columnTwo": { type: "text/html" }
      }
    }
  };
  }

  static get layoutKinds() {
    if (!Page._layoutKinds) {
      Page._layoutKinds = [];
      for(var layoutName in Page.layouts){
        if(Page.layouts.hasOwnProperty(layoutName)){
          Page._layoutKinds.push({"name": layouts[layoutName]["label"], "value": layoutName});
        }
      }
    }

    return Page._layoutKinds;
  }

  setupContents() {
    var contents = this.contents();
    var blockName;
    var templateLayout = Page.layouts[this.layout]["template"];
    if(templateLayout){

      var layoutNames = Object.getOwnPropertyNames(templateLayout);
      layoutNames.push("headline", "styles");
      for(blockName of layoutNames) {
        if(!contents.hasOwnProperty(blockName)){
          contents[blockName] = new Content();
          contents[blockName].type = templateLayout.type;
        }
      }

      for(blockName of Object.getOwnPropertyNames(contents)) {
        if("headline" !== blockName && "styles" !== blockName && !templateLayout.hasOwnProperty(blockName)){
          delete contents[blockName];
        }
      }
    }
  }

  get metadata(){
    return {
      pageTitle: this.title,
      pageKeywords: this.keywords,
      pageDescription: this.description,
      pageStyles: this.styles
    };
  }

  get shortLink() {
    return this.uriParams["url_slug"];
  }

  static paramsFromShortLink(shortLink) {
    return {url_slug: shortLink};
  }

  get styles() {
    return this.contents('styles').body;
  }

  get headline() {
    return this.contents('headline').body;
  }

  get mainContent() {
    return this.contents('main').body;
  }

}

RL.Describe(Page, (desc) => {
  desc.property("layout", "one_column", { afterSet() { this.setupContents() } });
  desc.property("title", "");
  desc.property("keywords", "");
  desc.property("description", "");
  desc.property("publishStart", "");
  desc.property("publishEnd", "");
  desc.property("urlSlug", "");
  var contents = desc.hasMap("contents",
    Content,
    {
      styles: { type: "text/css" },
      headline: { type: "text/html"}
    }
  );
  contents.async = false;
});

class Content extends RL.Resource {
}

RL.Describe(Content, (desc) => {
  desc.property("contentType", "");
  desc.property("body", "");
});
