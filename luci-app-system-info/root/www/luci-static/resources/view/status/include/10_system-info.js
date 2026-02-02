// =====================================================================
// Modified by Mutiara-Wrt
// Displays CPU Temp, CPU Load, RAM Usage, And Network Speed
// =====================================================================

'use strict';'require baseclass';'require rpc';'require fs';var callLuciVersion=rpc.declare({object:"luci",method:"getVersion"});var callSystemBoard=rpc.declare({object:"system",method:"board"});var callSystemInfo=rpc.declare({object:"system",method:"info"});var callCpu=rpc.declare({object:'cputemp',method:'get'});const MAX_MBPS=100;let tempVal=0,cpuVal=0,memVal=0,netVal=0;let tempCircle,cpuCircle,memCircle,netCircle;let tempText,cpuText,memText,netText;let uiBuilt=!1;function getBrandFromCgi(){return fetch('/cgi-bin/radmon',{cache:'no-store'}).then(r=>r.ok?r.text():'').then(t=>(t||'').trim()||'MUTIARA-WRT').catch(()=>'MUTIARA-WRT')}
function getColor(v){if(v<=50)return"#4caf50";if(v<=75)return"#ff9800";return"#f44336"}
function formatSpeed(bytesPerSec){let bits=bytesPerSec*8;if(bits<1000)return{v:bits.toFixed(0),u:" bps"};if(bits<1e6)return{v:(bits/1e3).toFixed(1),u:" Kbps"};return{v:(bits/1e6).toFixed(1),u:" Mbps"}}
function animate(circle,text,from,to,disp,unit){let start=null,dur=500;function f(ts){if(!start)start=ts;let p=(ts-start)/dur;if(p>1)p=1;let val=from+(to-from)*p;circle.setAttribute("stroke-dashoffset",220*(1-(val/100)));circle.setAttribute("stroke",getColor(val));text.textContent=disp()+unit;if(p<1)requestAnimationFrame(f);}
requestAnimationFrame(f)}
function buildGauge(label){let text=E('div',{style:`
position:absolute;
top:50%;left:50%;
transform:translate(-50%,-50%);
font-size:13px;
font-weight:400;
`},"0");let svg=document.createElementNS("http://www.w3.org/2000/svg","svg");svg.setAttribute("width","90");svg.setAttribute("height","90");let bg=document.createElementNS("http://www.w3.org/2000/svg","circle");bg.setAttribute("cx","45");bg.setAttribute("cy","45");bg.setAttribute("r","35");bg.setAttribute("stroke","#ddd");bg.setAttribute("stroke-width","8");bg.setAttribute("fill","none");let fg=document.createElementNS("http://www.w3.org/2000/svg","circle");fg.setAttribute("cx","45");fg.setAttribute("cy","45");fg.setAttribute("r","35");fg.setAttribute("stroke","#4caf50");fg.setAttribute("stroke-width","8");fg.setAttribute("fill","none");fg.setAttribute("stroke-dasharray","220");fg.setAttribute("stroke-dashoffset","220");fg.setAttribute("transform","rotate(-90 45 45)");svg.appendChild(bg);svg.appendChild(fg);let wrap=E('div',{style:'position:relative;width:90px;height:90px;margin:auto;'},[svg,text]);let box=E('div',{'class':'ifacebox center',style:`
width:130px;
margin:6px auto;
padding:10px 4px;
text-align:center;
border-radius:12px;
overflow:hidden;
`},[E('div',{style:`
font-weight:600;
font-size:13px;
background:#eeeeee;
margin:-10px -4px 8px -4px;
padding:8px 4px;
border-radius:12px 12px 0 0;
`},label),wrap]);return{box,fg,text}}
return baseclass.extend({title:_("System"),load:function(){return Promise.all([L.resolveDefault(callSystemBoard(),{}),L.resolveDefault(callSystemInfo(),{}),L.resolveDefault(callLuciVersion(),{revision:_("unknown"),branch:"LuCI"}),getBrandFromCgi(),callCpu()])},render:function(data){let boardinfo=data[0];let systeminfo=data[1];let luciversion=data[2];let brand=data[3];let cpu=data[4]||{};let datestr=null;if(systeminfo.localtime){let d=new Date(systeminfo.localtime*1000);datestr="%04d-%02d-%02d %02d:%02d:%02d".format(d.getUTCFullYear(),d.getUTCMonth()+1,d.getUTCDate(),d.getUTCHours(),d.getUTCMinutes(),d.getUTCSeconds())}
let fields=[_("Model"),(boardinfo.model||"Unknown")+" "+brand,_("Firmware"),(boardinfo.release?.description||"")+" "+luciversion.branch+" "+luciversion.revision,_("Kernel"),boardinfo.kernel,_("Local Time"),datestr,_("Uptime"),"%t".format(systeminfo.uptime||0)];let table=E("table",{class:"table"});for(let i=0;i<fields.length;i+=2){table.appendChild(E("tr",{class:"tr"},[E("td",{class:"td left",width:"33%"},fields[i]),E("td",{class:"td left"},fields[i+1])]))}
let t=Math.round(cpu.temp||0);let c=Math.round(cpu.cpu||0);let m=Math.round(cpu.mem||0);let rx=cpu.rx_Bps||0;let tx=cpu.tx_Bps||0;let total=rx+tx;let sp=formatSpeed(total);let mbps=(total*8)/1e6;let gNet=Math.min(100,(mbps/MAX_MBPS)*100);if(!uiBuilt){let g1=buildGauge("CPU Temp");let g2=buildGauge("CPU Load");let g3=buildGauge("RAM Usage");let g4=buildGauge("Net Speed");tempCircle=g1.fg;tempText=g1.text;cpuCircle=g2.fg;cpuText=g2.text;memCircle=g3.fg;memText=g3.text;netCircle=g4.fg;netText=g4.text;window._gaugeGrid=E('div',{style:`
display:grid;
grid-template-columns:repeat(auto-fit,minmax(130px,1fr));
gap:14px;
margin-top:15px;
`},[g1.box,g2.box,g3.box,g4.box]);uiBuilt=!0}
animate(tempCircle,tempText,tempVal,t,()=>t,"°C");animate(cpuCircle,cpuText,cpuVal,c,()=>c,"%");animate(memCircle,memText,memVal,m,()=>m,"%");animate(netCircle,netText,netVal,gNet,()=>sp.v,sp.u);tempVal=t;cpuVal=c;memVal=m;netVal=gNet;return E('div',{},[table,window._gaugeGrid])}})

