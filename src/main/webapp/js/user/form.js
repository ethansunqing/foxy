define([],function(){
	var form = Ext.define('Writer.Form', {
	    extend: 'Ext.form.Panel',
	    alias: 'widget.writerform',
	    requires: ['Ext.form.field.Text'],
	    initComponent: function(){
	        Ext.apply(this, {
	            activeRecord: null,
	            iconCls: 'icon-user',
	            title: 'User',
	            defaultType: 'textfield',
	            bodyPadding: 5,
	            fieldDefaults: {
	                anchor: '100%',
	                labelAlign: 'right'
	            },
	            items: [{
	                fieldLabel: 'User Name',
	                name: 'userName',
	                allowBlank: false,
	            }, {
	                fieldLabel: 'Password',
	                name: 'password',
	                allowBlank: false
	            },{
	                fieldLabel: 'Age',
	                name: 'age',
	                allowBlank: false
	            }],
	            dockedItems: [{
	                xtype: 'toolbar',
	                dock: 'bottom',
	                ui: 'footer',
	                items: ['->', {
	                    iconCls: 'icon-save',
	                    itemId: 'save',
	                    text: 'Save',
	                    disabled: true,
	                    scope: this,
	                    handler: this.onSave
	                }, {
	                    iconCls: 'icon-user-add',
	                    text: 'Create',
	                    scope: this,
	                    handler: this.onCreate
	                }, {
	                    iconCls: 'icon-reset',
	                    text: 'Reset',
	                    scope: this,
	                    handler: this.onReset
	                }]
	            }]
	        });
	        this.callParent();
	    },
	    setActiveRecord: function(record){
	        this.activeRecord = record;
	        if (record) {
	            this.down('#save').enable();
	            this.getForm().loadRecord(record);
	        } else {
	            this.down('#save').disable();
	            this.getForm().reset();
	        }
	    },
	    onSave: function(){
	        var active = this.activeRecord,
	            form = this.getForm();
	        if (!active) {
	            return;
	        }
	        if (form.isValid()) {
	            form.updateRecord(active);
	            this.onReset();
	        }
	    },
	    onCreate: function(){
	        var form = this.getForm();
	        if (form.isValid()) {
	            this.fireEvent('create', this, form.getValues());
	            form.reset();
	        }
	    },
	    onReset: function(){
	        this.setActiveRecord(null);
	        this.getForm().reset();
	    }
	});
	return form;
});