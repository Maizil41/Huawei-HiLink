"use strict";"require view";"require poll";const circleState={};const API="/cgi-bin/huawei_hilink";const PoweredBy="Mutiara-Wrt";const E=(tag,attrs,children)=>{const el=document.createElement(tag);if(attrs){for(const k in attrs){if(k==="class")el.className=attrs[k];else if(k==="style")el.setAttribute("style",attrs[k]);else el.setAttribute(k,attrs[k])}}
if(children!=null){if(Array.isArray(children)){children.forEach(c=>{if(c==null)return;el.append(c.nodeType?c:document.createTextNode(String(c)))})}else{el.append(children?.nodeType?children:document.createTextNode(String(children)))}}
return el};(function(){const css=`
.sig-grid{
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
  gap:18px;
}

.sig-card{
  width:130px;
  background:#f7f7f7;
  border-radius:12px;
  padding:10px 8px 14px;
  text-align:center;
  box-shadow:0 1px 3px rgba(0,0,0,.15);
}

.sig-title{
  font-size:12px;
  font-weight:600;
  margin-bottom:6px;
}

.circle-wrap{
  width:90px;height:90px;
  border-radius:50%;
  margin:auto;
  background:#e6e6e6;
  display:flex;
  align-items:center;
  justify-content:center;
}

.circle-inner{
  width:75px;
  height:75px;
  background:#fff;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
}

.circle-pct{
  font-size:16px;
  font-weight:bold;
}

.sig-value{
  font-size:12px;
  margin-top:6px;
  opacity:.8;
}
`;document.head.appendChild(E("style",{},css))})();const T=s=>typeof _==="function"?_(s):String(s??"");function luRes(path){try{return typeof L!=="undefined"&&L.resource?L.resource(path):path}catch(_e){return path}}
function num(v){if(v==null)return null;const m=String(v).match(/-?\d+/);return m?parseInt(m[0],10):null}
function clamp(x,a,b){return Math.max(a,Math.min(b,x))}
function pct(v,min,max){const n=num(v);if(n==null)return 0;const p=(n-min)/(max-min);return Math.round(clamp(p,0,1)*100)}
const pctRSSI=v=>pct(v,-110,-50);const pctRSRP=v=>pct(v,-120,-60);const pctSINR=v=>pct(v,-15,30);const pctRSRQ=v=>pct(v,-20,-5);const pctRSCP=v=>pct(v,-120,-60);const pctECIO=v=>pct(v,-20,-3);function qualityPercent(rssi){const n=num(rssi);if(n==null)return 0;const csq=clamp(Math.round((n+113)/2),0,31);return Math.round(csq/31*100)}
function setBarColored(id,percent,value,color){const el=document.getElementById(id);if(!el)return;const target=clamp(percent|0,0,100);const start=circleState[id]??0;const duration=600;const startTime=performance.now();function animate(t){const progress=Math.min((t-startTime)/duration,1);const cur=Math.round(start+(target-start)*progress);el.style.background=`conic-gradient(${color} ${cur}%, #e6e6e6 ${cur}%)`;const pct=document.getElementById(id+"-pct");if(pct)pct.textContent=cur+"%";if(progress<1){requestAnimationFrame(animate)}else{circleState[id]=target}}
requestAnimationFrame(animate);const val=document.getElementById(id+"-val");if(val)val.textContent=value??"-"}
function pctCSQ(v){const n=num(v);if(n==null)return 0;return Math.round(clamp(n,0,31)/31*100)}
function csqInfo(v){const n=num(v);if(n==null)return{color:"gray",label:"-"};if(n>=20)return{color:"lime",label:"Excellent"};if(n>=15)return{color:"yellow",label:"Good"};if(n>=10)return{color:"darkorange",label:"Fair"};return{color:"red",label:"Poor"}}
function setMetric(id,val,pctFunc,infoFunc){const{color,label}=infoFunc(val);const percent=pctFunc(val);setBarColored(id,percent,val,color)}
function rssiInfo(v){const n=num(v);if(n==null)return{color:"gray",label:"-"};if(n>-70)return{color:"lime",label:"Excellent"};if(n>=-85)return{color:"yellow",label:"Good"};if(n>=-100)return{color:"darkorange",label:"Fair"};return{color:"red",label:"Poor"}}
function rsrpInfo(v){const n=num(v);if(n==null)return{color:"gray",label:"-"};if(n>-80)return{color:"lime",label:"Excellent"};if(n>=-90)return{color:"yellow",label:"Good"};if(n>=-100)return{color:"darkorange",label:"Fair"};return{color:"red",label:"Poor"}}
function rsrqInfo(v){const n=num(v);if(n==null)return{color:"gray",label:"-"};if(n>-10)return{color:"lime",label:"Excellent"};if(n>=-15)return{color:"yellow",label:"Good"};if(n>=-20)return{color:"darkorange",label:"Fair"};return{color:"red",label:"Poor"}}
function sinrInfo(v){const n=num(v);if(n==null)return{color:"gray",label:"-"};if(n>15)return{color:"lime",label:"Excellent"};if(n>=10)return{color:"yellow",label:"Good"};if(n>=5)return{color:"darkorange",label:"Fair"};return{color:"red",label:"Poor"}}
function rscpInfo(v){const n=num(v);if(n==null)return{color:"gray",label:"-"};if(n>=-75)return{color:"lime",label:"Excellent"};if(n>=-85)return{color:"yellow",label:"Good"};if(n>=-95)return{color:"darkorange",label:"Fair"};return{color:"red",label:"Poor"}}
function ecioInfo(v){const n=num(v);if(n==null)return{color:"gray",label:"-"};if(n>=-6)return{color:"lime",label:"Excellent"};if(n>=-10)return{color:"yellow",label:"Good"};if(n>=-20)return{color:"darkorange",label:"Fair"};return{color:"red",label:"Poor"}}
function tableRows(rows){return E("div",{class:"table"},rows)}
function trKVLeft(k,v){const asChild=x=>{if(x==null)return T("");if(typeof x==="string"||typeof x==="number")return T(String(x));if(Array.isArray(x))return x;return x};return E("div",{class:"tr"},[E("div",{class:"td left",style:"width:33%"},T(k)),E("div",{class:"td left"},asChild(v))])}
function trProgress(id,title){return E("div",{class:"sig-card"},[E("div",{class:"sig-title"},title),E("div",{id,class:"circle-wrap"},E("div",{class:"circle-inner"},[E("div",{class:"circle-pct",id:id+"-pct"},"0%")])),E("div",{class:"sig-value",id:id+"-val"},"-")])}
function trSignalImg(id,title,sub){return E("div",{class:"tr"},[E("div",{class:"td left",style:"width:33%"},[T(title),sub?E("div",{style:"text-align:left;font-size:66%"},[T(sub)]):null]),E("div",{class:"td left"},E("span",{id:id+"-wrap"},[E("span",{id:id+"-text",style:"margin-right:6px;"},"0%"),E("img",{id,src:luRes("icons/hilink-0.png"),style:"height:18px",title:"-"})]))])}
function iconFileFromPercent(pctVal){const p=clamp(pctVal|0,0,100);if(p===0)return"hilink-0.png";if(p<=20)return"hilink-0-20.png";if(p<=40)return"hilink-20-40.png";if(p<=60)return"hilink-40-60.png";if(p<=80)return"hilink-60-80.png";return"hilink-80-100.png"}
function setSignalImg(id,percent,titleText){const img=document.getElementById(id);const txt=document.getElementById(id+"-text");if(!img||!txt)return;const p=clamp(percent|0,0,100);img.src=luRes("icons/"+iconFileFromPercent(p));txt.textContent=p+"%";img.title=titleText==null||titleText===""?"-":String(titleText)}
function computeModeName(d){return d.net_mode==="7"?`${d.workmode} | ${d.band}`:d.workmode}
const is4G=d=>d.net_mode==="7";const is3G=d=>d.net_mode==="2";function normalize(apiData){const n=apiData?.network||{};const c=apiData?.connection||{};const t=apiData?.traffic||{};const dv=apiData?.device||{};return{operator:n.operator??"-",plmn:n.plmn??"-",net_mode:n.net_mode??"",pci:n.pci??"-",rssi:n.rssi??"-",rsrp:n.rsrp??"-",sinr:n.sinr??"-",rsrq:n.rsrq??"-",rscp:n.rscp??"-",ecio:n.ecio??"-",lac_dec:n.lac_dec??"-",lac_hex:n.lac_hex??"-",cell_id_dec:n.cell_id_dec??"-",cell_id_hex:n.cell_id_hex??"-",enb_rnc:n.enb_rnc??"-",cell_index:n.cell_index??"-",band:n.band??"-",earfcn_dl:n.earfcn_dl??"-",earfcn_ul:n.earfcn_ul??"-",bandwidth_dl_mhz:n.bw_dl??"-",bandwidth_ul_mhz:n.bw_ul??"-",freq_dl:n.freq_dl??"-",freq_ul:n.freq_ul??"-",sim_status:n.status??"-",connt_current:c.cconn??"-",connrx:c.crx??"-",conntx:c.ctx??"-",speedrx:t.rx??"-",speedtx:t.tx??"-",devicename:dv.model??"-",software_version:dv.software??"-",webui_version:dv.webui??"-",imei:dv.imei??apiData?.imei??"-",imsi:dv.imsi??apiData?.imsi??"-",iccid:dv.iccid??apiData?.iccid??"-",msisdn:dv.msisdn??apiData?.msisdn??"-",wan_ip:dv.wan_ip??apiData?.wan_ip??"-",mac1:dv.mac1??apiData?.mac1??"-",workmode:dv.workmode??apiData?.workmode??"-"}}
function renderConnInfo(d){const elstat=document.getElementById("conn-stat");if(!elstat)return;const last=d.connt_current||"-";const crx=d.connrx||"-";const ctx=d.conntx||"-";const sicon=luRes("icons/hilink_ctime.png");elstat.innerHTML=`<img src="${sicon}" style="width:16px;height:16px;vertical-align:middle;margin-right:4px"/>`+`${last} | ▲ ${ctx} ▼ ${crx}`}
function SIMdata(d){const registered=String(d.sim_status)==="1";return E("span",{},[E("img",{src:luRes("icons/hilink_sim.png"),style:"width:20px;height:auto;vertical-align:middle;margin-right:4px"}),T(registered?"Registered":"Not registered")])}
const EMPTY_DATA={plmn:"-",operator:"-",net_mode:"-",pci:"-",rssi:"-",rsrp:"-",sinr:"-",rsrq:"-",rscp:"-",ecio:"-",lac_dec:"-",lac_hex:"-",cell_id_dec:"-",cell_id_hex:"-",enb_rnc:"-",cell_index:"-",earfcn_dl:"-",earfcn_ul:"-",bandwidth_dl_mhz:"-",bandwidth_ul_mhz:"-",band:"-",sim_status:"-",connt_current:"-",connrx:"-",conntx:"-",speedrx:"-",speedtx:"-",devicename:"-",software_version:"-",webui_version:"-",imei:"-",imsi:"-",iccid:"-",msisdn:"-",wan_ip:"-",mac1:"-",workmode:"-"};function renderAll(d,$top,$sig,$cell,$dev){const modeName=computeModeName(d);const scorePct=qualityPercent(d.rssi);const csq=num(d.rssi)!=null?clamp(Math.round((num(d.rssi)+113)/2),0,31):null;$top.innerHTML="";const simRow=E("div",{class:"tr"},[E("div",{class:"td left",style:"width:33%"},T("SIM status")),E("div",{class:"td left"},[SIMdata(d)])]);$top.append(E("h3",{},T("General Information")),tableRows([trSignalImg("sigimg","Signal strength"),trKVLeft("Operator",d.operator||"-"),trKVLeft("PLMN",d.plmn||"-"),simRow,trKVLeft("Technology",modeName),trKVLeft("Connection Statistics",E("span",{id:"conn-stat"},"-"))]));setSignalImg("sigimg",scorePct,scorePct+"%");$dev.innerHTML="";$dev.append(E("h3",{},T("Device Information")),tableRows([trKVLeft("Device Model",d.devicename||"-"),trKVLeft("IMEI",d.imei||"-"),trKVLeft("IMSI",d.imsi||"-"),trKVLeft("ICCID",d.iccid||"-"),trKVLeft("My Number",d.msisdn||"-"),trKVLeft("WAN IP Address",d.wan_ip||"-"),trKVLeft("LAN MAC address",d.mac1||"-"),trKVLeft("Software Version",d.software_version||"-"),trKVLeft("WebUI Version",d.webui_version||"-")]));$sig.innerHTML="";$sig.append(E("h3",{},T("Signal Information")));const sigRows=[trProgress("csqn","CSQ","(Signal Strength)")];if(is4G(d)){sigRows.push(trProgress("rssin","RSSI","(Received Signal Strength Indicator)"),trProgress("rsrpn","RSRP","(Reference Signal Receive Power)"),trProgress("sinrn","SINR","(Signal to Interference plus Noise Ratio)"),trProgress("rsrqn","RSRQ","(Reference Signal Received Quality)"))}else if(is3G(d)){sigRows.push(trProgress("rscpn","RSCP","(Received Signal Code Power)"),trProgress("ecion","Ec/Io","(Energy per chip / Interference)"))}
$sig.append(E("div",{class:"sig-grid"},sigRows));setMetric("rssin",d.rssi,pctRSSI,rssiInfo);if(is4G(d)){setMetric("rsrpn",d.rsrp,pctRSRP,rsrpInfo);setMetric("sinrn",d.sinr,pctSINR,sinrInfo);setMetric("rsrqn",d.rsrq,pctRSRQ,rsrqInfo)
setMetric("csqn",csq,pctCSQ,csqInfo)}else if(is3G(d)){setMetric("rscpn",d.rscp,pctRSCP,rscpInfo);setMetric("ecion",d.ecio,pctECIO,ecioInfo)}
$cell.innerHTML="";const cellRows=[];if(is4G(d)){cellRows.push(trKVLeft("PCI",d.pci??""),trKVLeft("EARFCN (DL/UL)",(d.earfcn_dl??"")+((d.earfcn_ul??"")!==""?" / "+d.earfcn_ul:"")),trKVLeft("Frequency (DL/UL)",(d.freq_dl??"")+((d.freq_ul??"")!==""?" / "+d.freq_ul:"")),trKVLeft("Bandwidth (DL/UL)",((d.bandwidth_dl_mhz??"")!==""?d.bandwidth_dl_mhz+" MHz":"")+((d.bandwidth_ul_mhz??"")!==""?" / "+d.bandwidth_ul_mhz+" MHz":"")),trKVLeft("LAC (hex/dec)",(d.lac_hex??"")+" / "+(d.lac_dec??"")),trKVLeft("Cell ID (hex/dec)",(d.cell_id_hex??"")+" / "+(d.cell_id_dec??"")),trKVLeft("eNB / Cell",d.enb_rnc!=null&&d.cell_index!=null?d.enb_rnc+" / "+d.cell_index:""))}else if(is3G(d)){cellRows.push(trKVLeft("LAC (hex/dec)",(d.lac_hex??"")+" / "+(d.lac_dec??"")),trKVLeft("Cell ID (hex/dec)",(d.cell_id_hex??"")+" / "+(d.cell_id_dec??"")),trKVLeft("RNC / CI",d.enb_rnc!=null&&d.cell_index!=null?d.enb_rnc+" / "+d.cell_index:""))}else{cellRows.push(trKVLeft("LAC (hex/dec)",(d.lac_hex??"")+" / "+(d.lac_dec??"")),trKVLeft("Cell ID (hex/dec)",(d.cell_id_hex??"")+" / "+(d.cell_id_dec??"")))}
$cell.append(E("h3",{},T("Cell Information")),tableRows(cellRows));renderConnInfo(d)}
async function fetchData(){const r=await fetch(API,{cache:"no-store"});if(!r.ok)throw new Error("HTTP "+r.status);const j=await r.json();if(!j||!j.status||String(j.status).toLowerCase()!=="success")
throw new Error("API error");return normalize(j.data||{})}
async function repaint($top,$sig,$cell,$alert,$dev){try{const d=await fetchData();$alert.style.display="none";renderAll(d,$top,$sig,$cell,$dev)}catch(_e){$alert.style.display=""}}
return view.extend({load:()=>Promise.resolve(),render:function(){const root=E("div",{class:"cbi-map"},[E("div",{id:"hw-alert",class:"alert-message warning",style:"display:none"},T("Failed fetch data from API.")),E("div",{id:"card-top",class:"cbi-section"}),E("div",{id:"card-sig",class:"cbi-section"}),E("div",{id:"card-cell",class:"cbi-section"}),E("div",{id:"card-dev",class:"cbi-section"})]);const $alert=root.querySelector("#hw-alert");const $top=root.querySelector("#card-top");const $sig=root.querySelector("#card-sig");const $cell=root.querySelector("#card-cell");const $dev=root.querySelector("#card-dev");renderAll(EMPTY_DATA,$top,$sig,$cell,$dev);repaint($top,$sig,$cell,$alert,$dev);poll.add(()=>repaint($top,$sig,$cell,$alert,$dev),3);const footer=E("div",{class:"mobile-hide",style:"text-align:center; margin-top:20px; opacity:.85;"},`Powered by ${PoweredBy}`);root.appendChild(footer);return root},handleSaveApply:null,handleReset:null,handleSave:null})