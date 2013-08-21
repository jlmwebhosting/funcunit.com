load('steal/rhino/rhino.js');

steal("documentjs", "steal/rhino/json.js", function (DocumentJS) {

	var cap = function(str){
		return str.substr(0,1).toUpperCase()+str.substr(1)
	}
	var documentTitle = function(){
		if(this.page.toLowerCase() == "index"){
			return "FuncUnit"
		}
		
		if(this.page !== "guides" && this.page !== "docs"){
			return cap(this.page)+" - FuncUnit"
		}
		
		var title = this.title || this.name;
		if(title){
			if(title === "Guides"){
				return cap(this.page)+ " - FuncUnit"
			} else if(title === "FuncUnit"){
				return "API - FuncUnit"
			}
			if(this.page === "docs"){
				return (this.name || this.title) + " - FuncUnit API"
			} else {
				return title+" - FuncUnit "+cap(this.page)
			}
		}
		return "FuncUnit"
	}

	DocumentJS('scripts/doc.html',{
		"markdown": ['funcunit'],
		"out": "docs",
		"root": "..",
		"parent": "FuncUnit",
		"static" : "scripts/static",
		"templates": "scripts/templates",
		statics: {
			src: "_pages"
		},
		helpers: function(data, config, getCurrent, oldHelpers){
			return {
				documentTitle: documentTitle
			}
		}
		
	});

	DocumentJS('_guides',{
		"markdown": [ '_guides'],
		"out": "guides",
		"parent": "guides",
		"root": "..",
		"page": "guides", 
		"static" : "scripts/static",
		"templates": "scripts/templates",
		helpers: function(data, config, getCurrent, oldHelpers){
			return {
				documentTitle: documentTitle
			}
		}
	});

});
