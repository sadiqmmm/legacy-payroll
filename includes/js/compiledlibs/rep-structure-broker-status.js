function BSUpdateObject(){this.broker={}}BSUpdateObject.prototype.getForm=function(){var a='<table id="rep-structure-update-table"><tr>';if(this.broker)a+="<th>"+$("select[name=brokerNumber] option:selected").text()+"</th></tr><tr>",a+='<td>Broker#: <input type="text" name="repNumber" value="'+this.broker.repNumber+'" size=4 /></td>',a+='<td>First Name: <input type="text" name="firstName" value="'+this.broker.firstName+'" size=15 /></td>',a+='<td>Last Name: <input type="text" name="lastName" value="'+this.broker.lastName+'" size=15 /></td>',a+='<td>Status: <select name="active">',this.broker.active==0?(a+='<option selected="selected" value=0>Inactive</option>',a+="<option value=1>Active</option>"):(a+="<option value=0>Inactive</option>",a+='<option selected="selected" value=1>Active</option>'),a+="</select></td>",a+='<td><button name="rep-structure-update-broker" value=0>^</button></td>',a+="</tr>";else{var b={};b.id=null,b.repNumber="",b.firstName="",b.lastName="",b.active="",this.broker=b,a+='<td>Broker#: <input type="text" name="repNumber" value="'+this.broker.repNumber+'" size=4 /></td>',a+='<td>First Name: <input type="text" name="firstName" value="'+this.broker.firstName+'" size=15 /></td>',a+='<td>Last Name: <input type="text" name="lastName" value="'+this.broker.lastName+'" size=15 /></td>',a+='<td>Status: <select name="active">',this.broker.active==0?(a+='<option selected="selected" value=0>Inactive</option>',a+="<option value=1>Active</option>"):(a+="<option value=0>Inactive</option>",a+='<option selected="selected" value=1>Active</option>'),a+="</select></td>",a+='<td><button name="rep-structure-update-broker" value=0>^</button></td>',a+="</tr>"}return a+="</table>",a},BSUpdateObject.prototype.setBroker=function(){var a=this;dbw.table="Brokers",dbw.getByFields({repNumber:$("select[name=brokerNumber]").val()},function(b){a.broker=b[0]})},BSUpdateObject.prototype.isValidPercent=function(a){return isNaN(parseFloat(a))},BSUpdateObject.prototype.simpleModalObject=function(a,b){var c=this;return $("<div></div>").dialog({autoOpen:!1,buttons:{Ok:function(){$(this).dialog("close"),b!=null&&b()}},height:"auto",modal:!0,title:a,width:"auto"})},$(document).ready(function(){dbw=new DbWrapper;var a=new BSUpdateObject,b=$("<div></div>").dialog({autoOpen:!1,buttons:{Ok:function(a){$(this).dialog("close"),location.reload(!0)}},height:"auto",modal:!0,title:"Update Broker Structure",width:"auto"});$("#rep-structure-new-broker").live("click",function(){return a.method="insert",a.broker=null,b.html(a.getForm()),b.dialog("open"),!1}),$("#rep-structure-edit-broker").live("click",function(){return a.method="update",a.setBroker(),b.html(a.getForm()),b.dialog("open"),!1}),$("button[name=rep-structure-update-broker]").live("click",function(){var c=$(this).val(),d={};return d.repNumber=$("#rep-structure-update-table tr").find("input[name=repNumber]").get(c).value,d.firstName=$("#rep-structure-update-table tr").find("input[name=firstName]").get(c).value,d.lastName=$("#rep-structure-update-table tr").find("input[name=lastName]").get(c).value,d.active=$("select[name=active]").val(),console.dir(d),a.broker.userid!=null?(d.id=a.broker.userid,dbw.table="Brokers",dbw.updateObject(d,function(b){console.dir(b);var c=a.simpleModalObject("Update Broker Results",function(){location.reload(!0)});b==1?c.html("Successfully Updated."):c.html("Something went wrong!"),c.dialog("open")})):(dbw.table="Brokers",dbw.insertObject(d,function(b){console.dir(b);var c=a.simpleModalObject("Create Broker Results",function(){location.reload(!0)});b!=null?c.html("Successfully Inserted."):c.html("Something went wrong!"),c.dialog("open")})),a.setBroker(),b.html(a.getForm()),b.dialog("open"),!1})})