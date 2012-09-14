function JRUpdateObject(){this.brokerList=[];this.brokerJointRepList=[]}
JRUpdateObject.prototype.getForm=function(){var b='<table id="rep-structure-update-table"><tr>';if(this.brokerJointRepList.length>0)for(var c=0;c<this.brokerJointRepList.length;c++){for(var a=0;a<this.brokerList.length;a++)if($("select[name=brokerNumber]").val()==this.brokerList[a].repNumber){b+="<td>"+this.brokerList[a].repNumber+" - "+this.brokerList[a].firstName+" "+this.brokerList[a].lastName+"</td>";break}b+='<td>, JointRep with: <select name="altRep">';for(a=0;a<this.brokerList.length;a++)$("select[name=brokerNumber]").val()!=
this.brokerList[a].repNumber&&(b+=this.brokerJointRepList[c].altRep==this.brokerList[a].repNumber?'<option selected="selected" value="'+this.brokerList[a].repNumber+'">'+this.brokerList[a].repNumber+" - "+this.brokerList[a].firstName+" "+this.brokerList[a].lastName+"</option>":'<option value="'+this.brokerList[a].repNumber+'">'+this.brokerList[a].repNumber+" - "+this.brokerList[a].firstName+" "+this.brokerList[a].lastName+"</option>");b+="</select></td>";b+='<td><input type="text" name="splitPercent" value="'+
this.brokerJointRepList[c].splitPercent+'" size=4 /></td>';b+='<td><button name="rep-structure-update-joint" value="'+c+'">^</button></td>';b+='<td><button name="rep-structure-delete-joint" value="'+c+'">-</button></td>';c==this.brokerJointRepList.length-1&&this.brokerJointRepList[c].id!=null&&(b+='<td><button name="rep-structure-add-joint" value="'+c+'">+</button></td>');b+="</tr>"}else{splitPercent=" ";this.brokerJointRepList.push({id:null,mainRep:"",altRep:""});for(a=0;a<this.brokerList.length;a++)if($("select[name=brokerNumber]").val()==
this.brokerList[a].repNumber){b+="<td>"+this.brokerList[a].repNumber+" - "+this.brokerList[a].firstName+" "+this.brokerList[a].lastName+"</td>";break}b+='<td>, JointRep with: <select name="altRep">';for(a=0;a<this.brokerList.length;a++)$("select[name=brokerNumber]").val()!=this.brokerList[a].repNumber&&(b+='<option value="'+this.brokerList[a].repNumber+'">'+this.brokerList[a].repNumber+" - "+this.brokerList[a].firstName+" "+this.brokerList[a].lastName+"</option>");b+="</select></td>";b+='<td> split: <input type="text" name="splitPercent" value="'+
this.brokerJointRepList[0].splitPercent+'" size=4 /></td>';b+='<td><button name="rep-structure-update-joint" value="0">^</button></td></tr>'}b+="</table>";return b};JRUpdateObject.prototype.setBrokerList=function(){var b=this;dbw.table="Brokers";dbw.getByFields({active:1},function(c){for(var a=0;a<c.length;a++)(c[a].firstName=="JointRep"||c[a].repNumber==$("select[name=brokerNumber]").val())&&b.brokerList.push(c[a])})};
JRUpdateObject.prototype.setbrokerJointRepList=function(){var b=this;dbw.table="repNums";dbw.getByFields({type:"JointRep",mainRep:$("select[name=brokerNumber]").val()},function(c){b.brokerJointRepList=c})};JRUpdateObject.prototype.isValidPercent=function(b){return isNaN(parseFloat(b))};JRUpdateObject.prototype.simpleModalObject=function(b,c){return $("<div></div>").dialog({autoOpen:!1,buttons:{Ok:function(){$(this).dialog("close");c!=null&&c()}},height:"auto",modal:!0,title:b,width:"auto"})};
$(document).ready(function(){dbw=new DbWrapper;var b=new JRUpdateObject,c=$("<div></div>").dialog({autoOpen:!1,buttons:{Ok:function(){$(this).dialog("close");location.reload(!0)}},height:"auto",modal:!0,title:"Update Broker Structure",width:"auto"});$("#rep-structure-new-joint").live("click",function(){b.method="insert";b.setBrokerList();b.setbrokerJointRepList();c.html(b.getForm());c.dialog("open");return!1});$("#rep-structure-edit-joint").live("click",function(){b.method="update";b.setBrokerList();
b.setbrokerJointRepList();c.html(b.getForm());c.dialog("open");return!1});$("button[name=rep-structure-update-joint]").live("click",function(){var a=$(this).val(),d={};d.mainRep=$("select[name=brokerNumber]").val();d.altRep=$("#rep-structure-update-table tr").find("select[name=altRep] option:selected").get(a).value;d.type="JointRep";d.splitPercent=$("#rep-structure-update-table tr").find("input[name=splitPercent]").get(a).value;if(b.isValidPercent(d.splitPercent))return a=b.simpleModalObject("Submission Error",
null),a.html("Please enter a valid split."),a.dialog("open"),!1;console.dir(d);b.brokerJointRepList[a].id!=null?(d.id=b.brokerJointRepList[a].id,dbw.table="repNums",dbw.updateObject(d,function(a){console.dir(a)})):(dbw.table="repNums",dbw.insertObject(d,function(a){console.dir(a)}));b.setbrokerJointRepList();c.html(b.getForm());c.dialog("open");return!1});$("button[name=rep-structure-delete-joint]").live("click",function(){var a=$(this).val();if(b.brokerJointRepList[a].id!=null)return dbw.table="repNums",
dbw.deleteObject(b.brokerJointRepList[a].id,function(a){console.dir(a)}),b.setbrokerJointRepList(),c.html(b.getForm()),c.dialog("open"),!1});$("button[name=rep-structure-add-joint]").live("click",function(){$(this).val();splitPercent=" ";b.brokerJointRepList.push({id:null,mainRep:"",altRep:""});c.html(b.getForm());c.dialog("open");return!1})});