# Custom-Element
A model for building custom UI components using Generat-JS

- easier way to do interactions
- bindings

Dependencies
- generate-js
- jQuery
- Handlebars
- CustomElement

RecentFilesConfig = {
    template: '<span class="thing">{{name}}</span>',
    interactions: {
        customEvent: {
            event: 'click|keypress',
            target: '.thing', // MAY OR MAY NOT EXIST
            listener: function(e) {
                alert($(this).text());
                this.emit(data);
            }
        }
    }
}

var RecentFiles = CustomElement.create(RecentFilesConfig);
RecentFiles.create($container, overrides?)




