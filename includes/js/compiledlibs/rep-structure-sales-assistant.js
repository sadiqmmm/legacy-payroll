function SAUpdateObject(){this.salesAssistant={};this.salesAssistantList=[]}
SAUpdateObject.prototype.getForm=function(){var b=this.salesAssistant.id?this.salesAssistant.id:null,a='<form id="rep-structure-sa-bonus-submission" name="editSABonus" action="" method="GET" >';a+='<input type="hidden" name="repNum" value="'+$("select[name=brokerNumber]").val()+'" />';a+='<input type="hidden" name="recordId" value="'+b+'" />';a+="<h4>Edit Structure</h4><table><tr><td></td></tr>";a+="<tr><th>Sales Assistant Bonus</th></tr>";a+='<tr><td>Sales Assistant: <select name="saToUpdate">';
for(b=0;b<this.salesAssistantList.length;b++)a+=this.salesAssistant.salesAssistantId==this.salesAssistantList[b].id?'<option selected="selected" value="'+this.salesAssistantList[b].id+'">'+this.salesAssistantList[b].firstName+" "+this.salesAssistantList[b].lastName+"</option>":'<option value="'+this.salesAssistantList[b].id+'">'+this.salesAssistantList[b].firstName+" "+this.salesAssistantList[b].lastName+"</option>";console.dir(this.salesAssistant);a+='</select> Bonus: <input type="text" name="percent" size="3" value="'+
this.salesAssistant.percent*100+'" />% </td></tr>';a+="</table></form>";return a};SAUpdateObject.prototype.setSalesAssistant=function(){var b=this;dbw.table="salesAssistantData";dbw.getByFields({repNum:$("select[name=brokerNumber]").val()},function(a){b.salesAssistant=a[0]})};SAUpdateObject.prototype.setSalesAssistantList=function(){var b=this;dbw.table="SalesAssistant";dbw.getAll({},function(a){b.salesAssistantList=a})};SAUpdateObject.prototype.isValidatePercent=function(b){return isNaN(parseFloat(b))};
SAUpdateObject.prototype.simpleModalObject=function(b,a){return $("<div></div>").dialog({autoOpen:!1,buttons:{Ok:function(){$(this).dialog("close");a!=null&&a()}},height:"auto",modal:!0,title:b,width:"auto"})};
$(document).ready(function(){dbw=new DbWrapper;var b=new SAUpdateObject,a=$("<div></div>").dialog({autoOpen:!1,buttons:{Submit:function(){var a={};a.id=$("input[name=recordId]").val();a.salesAssistantId=$("select[name=saToUpdate]").val();a.saName=$("select[name=saToUpdate] option:selected").text();a.percent=$("input[name=percent]").val()/100;a.repNum=$("input[name=repNum]").val();if(b.isValidatePercent(a.percent))return a=b.simpleModalObject("Form Submission Error"),a.html("Please enter a valid percentage."),
a.dialog("open"),!1;dbw.table="salesAssistantData";b.method=="insert"?dbw.insertObject(a,function(a){var c=b.simpleModalObject("Edit Bonus Results",function(){location.reload(!0)});a!=null?c.html("Successfully Inserted."):c.html("Something went wrong!");c.dialog("open")}):b.method=="update"&&dbw.updateObject(a,function(a){var c=b.simpleModalObject("Edit Bonus Results",function(){location.reload(!0)});a!=null?c.html("Successfully Inserted."):c.html("Something went wrong!");c.dialog("open")});$(this).dialog("close")},
Cancel:function(){$(this).dialog("close")}},height:"auto",modal:!0,title:"Update Broker Structure",width:"auto"});$("#rep-structure-insert-sa-bonus").live("click",function(){b.method="insert";b.setSalesAssistantList();a.html(b.getForm());a.dialog("open");return!1});$("#rep-structure-update-sa-bonus").live("click",function(){b.method="update";b.setSalesAssistant();b.setSalesAssistantList();a.html(b.getForm());a.dialog("open");return!1})});